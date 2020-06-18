import { Button } from 'antd';
import React from 'react';
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
