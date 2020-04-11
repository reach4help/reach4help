import React from 'react';
import styled from 'styled-components';

const Logo = styled.img`
  height: 125px;
  width: 125px;
`;
interface WrapperProps {
  src: string;
  alt: string;
}

const IntroLogo: React.FC<WrapperProps> = ({
  src,
  alt,
}): React.ReactElement => <Logo src={src} alt={alt} />;

export default IntroLogo;
