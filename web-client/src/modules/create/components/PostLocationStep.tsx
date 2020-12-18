import { Button, Select } from 'antd';
import React from 'react';
import TitleWithUnderline from 'src/components/TitleWithUnderline/TitleWithUnderline';
import WebClientMap from 'src/components/WebClientMap/WebClientMap';
import { IUserAddress } from 'src/models/users/privilegedInformation';
import {
  AddressDisplay,
  ButtonsDisplay,
} from 'src/modules/create/components/DisplayElements';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

const PostMap: React.FC<PostMapProps> = ({
  addresses,
  postLocation,
  postDetails,
  setPostLocation,
  setShowNewAddressModal,
  nextHandler,
  prevHandler,
}) => {
  const mapHeight = '35%';
  const handleAddressChange = value => {
    if (value === 'add') {
      setShowNewAddressModal(true);
    } else {
      setShowNewAddressModal(false);
      addresses && setPostLocation(addresses[value]);
    }
  };

  return (
    <PostMapWrapper>
      <div style={{ height: mapHeight }}>
        {postLocation.coords && (
          <WebClientMap
            height={mapHeight}
            destinations={[]}
            zoom={12}
            canRelocate={false}
            origin={{
              lat: postLocation.coords.latitude,
              lng: postLocation.coords.longitude,
            }}
          />
        )}
      </div>
      <LocationFormDiv>
        <TitleWithUnderline level={2} color={COLORS.primaryDark}>
          Location for {postDetails.title}
        </TitleWithUnderline>
        Choose an Address:
        <ChooserDiv>
          <Select
            style={{ width: 360 }}
            onChange={handleAddressChange}
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
        <ButtonsDisplay>
          <DisplayedButton type="default" block onClick={prevHandler}>
            Back
          </DisplayedButton>

          <DisplayedButton type="primary" block onClick={nextHandler}>
            Next
          </DisplayedButton>
        </ButtonsDisplay>
      </LocationFormDiv>
    </PostMapWrapper>
  );
};

const LocationFormDiv = styled.div``;
const PostMapWrapper = styled.div`
  height: 100%;
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
  setShowNewAddressModal: (boolean) => void;
  setPostLocation: (any) => void;
  nextHandler: (any) => void;
  prevHandler: () => void;
}

export default PostMap;
