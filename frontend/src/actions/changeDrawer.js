import * as types from '../types/changeDrawer';

export const changeDrawer = open => ({
  type: types.DRAWER_OPENED,
  payload: open,
});