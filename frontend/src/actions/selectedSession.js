import * as types from '../types/selectedSession';


export const selectedSession = index => ({
  type: types.SESSION_SELECTED,
  payload: index, 
});