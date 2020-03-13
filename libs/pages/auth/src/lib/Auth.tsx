import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthCredentials, login, register } from '@deliveryapp/data-access';

import { AuthForm } from './AuthForm/AuthForm';
import { StyledAuth } from './StyledAuth';

export const Auth = () => {
  const history = useHistory();

  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const toggleMode = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsLoggingIn(loggingIn => !loggingIn);
  };

  const handleSubmit = (data: AuthCredentials) => {
    const request = isLoggingIn ? login(data) : register(data);
    setLoading(true);
    request
      .then(data => {
        console.log(data);
        setLoading(false);
        // localStorage.setItem('accessToken', data.token)
        history.push('/');
      })
      .catch(err => {
        setLoading(false);
        setError(err.response.data);
      });
  };

  return (
    <StyledAuth>
      <div className="login-panel ui-fluid">
        <div className="ui-g">
          <div className="ui-g-12 logo-container">
            <i className="fa fa-shield"></i>
            <i className="fa fa-sign-in"></i>
            <h2>
              {isLoggingIn ? 'Login' : 'Register'}
              <a href="/" onClick={toggleMode}>
                {isLoggingIn ? 'Register' : 'Login'}
              </a>
            </h2>
          </div>
          <AuthForm
            isLoggingIn={isLoggingIn}
            loading={loading}
            error={error}
            onFormSubmit={handleSubmit}
          />
        </div>
      </div>
    </StyledAuth>
  );
};
