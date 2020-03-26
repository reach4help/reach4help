import { Button } from 'antd';
import React from 'react';
import FacebookAuth from 'react-facebook-auth';
import { getI18n, useTranslation } from 'react-i18next';

const MyFacebookButton = (props: any) => {
  const { onClick } = props;
  return (
    <Button onClick={onClick}>
      Login with facebook
    </Button>
  );
};

const Index: React.FC = () => {
  const { t } = useTranslation();

  const toggleLanguage = () => {
    const i18n = getI18n();

    i18n.changeLanguage(i18n.language === 'en' ? 'pt' : 'en');
  };
  const authenticate = (res: any) => {
    alert(JSON.stringify(res));
  };
  return (
    <>
      <h3>{t('welcome')}</h3>
      <button type="button" onClick={toggleLanguage}>Toggle Language</button>
      <div>
        Reach4Help
        <MyFacebookButton />
        <FacebookAuth
          appId={process.env.REACT_APP_FACEBOOK_APP_ID}
          callback={authenticate}
          component={MyFacebookButton}
        />
      </div>
    </>
  );
};

export default Index;
