import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/events';

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.EVENTS_FETCH_COMPLETED: {
      const { entities, order } = action.payload;
      const newState = { ...state };
      order.forEach(id => {
        newState[id] = {
          ...entities[id],
          isConfirmed: true,
        };
      });
      return newState;
    }
    case types.EVENT_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.EVENT_ADD_COMPLETED: {
      const { oldId, event } = action.payload;
      const newState = omit(state, oldId);
      newState[event.id] = {
        ...event,
        isConfirmed: true,
      };
      return newState;
    }
    case types.EVENT_UPDATE_STARTED: {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        },
      };
    }
    case types.EVENT_UPDATE_COMPLETED: {
      const { id, event } = action.payload;
      const newState = omit(state, id);
      newState[event.id] = {
        ...event,
        isConfirmed: true,
      };
      return newState;
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch (action.type) {
    case types.EVENTS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.EVENT_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.EVENT_ADD_COMPLETED: {
      const { oldId, event } = action.payload;
      return state.map(id => id === oldId ? event.id : id);
    }
    case types.EVENT_UPDATE_COMPLETED: {
      const { id, event } = action.payload;
      const newState = omit(state, id);
      newState[event.id] = {
        ...event,
      };
      return newState;
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.EVENTS_FETCH_STARTED: {
      return true;
    }
    case types.EVENTS_FETCH_COMPLETED: {
      return false;
    }
    case types.EVENTS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case types.EVENTS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.EVENTS_FETCH_STARTED: {
      return null;
    }
    case types.EVENTS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  byId,
  order,
  isFetching,
  error,
});

export const getEvent = (state, id) => state.byId[id];
export const getEvents = state => state.order.map(id => getEvent(state, id));
export const isFetchingEvents = state => state.isFetching;
export const getFetchingEventsError = state => state.error;