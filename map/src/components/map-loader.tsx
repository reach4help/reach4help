import React from 'react';
import styled from 'styled-components';

const REQUIRED_SCRIPTS = [
  'https://unpkg.com/@google/markerclustererplus@4.0.1/dist/markerclustererplus.min.js',
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyD5ywRBOAoyjwic5SzT9q3MPjLT1aibHO8&libraries=places',
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
      <div className={className}>
        {loaded ? child() : <span>Loading...</span>}
      </div>
    );
  }
}

export default styled(MapLoader)`
  flex-grow: 1;
  background: #f99;
  font-size: 70px;
  text-align: center;
`;
