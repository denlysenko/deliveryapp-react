import { me } from '../../api/users/users';
import { User } from '../../models/user';

export enum AuthActionTypes {
  USER_LOADED = '[Auth] User Loaded',
  LOGOUT = '[Auth] Logout'
}

export interface AuthAction {
  readonly type: AuthActionTypes;
  payload?: User;
}

export type AuthDispatch = (action: AuthAction) => void;

export const loadMe = async (dispatch: AuthDispatch) => {
  try {
    const user = await me();
    dispatch({
      type: AuthActionTypes.USER_LOADED,
      payload: user
    });
  } catch {
    dispatch({
      type: AuthActionTypes.LOGOUT
    });
  }
};
