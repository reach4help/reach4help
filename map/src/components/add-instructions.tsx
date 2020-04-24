import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Search from 'src/components/search';
import { MarkerInfo } from 'src/data/markers';
import { format, Language, t } from 'src/i18n';
import { Strings } from 'src/i18n/iface';
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
  | 'contact-details'
  | 'done';

enum FORM_INPUT_NAMES {
  type = 'type',
  services = 'services',
  name = 'name',
  description = 'description',
  locationName = 'locationName',
}

interface Validation {
  errors: (keyof Strings['addInformation']['errors'])[];
  invalidInputs: FORM_INPUT_NAMES[];
}

interface MarkerInputInfo {
  circle: google.maps.Circle;
  radiusInfoWindow: google.maps.InfoWindow;
  updateRadiusFromCircle: () => void;
}

interface Props {
  className?: string;
  lang: Language;
  map: google.maps.Map | null;
  addInfoStep: AddInfoStep;
  setAddInfoStep: (addInfoStep: AddInfoStep | null) => void;
  updateSearchInput: (input: HTMLInputElement | null) => void;
  setAddInfoMapClickedListener: (
    listener: ((evt: google.maps.MouseEvent) => void) | null,
  ) => void;
}

interface State {
  info: RecursivePartial<MarkerInfo>;
  validation?: Validation;
}

const displayKm = (lang: Language, meters: number): string =>
  format(lang, s => s.addInformation.screen.placeMarker.distance, {
    kilometers: (meters / 1000).toFixed(2),
    miles: ((meters / 1000) * 0.621371).toFixed(2),
  });

class AddInstructions extends React.Component<Props, State> {
  private markerInfo: MarkerInputInfo | null = null;

  private readonly mapsListeners = new Set<google.maps.MapsEventListener>();

  constructor(props: Props) {
    super(props);

    this.state = {
      info: {},
    };
  }

  public componentDidMount() {
    const { map, setAddInfoMapClickedListener } = this.props;
    if (map) {
      this.initializeMap(map);
    }
    setAddInfoMapClickedListener(this.mapClicked);
  }

  public componentDidUpdate(prevProps: Props) {
    const { map, lang } = this.props;
    // If the map updated, add required listeners
    if (prevProps.map !== map) {
      this.markerInfo = null;
      if (prevProps.map) {
        this.uninitializeMap(prevProps.map);
      }
      if (map) {
        this.initializeMap(map);
      }
    }
    // If the language has updated, change the radius info window (if applicaable)
    if (prevProps.lang !== lang && this.markerInfo) {
      this.markerInfo.updateRadiusFromCircle();
    }
  }

  public componentWillUnmount() {
    const { map, setAddInfoMapClickedListener } = this.props;
    if (this.markerInfo) {
      this.markerInfo.circle.setMap(null);
      this.markerInfo.radiusInfoWindow.close();
      this.markerInfo = null;
    }
    if (map) {
      this.uninitializeMap(map);
    }
    setAddInfoMapClickedListener(null);
  }

  private initializeMap = (map: google.maps.Map) => {
    this.mapsListeners.add(map.addListener('click', this.mapClicked));
    map.setOptions({
      draggableCursor: 'pointer',
    });
  };

  private uninitializeMap = (map: google.maps.Map) => {
    this.markerInfo = null;
    this.mapsListeners.forEach(l => l.remove());
    this.mapsListeners.clear();
    map.setOptions({
      draggableCursor: undefined,
    });
  };

  private mapClicked = (evt: google.maps.MouseEvent) => {
    const { map, addInfoStep } = this.props;
    if (!map) {
      return;
    }
    const updateLoc = (loc: google.maps.LatLng) =>
      this.setInfoValues({ loc: { lat: loc.lat(), lng: loc.lng() } });
    if (addInfoStep === 'place-marker') {
      if (!this.markerInfo) {
        const radius = Math.floor(3000000 / (map.getZoom() * map.getZoom()));
        const circle = new google.maps.Circle({
          map,
          center: evt.latLng,
          editable: true,
          radius,
        });
        const { lang } = this.props;
        const radiusInfoWindow = new google.maps.InfoWindow({
          content: displayKm(lang, radius),
          position: circle.getCenter(),
        });

        const updateRadiusFromCircle = () => {
          const { lang: updatedLang } = this.props;
          const serviceRadius = circle.getRadius();
          this.setInfoValues({ loc: { serviceRadius } });
          radiusInfoWindow.setContent(displayKm(updatedLang, serviceRadius));
          radiusInfoWindow.open(map);
        };
        updateRadiusFromCircle();

        circle.addListener('center_changed', () => {
          updateLoc(circle.getCenter());
          radiusInfoWindow.setPosition(circle.getCenter());
        });
        circle.addListener('radius_changed', updateRadiusFromCircle);
        circle.addListener('click', this.mapClicked);

        this.markerInfo = { circle, radiusInfoWindow, updateRadiusFromCircle };
      } else {
        this.markerInfo.circle.setCenter(evt.latLng);
      }
      updateLoc(evt.latLng);
    }
  };

