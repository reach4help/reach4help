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

const PostLocationStep: React.FC<PostLocationStepProps> = ({
  addresses,
  postLocation,
  postDetails,
  setPostLocation,
  setShowNewAddressModal,
  nextHandler,
  prevHandler,
}) => {
  const mapHeight = '250px';
  const handleAddressChange = value => {
    if (value === 'add') {
      setShowNewAddressModal(true);
    } else {
      setShowNewAddressModal(false);
      addresses && setPostLocation(addresses[value]);
    }
  };

  const MapDiv = styled.div`
    height: ${mapHeight};
    margin-bottom: 20px;
  `;
  return (
    <PostLocationWrapper>
      <MapDiv>
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
      </MapDiv>
      <TitleWithUnderline level={3} color={COLORS.primaryDark}>
        Location for {postDetails.title}
      </TitleWithUnderline>
      <LocationFormDiv>
        <b>Choose an Address:</b>
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
    </PostLocationWrapper>
  );
};

const LocationFormDiv = styled.div`
  margin: 10px auto;
  width: 80%;
`;
const PostLocationWrapper = styled.div`
  height: 100%;
`;

const DisplayedButton = styled(Button)`
  margin: 5px 0;
  flex: 1 1 1;
`;

const ChooserDiv = styled.div`
  margin-bottom: 20px;
`;

interface PostLocationStepProps {
  addresses: Record<string, IUserAddress> | undefined;
  postLocation: any;
  postDetails: any;
  setShowNewAddressModal: (any) => void;
  setPostLocation: (any) => void;
  nextHandler: (any) => void;
  prevHandler: () => void;
}

export default PostLocationStep;
