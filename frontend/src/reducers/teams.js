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
    case types.TEAM_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.TEAM_ADD_COMPLETED: {
      const { oldId, team } = action.payload;
      const newState = omit(state, oldId);
      newState[team.id] = {
        ...team,
        isConfirmed: true,
      };
      return newState;
    }
    case types.TEAM_UPDATE_STARTED: {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        },
      };
    }
    case types.TEAM_UPDATE_COMPLETED: {
      const { id, team } = action.payload;
      const newState = omit(state, id);
      newState[team.id] = {
        ...team,
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
    case types.TEAM_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.TEAM_ADD_COMPLETED: {
      const { oldId, team } = action.payload;
      return state.map(id => id === oldId ? team.id : id);
    }
    case types.TEAM_UPDATE_COMPLETED: {
      const { id, team } = action.payload;
      const newState = omit(state, id);
      newState[team.id] = {
        ...team,
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

export default combineReducers({
  byId,
  order,
  isFetching,
  error,
});

export const getTeam = (state, id) => state.byId[id];
export const getTeams = state => state.order.map(id => getTeam(state, id));
export const isFetchingTeams = state => state.isFetching;
export const getFetchingTeamsError = state => state.error;