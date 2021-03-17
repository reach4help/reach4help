import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TitleWithUnderline from 'src/components/TitleWithUnderline/TitleWithUnderline';
import { IUserAddress } from 'src/models/users/privilegedInformation';
import {
  AddressDisplay,
  ButtonsContainer,
  DisplayButton,
  MapDisplay,
} from 'src/modules/create/components/DisplayElements';
import styled from 'styled-components';

const PostLocationStep: React.FC<PostLocationStepProps> = ({
  addresses,
  postLocation,
  setPostLocation,
  setShowNewAddressModal,
  setShowLocationPopup,
  nextHandler,
  prevHandler,
  postTypePrefix,
}) => {
  const { t } = useTranslation();

  const handleAddressChange = value => {
    if (value === 'add') {
      setShowNewAddressModal(true);
    } else {
      setShowNewAddressModal(false);
      addresses && setPostLocation(addresses[value]);
    }
  };

  return (
    <>
      <MapDisplay coords={postLocation.coords} />
      <TitleWithUnderline level={2}>
        {postTypePrefix} {t('modules.create.stepTitles.map')}
      </TitleWithUnderline>
      <form>
        <ChooserDiv>
          <Select
            style={{ width: '99%', margin: 'auto' }}
            onChange={handleAddressChange}
            defaultValue={postLocation.name}
          >
            {Object.keys(addresses || {}).map(addresskey => (
              <Select.Option key={addresskey} value={addresskey}>
                {addresskey}
              </Select.Option>
            ))}
            <Select.Option value="add">
              {t('modules.create.postLocation.add')}
            </Select.Option>
          </Select>
        </ChooserDiv>
        <AddressDisplay prefix={postTypePrefix} location={postLocation} />
      </form>
      <DisplayButton type="default" block onClick={setShowLocationPopup}>
        {t('modules.create.postLocation.public')}
      </DisplayButton>
      <ButtonsContainer>
        <DisplayButton
          type="default"
          block
          onClick={prevHandler}
          icon={<ArrowLeftOutlined />}
        >
          {t('back')}
        </DisplayButton>

        <DisplayButton
          type="primary"
          block
          icon={<ArrowRightOutlined />}
          onClick={nextHandler}
        >
          {t('next')}
        </DisplayButton>
      </ButtonsContainer>
    </>
  );
};

const ChooserDiv = styled.div`
  margin-bottom: 20px;
`;

interface PostLocationStepProps {
  addresses: Record<string, IUserAddress> | undefined;
  postLocation: any;
  setShowNewAddressModal: (any) => void;
  setShowLocationPopup: (any) => void;
  setPostLocation: (any) => void;
  nextHandler: (any) => void;
  prevHandler: () => void;
  postTypePrefix: string;
}

export default PostLocationStep;
