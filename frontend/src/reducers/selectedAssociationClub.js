import * as types from '../types/selectedAssociationClub';


const selectedAssociationClub = (state = null, action) => {
  switch (action.type) {
    case types.ASSOCIATION_CLUB_SELECTED: {
      return action.payload; 
    }
    default: {
      return state;
    }
  }
};


export default selectedAssociationClub;


export const getSelectedAssociationClub = state => state;