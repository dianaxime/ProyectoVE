import * as types from '../types/selectedAUser';

const selectedAUser = (state = null, action) => {
  switch (action.type) {
    case types.USER_SELECTED: {
      return action.payload; 
    }
    default: {
      return state;
    }
  }
};

export default selectedAUser;

export const getSelectedAUser = state => state;