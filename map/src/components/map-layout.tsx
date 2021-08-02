/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable react/destructuring-assignment */
import {
  MARKER_TYPE_STRINGS,
  SERVICE_STRINGS,
} from '@reach4help/model/lib/markers/type';
import React from 'react';
import Chevron from 'src/components/assets/chevron';
import MapLoader from 'src/components/map-loader';
import * as dataDriver from 'src/data/dataDriver';
import { t } from 'src/i18n';
import { Page, UpdateFilter } from 'src/state';
import styled, { LARGE_DEVICES, SMALL_DEVICES } from 'src/styling';

import { AppContext } from './context';
import DropDown from './drop-down';
import Search from './search';

interface Props {
  className?: string;
  page: Page;
  updateFilter: UpdateFilter;
  components: {
    map: () => JSX.Element;
    results: (props: { className: string }) => JSX.Element;
  };
}

interface State {
  includingHidden: boolean;
  searchClosed: boolean;
}

class MapLayout extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      includingHidden: dataDriver.includingHidden(),
      searchClosed: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public componentDidMount() {
    dataDriver.addInformationListener(this.dataDriverInformationUpdated);
  }

  public componentWillUnmount() {
    dataDriver.removeInformationListener(this.dataDriverInformationUpdated);
  }

  private dataDriverInformationUpdated: dataDriver.InformationListener = update =>
    this.setState({ includingHidden: update.includingHidden });

  private setSearchClosed = (searchClosed: boolean) => {
    this.setState({ searchClosed });
  };

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const textValue = e.target.value;
    this.props.updateFilter('searchText', textValue);
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    this.props.updateFilter('filterExecuted', false);
    e.preventDefault();
  }

  public render() {
    const { className, components, page, updateFilter } = this.props;
    const { includingHidden, searchClosed } = this.state;
    return (
      <AppContext.Consumer>
        {({ lang }) => (
          <div className={`${className} page-${page.page}`}>
            <MapLoader className="map" child={components.map} />
            <div className="overlay">
              <div className="panel">
                <div className={`controls ${searchClosed ? 'close' : ''}`}>
                  <button
                    type="button"
                    className="header"
                    onClick={() => this.setSearchClosed(!searchClosed)}
                  >
                    <span className="label">
                      {t(lang, s =>
                        searchClosed
                          ? s.controls.openSearch
                          : s.controls.closeSearch,
                      )}
                    </span>
                    <span className="grow" />
                    <Chevron className="toggle chevron" />
                  </button>
                  <form onSubmit={this.handleSubmit} className="form">
                    <div className="row">
                      <Search className="search" searchInputId="main" />
                    </div>
                    <h3 className="filter filter-heading">
                      {t(lang, s => s.filterForm.title)}
                    </h3>
                    <div className="row">
                      <input
                        type="text"
                        className="filter filter-search"
                        placeholder={t(lang, s => s.filterForm.searchBox)}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="row">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label className="filter filter-label">
                        <div className="filter-label-text">
                          {t(lang, s => s.filterForm.org)}
                        </div>
                        <DropDown
                          className="drop-down"
                          translationKey="markerTypes"
                          filterScreenField="markerTypes"
                          dropDownValues={MARKER_TYPE_STRINGS}
                          isMulti
                          placeholder={t(lang, s => s.filterForm.select)}
                          updateFilter={updateFilter}
                        />
                      </label>
                    </div>
                    <div className="row">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label className="filter filter-label">
                        <div className="filter-label-text">
                          {t(lang, s => s.filterForm.service)}
                        </div>
                        <DropDown
                          className="drop-down"
                          translationKey="services"
                          filterScreenField="services"
                          dropDownValues={SERVICE_STRINGS}
                          isMulti
                          placeholder={t(lang, s => s.filterForm.select)}
                          updateFilter={updateFilter}
                        />
                      </label>
                    </div>
                    {includingHidden && (
                      <div className="row">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label className="filter filter-label">
                          <div className="filter-label-text">
                            {t(lang, s => s.filterForm.visibility)}
                          </div>
                          <DropDown
                            className="drop-down"
                            translationKey="hiddenMarkers.filter"
                            filterScreenField="hiddenMarkers"
                            dropDownValues={['visible', 'hidden']}
                            updateFilter={updateFilter}
                          />
                        </label>
                      </div>
                    )}
                    <button type="submit" className="filter filter-button">
                      {t(lang, s => s.filterForm.search)}
                    </button>
                  </form>
                </div>
                {components.results({
                  className: 'results',
                })}
              </div>
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default styled(MapLayout)`
  position: relative;
  margin-right: 0;
  transition: none;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  > .map {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  > .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    opacity: 0;
    transition: opacity ${p => p.theme.transitionSpeedNormal};
    pointer-events: none;

    ${LARGE_DEVICES} {
      top: ${p => p.theme.secondaryHeaderSizePx}px;
    }

    > .panel {
      width: ${p => p.theme.overlayPanelWidthPx}px;
      display: flex;
      flex-direction: column;

      ${SMALL_DEVICES} {
        width: initial;
        flex-grow: 1;
      }

      > .controls {
        max-height: 70%;
        background: #fff;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        display: flex;
        flex-direction: column;
        pointer-events: initial;

        .form {
          padding: 9px 8px;
          overflow-y: auto;
        }

        .row {
          display: flex;
          flex-wrap: wrap;
        }

        .search,
        .my-location,
        .filter {
          margin: 4px 8px;
          flex-grow: 1;
          flex-basis: 40%;
        }

        .filter-label-text {
          margin-bottom: 2px;
          font-size: 14px;
        }

        .filter-search {
          box-sizing: border-box;
          max-width: 100%;
          flex-grow: 1;
          background: #fff;
          border: 1px solid ${p => p.theme.colors.borderBase};
          outline: none;
          font-size: 14px;
          line-height: 20px;
          padding: 6px 8px;
          border-radius: 4px;

          ::placeholder {
            color: ${p => p.theme.colors.gray};
            opacity: 0.75;
          }

          &:focus {
            border-color: ${p => p.theme.colors.brand.primaryDark};
          }
        }

        .filter-button {
          background: ${p => p.theme.colors.brand.primaryDark};
          padding: 6px 20px;
          font-family: Roboto;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 18px;
          color: #fff;
          outline: none;
          border: none;
          cursor: pointer;
          box-sizing: border-box;
          border-radius: 6px;
          white-space: nowrap;

          &: hover, &:focus {
            background: ${p => p.theme.colors.brand.primary};
          }
        }

        > button.header {
          background: #d9bbd6;
          cursor: pointer;
          outline: none;
          border: none;
          display: flex;
          color: ${p => p.theme.colors.brand.primaryDark};
          padding: 5px 8px;
          align-items: center;
          pointer-events: initial;

          > .chevron,
          .label {
            margin: 0 8px;
          }

          > .chevron {
            transform: rotate(180deg);
          }

          > .label {
            font-weight: bold;
            font-size: 14px;
            line-height: 22px;
            white-space: nowrap;
          }

          > .grow {
            flex-grow: 1;
          }

          > .chevron.toggle {
            transition: opacity ${p => p.theme.transitionSpeedQuick};
          }

          &:hover,
          &:focus {
            color: rgb(129, 30, 120, 0.7);
          }
        }

        &.close {
          > .header > .chevron.toggle {
            transform: rotate(0deg);
          }

          > .form {
            display: none;
          }
        }
      }
    }
  }

  &.page-map {
    > .overlay {
      opacity: 1;
    }
  }
`;
