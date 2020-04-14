import React from 'react';
import { MdChevronLeft, MdChevronRight, MdClose } from 'react-icons/md';

import { SERVICES } from '../data';
import styled from '../styling';
import { button, buttonPrimary, iconButton } from '../styling/mixins';

interface MarkerInfo {
  marker: google.maps.Marker | null;
  circle: google.maps.Circle | null;
}

interface Props {
  htmlFor?: string;
  className?: string;
  map: google.maps.Map | null;
  setAddInfoOpen: (addInfoOpen: boolean) => void;
  addInfoStep:
    | 'greeting'
    | 'set-marker'
    | 'set-radius'
    | 'set-form'
    | 'farewell';
  setAddInfoStep: (
    addInfoStep:
      | 'greeting'
      | 'set-marker'
      | 'set-radius'
      | 'set-form'
      | 'farewell',
  ) => void;
}

interface State {
  center: {
    lat: number;
    lng: number;
  } | null;
  radius: number | null;
  form: {
    name: string | '';
    area: string | '';
    services: Map<string, boolean>;
    description?: string;
    website?: string;
    instructions?: string;
    volunteerInstructions?: string;
    otherContact?: string;
    otherService?: string;
  };
}

class AddInstructions extends React.Component<Props, State> {
  private markerInfo: MarkerInfo | null = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      center: null,
      radius: null,
      form: {
        name: '',
        area: '',
        services: Object.keys(SERVICES).reduce(
          (map: Map<string, boolean>, key: string) => {
            map.set(key, false);
            return map;
          },
          new Map(),
        ),
      },
    };
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

    const center = {
      lat: position.lat(),
      lng: position.lng(),
    };
    this.setState({ center });

    const radius = circle.getRadius();
    this.setState({ radius });

    const { form } = this.state;
    if (!form.name || !form.area || !form.services) {
      setAddInfoStep('set-form');
      return;
    }
    setAddInfoStep('farewell');
  };

  private close = () => {
    if (this.markerInfo) {
      if (this.markerInfo.marker) {
        this.markerInfo.marker.setMap(null);
      }
      if (this.markerInfo.circle) {
        this.markerInfo.circle.setMap(null);
      }
    }
    const { setAddInfoOpen, setAddInfoStep } = this.props;
    setAddInfoOpen(false);
    setAddInfoStep('greeting');
  };

  private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { form } = this.state;

    switch (target.name) {
      case 'name':
        form.name = target.value;
        break;
      case 'area':
        form.area = target.value;
        break;
      case 'description':
        form.description = target.value;
        break;
      case 'website':
        form.website = target.value;
        break;
      case 'instructions':
        form.instructions = target.value;
        break;
      case 'volunteerInstructions':
        form.volunteerInstructions = target.value;
        break;
      case 'otherContact':
        form.otherContact = target.value;
        break;
      case 'other-service':
        form.otherService = target.value;
        break;
      default:
        if (target.type === 'checkbox') {
          form.services.set(target.name, target.checked);
        }
        break;
    }
    this.setState({ form });
  };

  public render() {
    const { htmlFor, className, addInfoStep, setAddInfoStep } = this.props;
    const { center, radius, form } = this.state;
    return (
      <div className={className}>
        <div className="box">
          <div className="top">
            <h2>Add information to this map</h2>
            <button onClick={this.close} type="button">
              <MdClose size={24} />
            </button>
          </div>
          {addInfoStep === 'greeting' && (
            <>
              <p>Hi there!</p>
              <footer>
                <button
                  type="button"
                  className="next-button"
                  onClick={this.completeGreetingStep}
                >
                  Continue
                  <MdChevronRight />
                </button>
              </footer>
            </>
          )}
          {addInfoStep === 'set-marker' && (
            <>
              <p>Move the map to include the area served</p>
              <footer>
                <button
                  type="button"
                  className="next-button"
                  onClick={this.completeSetMarkerStep}
                >
                  Continue
                  <MdChevronRight />
                </button>
                <button
                  type="button"
                  className="prev-button"
                  onClick={() => setAddInfoStep('greeting')}
                >
                  <MdChevronLeft />
                  Back
                </button>
              </footer>
            </>
          )}
          {addInfoStep === 'set-radius' && (
            <>
              <p>
                Set the service area. You can change the service area by using
                rounds at the side of the circle.
              </p>
              <footer>
                <button
                  type="button"
                  className="next-button"
                  onClick={this.completeSetRadiusStep}
                >
                  Continue
                  <MdChevronRight />
                </button>
                <button
                  type="button"
                  className="prev-button"
                  onClick={() => setAddInfoStep('set-marker')}
                >
                  <MdChevronLeft />
                  Back
                </button>
              </footer>
            </>
          )}
          {addInfoStep === 'set-form' && (
            <>
              <p>Please fill out this form with as much detail as you can</p>
              <form>
                <label htmlFor={htmlFor}>
                  Name of the project / group / initiative
                  <input
                    type="text"
                    name="name"
                    placeholder="Your answer"
                    onChange={this.handleInputChange}
                  />
                </label>
                <label htmlFor={htmlFor}>
                  Area served (e.g. country / state / county / town etc...)
                  <input
                    type="text"
                    name="area"
                    placeholder="Your answer"
                    onChange={this.handleInputChange}
                  />
                </label>
                <ul className="services">
                  What services / help does this project aim to provide?
                  <li>
                    <label htmlFor={htmlFor}>
                      <input
                        type="checkbox"
                        name="food"
                        onChange={this.handleInputChange}
                      />
                      Food
                    </label>
                  </li>
                  <li>
                    <label htmlFor={htmlFor}>
                      <input
                        type="checkbox"
                        name="supplies"
                        onChange={this.handleInputChange}
                      />
                      Other Supplies
                    </label>
                  </li>
                  <li>
                    <label htmlFor={htmlFor}>
                      <input
                        type="checkbox"
                        name="aid"
                        onChange={this.handleInputChange}
                      />
                      Aid/Assistance
                    </label>
                  </li>
                  <li>
                    <label htmlFor={htmlFor}>
                      <input
                        type="checkbox"
                        name="mobility"
                        onChange={this.handleInputChange}
                      />
                      Mobility (e.g driving people places)
                    </label>
                  </li>
                  <li>
                    <label htmlFor={htmlFor}>
                      <input
                        type="checkbox"
                        name="medicine"
                        onChange={this.handleInputChange}
                      />
                      Medicine
                    </label>
                  </li>
                  <li>
                    <label htmlFor={htmlFor}>
                      <input
                        type="checkbox"
                        name="manufacturing"
                        onChange={this.handleInputChange}
                      />
                      Manufacturing Supplies
                    </label>
                  </li>
                  <li>
                    <label htmlFor={htmlFor}>
                      <input
                        type="checkbox"
                        name="financial"
                        onChange={this.handleInputChange}
                      />
                      Financial
                    </label>
                  </li>
                  <li>
                    <label htmlFor={htmlFor}>
                      <input
                        type="checkbox"
                        name="information"
                        onChange={this.handleInputChange}
                      />
                      Information
                    </label>
                  </li>
                  <li>
                    <label htmlFor={htmlFor}>
                      <input
                        type="checkbox"
                        name="other"
                        onChange={this.handleInputChange}
                      />
                      Other:&nbsp;
                      <label htmlFor={htmlFor}>
                        <input
                          type="text"
                          placeholder="Your answer"
                          name="other-service"
                          onChange={this.handleInputChange}
                        />
                      </label>
                    </label>
                  </li>
                </ul>
                <label htmlFor={htmlFor}>
                  Optional long-description of what the project does or aims to
                  do
                  <input
                    type="text"
                    name="description"
                    placeholder="Your answer"
                    onChange={this.handleInputChange}
                  />
                </label>
                <label htmlFor={htmlFor}>
                  Website URL?
                  <input
                    type="text"
                    name="website"
                    placeholder="Your answer"
                    onChange={this.handleInputChange}
                  />
                </label>
                <label htmlFor={htmlFor}>
                  How do people that require help get in touch?
                  <input
                    type="text"
                    name="instructions"
                    placeholder="Your answer"
                    onChange={this.handleInputChange}
                  />
                </label>
                <label htmlFor={htmlFor}>
                  How do people that want to volunteer get in touch?
                  <input
                    type="text"
                    name="volunteerInstructions"
                    placeholder="Your answer"
                    onChange={this.handleInputChange}
                  />
                </label>
                <label htmlFor={htmlFor}>
                  Any other URLs / Facebook Groups / Contact details?
                  <input
                    type="text"
                    name="otherContact"
                    placeholder="Your answer"
                    onChange={this.handleInputChange}
                  />
                </label>
              </form>
              <footer>
                <button
                  type="button"
                  className="next-button"
                  onClick={this.submit}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="prev-button"
                  onClick={() => setAddInfoStep('set-radius')}
                >
                  <MdChevronLeft />
                  Back
                </button>
              </footer>
            </>
          )}
          {addInfoStep === 'farewell' && (
            <>
              <p>Final State</p>
              <table>
                <thead>
                  <tr>
                    <td>variable</td>
                    <td>value</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>center</td>
                    <td>{JSON.stringify(center)}</td>
                  </tr>
                  <tr>
                    <td>radius</td>
                    <td>{radius}</td>
                  </tr>
                  <tr>
                    <td>form - name</td>
                    <td>{form.name}</td>
                  </tr>
                  <tr>
                    <td>form - area</td>
                    <td>{form.area}</td>
                  </tr>
                  <tr>
                    <td>form - services</td>
                    <td>{JSON.stringify([...form.services])}</td>
                  </tr>
                  <tr>
                    <td>form - description</td>
                    <td>{form.description}</td>
                  </tr>
                  <tr>
                    <td>form - website</td>
                    <td>{form.website}</td>
                  </tr>
                  <tr>
                    <td>form - instructions</td>
                    <td>{form.instructions}</td>
                  </tr>
                  <tr>
                    <td>form - volunteerInstructions</td>
                    <td>{form.volunteerInstructions}</td>
                  </tr>
                  <tr>
                    <td>form - otherContact</td>
                    <td>{form.otherContact}</td>
                  </tr>
                  <tr>
                    <td>form - otherService</td>
                    <td>{form.otherService}</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default styled(AddInstructions)`
  z-index: 1000;
  font-size: 1rem;
  text-align: left;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  pointer-events: none;

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

    footer {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;

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
`;
