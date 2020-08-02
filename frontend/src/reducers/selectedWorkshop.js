import * as types from '../types/selectedWorkshop';


const selectedWorkshop = (state = [0,"No seleccionó un taller",3], action) => {
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