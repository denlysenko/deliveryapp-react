import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Sidebar } from 'primereact/sidebar';

import { DEFAULT_LIMIT, Roles } from '@deliveryapp/common';
import { fcmMessaging } from '@deliveryapp/core';
import {
  FCMMessagePayload,
  LogsProvider,
  Message,
  MessagesActionTypes,
  messagesClient,
  OrdersProvider,
  PaymentsProvider,
  useMessages,
  UsersProvider
} from '@deliveryapp/data-access';
import { RolesGuard } from '@deliveryapp/guards';
import { Orders } from '@deliveryapp/pages/orders';
import { FullPageSpinner } from '@deliveryapp/ui';

import { AppMenu } from './AppMenu/AppMenu';
import { Messages } from './Messages/Messages';
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

const Payments = lazy(() =>
  import('@deliveryapp/pages/payments').then(({ Payments }) => ({
    default: Payments
  }))
);

const Users = lazy(() =>
  import('@deliveryapp/pages/users').then(({ Users }) => ({
    default: Users
  }))
);

const Settings = lazy(() =>
  import('@deliveryapp/pages/settings').then(({ Settings }) => ({
    default: Settings
  }))
);

const Logs = lazy(() =>
  import('@deliveryapp/pages/logs').then(({ Logs }) => ({
    default: Logs
  }))
);

const toMessagesArray = (entities: { [key: string]: Message }) =>
  Object.keys(entities)
    .map((id) => entities[id])
    .sort(
      (a, b) =>
        new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
    );

export const Main = () => {
  const [showMessages, setShowMessages] = useState(false);
  const [fetchingMessages, setFetchingMessages] = useState(false);
  const [messagesOffset, setMessagesOffset] = useState(0);
  const [{ entities, totalCount }, dispatch] = useMessages();

  const markMessageAsRead = async (messageId: string) => {
    try {
      await messagesClient.markAsRead(messageId);
      dispatch({
        type: MessagesActionTypes.MARKED_AS_READ,
        payload: messageId
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fcmMessaging.unsubscribe = fcmMessaging.messaging?.onMessage(
      (payload: FCMMessagePayload) => {
        const {
          _id,
          recipientId,
          text,
          createdAt,
          forEmployee,
          read
        } = payload.data;

        dispatch({
          type: MessagesActionTypes.MESSAGE_RECEIVED,
          payload: {
            _id,
            recipientId: parseInt(recipientId, 10),
            text,
            createdAt,
            forEmployee: forEmployee === 'true',
            read: read === 'true'
          }
        });
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFetchingMessages(true);

    messagesClient
      .loadMessages({
        limit: DEFAULT_LIMIT,
        offset: messagesOffset
      })
      .then(({ data }) => {
        setFetchingMessages(false);
        dispatch({
          type: MessagesActionTypes.MESSAGES_LOADED,
          payload: data
        });
      })
      .catch((error) => {
        setFetchingMessages(false);
        console.error(error);
      });
  }, [dispatch, messagesOffset]);

  return (
    <StyledMain>
      <div className="layout">
        <AppMenu />
        <TopBar showMessages={() => setShowMessages(true)} />
        <div className="content">
          <Suspense fallback={<FullPageSpinner />}>
            <OrdersProvider>
              <PaymentsProvider>
                <UsersProvider>
                  <LogsProvider>
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
                      <Route exact path="/payments">
                        <Payments />
                      </Route>
                      <RolesGuard exact roles={[Roles.ADMIN]} path="/users">
                        <Users />
                      </RolesGuard>
                      <RolesGuard exact roles={[Roles.ADMIN]} path="/settings">
                        <Settings />
                      </RolesGuard>
                      <RolesGuard exact roles={[Roles.ADMIN]} path="/logs">
                        <Logs />
                      </RolesGuard>
                    </Switch>
                  </LogsProvider>
                </UsersProvider>
              </PaymentsProvider>
            </OrdersProvider>
          </Suspense>
        </div>
      </div>
      <Sidebar
        visible={showMessages}
        position="right"
        onHide={() => setShowMessages(false)}
      >
        <Messages
          count={totalCount}
          messages={toMessagesArray(entities)}
          onMarkAsRead={markMessageAsRead}
          onLoadMore={() =>
            !fetchingMessages &&
            setMessagesOffset(messagesOffset + DEFAULT_LIMIT)
          }
        />
      </Sidebar>
    </StyledMain>
  );
};
