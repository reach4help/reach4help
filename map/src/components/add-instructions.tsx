import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import React from 'react';
import { MdChevronRight } from 'react-icons/md';
import { MarkerInfo } from 'src/data/markers';
import { Language, t } from 'src/i18n';
import { RecursivePartial } from 'src/util';

import {
  isMarkerType,
  isService,
  MARKER_TYPE_STRINGS,
  Service,
  SERVICE_STRINGS,
} from '../data';
import styled from '../styling';
import { button, buttonPrimary, iconButton } from '../styling/mixins';
import { AppContext } from './context';

export type AddInfoStep =
  | 'information'
  | 'place-marker'
  | 'greeting'
  | 'set-marker'
  | 'set-radius'
  | 'set-form'
  | 'farewell';

enum FORM_INPUT_NAMES {
  type = 'type',
  services = 'services',
  name = 'name',
  description = 'description',
  locationName = 'locationName',
}

interface Validation {
  errors: string[];
  invalidInputs: FORM_INPUT_NAMES[];
}

interface MarkerInputInfo {
  marker: google.maps.Marker | null;
  circle: google.maps.Circle | null;
}

interface Props {
  className?: string;
  map: google.maps.Map | null;
  addInfoStep: AddInfoStep;
  setAddInfoStep: (addInfoStep: AddInfoStep | null) => void;
}

interface State {
  info: RecursivePartial<MarkerInfo>;
  validation?: Validation;
}

