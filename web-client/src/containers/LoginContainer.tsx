import React from 'react';
import { useDispatch } from 'react-redux';
import Login from 'src/components/Login/Login';
import { loginAction } from 'src/ducks/auth/actions';

const LoginContainer: React.FC = () => {
  const dispatch = useDispatch();

  const handleLoginFacebook = (values: any) => {
    dispatch(loginAction({
      facebookAuthToken: values.accessToken,
      userId: values.userID,
    }));
  };

  return (
    <>
      <Login onLoginFacebook={handleLoginFacebook} />
    </>
  );
};

LoginContainer.propTypes = {
};

export default LoginContainer;
