import { Button } from 'antd';
import React from 'react';
import FacebookAuth from 'react-facebook-auth';
import { useTranslation } from 'react-i18next';

const FBButton = (props: any) => {
  const { onClick } = props;

  const { t } = useTranslation();

  return (
    <Button type="primary" onClick={onClick}>
      {t('login.facebookButtonLabel')}
    </Button>
  );
};

const FacebookLoginButton: React.FC = (): React.ReactElement => {
  const authenticate = (res: any) => {
    alert(JSON.stringify(res));
  };
  return (
    <>
      <FacebookAuth
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        callback={authenticate}
        component={FBButton}
      />
    </>
  );
};

export default FacebookLoginButton;
