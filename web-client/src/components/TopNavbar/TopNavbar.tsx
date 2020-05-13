import { Typography } from 'antd';
import React from 'react';
import Logo from 'src/assets/logo.svg';
import styled from 'styled-components';

const { Text } = Typography;

const TopNavbar: React.FC = () => (
  <TopNavbarWrapper>
    <IconImg src={Logo} />
    <IconText>
      Reach<TextOrange>4</TextOrange>Help
    </IconText>
  </TopNavbarWrapper>
);

const TopNavbarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  background: radial-gradient(
    50% 1712.04% at 50.13% 50%,
    #811e78 22.4%,
    #a12596 100%
  );
  z-index: 999;
`;

const IconImg = styled.img`
  width: 32px;
  height: 32px;
`;

const IconText = styled(Text)`
  color: white;
  padding: 5px;
`;

const TextOrange = styled(Text)`
  color: #ff7b02;
`;

export default TopNavbar;
