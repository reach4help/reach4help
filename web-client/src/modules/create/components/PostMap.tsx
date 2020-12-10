import { Button, Select } from 'antd';
import React from 'react';
import TitleWithOrangeUnderline from 'src/components/TitleWithOrangeUnderline/TitleWithOrangeUnderline';
import { IUserAddress } from 'src/models/users/privilegedInformation';
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
  const handleChange = value => {
    addresses && setPostLocation(addresses[value]);
  };

  const { title } = postDetails;

  const ChooserDiv = styled.div`
    margin: 20px;
  `;

  return (
    <div
      style={{
        height: 'calc(100%)',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: '#f8f8f8',
      }}
    >
      {postLocation.coords && (
        <div style={{ height: '40%' }}>
          <WebClientMap
            height="40%"
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
        <TitleWithOrangeUnderline level={2} color={COLORS.primaryDark}>
          Location for {title}
        </TitleWithOrangeUnderline>
        Choose an Address:
        <ChooserDiv>
          <Select
            style={{ width: 360 }}
            onChange={handleChange}
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
      <div
        style={{
          display: 'flex',
          marginBottom: '150px',
        }}
      >
        <Button
          type="default"
          block
          onClick={prevHandler}
          style={{ marginRight: '5px', flexGrow: 1 }}
        >
          Back
        </Button>

        <Button
          type="primary"
          block
          style={{ marginLeft: '5px', flexGrow: 1 }}
          onClick={nextHandler}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const AddressDisplay = ({ location }) => (
  <div>
    <div>address 1{location.address1}</div>
    <div>{location.address2}</div>
    <div>
      {location.city}, {location.state}
    </div>
    <div>{location.country}</div>
    <div>{location.postalCode}</div>
  </div>
);

interface PostMapProps {
  addresses: Record<string, IUserAddress> | undefined;
  postLocation: any;
  postDetails: any;
  setPostLocation: (any) => void;
  nextHandler: (any) => void;
  prevHandler: () => void;
}

export default PostMap;
