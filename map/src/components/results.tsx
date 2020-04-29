import React from 'react';
import { MdEmail, MdLanguage, MdPhone } from 'react-icons/md';
import Chevron from 'src/components/assets/chevron';
import Refresh from 'src/components/assets/refresh';
import { MarkerIdAndInfo } from 'src/components/map';
import { ContactDetails } from 'src/data/markers';
import { format, Language, t } from 'src/i18n';

import styled, { Z_INDICES } from '../styling';
import { AppContext } from './context';
import MarkerType from './marker-type';

interface Props {
  className?: string;
  results: MarkerIdAndInfo[] | null;
  nextResults?: MarkerIdAndInfo[];
  updateResults: () => void;
  selectedResult: MarkerIdAndInfo | null;
  setSelectedResult: (selectedResult: MarkerIdAndInfo | null) => void;
}

interface State {
  open: boolean;
}

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

class Results extends React.PureComponent<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  private toggle = () => {
    const { selectedResult, setSelectedResult } = this.props;
    if (selectedResult) {
      setSelectedResult(null);
      this.setState({ open: false });
    } else {
      this.setState(state => ({ open: !state.open }));
    }
  };

  private back = () => {
    const { setSelectedResult } = this.props;
    setSelectedResult(null);
    this.setState({ open: true });
  };

  public render() {
    const {
      className,
      results,
      nextResults,
      updateResults,
      selectedResult,
      setSelectedResult,
    } = this.props;
    const { open } = this.state;
    return (
      <AppContext.Consumer>
        {({ lang }) => (
          <div
            className={`${className} ${open ? 'open' : ''} ${
              selectedResult ? 'selected-result' : ''
            }`}
          >
            <div className="header">
              <button type="button" className="back" onClick={this.back}>
                <Chevron className="chevron" />
              </button>
              <button type="button" className="toggle" onClick={this.toggle}>
                <span className="count">
                  {format(lang, s => s.results.count, {
                    results: (results || []).length,
                  })}
                </span>
                <span className="grow" />
                <Chevron className="chevron" />
              </button>
            </div>
            {nextResults !== results && (
              <div className="update">
                <button onClick={updateResults} type="button">
                  <Refresh />
                  <span>{t(lang, s => s.map.updateResultsForThisArea)}</span>
                </button>
              </div>
            )}
            <div className="list">
              {(results || []).map((result, index) => (
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
            </div>
            {selectedResult && (
              <div className="details">
                <div className="name">{selectedResult.info.contentTitle}</div>
                {selectedResult.info.loc.description && (
                  <div className="location">
                    {selectedResult.info.loc.description}
                  </div>
                )}
                <MarkerType type={selectedResult.info.type} />
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
        )}
      </AppContext.Consumer>
    );
  }
}

export default styled(Results)`
  max-height: 80%;
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;

  > .header {
    background: rgba(129, 30, 120, 0.3);
    display: flex;
    color: ${p => p.theme.colors.brand.primaryDark};
    padding: 0 8px;

    > button.back {
      display: none;
      color: ${p => p.theme.colors.brand.primaryDark};
      cursor: pointer;
      outline: none;
      border: none;
      background: none;
      padding: 0 16px;
      margin: 0 -8px;
      z-index: ${Z_INDICES.MAP_OVERLAYS_RESULTS_BACK_BUTTON};

      svg {
        transform: rotate(90deg);

        [dir='rtl'] & {
          transform: rotate(270deg);
        }
      }

      &:hover,
      &:focus {
        opacity: 0.7;
      }
    }

    > button.toggle {
      flex-grow: 1;
      color: ${p => p.theme.colors.brand.primaryDark};
      font-weight: bold;
      font-size: 14px;
      line-height: 22px;
      cursor: pointer;
      outline: none;
      border: none;
      background: none;
      display: flex;
      padding: 5px 16px;
      align-items: center;
      margin: 0 -8px;

      > .count {
        white-space: nowrap;
      }

      > .grow {
        flex-grow: 1;
      }

      &:hover,
      &:focus {
        opacity: 0.7;
      }
    }
  }

  > .update {
    display: none;
    padding: 20px 16px;

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

  > .list {
    display: none;
    overflow-y: auto;
    flex-grow: 1;

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
    background: #fff;
    padding: ${p => p.theme.spacingPx}px;
    overflow-y: auto;
    flex-grow: 1;

    > .name {
      font-size: 1.5rem;
      padding-bottom: ${p => p.theme.spacingPx / 2}px;
    }

    > .location {
      color: ${p => p.theme.textColorLight};
      font-size: 0.9rem;
    }

    > .services {
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

  &.open {
    > .header > button.toggle > .chevron {
      transform: rotate(180deg);
    }

    > .update {
      display: flex;
    }

    > .list {
      display: block;
    }
  }

  &.selected-result {
    > .header {
      > button.back {
        display: block;
      }
      > button.toggle > .chevron {
        transform: rotate(180deg);
      }
    }

    > .update {
      display: none;
    }

    // Keep visible (rather than display:none) to maintain scroll position
    > .list {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }
  }
`;
