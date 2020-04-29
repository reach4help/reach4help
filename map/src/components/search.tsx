import React from 'react';
import mapState, { SearchBoxId } from 'src/components/map-utils/map-state';
import { t } from 'src/i18n';

import styled from '../styling';
import { AppContext } from './context';

interface Props {
  className?: string;
  searchInputId: SearchBoxId;
}

class Search extends React.Component<Props, {}> {
  private updateSearchInputRef = (ref: HTMLInputElement) => {
    const { searchInputId } = this.props;
    mapState().updateSearchInputRef(searchInputId, ref);
  };

  public render() {
    const { className } = this.props;
    return (
      <AppContext.Consumer>
        {({ lang }) => (
          <div className={className}>
            <input
              ref={this.updateSearchInputRef}
              type="text"
              placeholder={t(lang, s => s.map.jumpToLocation)}
            />
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default styled(Search)`
  display: flex;

  input {
    color: #333;
    box-sizing: border-box;
    width: 500px;
    max-width: 100%;
    flex-grow: 1;
    background: #fff;
    border: 0;
    outline: none;
    font-size: 16px;
    padding: 11px 10px;
    border-radius: 2px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  }
`;
