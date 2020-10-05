import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import styled from 'styled-components';

const ChangeAvatar: FC<ChangeAvatarProps> = ({ displayPicture }) => (
  <ChangeAvatarWrapper>
    <OptionWrapper>
      {displayPicture && displayPicture != null ? (
        <img src={displayPicture} alt="Avatar" />
      ) : (
        <UploadOutlined />
      )}
    </OptionWrapper>
    {displayPicture && (
      <OptionWrapper>
        <CloseOutlined />
      </OptionWrapper>
    )}
  </ChangeAvatarWrapper>
);

const ChangeAvatarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const OptionWrapper = styled.button`
  border: none;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin: 1em;
`;

interface ChangeAvatarProps {
  displayPicture?: string | null;
}

export default ChangeAvatar;
