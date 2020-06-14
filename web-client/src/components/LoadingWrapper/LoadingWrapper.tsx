import React from 'react';
import { useTranslation } from 'react-i18next';
import LoadingLogo from 'src/assets/loadinglogo.svg';
import styled from 'styled-components';

const LoadingWrapperContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  children,
}): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <LoadingWrapperContainer>
      <img src={LoadingLogo} alt={t('components.loading_a11y_message')} />
      {children}
    </LoadingWrapperContainer>
  );
};

interface LoadingWrapperProps {
  children?: React.ReactNode;
}

export default LoadingWrapper;
