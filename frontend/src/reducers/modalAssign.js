import * as types from '../types/modalAssign';

const changeAssign = (state = false, action) => {
  switch (action.type) {
    case types.ASSIGN_OPENED: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default changeAssign;

export const getIsAssignOpen = state => state;