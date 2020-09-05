import * as types from '../types/selectedTeam';


const selectedTeam = (state = null, action) => {
  switch (action.type) {
    case types.TEAM_SELECTED: {
      return action.payload; 
    }
    default: {
      return state;
    }
  }
};


export default selectedTeam;


export const getSelectedTeam = state => state;