import { user } from '@deliveryapp/testing';

import { me } from '../../api/users/users';
import { AuthActionTypes, loadMe } from './auth.actions';

const dispatch = jest.fn();

jest.mock('../../api/users/users', () => ({
  me: jest.fn(() => Promise.resolve(user))
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('[Auth Context] Actions', () => {
  describe('loadMe', () => {
    it('should dispatch LOAD_SUCCESS', async () => {
      await loadMe(dispatch);
      expect(dispatch).toBeCalledWith({
        type: AuthActionTypes.USER_LOADED,
        payload: user
      });
    });

    it('should dispatch LOGOUT', async () => {
      (me as jest.MockedFunction<typeof me>).mockImplementationOnce(() =>
        Promise.reject({})
      );

      await loadMe(dispatch);
      expect(dispatch).toBeCalledWith({
        type: AuthActionTypes.LOGOUT
      });
    });
  });
});
