import * as types from '../types/events';

export const startFetchingEvents = () => ({
  type: types.EVENTS_FETCH_STARTED,
});

export const completeFetchingEvents = (entities, order) => ({
  type: types.EVENTS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingEvents = error => ({
  type: types.EVENTS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingEvent = (id, name, classroom, description, date) => ({
  type: types.EVENT_ADD_STARTED,
  payload: {
    id,
    name,
    classroom,
    description,
    date
  },
});

export const completeAddingEvent = (oldId, event) => ({
  type: types.EVENT_ADD_COMPLETED,
  payload: {
    oldId,
    event,
  },
});

export const failAddingEvent = (oldId, error) => ({
  type: types.EVENT_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startUpdatingEvent = (id, name, classroom, description, date) => ({
  type: types.EVENT_UPDATE_STARTED,
  payload: {
    id,
    name,
    classroom,
    description,
    date
  },
});

export const completeUpdatingEvent = (id, event) => ({
  type: types.EVENT_UPDATE_COMPLETED,
  payload: {
    id,
    event,
  },
});

export const failUpdatingEvent = (id, error) => ({
  type: types.EVENT_UPDATE_FAILED,
  payload: {
    id,
    error,
  },
});