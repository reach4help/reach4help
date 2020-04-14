import React from 'react';
import { MdClose } from 'react-icons/md';

import styled from '../styling';
import { button, buttonPrimary } from '../styling/mixins';

interface AddInfo {
  marker: google.maps.Marker | null;
  circle: google.maps.Circle | null;
}

interface Props {
  className?: string;
  map: google.maps.Map | null;
  setAddInfoOpen: (addInfoOpen: boolean) => void;
  addInfoStep: 'greeting' | 'set-marker' | 'set-radius' | 'set-form';
  setAddInfoStep: (
    addInfoStep: 'greeting' | 'set-marker' | 'set-radius' | 'set-form',
  ) => void;
}

class AddInstructions extends React.Component<Props, {}> {
  private addInfo: AddInfo | null = null;

  private completeGreetingStep = () => {
    const { map } = this.props;
    if (!map) {
      return;
    }
    if (!this.addInfo) {
      this.addInfo = {
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
    if (!this.addInfo) {
      return;
    }
    if (this.addInfo.marker) {
      this.addInfo.marker.setMap(null);
    }
    if (this.addInfo.circle) {
      this.addInfo.circle.setMap(null);
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
      radius: 20000,
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

    this.addInfo.marker = marker;
    this.addInfo.circle = circle;
    setAddInfoStep('set-radius');
  };

  private completeSetRadiusStep = () => {
    const { setAddInfoStep } = this.props;
    if (!this.addInfo) {
      setAddInfoStep('set-marker');
    }
    setAddInfoStep('set-form');
  };

  private submit = () => {
    const { setAddInfoStep } = this.props;

    setAddInfoStep('set-form');
  };

  private close = () => {
    if (this.addInfo) {
      if (this.addInfo.marker) {
        this.addInfo.marker.setMap(null);
      }
      if (this.addInfo.circle) {
        this.addInfo.circle.setMap(null);
      }
    }
    const { setAddInfoOpen, setAddInfoStep } = this.props;
    setAddInfoOpen(false);
    setAddInfoStep('greeting');
  };

  public render() {
    const { className, addInfoStep, setAddInfoStep } = this.props;
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
                </button>
              </footer>
            </>
          )}
          {addInfoStep === 'set-marker' && (
            <>
              <p>Set marker!</p>
              <footer>
                <button
                  type="button"
                  className="next-button"
                  onClick={this.completeSetMarkerStep}
                >
                  Continue
                </button>
                <button
                  type="button"
                  className="prev-button"
                  onClick={() => setAddInfoStep('greeting')}
                >
                  Back
                </button>
              </footer>
            </>
          )}
          {addInfoStep === 'set-radius' && (
            <>
              <p>Hello, World!</p>
              <footer>
                <button
                  type="button"
                  className="next-button"
                  onClick={this.completeSetRadiusStep}
                >
                  Continue
                </button>
                <button
                  type="button"
                  className="prev-button"
                  onClick={() => setAddInfoStep('set-marker')}
                >
                  Back
                </button>
              </footer>
            </>
          )}
          {addInfoStep === 'set-form' && (
            <>
              <p>Hello, World!</p>
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
                  Back
                </button>
              </footer>
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
    max-height: 100%;
    max-height: calc(100% - ${p => p.theme.spacingPx * 4}px);
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

    footer {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;

      > .next-button {
        ${buttonPrimary}
      }

      > .prev-button {
        ${button}
      }
    }
  }
`;
