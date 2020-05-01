// import { Button, Checkbox, Descriptions, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TitleWithAddon from 'src/components/TitleWithAddon/TitleWithAddon';
import styled from 'styled-components';

import { DEVICE_MAX } from '../../../../constants/mediaQueries';
// import { COLORS } from '../../../../theme/colors';

const MainDiv = styled.div`
  display: flex;
  @media ${DEVICE_MAX.tablet} {
    flex-direction: column;
    align-items: center;
  }
`;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NewRequestSuccessProps {}

const NewRequest: React.FC<NewRequestSuccessProps> = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <MainDiv>
      <TitleWithAddon level={1}>{t('newRequestSuccess.title')}</TitleWithAddon>
    </MainDiv>
  );
};

export default NewRequest;
