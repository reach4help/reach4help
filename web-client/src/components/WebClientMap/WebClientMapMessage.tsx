import React from 'react';
import styled from 'styled-components';

const WebmapBannerContainer = styled.div`
  padding-left: 20px;
  padding-top: 7px;
  padding-bottom: 7px;

  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  /* identical to box height, or 157% */

  color: #ffffff;
  background: rgba(129, 30, 119, 0.75);
  opacity: 80%;
  width: 100%;
`;

const WebClientMapMessage = ({ message }) => {
  if (!message) {
    return null;
  }
  return <WebmapBannerContainer>{message}</WebmapBannerContainer>;
};

export default WebClientMapMessage;
