import * as types from '../types/selectedEvent';


export const selectedEvent = index => ({
  type: types.EVENT_SELECTED,
  payload: index, 
});