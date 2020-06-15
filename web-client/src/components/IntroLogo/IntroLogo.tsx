import React from 'react';
import styled from 'styled-components';

const IntroLogo: React.FC<IntroLogoProps> = ({
  src,
  alt,
}): React.ReactElement => <Logo src={src} alt={alt} />;

const Logo = styled.img`
  height: 125px;
  width: 125px;
`;

interface IntroLogoProps {
  src: string;
  alt: string;
}

export default IntroLogo;
