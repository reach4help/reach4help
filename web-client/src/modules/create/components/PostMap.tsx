import { Button, Select } from 'antd';
import React, { useState } from 'react';
import TitleWithUnderline from 'src/components/TitleWithUnderline/TitleWithUnderline';
import { IUserAddress } from 'src/models/users/privilegedInformation';
import { AddressDisplay } from 'src/modules/create/components/AddressDisplay';
import { NewAddressModal } from 'src/modules/create/components/NewAddressModal';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

import WebClientMap from '../../../components/WebClientMap/WebClientMap';

const PostMap: React.FC<PostMapProps> = ({
  addresses,
  postLocation,
  postDetails,
  setPostLocation,
  nextHandler,
  prevHandler,
}) => {
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const modalSuccess = value => {
    setPostLocation(value);
    setShowAddressModal(false);
  };
  const closeModal = () => {
    setShowAddressModal(false);
  };

  const handleNameChange = value => {
    if (value === 'add') {
      setShowAddressModal(true);
    } else {
      setShowAddressModal(false);
      addresses && setPostLocation(addresses[value]);
    }
  };

  return (
    <PostMapWrapper>
      {postLocation.coords && (
        <div style={{ height: '35%' }}>
          <WebClientMap
            height="35%"
            destinations={[]}
            zoom={12}
            canRelocate={false}
            origin={{
              lat: postLocation.coords.latitude,
              lng: postLocation.coords.longitude,
            }}
          />
        </div>
      )}
      <div>
        <TitleWithUnderline level={2} color={COLORS.primaryDark}>
          Location for {postDetails.title}
        </TitleWithUnderline>
        Choose an Address:
        <ChooserDiv>
          <Select
            style={{ width: 360 }}
            onChange={handleNameChange}
            defaultValue={postLocation.name}
          >
            {Object.keys(addresses || {}).map(addresskey => (
              <Select.Option key={addresskey} value={addresskey}>
                {addresskey}
              </Select.Option>
            ))}
            <Select.Option value="add">Add a new one</Select.Option>
          </Select>
        </ChooserDiv>
        <AddressDisplay location={postLocation} />
      </div>
      <ButtonsDisplay>
        <DisplayedButton type="default" block onClick={prevHandler}>
          Back
        </DisplayedButton>

        <DisplayedButton type="primary" block onClick={nextHandler}>
          Next
        </DisplayedButton>
      </ButtonsDisplay>
      <NewAddressModal
        visible={showAddressModal}
        closeModal={closeModal}
        modalSuccess={modalSuccess}
      />
    </PostMapWrapper>
  );
};

const PostMapWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
`;

const ButtonsDisplay = styled.div`
  display: flex;
  margin-bottom: 150px;
`;

const DisplayedButton = styled(Button)`
  margin: 5px 0;
  flex: 1 1 1;
`;

const ChooserDiv = styled.div`
  margin: 20px;
`;

interface PostMapProps {
  addresses: Record<string, IUserAddress> | undefined;
  postLocation: any;
  postDetails: any;
  setPostLocation: (any) => void;
  nextHandler: (any) => void;
  prevHandler: () => void;
}

export default PostMap;
