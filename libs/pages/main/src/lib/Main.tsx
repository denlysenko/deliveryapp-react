import React, { useState, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Sidebar } from 'primereact/sidebar';

import { Spinner } from '@deliveryapp/ui';

import { StyledMain } from './StyledMain';
import { AppMenu } from './AppMenu/AppMenu';
import { TopBar } from './TopBar/TopBar';

const Profile = lazy(() =>
  import('@deliveryapp/pages/profile').then(({ Profile }) => ({
    default: Profile
  }))
);

const CreateOrder = lazy(() =>
  import('@deliveryapp/pages/create-order').then(({ CreateOrder }) => ({
    default: CreateOrder
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
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/orders/create">
                <CreateOrder />
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
