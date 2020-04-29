import firebase from 'firebase/app';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import React from 'react';
import {
  MdAdd,
  MdChevronLeft,
  MdChevronRight,
  MdDelete,
  MdExplore,
  MdRefresh,
} from 'react-icons/md';
import Search from 'src/components/search';
import { submitInformation } from 'src/data/firebase';
import {
  ContactDetails,
  ContactGroup,
  Location,
  MarkerInfo,
} from 'src/data/markers';
import { format, Language, t } from 'src/i18n';
import { AddInfoStep, Page } from 'src/state';
import { isDefined, RecursivePartial } from 'src/util';

import {
  isMarkerType,
  isService,
  MARKER_TYPE_STRINGS,
  MarkerType,
  Service,
  SERVICE_STRINGS,
} from '../data';
import styled, { LARGE_DEVICES, Z_INDICES } from '../styling';
import {
  button,
  buttonPrimary,
  iconButton,
  iconButtonSmall,
} from '../styling/mixins';
import { AppContext } from './context';
import { haversineDistance } from './map-utils/google-maps';

enum FORM_INPUT_NAMES {
  type = 'type',
  services = 'services',
  name = 'name',
  description = 'description',
  locationName = 'locationName',
}

interface Validation {
  errors: ((lang: Language) => string | JSX.Element[])[];
  invalidInputs: (FORM_INPUT_NAMES | string)[];
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
  setPage: (page: Page) => void;
  updateSearchInput: (input: HTMLInputElement | null) => void;
  setAddInfoMapClickedListener: (
    listener: ((evt: google.maps.MouseEvent) => void) | null,
  ) => void;
}

interface State {
  info: RecursivePartial<MarkerInfo>;
  /**
   * Store URLs in state separately as it's easier to manipulate as an array
   */
  urls: {
    [key in ContactType]: Array<{
      label: string;
      url: string;
    }>;
  };
  validation?: Validation;
  submissionResult?:
    | { state: 'success' }
    | { state: 'error'; error: (lang: Language) => string | JSX.Element[] };
}

const INITIAL_STATE: State = {
  info: {},
  urls: {
    general: [],
    getHelp: [],
    volunteers: [],
  },
  submissionResult: undefined,
  validation: undefined,
};

const isCompleteMarkerType = (
  type: RecursivePartial<MarkerType> | undefined,
): type is MarkerType => {
  if (!type) {
    return false;
  }
  if (type.type === 'org') {
    return !!type.services;
  }
  return !!type.type;
};

const isCompleteMarkerLocation = (
  loc: RecursivePartial<Location> | undefined,
): loc is Location =>
  !!loc &&
  loc.description !== undefined &&
  loc.latlng?.latitude !== undefined &&
  loc.latlng.longitude !== undefined &&
  loc.serviceRadius !== undefined;

const displayKm = (lang: Language, meters: number): string =>
  format(lang, s => s.addInformation.screen.placeMarker.distance, {
    kilometers: (meters / 1000).toFixed(2),
    miles: ((meters / 1000) * 0.621371).toFixed(2),
  });

type ContactType = keyof MarkerInfo['contact'];
const CONTACT_TYPES: ContactType[] = ['general', 'getHelp', 'volunteers'];
type ContactMethod = keyof (MarkerInfo['contact'][ContactType] & {});
const CONTACT_METHODS: ContactMethod[] = [
  'email',
  'facebookGroup',
  'phone',
  'web',
];

const isContactType = (type: string | undefined): type is ContactType =>
  (type && CONTACT_TYPES.includes(type as ContactType)) || false;

const isContactMethod = (type: string | undefined): type is ContactMethod =>
  (type && CONTACT_METHODS.includes(type as ContactMethod)) || false;

const contactInputId = (
  type: ContactType,
  method: ContactMethod,
  index: number,
) => `${type}-${method}-${index}`;

const contactWebInputId = (
  type: ContactType,
  index: number,
  part: 'url' | 'label',
) => `${contactInputId(type, 'web', index)}-${part}`;

const contactInputIdData = (
  type: ContactType,
  method: ContactMethod,
  index: number,
) => ({
  'data-type': type,
  'data-method': method,
  'data-index': index,
});

