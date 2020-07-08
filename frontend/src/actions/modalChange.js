import * as types from '../types/modalChange';

export const changeChange = open => ({
  type: types.CHANGE_PASSWORD_OPENED,
  payload: open,
});