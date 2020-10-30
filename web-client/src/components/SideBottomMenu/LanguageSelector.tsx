import { GlobalOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CONSTANTS from 'src/constants';

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
    <>
      <GlobalOutlined />
      <Select
        defaultValue={currentLanguage}
        showSearch
        style={{
          margin: 'auto',
          marginTop: '20px',
          width: '100%',
        }}
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
      </Select>
    </>
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
