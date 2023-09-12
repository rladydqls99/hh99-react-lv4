import React from 'react';
import { Route } from 'react-router-dom';
import { getCookie } from '../cookie/cookie';
import Main from '../pages/Main';
import Login from '../pages/Login';

function PrivateRoute() {
  const isLogin = () => {
    return getCookie('accessToken') ? true : false;
  };

  return (
    <Route
      render={(props) => {
        isLogin() ? <Main /> : <Login />;
      }}
    />
  );
}

export default PrivateRoute;
