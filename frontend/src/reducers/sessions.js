import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/sessions';

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.CLUBS_BY_NAME_FETCH_COMPLETED_AC: {
      const { entities, order } = action.payload;
      const newState = {};
      order.forEach(id => {
        newState[id] = {
          ...entities[id],
          isConfirmed: true,
        };
      });
      return newState;
    }
    case types.SESSION_ADD_COMPLETED: {
      const { session } = action.payload;
      const newState = omit(state, session.idac);
      return newState;
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch (action.type) {
    case types.CLUBS_BY_NAME_FETCH_COMPLETED_AC: {
      return [...action.payload.order];
    }
    case types.SESSION_ADD_COMPLETED: {
      const { session } = action.payload;
      return state.filter(id => id !== session.idac);
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.CLUBS_BY_NAME_FETCH_STARTED_AC: {
      return true;
    }
    case types.CLUBS_BY_NAME_FETCH_COMPLETED_AC: {
      return false;
    }
    case types.CLUBS_BY_NAME_FETCH_FAILED_AC: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case types.CLUBS_BY_NAME_FETCH_FAILED_AC: {
      return action.payload.error;
    }
    case types.CLUBS_BY_NAME_FETCH_STARTED_AC: {
      return null;
    }
    case types.CLUBS_BY_NAME_FETCH_COMPLETED_AC: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const byIdSession = (state = {}, action) => {
  switch (action.type) {
    case types.SESSIONS_FETCH_COMPLETED: {
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
    case types.SESSION_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.SESSION_ADD_COMPLETED: {
      const { oldId, session } = action.payload;
      const newState = omit(state, oldId);
      newState[session.id] = {
        ...session,
        isConfirmed: true,
      };
      return newState;
    }
    case types.SESSION_UPDATE_COMPLETED: {
      const { id, session } = action.payload;
      const newState = omit(state, id);
      newState[session.id] = {
        ...session,
        isConfirmed: true,
      };
      return newState;
    }
    default: {
      return state;
    }
  }
};

const orderSession = (state = [], action) => {
  switch (action.type) {
    case types.SESSIONS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.SESSION_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.SESSION_ADD_COMPLETED: {
      const { oldId, session } = action.payload;
      return state.map(id => id === oldId ? session.id : id);
    }
    default: {
      return state;
    }
  }
};

const isFetchingSession = (state = false, action) => {
  switch (action.type) {
    case types.SESSIONS_FETCH_STARTED: {
      return true;
    }
    case types.SESSIONS_FETCH_COMPLETED: {
      return false;
    }
    case types.SESSIONS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const errorSession = (state = null, action) => {
  switch (action.type) {
    case types.SESSIONS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.SESSIONS_FETCH_STARTED: {
      return null;
    }
    case types.SESSIONS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const status = (state = null, action) => {
  switch (action.type) {
    case types.SESSION_ADD_COMPLETED: {
      return 'SUCCESS';
    }
    case types.SESSION_ADD_FAILED: {
      return 'ERROR';
    }
    case types.SESSION_UPDATE_COMPLETED: {
      return 'SUCCESS';
    }
    case types.SESSION_UPDATE_FAILED: {
      return 'ERROR';
    }
    case types.SET_SESSION_STATUS: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const formatSession = (state = null, action) => {
  switch (action.type) {
    case types.SESSIONS_FORMAT_FETCH_FAILED: {
      return null;
    }
    case types.SESSIONS_FORMAT_FETCH_STARTED: {
      return null;
    }
    case types.SESSIONS_FORMAT_FETCH_COMPLETED: {
      return action.payload.sessions;
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
  byIdSession,
  orderSession,
  isFetchingSession,
  errorSession,
  status,
  formatSession,
});

export const getClubByNameSession = (state, id) => state.byId[id];
export const getClubsOrderSession = state => state.order;
export const getClubsByNameSession = state => state.order.map(id => getClubByNameSession(state, id));
export const isFetchingClubsByNameSession = state => state.isFetching;
export const getFetchingClubByNameErrorSession = state => state.error;
export const getSession = (state, id) => state.byIdSession[id];
export const getSessions = state => state.orderSession.map(id => getSession(state, id));
export const isFetchingSessions = state => state.isFetchingSession;
export const getFetchingSessionError = state => state.errorSession;
export const getSessionStatus = state => state.status;
export const getSessionFormat = state => state.formatSession;