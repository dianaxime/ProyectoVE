import * as types from '../types/modalRoles';

export const changeRoles = open => ({
  type: types.ROLES_OPENED,
  payload: open,
});