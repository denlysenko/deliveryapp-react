import { me } from '../../api/users/users';
import { User } from '../../models/user';

export enum AuthActionTypes {
  USER_LOADED = '[Auth] User Loaded',
  LOGOUT = '[Auth] Logout'
}

interface UserLoadedAction {
  type: AuthActionTypes.USER_LOADED;
  payload: User | null;
}

interface LogoutAction {
  type: AuthActionTypes.LOGOUT;
}

export type AuthAction = UserLoadedAction | LogoutAction;

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
