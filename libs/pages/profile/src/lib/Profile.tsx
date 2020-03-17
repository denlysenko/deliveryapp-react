import React from 'react';

import { Button } from 'primereact/button';

import { Roles } from '@deliveryapp/common';
import { useAuth } from '@deliveryapp/data-access';

import { StyledProfile } from './StyledProfile';

export const Profile = () => {
  const [{ user }] = useAuth();

  return (
    <StyledProfile>
      <div className="ui-g">
        <div
          className={`ui-g-12 ${user?.role} !== ${Roles.CLIENT} ? ui-lg-4 : ''`}
        >
          <div className="card no-margin-bottom">
            <h2>Profile</h2>
          </div>
        </div>
        <form id="profileForm">
          <div className="ui-g-12 ui-lg-4">
            <div className="card">
              <div>contacts form goes here</div>
              <div>password form goes here</div>
            </div>
          </div>

          {user?.role === Roles.CLIENT && (
            <div className="ui-g-12 ui-lg-4">
              <div className="card">
                <div>Address form goes here</div>
              </div>
            </div>
          )}
          {user?.role === Roles.CLIENT && (
            <div className="ui-g-12 ui-lg-4">
              <div className="card">bank details forms goes here</div>
            </div>
          )}
        </form>
        <div
          className={`ui-g-12 ${user?.role} !== ${Roles.CLIENT} ? ui-lg-4 : ''`}
        >
          <div className="card no-margin-bottom center">
            <Button
              label="Save"
              type="submit"
              form="profileForm"
              className="blue-btn p-button-raised"
            />
          </div>
        </div>
      </div>
    </StyledProfile>
  );
};
