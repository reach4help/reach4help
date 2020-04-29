import React from 'react';
import { MdMyLocation } from 'react-icons/md';
import mapState from 'src/components/map-utils/map-state';
import { t } from 'src/i18n';
import styled from 'src/styling';

import { AppContext } from './context';

interface Props {
  className?: string;
}

interface State {
  active: boolean;
}

class MyLocation extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  private centerToGeolocation = () => {
    this.setState({ active: true });
    navigator.geolocation.getCurrentPosition(
      position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const { map } = mapState();
        if (!map) {
          return;
        }
        map.map.setCenter(pos);
        map.map.setZoom(8);
        mapState().updateResultsOnNextClustering = true;
        this.setState({ active: false });
      },
      error => {
        // eslint-disable-next-line no-alert
        alert('Unable to get geolocation!');
        // eslint-disable-next-line no-console
        console.error(error.message);
        this.setState({ active: false });
      },
    );
  };

  public render() {
    const { className } = this.props;
    const { active } = this.state;
    return (
      <AppContext.Consumer>
        {({ lang }) => (
          <button
            className={`${className} ${active ? 'active' : ''}`}
            type="button"
            onClick={this.centerToGeolocation}
          >
            <MdMyLocation className="icon icon-start" />
            <span>{t(lang, s => s.map.myLocation)}</span>
          </button>
        )}
      </AppContext.Consumer>
    );
  }
}

export default styled(MyLocation)`
  border: 1px solid rgba(0, 0, 0, 0.6);
  background: #fff;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 5px 0;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;

  &:hover,
  &:focus {
    color: ${p => p.theme.colors.brand.primaryDark};
    border-color: ${p => p.theme.colors.brand.primaryDark};
  }

  &.active {
    color: ${p => p.theme.colors.blue};
    border-color: ${p => p.theme.colors.blue};
  }

  svg,
  span {
    margin: 0 4px;
  }
`;
