import React from 'react';
import styled from '../styling';

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

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="grow">
        This map&nbsp;
        <a href="https://www.netlify.com/">is hosted by Netlify&nbsp;</a>
        <span aria-label="heart emoji" role="img">
          ❤️
        </span>
      </div>
      <a href="https://github.com/reach4help/reach4help/">GitHub Repo</a>
      <a href="https://github.com/reach4help/reach4help/blob/master/CODE_OF_CONDUCT.md">
        Code of Conduct
      </a>
    </FooterWrapper>
  );
};

export default Footer;
