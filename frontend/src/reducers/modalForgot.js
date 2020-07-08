import * as types from '../types/modalForgot';

const changeForgot = (state = false, action) => {
  switch (action.type) {
    case types.FORGOT_PASSWORD_OPENED: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default changeForgot;

export const getIsForgotOpen = state => state;