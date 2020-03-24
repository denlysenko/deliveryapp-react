import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { isNil } from 'lodash-es';

import { ACCESS_TOKEN } from '@deliveryapp/common';
import { apiClient } from '@deliveryapp/core';
import { useAuth, loadSelf } from '@deliveryapp/data-access';

export function useLoadSelf() {
  const [state, dispatch] = useAuth();
  const history = useHistory();

  const hasToken = !isNil(localStorage.getItem(ACCESS_TOKEN));

  if (hasToken) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    apiClient.setAuthHeader(localStorage.getItem(ACCESS_TOKEN)!);
  }

  const [waiting, setWaiting] = useState(hasToken);

  useEffect(() => {
    if (state.isLoggedIn) {
      setWaiting(false);
    }
  }, [state.isLoggedIn]);

  useEffect(() => {
    if (!state.isLoggedIn && hasToken) {
      loadSelf(dispatch, history);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    waiting
  };
}
