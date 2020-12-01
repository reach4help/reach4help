import { GlobalOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CONSTANTS from 'src/constants';
import styled from 'styled-components';

const { LANGUAGE_PREFERENCE_LOCALSTORAGE_KEY } = CONSTANTS;

const { Option } = Select;

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  let { language: currentLanguage } = i18n;

  currentLanguage = currentLanguage.substr(0, 2);

  const setBrowserDefaultLanguage = val => {
    localStorage.setItem(LANGUAGE_PREFERENCE_LOCALSTORAGE_KEY, val);
    i18n.changeLanguage(val);
  };

  return (
    <SelectorContainer>
      <GlobalOutlinedIcon />
      <SelectLanguage
        defaultValue={currentLanguage}
        showSearch
        style={{
          margin: 'auto',
          marginTop: '20px',
          width: '100%',
        }} // TODO: Refactor this style based on the style of the styled component
        size="large"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().indexOf(input.toLowerCase()) >=
          // eslint-disable-next-line react/jsx-indent
          0
        }
        onChange={v => setBrowserDefaultLanguage(v.toString())}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */
        allLanguages.map(language => (
          <Option key={language['1']} value={language['1']}>
            {language.local}
          </Option>
        ))}
      </SelectLanguage>
    </SelectorContainer>
  );
};

const allLanguages = [
  {
    '1': 'en',
    '2': 'eng',
    '3': 'eng',
    name: 'EN',
    local: 'EN',
    '2T': 'eng',
    '2B': 'eng',
  },
  {
    '1': 'fr',
    '2': 'fra',
    '3': 'fra',
    name: 'FR',
    local: 'FR',
    '2T': 'fra',
    '2B': 'fre',
  },
  {
    '1': 'pt',
    '2': 'por',
    '3': 'por',
    name: 'ES',
    local: 'PT',
    '2T': 'por',
    '2B': 'por',
  },
  {
    '1': 'es',
    '2': 'spa',
    '3': 'spa',
    name: 'ES',
    local: 'ES',
    '2T': 'spa',
    '2B': 'spa',
  },
];

const SelectLanguage = styled(Select)`
  max-width: 75px;
  border: none;
  position: relative;
  bottom: 15%;

  .ant-select-selector {
    border: none !important;
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 700;

    @media (min-width: 918px) {
      font-size: 16px;
      position: relative;
      top: 3px;
      right: 0.6px;
    }
  }

  .ant-select-arrow {
    color: black;

    @media (min-width: 918px) {
      position: relative;
      left: 32px;
      bottom: 32px;
    }
  }
`;

const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 115px;
  position: relative;
  left: 14%;
  bottom: 20%;

  @media (min-width: 918px) {
    left: 7.5%;
  }
`;

const GlobalOutlinedIcon = styled(GlobalOutlined)`
  transform: scale(1.7);
  position: relative;
  right: -7px;
`;
