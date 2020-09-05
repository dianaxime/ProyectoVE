import * as types from '../types/workshops';

export const startFetchingWorkshops = () => ({
  type: types.WORKSHOPS_FETCH_STARTED,
});

export const completeFetchingWorkshops = (entities, order) => ({
  type: types.WORKSHOPS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingWorkshops = error => ({
  type: types.WORKSHOPS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingWorkshop = (id, name, classroom, description, startdate, enddate) => ({
  type: types.WORKSHOP_ADD_STARTED,
  payload: {
    id,
    name,
    classroom,
    description,
    startdate,
    enddate,
  },
});

export const completeAddingWorkshop = (oldId, workshop) => ({
  type: types.WORKSHOP_ADD_COMPLETED,
  payload: {
    oldId,
    workshop,
  },
});

export const failAddingWorkshop = (oldId, error) => ({
  type: types.WORKSHOP_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startUpdatingWorkshop = (id, name, classroom, description, startdate, enddate) => ({
  type: types.WORKSHOP_UPDATE_STARTED,
  payload: {
    id,
    name,
    classroom,
    description,
    startdate,
    enddate,
  },
});

export const completeUpdatingWorkshop = (id, workshop) => ({
  type: types.WORKSHOP_UPDATE_COMPLETED,
  payload: {
    id,
    workshop,
  },
});

export const failUpdatingWorkshop = (id, error) => ({
  type: types.WORKSHOP_UPDATE_FAILED,
  payload: {
    id,
    error,
  },
});