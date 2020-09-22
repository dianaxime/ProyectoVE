import * as types from '../types/selectedSession';


const selectedSession = (state = null, action) => {
  switch (action.type) {
    case types.SESSION_SELECTED: {
      return action.payload; 
    }
    default: {
      return state;
    }
  }
};


export default selectedSession;


export const getSelectedSession = state => state;