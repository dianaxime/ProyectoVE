import * as types from '../types/associationClub';

export const startFetchingAssociationClubs = () => ({
  type: types.ASSOCIATION_CLUBS_FETCH_STARTED,
});

export const completeFetchingAssociationClubs = (entities, order) => ({
  type: types.ASSOCIATION_CLUBS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingAssociationClubs = error => ({
  type: types.ASSOCIATION_CLUBS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingAssociationClub = (id, name, type, description, startdate, enddate) => ({
  type: types.ASSOCIATION_CLUB_ADD_STARTED,
  payload: {
    id,
    name,
    type,
    description, 
    startdate,
    enddate,
  },
});

export const completeAddingAssociationClub = (oldId, associationClub) => ({
  type: types.ASSOCIATION_CLUB_ADD_COMPLETED,
  payload: {
    oldId,
    associationClub,
  },
});

export const failAddingAssociationClub = (oldId, error) => ({
  type: types.ASSOCIATION_CLUB_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startUpdatingAssociationClub = (id, name, type, description, startdate, enddate) => ({
  type: types.ASSOCIATION_CLUB_UPDATE_STARTED,
  payload: {
    id,
    name,
    type,
    description, 
    startdate,
    enddate,
  },
});

export const completeUpdatingAssociationClub = (id, associationClub) => ({
  type: types.ASSOCIATION_CLUB_UPDATE_COMPLETED,
  payload: {
    id,
    associationClub,
  },
});

export const failUpdatingAssociationClub = (id, error) => ({
  type: types.ASSOCIATION_CLUB_UPDATE_FAILED,
  payload: {
    id,
    error,
  },
});