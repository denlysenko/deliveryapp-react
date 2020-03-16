import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ACCESS_TOKEN } from '@deliveryapp/common';
import {
  AuthCredentials,
  login,
  LoginError,
  register,
  ValidationError
} from '@deliveryapp/data-access';

import { AuthForm } from './AuthForm/AuthForm';
import { StyledAuth } from './StyledAuth';

export const Auth: React.FC = () => {
  const history = useHistory();

  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<LoginError | ValidationError | null>(null);

  const toggleMode = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsLoggingIn(loggingIn => !loggingIn);
    setError(null);
  };

  const handleSubmit = async (credentials: AuthCredentials) => {
    setLoading(true);

    try {
      const { data } = isLoggingIn
        ? await login({
            email: credentials.email,
            password: credentials.password
          })
        : await register(credentials);

      localStorage.setItem(ACCESS_TOKEN, data.token);
      history.push('/');
    } catch (err) {
      setLoading(false);
      setError(err.response.data);
    }
  };

  return (
    <StyledAuth>
      <div className="login-panel ui-fluid">
        <div className="ui-g">
          <div className="ui-g-12 logo-container">
            <i className="fa fa-shield"></i>
            <i className="fa fa-sign-in"></i>
            <h2 data-testid="title">
              {isLoggingIn ? 'Login' : 'Register'}
              <a href="/" onClick={toggleMode} data-testid="mode-toggler">
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
