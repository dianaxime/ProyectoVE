import * as types from '../types/selectedWorkshop';


const selectedWorkshop = (state = null, action) => {
  switch (action.type) {
    case types.WORKSHOP_SELECTED: {
      return action.payload; 
    }
    default: {
      return state;
    }
  }
};


export default selectedWorkshop;


export const getSelectedWorkshop = state => state;