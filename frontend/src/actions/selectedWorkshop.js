import * as types from '../types/selectedWorkshop';


export const selectedWorkshop = index => ({
  type: types.WORKSHOP_SELECTED,
  payload: index, 
});