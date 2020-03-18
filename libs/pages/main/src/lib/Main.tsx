import React, { useState, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Sidebar } from 'primereact/sidebar';

import { StyledMain } from './StyledMain';
import { AppMenu } from './AppMenu/AppMenu';
import { TopBar } from './TopBar/TopBar';

const Profile = lazy(() =>
  import('@deliveryapp/pages/profile').then(({ Profile }) => ({
    default: Profile
  }))
);

export const Main = () => {
  const [showMessages, setShowMessages] = useState(false);

  return (
    <StyledMain>
      <div className="layout">
        <AppMenu />
        <TopBar showMessages={() => setShowMessages(true)} />
        <div className="content">
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/profile">
                <Profile />
              </Route>
            </Switch>
          </Suspense>
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
