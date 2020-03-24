import { apiClient } from '@deliveryapp/core';
import { ACCESS_TOKEN } from '@deliveryapp/common';

import { me } from '../../api/users';
import { User } from '../../models/user';

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

export const logout = (dispatch: AuthDispatch, history: History) => {
  dispatch({
    type: AuthActionTypes.LOGOUT
  });
  localStorage.removeItem(ACCESS_TOKEN);
  apiClient.removeAuthHeader();
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
    logout(dispatch, history);
  }
};
