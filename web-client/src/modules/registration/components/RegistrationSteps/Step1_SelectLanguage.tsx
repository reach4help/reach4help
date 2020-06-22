import { Select } from 'antd';
import langs from 'langs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CONSTANTS from 'src/constants';
import styled from 'styled-components';

const { localStorageKey } = CONSTANTS;

/* we are only using 2-digit language codes for now
  SELECT input below will get confused if it sees:
  > 'en-US'
  everything must be standardized to 
  > 'en'
  */
const { Option } = Select;

const Step0: React.FC = (): React.ReactElement => {
  const { t, i18n } = useTranslation();

  let { language: currentLanguage } = i18n;
  currentLanguage = currentLanguage.substr(0, 2);

  const allLanguages = langs.all();

  const setBrowserDefaultLanguage = val => {
    localStorage.setItem(localStorageKey, val);
    i18n.init();

    /*  TODO:  language should be changed immediately as well as in localStorage 
        both reload and don't change language
        i18n.init();
        changeLanguage(val)
          .then(t => console.log(`Changed language to ${val}`))
          .catch(err => console.error(`Error in ChangeLanguage ${err}`)); */
  };

  return (
    <StepWrapper>
      <LanguageSelectLabel>
        <H6>{t('login.steps.1_select_language.select_language_label')}</H6>
      </LanguageSelectLabel>
      <Select
        defaultValue={currentLanguage}
        showSearch
        style={{ width: 200 }}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onChange={v => setBrowserDefaultLanguage(v.toString())}
      >
        {allLanguages.map(language => (
          <Option key={language['1']} value={language['1']}>
            {language.name}
          </Option>
        ))}
      </Select>
    </StepWrapper>
  );
};

/* TODO: src/components/figma should be common library */
const H6 = styled.span`
  /* h6 */

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 26px;
  /* or 144% */

  text-align: center;
`;

const StepWrapper = styled('div')`
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
`;

const LanguageSelectLabel = styled('div')`
  margin-bottom: 10px;
`;

export default Step0;
