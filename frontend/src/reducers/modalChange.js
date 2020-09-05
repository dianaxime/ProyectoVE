import * as types from '../types/modalChange';

const changeChange = (state = false, action) => {
  switch (action.type) {
    case types.CHANGE_PASSWORD_OPENED: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default changeChange;

export const getIsChangeOpen = state => state;