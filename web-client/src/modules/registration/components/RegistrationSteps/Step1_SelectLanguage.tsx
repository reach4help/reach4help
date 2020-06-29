import { Select } from 'antd';
import langs from 'langs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import logoLarge from 'src/assets/logoLarge.png';
import { H6Font } from 'src/components/figma/';
import CONSTANTS from 'src/constants';
import styled from 'styled-components';

const { LANGUAGE_PREFERENCE_LOCALSTORAGE_KEY } = CONSTANTS;

const { Option } = Select;

const Step0: React.FC = (): React.ReactElement => {
  const { t, i18n } = useTranslation();

  /*  We are only using 2-digit language codes for now
  Both 'pt-BR' and 'pt-PT' will be standardized to 'pt' */
  let { language: currentLanguage } = i18n;
  currentLanguage = currentLanguage.substr(0, 2);

  const allLanguages = langs.all();

  const setBrowserDefaultLanguage = val => {
    localStorage.setItem(LANGUAGE_PREFERENCE_LOCALSTORAGE_KEY, val);
    i18n.init();
  };

  return (
    <StepWrapper>
      <LogoWrapper>
        <img src={logoLarge} alt="logo" height="125px" width="125px" />
      </LogoWrapper>
      <Explanation>
        <H6Font>{t('login.steps.0_welcome.welcome')}</H6Font>
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
        <H6Font>{t('login.steps.2_explanation.purpose')}</H6Font>
      </Explanation>
    </StepWrapper>
  );
};

const LogoWrapper = styled('div')`
  display: flex;
  justify-content: space-around;
`;

const StepWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

const Explanation = styled('div')`
  margin-bottom: 50px;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  text-align: center;
`;

export default Step0;
