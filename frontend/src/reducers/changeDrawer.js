import * as types from '../types/changeDrawer';

const changeDrawer = (state = false, action) => {
  switch (action.type) {
    case types.DRAWER_OPENED: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default changeDrawer;

export const getIsOpen = state => state;