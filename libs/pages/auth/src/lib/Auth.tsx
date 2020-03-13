import React, { useState } from 'react';

import { AuthCredentials } from '@deliveryapp/data-access';

import { AuthForm } from './AuthForm/AuthForm';
import { StyledAuth } from './StyledAuth';

export const Auth = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleMode = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsLoggingIn(loggingIn => !loggingIn);
  };

  const handleSubmit = (data: AuthCredentials) => {
    console.log(data);
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
