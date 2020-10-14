import React from 'react';
import { useTranslation } from 'react-i18next';
import LoadingLogo from 'src/assets/loadinglogo.svg';
import styled from 'styled-components';

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  // children is a ReactProp which is the children of the element that calls this component
  children,
}): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <LoadingWrapperWrapper>
      <img src={LoadingLogo} alt={t('components.loading_a11y_message')} />
      {children}
    </LoadingWrapperWrapper>
  );
};

const LoadingWrapperWrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

interface LoadingWrapperProps {
  children?: React.ReactNode;
}

export default LoadingWrapper;
