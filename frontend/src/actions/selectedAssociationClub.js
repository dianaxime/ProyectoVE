import * as types from '../types/selectedAssociationClub';


export const selectedAssociationClub = index => ({
  type: types.ASSOCIATION_CLUB_SELECTED,
  payload: index, 
});