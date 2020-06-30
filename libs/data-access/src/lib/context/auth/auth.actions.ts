import { ACCESS_TOKEN } from '@deliveryapp/common';
import { apiClient } from '@deliveryapp/core';

import { me } from '../../api/users';
import { User } from '../../models/user';
import { unsubscribeFromNotifications } from '../messages/messages.actions';

export enum AuthActionTypes {
  USER_LOADED = '[Auth] User Loaded',
  LOGOUT = '[Auth] Logout'
}

type History = {
  push: (path: string) => void;
};

interface UserLoadedAction {
  type: AuthActionTypes.USER_LOADED;
  payload: User | null;
}

interface LogoutAction {
  type: AuthActionTypes.LOGOUT;
}

export type AuthAction = UserLoadedAction | LogoutAction;

export type AuthDispatch = (action: AuthAction) => void;

export const logout = async (dispatch: AuthDispatch, history: History) => {
  await unsubscribeFromNotifications();
  localStorage.removeItem(ACCESS_TOKEN);
  apiClient.removeAuthHeader();
  dispatch({ type: AuthActionTypes.LOGOUT });
  history.push('/auth');
};

export const loadSelf = async (dispatch: AuthDispatch, history: History) => {
  try {
    const { data } = await me();
    dispatch({
      type: AuthActionTypes.USER_LOADED,
      payload: data
    });
  } catch {
    await logout(dispatch, history);
  }
};