class AddInstructions extends React.Component<Props, State> {
  private markerInfo: MarkerInputInfo | null = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      info: {},
    };
  }

  private setInfoValues(newInfo: RecursivePartial<MarkerInfo>) {
    this.setState(({ info }) => ({ info: merge({}, info, newInfo) }));
  }

  private setInfo(mutate: (info: RecursivePartial<MarkerInfo>) => void) {
    this.setState(({ info }) => {
      // eslint-disable-next-line no-param-reassign
      info = cloneDeep(info);
      mutate(info);
      return { info };
    });
  }

  private completeGreetingStep = () => {
    const { map } = this.props;
    if (!map) {
      return;
    }

    if (!this.markerInfo) {
      this.markerInfo = {
        marker: null,
        circle: null,
      };
    }

    const { setAddInfoStep } = this.props;
    setAddInfoStep('set-marker');
  };

  private completeSetMarkerStep = () => {
    const { map } = this.props;
    if (!map) {
      return;
    }

    const { setAddInfoStep } = this.props;
    if (!this.markerInfo) {
      setAddInfoStep('greeting');
      return;
    }

    if (this.markerInfo) {
      if (this.markerInfo.marker) {
        this.markerInfo.marker.setMap(null);
        this.markerInfo.marker = null;
      }
      if (this.markerInfo.circle) {
        this.markerInfo.circle.setMap(null);
        this.markerInfo.circle = null;
      }
    }

    const marker = new google.maps.Marker({
      map,
      position: map.getCenter(),
      draggable: true,
    });
    const circle = new google.maps.Circle({
      map,
      center: map.getCenter(),
      editable: true,
      radius: Math.floor(3000000 / (map.getZoom() * map.getZoom())),
    });

    const meterToKm = (meter: number) => (meter / 1000).toFixed(2);
    const infoWindow = new google.maps.InfoWindow({
      content: `${meterToKm(circle.getRadius())}km`,
    });

    infoWindow.open(map, marker);

    marker.addListener('drag', () => {
      const position = marker.getPosition();
      if (!position) {
        return;
      }
      circle.setCenter(new google.maps.LatLng(position.lat(), position.lng()));
    });
    marker.addListener('click', () => {
      if (!map) {
        return;
      }
      infoWindow.open(map, marker);
    });
    circle.addListener('center_changed', () => {
      marker.setPosition(circle.getCenter());
    });
    circle.addListener('radius_changed', () => {
      infoWindow.setContent(`${meterToKm(circle.getRadius())}km`);
    });

    this.markerInfo.marker = marker;
    this.markerInfo.circle = circle;
    setAddInfoStep('set-radius');
  };

  private completeSetRadiusStep = () => {
    const { setAddInfoStep } = this.props;
    if (!this.markerInfo) {
      setAddInfoStep('set-marker');
    }
    setAddInfoStep('set-form');
  };

  private submit = () => {
    const { setAddInfoStep } = this.props;
    if (!this.markerInfo) {
      setAddInfoStep('greeting');
      return;
    }

    const { marker, circle } = this.markerInfo;
    if (!marker || !circle) {
      setAddInfoStep('greeting');
      return;
    }

    const position = marker.getPosition();
    if (!position) {
      setAddInfoStep('greeting');
      return;
    }

    this.setInfoValues({
      loc: {
        lat: position.lat(),
        lng: position.lng(),
        serviceRadius: circle.getRadius(),
      },
    });
  };

  private handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { target } = event;

    switch (target.name) {
      case FORM_INPUT_NAMES.type:
        if (isMarkerType(target.value)) {
          this.setInfoValues({ type: { type: target.value } });
        } else {
          this.setInfo(info => {
            // eslint-disable-next-line no-param-reassign
            info.type = undefined;
          });
        }
        break;
      case FORM_INPUT_NAMES.name:
        this.setInfoValues({ contentTitle: target.value });
        break;
      case FORM_INPUT_NAMES.locationName:
        this.setInfoValues({ loc: { description: target.value } });
        break;
      case FORM_INPUT_NAMES.description:
        this.setInfoValues({ contentBody: target.value });
        break;
      default:
        throw new Error('Unexpected input element');
    }
  };

  private handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { target } = event;
    const { service } = target.dataset;
    const { checked } = target;
    if (isService(service)) {
      this.setInfo(info => {
        if (info.type?.type === 'org') {
          if (!info.type.services) {
            // eslint-disable-next-line no-param-reassign
            info.type.services = [];
          }
          if (checked && !info.type.services.includes(service)) {
            info.type.services.push(service);
          } else if (!checked) {
            // eslint-disable-next-line no-param-reassign
            info.type.services = info.type.services.filter(s => s !== service);
          }
        }
      });
    }
  };

  private completeInformation = (lang: Language) => {
    const { setAddInfoStep } = this.props;
    const { info } = this.state;
    const validation: Validation = {
      errors: [],
      invalidInputs: [],
    };
    if (!info.type) {
      validation.errors.push(
        t(
          lang,
          s => s.addInformation.screen.information.form.errors.missingType,
        ),
      );
      validation.invalidInputs.push(FORM_INPUT_NAMES.type);
    } else if (
      info.type.type === 'org' &&
      (info.type.services || []).length === 0
    ) {
      validation.errors.push(
        t(
          lang,
          s => s.addInformation.screen.information.form.errors.missingServices,
        ),
      );
      validation.invalidInputs.push(FORM_INPUT_NAMES.services);
    }
    if (!info.contentTitle) {
      validation.errors.push(
        t(
          lang,
          s => s.addInformation.screen.information.form.errors.missingTitle,
        ),
      );
      validation.invalidInputs.push(FORM_INPUT_NAMES.name);
    }
    if (!info.loc?.description) {
      validation.errors.push(
        t(
          lang,
          s =>
            s.addInformation.screen.information.form.errors.missingLocationName,
        ),
      );
      validation.invalidInputs.push(FORM_INPUT_NAMES.locationName);
    }
    if (validation.errors.length > 0) {
      this.setState({ validation });
    } else {
      setAddInfoStep('place-marker');
      this.setState({ validation: undefined });
    }
  };

  private validatedInput = (
    input: FORM_INPUT_NAMES,
    element: (valid: boolean) => JSX.Element | undefined,
  ) => {
    const { validation } = this.state;
    const valid = !(validation?.invalidInputs || []).includes(input);
    return element(valid);
  };

  private formTextInput = (
    input: FORM_INPUT_NAMES,
    label: string,
    placeholder?: string,
  ) =>
    this.validatedInput(input, valid => (
      <>
        <label className={valid ? '' : 'error'} htmlFor={input}>
          {label}
        </label>
        <input
          className={valid ? '' : 'error'}
          type="text"
          id={input}
          name={input}
          placeholder={placeholder}
          onChange={this.handleInputChange}
        />
      </>
    ));

  public render() {
    const { className, addInfoStep } = this.props;
    const { info, validation } = this.state;
    const fillLayout = addInfoStep === 'information';
    return (
      <AppContext.Consumer>
        {({ lang }) => (
          <div className={className}>
            {fillLayout && (
              <div className="screen">
                {addInfoStep === 'information' && (
                  <>
                    <h2>{t(lang, s => s.addInformation.screen.title)}</h2>
                    <p className="muted">
                      {t(
                        lang,
                        s =>
                          s.addInformation.screen.information
                            .acceptedInformation,
                      )}
                    </p>
                    <p>
                      {t(lang, s => s.addInformation.screen.information.intro)}
                    </p>

                    {this.validatedInput(FORM_INPUT_NAMES.type, valid => (
                      <>
                        <label
                          className={valid ? '' : 'error'}
                          htmlFor={FORM_INPUT_NAMES.type}
                        >
                          {t(
                            lang,
                            s => s.addInformation.screen.information.form.type,
                          )}
                        </label>
                        <select
                          className={valid ? '' : 'error'}
                          id={FORM_INPUT_NAMES.type}
                          name={FORM_INPUT_NAMES.type}
                          value={info?.type?.type || ''}
                          onChange={this.handleInputChange}
                        >
                          <option value="">
                            {t(
                              lang,
                              s =>
                                s.addInformation.screen.information.form
                                  .typePleaseSelect,
                            )}
                          </option>
                          {MARKER_TYPE_STRINGS.map(type => (
                            <option key={type} value={type}>
                              {t(lang, s => s.markerTypes[type])}
                            </option>
                          ))}
                        </select>
                      </>
                    ))}

                    {this.validatedInput(FORM_INPUT_NAMES.services, valid => {
                      if (info.type?.type !== 'org') {
                        return;
                      }
                      const services: (Service | undefined)[] =
                        info.type.services || [];
                      return (
                        <>
                          <span className={`label ${valid ? '' : 'error'}`}>
                            {t(
                              lang,
                              s =>
                                s.addInformation.screen.information.form
                                  .services,
                            )}
                          </span>
                          <div className="checkbox-group">
                            {SERVICE_STRINGS.map(service => {
                              const description = t(
                                lang,
                                s => s.serviceDescriptions[service],
                              );
                              return (
                                <div key={service} className="option">
                                  <input
                                    type="checkbox"
                                    name={`service-${service}`}
                                    id={`service-${service}`}
                                    checked={services.includes(service)}
                                    onChange={this.handleCheckboxChange}
                                    data-service={service}
                                  />
                                  <label htmlFor={`service-${service}`}>
                                    {t(lang, s => s.services[service])}
                                    {description && (
                                      <span>
                                        &nbsp;-&nbsp;
                                        {description}
                                      </span>
                                    )}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      );
                    })}

                    {this.formTextInput(
                      FORM_INPUT_NAMES.name,
                      t(
                        lang,
                        s => s.addInformation.screen.information.form.name,
                      ),
                      t(
                        lang,
                        s =>
                          s.addInformation.screen.information.form
                            .namePlaceholder,
                      ),
                    )}

                    {this.formTextInput(
                      FORM_INPUT_NAMES.description,
                      t(
                        lang,
                        s =>
                          s.addInformation.screen.information.form.description,
                      ),
                      t(
                        lang,
                        s =>
                          s.addInformation.screen.information.form
                            .namePlaceholder,
                      ),
                    )}

                    {this.formTextInput(
                      FORM_INPUT_NAMES.locationName,
                      t(
                        lang,
                        s =>
                          s.addInformation.screen.information.form.locationName,
                      ),
                      t(
                        lang,
                        s =>
                          s.addInformation.screen.information.form
                            .locationNamePlaceholder,
                      ),
                    )}

                    <p>
                      {t(
                        lang,
                        s => s.addInformation.screen.information.form.continue,
                      )}
                    </p>

                    {validation && (
                      <ul className="errors">
                        {validation.errors.map((error, i) => (
                          <li key={i}>{error}</li>
                        ))}
                      </ul>
                    )}

                    <div className="actions">
                      <button
                        type="button"
                        className="next-button"
                        onClick={() => this.completeInformation(lang)}
                      >
                        {t(lang, s => s.addInformation.continue)}
                        <MdChevronRight />
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default styled(AddInstructions)`
  z-index: 1000;
  font-size: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  pointer-events: none;

  > .screen {
    pointer-events: initial;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    overflow-y: auto;
    padding: ${p => p.theme.spacingPx}px;

    > h2 {
      margin-top: 0;
    }

    label,
    .label {
      display: block;
      margin-top: ${p => p.theme.spacingPx}px;
      font-weight: bold;

      &.error {
        color: ${p => p.theme.colors.red};
      }
    }

    input[type='text'] {
      display: block;
      width: 600px;
      max-width: 100%;
    }

    input[type='text'],
    select {
      padding: 7px 5px;
      font-size: 1rem;
      margin-top: ${p => p.theme.spacingPx}px;
      border: 1px solid ${p => p.theme.colors.purpleLight};
      border-radius: 3px;
      outline: none;
      color: ${p => p.theme.textColor};
      background: #fff;

      &:focus {
        border-color: ${p => p.theme.colors.purple};
      }

      &::placeholder {
        color: ${p => p.theme.textColorLight};
      }

      &.error {
        border: 2px solid ${p => p.theme.colors.red};
      }
    }

    .checkbox-group {
      margin-top: ${p => p.theme.spacingPx}px;

      > .option {
        margin-top: ${p => p.theme.spacingPx / 2}px;
        input {
          cursor: pointer;
          display: inline;
        }

        label {
          cursor: pointer;
          display: inline;
          margin-left: ${p => p.theme.spacingPx}px;

          span {
            font-weight: normal;
          }
        }
      }
    }

    .errors {
      color: ${p => p.theme.colors.red};
    }

    .actions {
      margin-top: ${p => p.theme.spacingPx}px;
      display: flex;

      > .next-button {
        ${buttonPrimary}
        ${iconButton}
      }

      > .prev-button {
        ${button}
        ${iconButton}
      }
    }
  }

  /* TODO: clean up styling below this point */
  > .box {
    z-index: 1100;
    margin: ${p => p.theme.spacingPx}px;
    margin-top: ${p => p.theme.spacingPx * 5}px;
    width: 100%;
    max-width: 470px;
    max-height: 350px;
    background: #fff;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.5) 0 1px 6px -1px;
    background: #fff;
    padding: ${p => p.theme.spacingPx}px;
    overflow-y: auto;
    pointer-events: auto;

    .top {
      display: flex;
      align-items: start;

      h2 {
        margin: 0;
        padding: 0;
        flex-grow: 1;
        flex-basis: 0;
      }

      button {
        padding: 0;
        margin: 0;
        border: 0;
        background: 0;
        cursor: pointer;
        color: ${p => p.theme.textColor};

        &:hover {
          color: ${p => p.theme.textColorLight};
        }
      }
    }

    form {
      border-top: 3px solid ${p => p.theme.textColor};
      padding-top: 10px;

      label {
        margin-bottom: 15px;
      }

      input {
        display: block;
        width: 100%;
        height: 1.2rem;
        padding: 7px 0;
        font-size: 1rem;
        margin-bottom: ${p => p.theme.spacingPx}px;
        border: none;
        border-bottom: 1px solid ${p => p.theme.textColor};
        outline: none;
      }

      .services {
        padding: 0;

        li {
          list-style: none;

          input {
            display: inline-block;
            width: auto;
          }
        }
      }
    }
  }
`;
