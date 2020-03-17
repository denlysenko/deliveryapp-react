import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

import { isNil } from 'lodash-es';

import { appMenu } from '@deliveryapp/common';
import { useAuth } from '@deliveryapp/data-access';

import { StyledAppMenu } from './StyledAppMenu';

export const AppMenu = () => {
  const [{ user }] = useAuth();

  const canSee = (roles: number[]): boolean =>
    !isNil(user) && roles.includes(user.role);

  return (
    <StyledAppMenu>
      <div className="menu-wrapper">
        <div className="menu-container">
          <ul className="menu">
            {appMenu.map(item =>
              canSee(item.allowedRoles) ? (
                <li key={item.label}>
                  <Link to={item.link} data-testid="link">
                    <Button
                      type="button"
                      icon={`fa ${item.icon}`}
                      tooltip={item.label}
                    />
                  </Link>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </StyledAppMenu>
  );
};
