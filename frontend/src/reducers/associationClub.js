import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/associationClub';

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.ASSOCIATION_CLUBS_FETCH_COMPLETED: {
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
    case types.ASSOCIATION_CLUB_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.ASSOCIATION_CLUB_ADD_COMPLETED: {
      const { oldId, associationClub } = action.payload;
      const newState = omit(state, oldId);
      newState[associationClub.id] = {
        ...associationClub,
        isConfirmed: true,
      };
      return newState;
    }
    case types.ASSOCIATION_CLUB_UPDATE_STARTED: {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        },
      };
    }
    case types.ASSOCIATION_CLUB_UPDATE_COMPLETED: {
      const { id, associationClub } = action.payload;
      const newState = omit(state, id);
      newState[associationClub.id] = {
        ...associationClub,
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
    case types.ASSOCIATION_CLUBS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.ASSOCIATION_CLUB_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.ASSOCIATION_CLUB_ADD_COMPLETED: {
      const { oldId, associationClub } = action.payload;
      return state.map(id => id === oldId ? associationClub.id : id);
    }
    case types.ASSOCIATION_CLUB_UPDATE_COMPLETED: {
      const { id, associationClub } = action.payload;
      const newState = omit(state, id);
      newState[associationClub.id] = {
        ...associationClub,
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
    case types.ASSOCIATION_CLUBS_FETCH_STARTED: {
      return true;
    }
    case types.ASSOCIATION_CLUBS_FETCH_COMPLETED: {
      return false;
    }
    case types.ASSOCIATION_CLUBS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case types.ASSOCIATION_CLUBS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.ASSOCIATION_CLUBS_FETCH_STARTED: {
      return null;
    }
    case types.ASSOCIATION_CLUBS_FETCH_COMPLETED: {
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

export const getAssociationClub = (state, id) => state.byId[id];
export const getAssociationClubs = state => state.order.map(id => getAssociationClub(state, id));
export const isFetchingAssociationClubs = state => state.isFetching;
export const getFetchingAssociationClubsError = state => state.error;