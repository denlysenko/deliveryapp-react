import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Sidebar } from 'primereact/sidebar';

import { Profile } from '@deliveryapp/pages/profile';

import { StyledMain } from './StyledMain';
import { AppMenu } from './AppMenu/AppMenu';
import { TopBar } from './TopBar/TopBar';

export const Main = () => {
  const [showMessages, setShowMessages] = useState(false);

  return (
    <StyledMain>
      <div className="layout">
        <AppMenu />
        <TopBar showMessages={() => setShowMessages(true)} />
        <div className="content">
          <Switch>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
        </div>
      </div>
      <Sidebar
        visible={showMessages}
        position="right"
        onHide={() => setShowMessages(false)}
      >
        Messages goes here
      </Sidebar>
    </StyledMain>
  );
};
