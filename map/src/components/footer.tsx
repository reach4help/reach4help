import React from 'react';
import { t } from 'src/i18n';

import styled from '../styling';
import { AppContext } from './context';

const FooterWrapper = styled.footer`
  display: flex;
  padding: ${p => p.theme.spacingPx * 0.75}px;
  background: ${p => p.theme.bg};
  border-top: ${p => p.theme.borderLight};
  font-size: 0.8rem;

  .grow {
    flex-grow: 1;
  }

  > a {
    margin-left: ${p => p.theme.spacingPx}px;
  }
`;

const Footer = () => (
  <AppContext.Consumer>
    {({ lang }) => (
      <FooterWrapper>
        <div className="grow">
          {t(lang, s => s.footer.netlifyNote, {
            link: (
              <a href="https://www.netlify.com/">
                {t(lang, s => s.footer.natlifyLinkText)}
              </a>
            ),
          })}
          <span aria-label="heart emoji" role="img">
            &nbsp;❤️
          </span>
        </div>
        <a href="https://github.com/reach4help/reach4help/">
          {t(lang, s => s.footer.githubRepo)}
        </a>
        <a href="https://github.com/reach4help/reach4help/blob/master/CODE_OF_CONDUCT.md">
          {t(lang, s => s.footer.codeOfConduct)}
        </a>
      </FooterWrapper>
    )}
  </AppContext.Consumer>
);

export default Footer;
