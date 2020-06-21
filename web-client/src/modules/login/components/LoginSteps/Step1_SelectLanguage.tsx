import React from 'react';
import { useTranslation } from 'react-i18next';
import * as i18n from 'i18next';
import langs from 'langs';
import { Select } from 'antd';
import styled from 'styled-components';

const { Option } = Select;

const Step0: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();

  const allLanguages = langs.all();
  const currentLanguage = 'English';
  return (
    <StepWrapper>
      <LanguageSelectWrapper>
        <LanguageSelectLabel>
          {t('login.steps.1_select_language.select_language_label')}
        </LanguageSelectLabel>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder={t('should.be.current.language')}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={v => updateLanguage(v.toString())}
        >
          {// not correct. check contents of allLanguages array for options
          allLanguages.map(language => (
            <Option key={language['1']} value={language['1']}>
              {language.name}
            </Option>
          ))}
        </Select>
      </LanguageSelectWrapper>
    </StepWrapper>
  );
};

const updateLanguage = (newLang: string) => {
  console.log('new lang', newLang);
  /*    i18n.changeLanguage(newLang)
    .then(t=>
      console.log(t('hello world'))
    )
    .catch(err=>
      console.error('Error in ChangeLanguage', err);
    );
    */
};

const StepWrapper = styled('div')`
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
`;

const LanguageSelectWrapper = styled('div')``;
const LanguageSelectLabel = styled('div')``;

export default Step0;
