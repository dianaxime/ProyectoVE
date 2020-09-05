import * as types from '../types/selectedRol';

const selectedRol = (state = null, action) => {
  switch (action.type) {
    case types.ROL_SELECTED: {
      return action.payload; 
    }
    default: {
      return state;
    }
  }
};

export default selectedRol;

export const getSelectedRol = state => state;