const extractContactInputIdData = (target: HTMLElement) => {
  const { type, method, index } = target.dataset;
  const i = parseInt(index || '', 10);
  if (!isContactType(type) || !isContactMethod(method) || Number.isNaN(i)) {
    return;
  }
  return { type, method, i };
};

type ContactInputIdData = ReturnType<typeof extractContactInputIdData>;

class AddInstructions extends React.Component<Props, State> {
  private markerInfo: MarkerInputInfo | null = null;

  private readonly mapsListeners = new Set<google.maps.MapsEventListener>();

  constructor(props: Props) {
    super(props);

    this.state = INITIAL_STATE;
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
    if (map) {
      this.removeMarkers();
      this.uninitializeMap(map);
    }
    setAddInfoMapClickedListener(null);
  }

  private setAddInfoStep = (step: AddInfoStep) => {
    const { setPage } = this.props;
    setPage({ page: 'add-information', step });
  };

  private removeMarkers = () => {
    if (this.markerInfo) {
      this.markerInfo.circle.setMap(null);
      this.markerInfo.radiusInfoWindow.close();
      this.markerInfo = null;
    }
  };

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
      this.setInfoValues({
        loc: { latlng: new firebase.firestore.GeoPoint(loc.lat(), loc.lng()) },
      });
    if (addInfoStep === 'place-marker') {
      if (!this.markerInfo) {
        const bounds = map.getBounds();
        const radius = bounds
          ? haversineDistance(bounds.getNorthEast(), bounds.getCenter()) / 2
          : 3000;
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

  private completeInformation = (event: React.FormEvent<unknown>) => {
    event.preventDefault();
    const { info } = this.state;
    const validation: Validation = {
      errors: [],
      invalidInputs: [],
    };
    if (!info.type) {
      validation.errors.push(lang =>
        t(lang, s => s.addInformation.errors.missingType),
      );
      validation.invalidInputs.push(FORM_INPUT_NAMES.type);
    } else if (
      info.type.type === 'org' &&
      (info.type.services || []).length === 0
    ) {
      validation.errors.push(lang =>
        t(lang, s => s.addInformation.errors.missingServices),
      );
      validation.invalidInputs.push(FORM_INPUT_NAMES.services);
    }
    if (!info.contentTitle) {
      validation.errors.push(lang =>
        t(lang, s => s.addInformation.errors.missingTitle),
      );
      validation.invalidInputs.push(FORM_INPUT_NAMES.name);
    }
    if (!info.loc?.description) {
      validation.errors.push(lang =>
        t(lang, s => s.addInformation.errors.missingLocationName),
      );
      validation.invalidInputs.push(FORM_INPUT_NAMES.locationName);
    }
    if (validation.errors.length > 0) {
      this.setState({ validation });
    } else {
      this.setAddInfoStep('place-marker');
      this.setState({ validation: undefined });
    }
  };

  private completeMarkerPlacement = () => {
    const { info } = this.state;
    const validation: Validation = {
      errors: [],
      invalidInputs: [],
    };
    if (
      !info.loc?.latlng?.latitude ||
      !info.loc.latlng.longitude ||
      !info.loc.serviceRadius
    ) {
      validation.errors.push(lang =>
        t(lang, s => s.addInformation.errors.markerRequired),
      );
    }
    if (validation.errors.length > 0) {
      this.setState({ validation });
    } else {
      this.setAddInfoStep('contact-details');
      this.setState({ validation: undefined });
    }
  };

  private getCompleteInformation = (): MarkerInfo | null => {
    const { info, urls } = this.state;
    if (
      !info.contentTitle ||
      !isCompleteMarkerType(info.type) ||
      !isCompleteMarkerLocation(info.loc) ||
      !info.contact
    ) {
      return null;
    }
    const contact: ContactGroup = {};
    for (const type of CONTACT_TYPES) {
      const completeTypeInfo: ContactDetails = {};
      const typeInfo = info.contact[type];
      if (typeInfo) {
        if (typeInfo.email) {
          completeTypeInfo.email = typeInfo.email.filter(isDefined);
        }
        if (typeInfo.phone) {
          completeTypeInfo.phone = typeInfo.phone.filter(isDefined);
        }
      }
      const typeUrls = urls[type];
      if (typeUrls.length > 0) {
        completeTypeInfo.web = {};
        for (const { label, url } of typeUrls) {
          completeTypeInfo.web[label] = url;
        }
      }
      if (Object.keys(completeTypeInfo).length > 0) {
        contact[type] = completeTypeInfo;
      }
    }
    const completeInfo: MarkerInfo = {
      contentTitle: info.contentTitle,
      type: info.type,
      loc: info.loc,
      contact,
      visible: false,
    };
    if (info.contentBody) {
      completeInfo.contentBody = info.contentBody;
    }
    return completeInfo;
  };

  private completeContactInformation = (event: React.FormEvent<unknown>) => {
    event.preventDefault();
    // If we are currently focussed on an input, finalize it (in case it is empty)
    if (document.activeElement instanceof HTMLInputElement) {
      const inputId = extractContactInputIdData(document.activeElement);
      if (inputId) {
        this.finalizeContactInput(inputId, document.activeElement);
      }
    }
    // Give time for state changes to apply after input blur
    this.setState({}, () => {
      const { info, urls } = this.state;
      const validation: Validation = {
        errors: [],
        invalidInputs: [],
      };
      if (Object.keys(info.contact || {}).length === 0) {
        validation.errors.push(lang =>
          t(lang, s => s.addInformation.errors.noContactDetails),
        );
      } else {
        for (const type of CONTACT_TYPES) {
          const typeInfo = info.contact?.[type];
          const typeUrls = urls[type] || [];
          const sectionLabel = (key: number, lang: Language) => (
            <strong key={key}>
              {t(lang, s => s.addInformation.screen.contactInfo.sections[type])}
            </strong>
          );
          if (typeInfo) {
            if (Object.keys(typeInfo).length === 0 && typeUrls.length === 0) {
              validation.errors.push(lang =>
                t(lang, s => s.addInformation.errors.emptyContactSection, {
                  section: key => sectionLabel(key, lang),
                }),
              );
              validation.invalidInputs.push(type);
            } else {
              // Check URLs:
              typeUrls.forEach(({ label, url }, index) => {
                if (label === '') {
                  validation.errors.push(lang =>
                    t(lang, s => s.addInformation.errors.urlMissingLabel, {
                      section: key => sectionLabel(key, lang),
                    }),
                  );
                  validation.invalidInputs.push(
                    contactWebInputId(type, index, 'label'),
                  );
                } else if (url === '') {
                  validation.errors.push(lang =>
                    t(lang, s => s.addInformation.errors.urlMissingURL, {
                      section: key => sectionLabel(key, lang),
                    }),
                  );
                  validation.invalidInputs.push(
                    contactWebInputId(type, index, 'url'),
                  );
                }
              });
            }
          }
        }
      }
      if (validation.errors.length > 0) {
        this.setState({ validation });
      } else {
        this.setAddInfoStep('submitted');
        this.setState({ validation: undefined, submissionResult: undefined });
        const completeInfo = this.getCompleteInformation();
        if (!completeInfo) {
          this.setState({
            submissionResult: {
              state: 'error',
              error: lang => t(lang, s => s.addInformation.errors.dataError),
            },
          });
        } else {
          submitInformation(completeInfo).then(
            () => this.setState({ submissionResult: { state: 'success' } }),
            error =>
              this.setState({
                submissionResult: {
                  state: 'error',
                  error: lang =>
                    t(lang, s => s.addInformation.errors.submitError, {
                      error: key => <span key={key}>{String(error)}</span>,
                    }),
                },
              }),
          );
        }
      }
    });
  };

  private addMore = () => {
    this.setState(INITIAL_STATE);
    this.setAddInfoStep('information');
    this.removeMarkers();
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

  private actionButtons = (opts: {
    previousScreen?: AddInfoStep;
    nextScreen?: () => void;
    nextLabel?: 'continue' | 'submit' | 'addMore';
  }) => {
    const { lang } = this.props;
    const { previousScreen, nextScreen, nextLabel = 'continue' } = opts;
    return (
      <div className="actions">
        {previousScreen && (
          <>
            <button
              type="button"
              className="prev-button"
              onClick={() => this.setAddInfoStep(previousScreen)}
            >
              <MdChevronLeft className="icon icon-start" />
              {t(lang, s => s.addInformation.prev)}
            </button>
            <div className="grow" />
          </>
        )}
        <button type="submit" className="next-button" onClick={nextScreen}>
          {t(lang, s => s.addInformation[nextLabel])}
          <MdChevronRight className="icon icon-end" />
        </button>
      </div>
    );
  };

  private contactInputChanged = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { target } = event;
    const idData = extractContactInputIdData(target);
    if (!idData) {
      return;
    }
    const { type, method, i } = idData;
    if (method === 'phone' || method === 'email') {
      this.setInfo(info => {
        const arr = info.contact?.[type]?.[method] || [];
        arr[i] = target.value;
        const newInfo: RecursivePartial<MarkerInfo> = {
          contact: { [type]: { [method]: arr } },
        };
        merge(info, newInfo);
      });
    } else if (method === 'web') {
      const { part } = target.dataset;
      if (part === 'url' || part === 'label') {
        this.setState(state => {
          const urls = cloneDeep(state.urls);
          let entry = urls[type][i];
          if (!entry) {
            urls[type][i] = entry = { label: '', url: '' };
          }
          entry[part] = target.value;
          return { urls };
        });
      }
    }
  };

  private contactInputBlurred = (event: React.FocusEvent<HTMLInputElement>) => {
    const { target } = event;
    const idData = extractContactInputIdData(target);
    this.finalizeContactInput(idData, target);
  };

  private finalizeContactInput = (
    idData: ContactInputIdData,
    target: HTMLInputElement,
  ) => {
    if (idData && target.value === '') {
      const { type, method, i } = idData;
      if (method === 'phone' || method === 'email') {
        this.setInfo(info => {
          if (info.contact?.[type]) {
            const arr: string[] | undefined = (
              info.contact?.[type]?.[method] || []
            ).filter(isDefined);
            arr.splice(i, 1);
            // Remove array completely if empty
            if (arr.length === 0) {
              // eslint-disable-next-line no-param-reassign
              delete (info.contact[type] as ContactDetails)[method];
            } else {
              // eslint-disable-next-line no-param-reassign
              (info.contact[type] as ContactDetails)[method] = arr;
            }
          }
        });
      } else if (method === 'web') {
        const { part } = target.dataset;
        if (part === 'url' || part === 'label') {
          this.setState(state => {
            const urls = cloneDeep(state.urls);
            const entry = urls[type][i];
            if (entry && entry.label === '' && entry.url === '') {
              urls[type].splice(i, 1);
            }
            return { urls };
          });
        }
      }
    }
  };

  private contactMethodGroup = (
    type: ContactType,
    method: 'phone' | 'email',
  ) => {
    const { lang } = this.props;
    const { info } = this.state;
    const methodInfo = info.contact?.[type]?.[method]?.filter(isDefined) || [];
    const fields = [...methodInfo, ''];
    const lastId = contactInputId(type, method, fields.length - 1);
    return (
      <div className="contact-method-group">
        <label htmlFor={lastId}>
          {t(lang, s => s.addInformation.screen.contactInfo.method[method])}
        </label>
        <div className="inputs">
          {fields.map((value, i) => (
            <input
              key={i}
              type={method === 'phone' ? 'tel' : 'email'}
              id={contactInputId(type, method, i)}
              value={value}
              placeholder={t(
                lang,
                s => s.addInformation.screen.contactInfo.placeholder[method],
              )}
              onChange={this.contactInputChanged}
              onBlur={this.contactInputBlurred}
              {...contactInputIdData(type, method, i)}
            />
          ))}
        </div>
      </div>
    );
  };

  private contactUrlGroup = (type: ContactType) => {
    const { lang } = this.props;
    const { urls, validation } = this.state;
    const fields = [...urls[type], { label: '', url: '' }];
    const lastId = `${contactWebInputId(type, fields.length - 1, 'url')}`;
    const errors = validation?.invalidInputs || [];
    return (
      <div className="contact-method-group">
        <label htmlFor={lastId}>
          {t(lang, s => s.addInformation.screen.contactInfo.method.web)}
        </label>
        <div className="inputs">
          {fields.map(({ label, url }, i) => (
            <div key={i} className="url">
              <input
                type="text"
                id={`${contactWebInputId(type, i, 'label')}`}
                className={
                  errors.includes(contactWebInputId(type, i, 'label'))
                    ? 'error'
                    : ''
                }
                value={label}
                placeholder={t(
                  lang,
                  s => s.addInformation.screen.contactInfo.placeholder.webLabel,
                )}
                onChange={this.contactInputChanged}
                onBlur={this.contactInputBlurred}
                {...contactInputIdData(type, 'web', i)}
                data-part="label"
              />
              <input
                type="text"
                id={contactWebInputId(type, i, 'url')}
                className={
                  errors.includes(contactWebInputId(type, i, 'url'))
                    ? 'error'
                    : ''
                }
                value={url}
                placeholder={t(
                  lang,
                  s => s.addInformation.screen.contactInfo.placeholder.webURL,
                )}
                onChange={this.contactInputChanged}
                onBlur={this.contactInputBlurred}
                {...contactInputIdData(type, 'web', i)}
                data-part="url"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  private contactTypeGroup = (type: ContactType) => {
    const { lang } = this.props;
    const { info, validation } = this.state;
    const error = (validation?.invalidInputs || []).includes(type);
    return (
      <div key={type} className="contact-type-group">
        {info.contact?.[type] ? (
          <div>
            <div
              className={`contact-type-group-header ${error ? 'error' : ''}`}
            >
              <strong>
                {t(
                  lang,
                  s => s.addInformation.screen.contactInfo.sections[type],
                )}
              </strong>
              <button
                type="button"
                onClick={() =>
                  this.setInfo(i => {
                    if (i.contact) {
                      // eslint-disable-next-line no-param-reassign
                      i.contact[type] = undefined;
                    }
                  })
                }
              >
                <MdDelete className="icon icon-start" />
                {t(lang, s => s.addInformation.screen.contactInfo.deleteInfo)}
              </button>
            </div>
            {this.contactMethodGroup(type, 'phone')}
            {this.contactMethodGroup(type, 'email')}
            {this.contactUrlGroup(type)}
          </div>
        ) : (
          <button
            type="button"
            className="contact-button"
            onClick={() => this.setInfoValues({ contact: { [type]: {} } })}
          >
            <MdAdd className="icon icon-start" />
            {t(lang, s => s.addInformation.screen.contactInfo.addInfo[type])}
          </button>
        )}
      </div>
    );
  };

  public render = () => {
    const { className, addInfoStep, updateSearchInput, setPage } = this.props;
    const { info, validation, submissionResult } = this.state;
    return (
      <AppContext.Consumer>
        {({ lang }) => (
          <div className={className}>
            {addInfoStep === 'information' && (
              <div className="screen">
                <h2>{t(lang, s => s.addInformation.screen.title)}</h2>
                <p className="muted">
                  {t(
                    lang,
                    s =>
                      s.addInformation.screen.information.acceptedInformation,
                  )}
                </p>
                <p>{t(lang, s => s.addInformation.screen.information.intro)}</p>
                <form onSubmit={this.completeInformation}>
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
                              s.addInformation.screen.information.form.services,
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
                    t(lang, s => s.addInformation.screen.information.form.name),
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
                      s => s.addInformation.screen.information.form.description,
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
                        <li key={i}>{error(lang)}</li>
                      ))}
                    </ul>
                  )}

                  {this.actionButtons({})}
                </form>
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
                  {validation &&
                    validation.errors.map((error, i) => (
                      <p key={i} className="error">
                        {error(lang)}
                      </p>
                    ))}

                  {this.actionButtons({
                    previousScreen: 'information',
                    nextScreen: this.completeMarkerPlacement,
                  })}
                </div>
                <Search
                  className="search"
                  updateSearchInput={updateSearchInput}
                />
              </div>
            )}
            {addInfoStep === 'contact-details' && (
              <div className="screen">
                <h2>
                  {t(lang, s => s.addInformation.screen.contactInfo.header, {
                    name: key => <span key={key}>{info.contentTitle}</span>,
                  })}
                </h2>
                <p>
                  {t(lang, s => s.addInformation.screen.contactInfo.info, {
                    name: key => <strong key={key}>{info.contentTitle}</strong>,
                  })}
                </p>
                <form onSubmit={this.completeContactInformation}>
                  {CONTACT_TYPES.map(type => this.contactTypeGroup(type))}

                  {validation && (
                    <ul className="errors">
                      {validation.errors.map((error, i) => (
                        <li key={i}>{error(lang)}</li>
                      ))}
                    </ul>
                  )}

                  {this.actionButtons({
                    previousScreen: 'place-marker',
                    nextLabel: 'submit',
                  })}
                </form>
              </div>
            )}

            {addInfoStep === 'submitted' && (
              <div className="screen">
                {submissionResult ? (
                  submissionResult.state === 'error' ? (
                    <>
                      <h2>
                        {t(lang, s => s.addInformation.screen.submitted.error)}
                      </h2>
                      <p>{submissionResult.error(lang)}</p>
                      <div className="actions">
                        <button
                          type="button"
                          className="prev-button"
                          onClick={() => this.setAddInfoStep('contact-details')}
                        >
                          <MdChevronLeft className="icon icon-start" />
                          {t(lang, s => s.addInformation.prev)}
                        </button>
                        <div className="grow" />
                        <button
                          type="button"
                          className="next-button"
                          onClick={this.completeContactInformation}
                        >
                          <MdRefresh className="icon icon-start" />
                          {t(lang, s => s.addInformation.tryAgain)}
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2>
                        {t(
                          lang,
                          s => s.addInformation.screen.submitted.success,
                        )}
                      </h2>
                      <p>
                        {t(
                          lang,
                          s => s.addInformation.screen.submitted.successExtra,
                        )}
                      </p>
                      <div className="actions">
                        <button
                          type="button"
                          className="prev-button"
                          onClick={() => setPage({ page: 'map' })}
                        >
                          <MdExplore className="icon icon-start" />
                          {t(lang, s => s.addInformation.backToMap)}
                        </button>
                        <div className="grow" />
                        <button
                          type="button"
                          className="next-button"
                          onClick={this.addMore}
                        >
                          <MdAdd className="icon icon-start" />
                          {t(lang, s => s.addInformation.addMore)}
                        </button>
                      </div>
                    </>
                  )
                ) : (
                  <>
                    <h2>
                      {t(lang, s => s.addInformation.screen.submitted.loading)}
                    </h2>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </AppContext.Consumer>
    );
  };
}

export default styled(AddInstructions)`
  z-index: ${Z_INDICES.MAP_ADD_INFORMATION};
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

  ${LARGE_DEVICES} {
    top: ${p => p.theme.secondaryHeaderSizePx}px;
  }

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

    input:not([type='checkbox']) {
      display: block;
      width: 600px;
      max-width: 90%;
    }

    input:not([type='checkbox']),
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

    .contact-button {
      ${button}
      ${iconButton}
    }

    .contact-type-group {
      margin-top: ${p => p.theme.spacingPx}px;

      .contact-type-group-header {
        display: flex;
        align-items: center;

        &.error {
          color: ${p => p.theme.colors.red};
        }

        button {
          margin: 0 ${p => p.theme.spacingPx}px;
          ${button}
          ${iconButtonSmall}
        }
      }

      .contact-method-group {
        display: flex;

        > label {
          line-height: 34px;
        }

        > .inputs {
          margin-left: ${p => p.theme.spacingPx}px;
          width: 10%;
          flex-grow: 1;

          > .url {
            display: flex;
            flex-wrap: wrap;
            margin: ${p => p.theme.spacingPx}px -${p => p.theme.spacingPx / 2}px
              0;
            input {
              margin: 0 ${p => p.theme.spacingPx / 2}px;

              &[data-part='label'] {
                width: 200px;
              }
              &[data-part='url'] {
                width: 300px;
              }
            }
          }
        }
      }
    }

    .errors {
      color: ${p => p.theme.colors.red};
    }
  }

  > .place-marker,
  .submitted {
    width: 100%;

    > .box {
      padding: ${p => p.theme.spacingPx}px;
      background: rgba(255, 255, 255, 0.9);
      border-bottom: 1px solid ${p => p.theme.colors.grayLight2};

      p:first-child {
        margin-top: 0;
      }
      pointer-events: initial;

      > .error {
        color: ${p => p.theme.colors.red};
      }
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
