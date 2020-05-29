import { ContactDetails } from '@reach4help/model/lib/markers';
import isEqual from 'lodash/isEqual';
import React from 'react';
import { MdEmail, MdExpandMore, MdLanguage, MdPhone } from 'react-icons/md';
import Chevron from 'src/components/assets/chevron';
import Refresh from 'src/components/assets/refresh';
import { MarkerIdAndInfo, ResultsSet } from 'src/components/map';
import { format, Language, t } from 'src/i18n';

import styled from '../styling';
import { AppContext } from './context';
import MarkerType from './marker-type';

interface Props {
  className?: string;
  results: ResultsSet | null;
  nextResults: ResultsSet | null;
  updateResults: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedResult: MarkerIdAndInfo | null;
  setSelectedResult: (selectedResult: MarkerIdAndInfo | null) => void;
  showMoreResults: (count: number) => void;
}

const SOURCES = {
  'mutualaid.wiki': {
    label: 'Mutual Aid Wiki',
    href: 'https://mutualaid.wiki/',
  },
  'mutualaidhub.org': {
    label: 'Mutual Aid Hub',
    href: 'https://www.mutualaidhub.org/',
  },
  hardcoded: null,
};

const contactInfo = (lang: Language, label: string, info?: ContactDetails) => {
  if (!info) {
    return null;
  }
  const items: Array<JSX.Element> = [];
  if (info.phone) {
    items.push(
      ...info.phone.map(number => (
        <a key={items.length} href={`tel:${number.replace(/\s/g, '')}`}>
          <MdPhone />
          {number}
        </a>
      )),
    );
  }
  if (info.email) {
    items.push(
      ...info.email.map(email => (
        <a
          key={items.length}
          href={`mailto:${email}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MdEmail />
          {email}
        </a>
      )),
    );
  }
  if (info.facebookGroup) {
    items.push(
      <a
        key={items.length}
        href={info.facebookGroup}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MdLanguage />
        {t(lang, s => s.results.contact.facebookGroup)}
      </a>,
    );
  }
  if (info.web) {
    items.push(
      ...Object.entries(info.web).map(entry => (
        <a
          key={items.length}
          href={entry[1]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MdLanguage />
          {entry[0]}
        </a>
      )),
    );
  }
  if (items.length === 0) {
    return null;
  }
  return (
    <div className="contact-group">
      <strong>{label}</strong>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

class Results extends React.PureComponent<Props, {}> {
  private headerClicked = () => {
    const { open, setOpen, selectedResult, setSelectedResult } = this.props;
    if (selectedResult) {
      setSelectedResult(null);
      setOpen(true);
    } else {
      setOpen(!open);
    }
  };

  public render() {
    const {
      className,
      results,
      nextResults,
      updateResults,
      open,
      selectedResult,
      setSelectedResult,
      showMoreResults,
    } = this.props;
    const canUpdateResults =
      !isEqual(results?.context, nextResults?.context) ||
      !isEqual(results?.results, nextResults?.results);
    const selectedResultSource =
      selectedResult?.info.source && SOURCES[selectedResult.info.source.name];
    const selectedResultSentenceType =
      selectedResult?.info.type.type === 'mutual-aid-group' ||
      selectedResult?.info.type.type === 'org'
        ? selectedResult.info.type.type
        : 'project';
    return (
      <AppContext.Consumer>
        {({ lang }) => (
          <div
            className={`${className} ${open ? 'open' : ''} ${
              selectedResult ? 'selected-result' : ''
            }`}
          >
            <button
              type="button"
              className="header"
              onClick={this.headerClicked}
            >
              <Chevron className="back chevron" />
              <span className="count">
                {format(
                  lang,
                  s =>
                    selectedResult
                      ? s.results.backToResults
                      : open
                      ? s.results.closeResults
                      : s.results.openResults,
                  {
                    results: (results?.results || []).length,
                  },
                )}
              </span>
              <span className="grow" />
              <Chevron className="toggle chevron" />
            </button>
            {canUpdateResults && (
              <div className="update">
                <button onClick={updateResults} type="button">
                  <Refresh />
                  <span>{t(lang, s => s.map.updateResultsForThisArea)}</span>
                </button>
              </div>
            )}
            <div className="grow">
              <div className="list">
                {(results?.results || [])
                  .slice(0, results?.showRows)
                  .map((result, index) => (
                    <div
                      key={index}
                      className="result"
                      onClick={() => setSelectedResult(result)}
                    >
                      <div className="number">{index + 1}</div>
                      <div className="info">
                        {result.info.loc.description && (
                          <div className="location">
                            {result.info.loc.description}
                          </div>
                        )}
                        <div className="name">{result.info.contentTitle}</div>
                        <MarkerType type={result.info.type} />
                      </div>
                    </div>
                  ))}
                {results && results.showRows < results.results.length && (
                  <div className="show-more">
                    <button onClick={() => showMoreResults(10)} type="button">
                      <MdExpandMore />
                      <span>{t(lang, s => s.results.showMore)}</span>
                      <MdExpandMore />
                    </button>
                  </div>
                )}
              </div>
              {selectedResult && (
                <div className="details">
                  <div className="disclaimer">
                    <strong>
                      {t(lang, s => s.results.details.disclaimer.header)}
                    </strong>
                    <br />
                    {t(lang, s => s.results.details.disclaimer.content)}
                  </div>
                  <div className="name">{selectedResult.info.contentTitle}</div>
                  {selectedResult.info.loc.description && (
                    <div className="location">
                      {selectedResult.info.loc.description}
                    </div>
                  )}
                  <MarkerType
                    className="marker-type"
                    type={selectedResult.info.type}
                  />
                  {selectedResultSource && (
                    <div className="source">
                      {t(lang, s => s.results.details.source, {
                        type: key => (
                          <span key={key}>
                            {t(
                              lang,
                              s =>
                                s.markerTypeSentence[
                                  selectedResultSentenceType
                                ],
                            )}
                          </span>
                        ),
                        source: key => (
                          <a
                            key={key}
                            href={selectedResultSource.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {selectedResultSource.label}
                          </a>
                        ),
                      })}
                    </div>
                  )}
                  {selectedResult.info.contentBody && (
                    <div className="content">
                      {selectedResult.info.contentBody}
                    </div>
                  )}
                  {contactInfo(
                    lang,
                    t(lang, s => s.results.contact.general),
                    selectedResult.info.contact.general,
                  )}
                  {contactInfo(
                    lang,
                    t(lang, s => s.results.contact.getHelp),
                    selectedResult.info.contact.getHelp,
                  )}
                  {contactInfo(
                    lang,
                    t(lang, s => s.results.contact.volunteer),
                    selectedResult.info.contact.volunteers,
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default styled(Results)`
  height: 0;
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;

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
    .count {
      margin: 0 8px;
    }

    > .chevron.back {
      opacity: 0;
      margin: 0 -6px;
      transform: rotate(90deg);
      transition: opacity ${p => p.theme.transitionSpeedQuick},
        margin ${p => p.theme.transitionSpeedQuick};

      [dir='rtl'] & {
        transform: rotate(270deg);
      }
    }

    > .count {
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

  > .update,
  .show-more {
    display: flex;
    padding: 20px 16px;
    background: #fff;
    pointer-events: initial;

    button {
      flex-grow: 1;
      padding: 4px;
      color: #fff;
      background: ${p => p.theme.colors.blue};
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      font-size: 14px;
      line-height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;

      svg {
        height: 16px;
        margin: 0 4px;
      }

      span {
        margin: 0 4px;
      }

      &:hover,
      &:focus {
        opacity: 0.7;
      }
    }
  }

  > .update {
    display: none;
  }

  > .grow {
    height: 0;
    display: none;
    flex-grow: 1;

    > .list {
      overflow-y: auto;
      max-height: 100%;
      background: #fff;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      pointer-events: initial;

      > .result {
        color: ${p => p.theme.textColor};
        border-bottom: ${p => p.theme.borderLight};
        padding: ${p => p.theme.spacingPx}px;
        display: flex;
        align-items: start;
        font-size: 1rem;
        cursor: pointer;

        &:hover {
          background: ${p => p.theme.colors.grayLight5};

          .location {
            color: ${p => p.theme.textColorLight};
          }
        }

        .number {
          color: ${p => p.theme.textColor};
          font-size: 20px;
          font-weight: 600;
          margin-right: ${p => p.theme.spacingPx}px;

          [dir='rtl'] & {
            margin: 0 0 0 ${p => p.theme.spacingPx}px;
          }
        }

        .location {
          color: ${p => p.theme.textColorLight};
          font-size: 0.9rem;
          margin-bottom: ${p => p.theme.spacingPx / 2}px;
        }
      }
    }

    > .details {
      overflow-y: auto;
      max-height: 100%;
      background: #fff;
      padding: ${p => p.theme.spacingPx}px;
      overflow-y: auto;
      background: #fff;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      pointer-events: initial;

      > .disclaimer,
      > .source {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 3px;
        padding: 10px 8px;
        color: rgba(0, 0, 0, 0.5);
        margin-bottom: 20px;

        strong {
          text-transform: uppercase;
        }
      }

      > .disclaimer {
        font-size: 10px;
        line-height: 16px;
      }

      > .source {
        font-size: 12px;
        line-height: 150%;
      }

      > .name {
        font-size: 1.5rem;
        padding-bottom: ${p => p.theme.spacingPx / 2}px;
      }

      > .location {
        color: ${p => p.theme.textColorLight};
        font-size: 0.9rem;
      }

      > .marker-type {
        margin-bottom: ${p => p.theme.spacingPx / 2}px;
      }

      > .contact-group {
        margin-top: ${p => p.theme.spacingPx}px;
        color: ${p => p.theme.textColorLight};

        ul {
          padding-left: ${p => p.theme.spacingPx}px;
          margin-left: ${p => p.theme.spacingPx}px;
          a {
            display: inline-flex;
            align-items: center;
            text-decoration: none;

            &:hover {
              text-decoration: underline;
            }

            svg {
              margin-right: ${p => p.theme.spacingPx / 2}px;
            }
          }
        }
      }
    }
  }

  &.open {
    > .header > .chevron.toggle {
      transform: rotate(180deg);
    }

    > .update {
      display: flex;
    }

    > .grow {
      display: block;
    }
  }

  &.selected-result {
    > .header {
      > .chevron.back {
        opacity: 1;
        margin: 0 8px;
      }
      > .chevron.toggle {
        opacity: 0;
      }
    }

    > .update {
      display: none;
    }

    > .grow {
      display: block;

      > .list {
        position: absolute;
        opacity: 0;
        pointer-events: none;
      }
    }
  }
`;
