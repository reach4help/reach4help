import { Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StepBackButton, StepForwardButton } from 'src/components/Buttons';
import styled from 'styled-components';

import TitleWithAddon from '../../../../components/TitleWithAddon/TitleWithAddon';

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 10px;
`;

const StyledTitle = styled.h4`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 5px;
`;

const StyledText = styled.p`
  margin-bottom: 3px;
  font-family: Roboto, sans-serif;
`;

export interface RequestInput {
  type: string;
  other: string;
  description: string;
  streetAddress: string;
}

export interface RequestReviewProps {
  isSubmitting: boolean;
  request: RequestInput;
  saveRequest: Function;
  goBack: Function;
}

const RequestReview: React.FC<RequestReviewProps> = ({
  isSubmitting,
  request,
  saveRequest,
  goBack,
}): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <MainDiv>
      <TitleWithAddon alignAddon="left" level={3} left="0%" transform="none">
        {t('newRequest.title')}
      </TitleWithAddon>
      <StyledTitle style={{ color: 'rgba(0, 0, 0, 1)', marginTop: '20px' }}>
        {t('requestReview.deliveryAddress')}
      </StyledTitle>
      <StyledText
        style={{
          color: 'rgba(0, 0, 0, 0.85)',
          marginBottom: '20px',
        }}
      >
        {request.streetAddress}
      </StyledText>
      <StyledTitle style={{ color: 'rgba(0, 0, 0, 1)' }}>
        {request.type === 'Deliveries' ? request.type : request.other}
      </StyledTitle>
      <StyledText
        style={{
          color: 'rgba(0, 0, 0, 0.85)',
          marginBottom: '20px',
        }}
      >
        {request.description}
      </StyledText>
      <Row>
        <Col span={6}>
          <StepBackButton onClick={() => goBack()}>
            {t('requestReview.back')}
          </StepBackButton>
        </Col>
        <Col span={16} offset={2}>
          <StepForwardButton
            loading={isSubmitting}
            onClick={() => saveRequest(request)}
          >
            {t('requestReview.submit')}
          </StepForwardButton>
        </Col>
      </Row>
    </MainDiv>
  );
};

export default RequestReview;
