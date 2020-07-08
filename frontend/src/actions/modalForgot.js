import * as types from '../types/modalForgot';

export const changeForgot = open => ({
  type: types.FORGOT_PASSWORD_OPENED,
  payload: open,
});