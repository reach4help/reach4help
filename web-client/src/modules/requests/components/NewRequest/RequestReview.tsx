import { Button, Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
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

const StyledButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export interface RequestInput {
  type: string;
  other: string;
  description: string;
  streetAddress: string;
}

export interface RequestReviewProps {
  request: RequestInput;
  saveRequest: Function;
  goBack: Function;
}

const RequestReview: React.FC<RequestReviewProps> = ({
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
          <StyledButton onClick={() => goBack()}>
            {t('requestReview.back')}
          </StyledButton>
        </Col>
        <Col span={16} offset={2}>
          <StyledButton
            style={{
              background: '#52C41A',
              color: '#FFFFFF',
            }}
            onClick={() => saveRequest(request)}
          >
            {t('requestReview.submit')}
          </StyledButton>
        </Col>
      </Row>
    </MainDiv>
  );
};

export default RequestReview;
