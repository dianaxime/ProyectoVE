import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/workshops';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.WORKSHOPS_FETCH_COMPLETED: {
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
    case types.WORKSHOP_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.WORKSHOP_ADD_COMPLETED: {
      const { oldId, taller } = action.payload;
      const newState = omit(state, oldId);
      newState[taller.id] = {
        ...taller,
        isConfirmed: true,
      };
      return newState;
    }
    case types.WORKSHOP_REMOVE_STARTED: {
      return omit(state, action.payload.id.id);
    }
    case types.WORKSHOP_UPDATE_STARTED: {
      return {
        ...state,
        [action.payload.id.id]: {
        ...state[action.payload.id.id],//hola
        ...action.payload.id,
        },
      };
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.WORKSHOPS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.WORKSHOP_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.WORKSHOP_ADD_COMPLETED: {
      const { oldId, taller } = action.payload;
      return state.map(id => id === oldId ? taller.id : id);
    }
    case types.WORKSHOP_REMOVE_STARTED: {
      return state.filter(id => id !== action.payload.id.id);
    }
    case types.WORKSHOP_UPDATE_COMPLETED: {
      const { id, taller } = action.payload;
        const newState = omit(state, id);
        newState[taller.id] = {
          ...taller,
        };
        return newState;
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.WORKSHOPS_FETCH_STARTED: {
      return true;
    }
    case types.WORKSHOPS_FETCH_COMPLETED: {
      return false;
    }
    case types.WORKSHOPS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.WORKSHOPS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.WORKSHOPS_FETCH_STARTED: {
      return null;
    }
    case types.WORKSHOPS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const updateWorkshopError = (state=null, action) => {
  switch(action.type){
    case types.WORKSHOP_UPDATE_FAILED: {
      return action.payload.error;
    }
    case types.WORKSHOP_UPDATE_COMPLETED: {
      return null;
    }
    case types.WORKSHOP_UPDATE_STARTED: {
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
  updateWorkshopError,
});

export const getWorkshop = (state, id) => state.byId[id];
export const getWorkshops = state => state.order.map(id => getWorkshop(state, id));
export const isFetchingWorkshops = state => state.isFetching;
export const getFetchingWorkshopsError = state => state.error;
export const getUpdateWorkshopError = state => state.updateWorkshopError;