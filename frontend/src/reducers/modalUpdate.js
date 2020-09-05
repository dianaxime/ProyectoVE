import * as types from '../types/modalUpdate';

const changeUpdate = (state = false, action) => {
  switch (action.type) {
    case types.UPDATE_USER_OPENED: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default changeUpdate;

export const getIsUpdateOpen = state => state;