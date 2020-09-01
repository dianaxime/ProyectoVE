import * as types from '../types/modalAssign';

export const changeAssign = open => ({
  type: types.ASSIGN_OPENED,
  payload: open,
});