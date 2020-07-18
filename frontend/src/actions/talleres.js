import * as types from '../types/talleres';


export const startFetchingTalleres = () => ({
  type: types.TALLERES_FETCH_STARTED,
});
export const completeFetchingTalleres = (entities, order) => ({
  type: types.TALLERES_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});
export const failFetchingTalleres = error => ({
  type: types.TALLERES_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingTaller = taller => ({
  type: types.TALLER_ADD_STARTED,
  payload: taller,
});
export const completeAddingTaller = (oldId, taller) => ({
  type: types.TALLER_ADD_COMPLETED,
  payload: {
    oldId,
    taller,
  },
});
export const failAddingTaller = (oldId, error) => ({
  type: types.TALLER_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startRemovingTaller = id => ({
  type: types.TALLER_REMOVE_STARTED,
  payload: {
    id,
  },
});
export const completeRemovingTaller = () => ({
  type: types.TALLER_REMOVE_COMPLETED,
});
export const failRemovingTaller = (id, error) => ({
  type: types.TALLER_REMOVE_FAILED,
  payload: {
    id,
    error,
  },
});

export const startUpdatingTaller = (id, name, date) => ({
  type: types.TALLER_UPDATE_STARTED,
  payload: {
    id,
    name, 
    date
  },
});
export const completeUpdatingTaller = (id, taller) => ({
  type: types.TALLER_UPDATE_COMPLETED,
  payload: {
    id,
    taller,
  },
});
export const failUpdatingTaller = (id, error) => ({
  type: types.TALLER_UPDATE_FAILED,
  payload: {
    id,
    error,
  },
});