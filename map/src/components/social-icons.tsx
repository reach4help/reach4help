import React from 'react';
import IconEmail from 'src/components/assets/icon-email';
import IconFacebook from 'src/components/assets/icon-facebook';
import IconGitHub from 'src/components/assets/icon-github';
import IconTwitter from 'src/components/assets/icon-twitter';
import { t } from 'src/i18n';
import styled from 'src/styling';

import { AppContext } from './context';

interface Props {
  className?: string;
}

const SocialIcons = (props: Props) => {
  const { className } = props;
  return (
    <AppContext.Consumer>
      {({ lang }) => (
        <div className={className}>
          <a
            href="https://www.facebook.com/Reach4HelpOrg/"
            title={t(lang, s => s.social.facebook)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconFacebook />
          </a>
          <a
            href="https://twitter.com/reach4helporg"
            title={t(lang, s => s.social.twitter)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconTwitter />
          </a>
          <a
            href="https://github.com/reach4help/reach4help"
            title={t(lang, s => s.social.github)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconGitHub />
          </a>
          <a
            href="mailto:info@reach4help.org"
            title={t(lang, s => s.social.email)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconEmail />
          </a>
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default styled(SocialIcons)`
  margin: 0 -9px;

  > a {
    display: block;
    height: 20px;
    width: 20px;
    color: inherit !important;
    opacity: 0.85;
    padding: 0 9px;

    svg {
      width: 100%;
    }

    &:hover {
      opacity: 1;
    }
  }
`;
