import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Login from 'src/components/Login/Login';
import { loginAction } from 'src/ducks/auth/actions';
import { AppState } from 'src/store';

import { LoginRedirectProps } from './constants';

const LoginContainer: React.FC<LoginRedirectProps> = ({ redirectBack = '/' }) => {
  const dispatch = useDispatch();
  const token = useSelector((state: AppState) => state.auth.token);
  const history = useHistory();

  const handleLoginFacebook = (values: any) => {
    dispatch(loginAction({
      facebookAuthToken: values.accessToken,
      userId: values.userID,
    }));
  };

  if (token) {
    history.replace(redirectBack);
  }

  return (
    <>
      <Login onLoginFacebook={handleLoginFacebook} />
    </>
  );
};

LoginContainer.propTypes = {
};

export default LoginContainer;
