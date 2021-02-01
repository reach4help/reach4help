import { Select } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import logoLarge from 'src/assets/logoLarge.png';
import { ContinueButton, ContinueButtonWrapper } from 'src/components/Buttons';
import {
  Explanation,
  H6Font,
  LogoWrapper,
  StepWrapper,
} from 'src/components/figma/';
import TitleWithUnderline from 'src/components/TitleWithUnderline/TitleWithUnderline';
import CONSTANTS from 'src/constants';

const { LANGUAGE_PREFERENCE_LOCALSTORAGE_KEY } = CONSTANTS;

const { Option } = Select;

const Step1SelectLanguage: React.FC<Step1SelectLanguageProps> = ({
  incrementStep,
}): React.ReactElement<Step1SelectLanguageProps> => {
  const { t, i18n } = useTranslation();

  /*  We are only using 2-digit language codes for now
  Both 'pt-BR' and 'pt-PT' will be standardized to 'pt' */
  let { language: currentLanguage } = i18n;
  currentLanguage = currentLanguage.substr(0, 2);

  const setBrowserDefaultLanguage = val => {
    localStorage.setItem(LANGUAGE_PREFERENCE_LOCALSTORAGE_KEY, val);
    i18n.changeLanguage(val);
  };

  return (
    <StepWrapper style={{ paddingBottom: '10px' }}>
      <LogoWrapper>
        <img src={logoLarge} alt="logo" height="125px" width="125px" />
      </LogoWrapper>
      <div style={{ paddingBottom: '5px' }}>
        <Explanation style={{ padding: 0 }}>
          <H6Font>{t('login.steps.0_welcome.welcome')}</H6Font>
        </Explanation>
        <Explanation style={{ padding: 0 }}>
          <H6Font>{t('login.steps.2_explanation.purpose')}</H6Font>
        </Explanation>
      </div>
      <TitleWithUnderline level={2}> </TitleWithUnderline>

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
          option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
      <ContinueButtonWrapper>
        <ContinueButton type="primary" onClick={incrementStep} size="large">
          {t('login.steps.continue')}
        </ContinueButton>
      </ContinueButtonWrapper>
    </StepWrapper>
  );
};

const allLanguages = [
  {
    '1': 'en',
    '2': 'eng',
    '3': 'eng',
    name: 'English',
    local: 'English',
    '2T': 'eng',
    '2B': 'eng',
  },
  {
    '1': 'fr',
    '2': 'fra',
    '3': 'fra',
    name: 'French',
    local: 'Français',
    '2T': 'fra',
    '2B': 'fre',
  },
  {
    '1': 'pt',
    '2': 'por',
    '3': 'por',
    name: 'Portuguese',
    local: 'Português',
    '2T': 'por',
    '2B': 'por',
  },
  {
    '1': 'es',
    '2': 'spa',
    '3': 'spa',
    name: 'Spanish',
    local: 'Español',
    '2T': 'spa',
    '2B': 'spa',
  },
];

interface Step1SelectLanguageProps {
  incrementStep: (Event) => void;
}

export default Step1SelectLanguage;
