import React from 'react';
import { t } from 'src/i18n';

import styled from '../styling';
import { AppContext } from './context';

declare global {
  interface Window {
    GOOGLE_MAPS_API_KEY?: string;
  }
}

/**
 * This API key is what's used on the live site,
 * and is restricted to map.reach4help.org
 *
 * To use your own key,
 * set the environment variable `REACT_APP_GOOGLE_MAPS_API_KEY` to the key.
 */
const PUBLIC_API_KEY = 'AIzaSyC9MNxwBw6ZAOqrSVDPZFiaYhFmuRwtobc';

const apiKey =
  (window.GOOGLE_MAPS_API_KEY !== '%REACT_APP_GOOGLE_MAPS_API_KEY%' &&
    window.GOOGLE_MAPS_API_KEY) ||
  PUBLIC_API_KEY;

const REQUIRED_SCRIPTS = [
  'https://unpkg.com/@google/markerclustererplus@4.0.1/dist/markerclustererplus.min.js',
  `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`,
];

interface Props {
  className?: string;
  child: () => JSX.Element;
}

interface State {
  loaded?: boolean;
}

/**
 * Load the google maps scripts that we require,
 * in the correct order.
 */
class MapLoader extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount(): void {
    let lastScript: HTMLScriptElement | null = null;
    for (const src of REQUIRED_SCRIPTS) {
      const script = document.createElement('script');
      script.src = src;
      if (lastScript) {
        lastScript.addEventListener('load', () => {
          window.document.body.appendChild(script);
        });
      } else {
        window.document.body.appendChild(script);
      }
      lastScript = script;
    }

    if (lastScript) {
      lastScript.addEventListener('load', () => {
        this.setState({ loaded: true });
      });
    }
  }

  public render() {
    const { loaded } = this.state;
    const { child, className } = this.props;
    return (
      <AppContext.Consumer>
        {({ lang }) => (
          <div className={className}>
            {loaded ? child() : <div className="loader">{t(lang, s => s.loading)}</div>}
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default styled(MapLoader)`
  > .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: #f99;
    font-size: 70px;
  }
`;
