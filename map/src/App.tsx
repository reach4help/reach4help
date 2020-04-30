import isEqual from 'lodash/isEqual';
import React from 'react';
import { Helmet } from 'react-helmet';
import About from 'src/components/about';
import MapLayout from 'src/components/map-layout';
import * as i18n from 'src/i18n';
import { Page } from 'src/state';

import { AppContext } from './components/context';
import { FilterMutator } from './components/filter-type';
import Header from './components/header';
import Map, { MarkerIdAndInfo } from './components/map';
import Results from './components/results';
import { Filter } from './data';
import styled, {
  CLS_SCREEN_LG_HIDE,
  CLS_SCREEN_LG_ONLY,
  LARGE_DEVICES,
} from './styling';

interface Props {
  className?: string;
}

interface State {
  filter: Filter;
  results: MarkerIdAndInfo[] | null;
  nextResults?: MarkerIdAndInfo[];
  selectedResult: MarkerIdAndInfo | null;
  updateResultsCallback: (() => void) | null;
  lang: i18n.Language;
  page: Page;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filter: {},
      results: null,
      selectedResult: null,
      updateResultsCallback: null,
      lang: i18n.getLanguage(),
      page: {
        page: 'about',
      },
    };
  }

  private setFilter = (mutator: FilterMutator) => {
    this.setState(state => ({ filter: mutator(state.filter) }));
  };

  private setResults = (results: MarkerIdAndInfo[]) => {
    this.setState({ results, selectedResult: null });
  };

  private setUpdateResultsCallback = (callback: (() => void) | null) => {
    this.setState({ updateResultsCallback: callback });
  };

  private setSelectedResult = (selectedResult: MarkerIdAndInfo | null) =>
    this.setState({ selectedResult });

  private setNextResults = (nextResults: MarkerIdAndInfo[]) => {
    this.setState(state =>
      isEqual(state.nextResults, nextResults) ? {} : { nextResults },
    );
  };

  private setPage = (page: Page) => {
    this.setState({ page });
  };

  private updateResults = () => {
    const { updateResultsCallback } = this.state;
    if (updateResultsCallback) {
      updateResultsCallback();
    }
  };

  private languageUpdated = (lang: i18n.Language) => {
    this.setState({ lang });
  };

  public componentDidMount = () => {
    i18n.addListener(this.languageUpdated);
  };

  public componentWillUnmount = () => {
    i18n.removeListener(this.languageUpdated);
  };

  public render() {
    const { className } = this.props;
    const {
      filter,
      results,
      nextResults,
      selectedResult,
      page,
      lang,
    } = this.state;
    return (
      <AppContext.Provider value={{ lang }}>
        <div dir={i18n.getMeta(lang).direction} className={className}>
          <Helmet>
            {i18n.LANGUAGE_KEYS.map((langKey, i) => (
              <link
                key={i}
                rel="alternate"
                hrefLang={langKey}
                href={i18n.canonicalUrl(lang)}
              />
            ))}
            <link rel="canonical" href={i18n.canonicalUrl(lang)} />
          </Helmet>
          <Header page={page} setPage={this.setPage} />
          <main className={`page-${page.page}`}>
            <MapLayout
              className="map-area"
              page={page}
              filter={filter}
              updateFilter={this.setFilter}
              components={{
                map: () => (
                  <Map
                    filter={filter}
                    results={results}
                    nextResults={nextResults}
                    setResults={this.setResults}
                    setNextResults={this.setNextResults}
                    selectedResult={selectedResult}
                    setSelectedResult={this.setSelectedResult}
                    setUpdateResultsCallback={this.setUpdateResultsCallback}
                    page={page}
                    setPage={this.setPage}
                  />
                ),
                results: props => (
                  <Results
                    className={props.className}
                    results={results}
                    nextResults={nextResults}
                    selectedResult={selectedResult}
                    setSelectedResult={this.setSelectedResult}
                    updateResults={this.updateResults}
                  />
                ),
              }}
            />
            <About page={page} setPage={this.setPage} />
          </main>
        </div>
      </AppContext.Provider>
    );
  }
}

export default styled(App)`
  height: 100%;
  display: flex;
  flex-direction: column;
  color: ${p => p.theme.textColor};
  * {
    font-family: 'Roboto', sans-serif;
  }
  > main {
    overflow: hidden;
    position: relative;
    display: flex;
    flex-grow: 1;
    height: 0;
    min-height: 150px;
    > .map-area {
      flex-grow: 1;
    }
  }
  a {
    color: ${p => p.theme.textLinkColor};
    text-decoration: none;
    &:hover {
      color: ${p => p.theme.textLinkHoverColor};
      text-decoration: underline;
    }
  }
  .info-window {
    font-size: 1rem;
    font-weight: 400;
  }
  .mobile-message {
    display: none;
    padding: ${p => p.theme.spacingPx / 2}px;
    font-size: 1.5rem;
    p {
      margin: 0;
      padding: ${p => p.theme.spacingPx / 2}px;
    }
  }
  .${CLS_SCREEN_LG_ONLY} {
    display: none;
    ${LARGE_DEVICES} {
      display: initial;
    }
  }
  .${CLS_SCREEN_LG_HIDE} {
    ${LARGE_DEVICES} {
      display: none;
    }
  }
`;
