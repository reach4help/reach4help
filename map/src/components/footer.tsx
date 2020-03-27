import React from 'react';
import styled from '../styling';

const FooterWrapper = styled.footer`
  display: flex;
  height: 30px;
  background-color: #f6f6f6;
  color: #666;
  box-shadow: gba(0, 0, 0, 0.3) 0px 1px 4px;
  padding: 0 20px 0 20px;
  text-align: center;
  align-items: baseline;
  justify-content: space-between;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <div>
        Reach4Help Aid Map&nbsp;
        <a href="https://www.netlify.com/" style={{ fontStyle: 'italic' }}>
          site is Powered by Netlify&nbsp;
        </a>
        <span aria-label="heart emoji" role="img">
          ❤️
        </span>
      </div>
      <a
        href="https://github.com/reach4help/reach4help/blob/master/CODE_OF_CONDUCT.md"
        style={{ fontSize: 14 }}
      >
        Code of Conduct
      </a>
    </FooterWrapper>
  );
};

export default Footer;
