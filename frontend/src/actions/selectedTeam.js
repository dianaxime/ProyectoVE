import * as types from '../types/selectedTeam';


export const selectedTeam = index => ({
  type: types.TEAM_SELECTED,
  payload: index, 
});