import React, { lazy, Suspense, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Sidebar } from 'primereact/sidebar';

import { OrdersProvider } from '@deliveryapp/data-access';
import { Orders } from '@deliveryapp/pages/orders';
import { FullPageSpinner } from '@deliveryapp/ui';

import { AppMenu } from './AppMenu/AppMenu';
import { StyledMain } from './StyledMain';
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

const UpdateOrder = lazy(() =>
  import('@deliveryapp/pages/update-order').then(({ UpdateOrder }) => ({
    default: UpdateOrder
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
          <Suspense fallback={<FullPageSpinner />}>
            <OrdersProvider>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/orders" />
                </Route>
                <Route exact path="/profile">
                  <Profile />
                </Route>
                <Route exact path="/orders">
                  <Orders />
                </Route>
                <Route exact path="/orders/create">
                  <CreateOrder />
                </Route>
                <Route exact path="/orders/:id">
                  <UpdateOrder />
                </Route>
              </Switch>
            </OrdersProvider>
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
