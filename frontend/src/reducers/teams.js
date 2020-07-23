import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/teams';

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.TEAMS_FETCH_COMPLETED: {
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
    case types.TEAMS_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.TEAMS_ADD_COMPLETED: {
      const { oldId, teams } = action.payload;
      const newState = omit(state, oldId);
      newState[teams.id] = {
        ...teams,
        isConfirmed: true,
      };
      return newState;
    }
    case types.TEAMS_UPDATE_STARTED: {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        },
      };
    }
    case types.TEAMS_UPDATE_COMPLETED: {
      const { id, teams } = action.payload;
      const newState = omit(state, id);
      newState[teams.id] = {
        ...teams,
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
    case types.TEAMS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.TEAMS_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.TEAMS_ADD_COMPLETED: {
      const { oldId, teams } = action.payload;
      return state.map(id => id === oldId ? teams.id : id);
    }
    case types.TEAMS_UPDATE_COMPLETED: {
      const { id, teams } = action.payload;
      const newState = omit(state, id);
      newState[teams.id] = {
        ...teams,
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
    case types.TEAMS_FETCH_STARTED: {
      return true;
    }
    case types.TEAMS_FETCH_COMPLETED: {
      return false;
    }
    case types.TEAMS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case types.TEAMS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.TEAMS_FETCH_STARTED: {
      return null;
    }
    case types.TEAMS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const updateTeamsError = (state = null, action) => {
  switch (action.type) {
    case types.TEAMS_UPDATE_FAILED: {
      return action.payload.error;
    }
    case types.TEAMS_UPDATE_COMPLETED: {
      return null;
    }
    case types.TEAMS_UPDATE_STARTED: {
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
  updateTeamsError,
});

export const getTeam = (state, id) => state.byId[id];
export const getTeams = state => state.order.map(id => getTeam(state, id));
export const isFetchingTeams = state => state.isFetching;
export const getFetchingTeamsError = state => state.error;
export const getUpdateTeamsError = state => state.updateTeamsError;