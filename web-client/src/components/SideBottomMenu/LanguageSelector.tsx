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
    <SelectLanguage
      defaultValue={currentLanguage}
      showSearch
      size="large"
      optionFilterProp="children"
      onChange={v => setBrowserDefaultLanguage(v.toString())}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */
      allLanguages.map(language => (
        <Option key={language['1']} value={language['1']}>
          <>
            <GlobalOutlined />
            &nbsp;
            {language.local}
          </>
        </Option>
      ))}
    </SelectLanguage>
  );
};

const allLanguages = [
  {
    '1': 'en',
    '2': 'eng',
    '3': 'eng',
    name: 'EN',
    local: 'English',
    '2T': 'eng',
    '2B': 'eng',
  },
  {
    '1': 'fr',
    '2': 'fra',
    '3': 'fra',
    name: 'FR',
    local: 'French',
    '2T': 'fra',
    '2B': 'fre',
  },
  {
    '1': 'pt',
    '2': 'por',
    '3': 'por',
    name: 'ES',
    local: 'Portuguese',
    '2T': 'por',
    '2B': 'por',
  },
  {
    '1': 'es',
    '2': 'spa',
    '3': 'spa',
    name: 'ES',
    local: 'Spanish',
    '2T': 'spa',
    '2B': 'spa',
  },
];

const SelectLanguage = styled(Select)`
  margin-top: 4px;
  color: black;
  font-weight: bold;
  font-size: 16px;

  .ant-select-selector {
    border: none !important;
  }

  .ant-select-arrow {
    color: black;
  }
`;
