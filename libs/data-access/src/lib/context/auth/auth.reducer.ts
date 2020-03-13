import { User } from '../../models/user';
import { AuthAction, AuthActionTypes } from './auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  user: null
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionTypes.USER_LOADED:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload
      };

    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };

    default:
      return state;
  }
}
