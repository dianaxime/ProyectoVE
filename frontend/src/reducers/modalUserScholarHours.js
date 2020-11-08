import * as types from '../types/modalUserScholarHours';

const checkScholarHours = (state = false, action) => {
  switch (action.type) {
    case types.USERSCHOLARHOURS_OPENED: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default checkScholarHours;

export const getIsScholarHoursOpen = state => state;