import * as types from '../types/selectedEvent';


const selectedEvent = (state = null, action) => {
  switch (action.type) {
    case types.EVENT_SELECTED: {
      return action.payload; 
    }
    default: {
      return state;
    }
  }
};


export default selectedEvent;


export const getSelectedEvent = state => state;