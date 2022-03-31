import { ContactDetails } from '@reach4help/model/lib/markers';
import React from 'react';
import { MdEmail, MdLanguage, MdPhone } from 'react-icons/md';
import { MarkerIdAndInfo } from 'src/components/map';
import { Language, t } from 'src/i18n';

import styled from '../styling';
import MarkerType from './marker-type';

interface Props {
  result: MarkerIdAndInfo;
  lang: Language;
  fullDetail?: boolean;
}

const Div = styled('div')`
  overflow-y: auto;
  max-height: 100%;
  background: #fff;
  padding: ${p => p.theme.spacingPx}px;
  overflow-y: auto;
  background: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  cursor: auto;
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
`;

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

const ResultDetail = ({ result, lang, fullDetail = false }: Props) => {
  const selectedResultSource =
    result?.info.source && SOURCES[result.info.source.name];
  const selectedResultSentenceType =
    result?.info.type.type === 'mutual-aid-group' ||
    result?.info.type.type === 'org'
      ? result.info.type.type
      : 'project';
  return (
    <Div>
      <div className="disclaimer">
        <strong>{t(lang, s => s.results.details.disclaimer.header)}</strong>
        <br />
        {t(lang, s => s.results.details.disclaimer.content)}
      </div>

      {fullDetail && <div className="name">{result.info.contentTitle}</div>}
      {fullDetail && result.info.loc.description && (
        <div className="location">{result.info.loc.description}</div>
      )}
      {fullDetail && (
        <MarkerType className="marker-type" type={result.info.type} />
      )}
      {selectedResultSource && (
        <div className="source">
          {t(lang, s => s.results.details.source, {
            type: key => (
              <span key={key}>
                {t(lang, s => s.markerTypeSentence[selectedResultSentenceType])}
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
      {result.info.contentBody && (
        <div>
          <div className="content">{result.info.contentBody}</div>
        </div>
      )}
      {result.info.contact && (
        <div>
          {contactInfo(
            lang,
            t(lang, s => s.results.contact.general),
            result.info.contact.general,
          )}
          {contactInfo(
            lang,
            t(lang, s => s.results.contact.getHelp),
            result.info.contact.getHelp,
          )}
          {contactInfo(
            lang,
            t(lang, s => s.results.contact.volunteer),
            result.info.contact.volunteers,
          )}
        </div>
      )}
    </Div>
  );
};

export default ResultDetail;
