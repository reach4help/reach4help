import React from 'react';
import { getI18n, useTranslation } from 'react-i18next';

const Index: React.FC = () => {
  const { t } = useTranslation();

  const toggleLanguage = () => {
    const i18n = getI18n();

    i18n.changeLanguage(i18n.language === 'en' ? 'pt' : 'en');
  };

  return (
    <>
      <h3>{t('welcome')}</h3>
      <button type="button" onClick={toggleLanguage}>Toggle Language</button>
    </>
  );
};

export default Index;
