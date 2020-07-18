import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/talleres';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.TALLERES_FETCH_COMPLETED: {
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
    case types.TALLER_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.TALLER_ADD_COMPLETED: {
      const { oldId, taller } = action.payload;
      const newState = omit(state, oldId);
      newState[taller.id] = {
        ...taller,
        isConfirmed: true,
      };
      return newState;
    }
    case types.TALLER_REMOVE_STARTED: {
      return omit(state, action.payload.id.id);
    }
    case types.TALLER_UPDATE_STARTED: {
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
    case types.TALLERES_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.TALLER_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.TALLER_ADD_COMPLETED: {
      const { oldId, taller } = action.payload;
      return state.map(id => id === oldId ? taller.id : id);
    }
    case types.TALLER_REMOVE_STARTED: {
      return state.filter(id => id !== action.payload.id.id);
    }
    case types.TALLER_UPDATE_COMPLETED: {
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
    case types.TALLERES_FETCH_STARTED: {
      return true;
    }
    case types.TALLERES_FETCH_COMPLETED: {
      return false;
    }
    case types.TALLERES_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.TALLERES_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.TALLERES_FETCH_STARTED: {
      return null;
    }
    case types.TALLERES_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const updateTallerError = (state=null, action) => {
  switch(action.type){
    case types.TALLER_UPDATE_FAILED: {
      return action.payload.error;
    }
    case types.TALLER_UPDATE_COMPLETED: {
      return null;
    }
    case types.TALLER_UPDATE_STARTED: {
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
  updateTallerError,
});

export const getTaller = (state, id) => state.byId[id];
export const getTalleres = state => state.order.map(id => getTaller(state, id));
export const isFetchingTalleres = state => state.isFetching;
export const getFetchingTalleresError = state => state.error;
export const getUpdateTallerError = state => state.updateTallerError;