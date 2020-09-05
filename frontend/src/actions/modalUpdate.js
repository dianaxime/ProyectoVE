import * as types from '../types/modalUpdate';

export const changeUpdate = open => ({
  type: types.UPDATE_USER_OPENED,
  payload: open,
});