  private setInfoValues = (newInfo: RecursivePartial<MarkerInfo>) => {
    this.setState(({ info }) => ({ info: merge({}, info, newInfo) }));
  };

  private setInfo = (mutate: (info: RecursivePartial<MarkerInfo>) => void) => {
    this.setState(({ info }) => {
      // eslint-disable-next-line no-param-reassign
      info = cloneDeep(info);
      mutate(info);
      return { info };
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

  private completeInformation = () => {
    const { setAddInfoStep } = this.props;
    const { info } = this.state;
    const validation: Validation = {
      errors: [],
      invalidInputs: [],
    };
    if (!info.type) {
      validation.errors.push('missingType');
      validation.invalidInputs.push(FORM_INPUT_NAMES.type);
    } else if (
      info.type.type === 'org' &&
      (info.type.services || []).length === 0
    ) {
      validation.errors.push('missingServices');
      validation.invalidInputs.push(FORM_INPUT_NAMES.services);
    }
    if (!info.contentTitle) {
      validation.errors.push('missingTitle');
      validation.invalidInputs.push(FORM_INPUT_NAMES.name);
    }
    if (!info.loc?.description) {
      validation.errors.push('missingLocationName');
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
    value: string,
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
          value={value}
        />
      </>
    ));

  public render() {
    const {
      className,
      addInfoStep,
      setAddInfoStep,
      updateSearchInput,
    } = this.props;
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
                      info.contentTitle || '',
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
                      info.contentBody || '',
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
                      info.loc?.description || '',
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
                          <li key={i}>
                            {t(lang, s => s.addInformation.errors[error])}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="actions">
                      <button
                        type="button"
                        className="next-button"
                        onClick={this.completeInformation}
                      >
                        {t(lang, s => s.addInformation.continue)}
                        <MdChevronRight className="icon icon-end" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
            {addInfoStep === 'place-marker' && (
              <div className="place-marker">
                <div className="box">
                  <p>
                    {t(
                      lang,
                      s => s.addInformation.screen.placeMarker.instructions,
                    )}
                  </p>
                  <p>
                    {t(lang, s => s.addInformation.screen.placeMarker.continue)}
                  </p>
                  <div className="actions">
                    <button
                      type="button"
                      className="prev-button"
                      onClick={() => setAddInfoStep('information')}
                    >
                      <MdChevronLeft className="icon icon-start" />
                      {t(lang, s => s.addInformation.prev)}
                    </button>
                    <div className="grow" />
                    <button
                      type="button"
                      className="next-button"
                      onClick={this.completeInformation}
                    >
                      {t(lang, s => s.addInformation.continue)}
                      <MdChevronRight className="icon icon-end" />
                    </button>
                  </div>
                </div>
                <Search
                  className="search"
                  updateSearchInput={updateSearchInput}
                />
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
  }

  > .place-marker {
    width: 100%;

    > .box {
      padding: ${p => p.theme.spacingPx}px;
      background: rgba(255, 255, 255, 0.9);
      border-bottom: 1px solid ${p => p.theme.colors.grayLight2};

      p:first-child {
        margin-top: 0;
      }
      pointer-events: initial;
    }

    > .search {
      margin: ${p => p.theme.spacingPx}px;
      max-width: 500px;
      pointer-events: initial;
    }
  }

  .actions {
    margin-top: ${p => p.theme.spacingPx}px;
    display: flex;

    > .next-button {
      ${buttonPrimary}
      ${iconButton}
    }

    > .grow {
      flex-grow: 1;
    }

    > .prev-button {
      ${button}
      ${iconButton}
    }

    [dir='rtl'] & button svg {
      transform: rotate(180deg);
    }
  }
`;
