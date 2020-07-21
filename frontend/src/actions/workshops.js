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

export const startAddingWorkshop = workshop => ({
  type: types.WORKSHOP_ADD_STARTED,
  payload: workshop,
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

export const startRemovingWorkshop = id => ({
  type: types.WORKSHOP_REMOVE_STARTED,
  payload: {
    id,
  },
});
export const completeRemovingWorkshop = () => ({
  type: types.WORKSHOP_REMOVE_COMPLETED,
});
export const failRemovingWorkshop = (id, error) => ({
  type: types.WORKSHOP_REMOVE_FAILED,
  payload: {
    id,
    error,
  },
});

export const startUpdatingWorkshop = (id, name, date) => ({
  type: types.WORKSHOP_UPDATE_STARTED,
  payload: {
    id,
    name, 
    date
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