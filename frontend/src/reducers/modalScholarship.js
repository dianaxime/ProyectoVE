import * as types from '../types/modalScholarship';

const changeScholar = (state = false, action) => {
  switch (action.type) {
    case types.SCHOLARSHIP_OPENED: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default changeScholar;

export const getIsScholarOpen = state => state;