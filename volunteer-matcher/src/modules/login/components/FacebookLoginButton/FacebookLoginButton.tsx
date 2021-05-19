import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import FacebookLogo from './icons8-facebook.svg';

const FBButton = (props: any) => {
  const { onClick } = props;

  const { t } = useTranslation();

  return (
    <Button
      type="default"
      onClick={onClick}
      block
      style={{
        marginBottom: '8px',
        paddingLeft: '10px',
        paddingRight: '10px',
        background: '#3B5998',
        color: 'white',
      }}
      size="large"
    >
      <img
        src={FacebookLogo}
        alt="Facebook Logo"
        width="22px"
        height="22px"
        style={{ margin: '0 10px 3px 0' }}
      />
      <b>{t('login.facebookButtonLabel')}</b>
    </Button>
  );
};

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
  onAuthenticate,
}): React.ReactElement => (
  <>
    <FBButton onClick={onAuthenticate} />
  </>
);

interface FacebookLoginButtonProps {
  onAuthenticate: Function;
}

export default FacebookLoginButton;
