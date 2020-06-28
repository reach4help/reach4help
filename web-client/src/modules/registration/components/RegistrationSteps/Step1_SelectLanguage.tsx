import { Select } from 'antd';
import langs from 'langs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CONSTANTS from 'src/constants';
import styled from 'styled-components';

const { LANGUAGE_PREFERENCE_LOCALSTORAGE_KEY } = CONSTANTS;

/* we are only using 2-digit language codes for now
  Both 'pt-BR' and 'pt-PT' will be standardized to 'pt'
  */
const { Option } = Select;

const Step0: React.FC = (): React.ReactElement => {
  const { t, i18n } = useTranslation();

  let { language: currentLanguage } = i18n;
  currentLanguage = currentLanguage.substr(0, 2);

  const allLanguages = langs.all();

  const setBrowserDefaultLanguage = val => {
    localStorage.setItem(LANGUAGE_PREFERENCE_LOCALSTORAGE_KEY, val);
    i18n.init();
  };

  return (
    <StepWrapper>
      <Explanation>
        <H6>{t('login.steps.0_welcome.welcome')}</H6>
      </Explanation>
      <Select
        defaultValue={currentLanguage}
        showSearch
        style={{
          margin: 'auto',
          width: '200px',
        }}
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
      <Explanation>
        <H6>{t('login.steps.2_explanation.purpose')}</H6>
      </Explanation>
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
  display: flex;
  flex-direction: column;
  margin-top: 25px;

  /*  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
  */
`;

const Explanation = styled('div')`
  margin-bottom: 50px;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
`;

export default Step0;
