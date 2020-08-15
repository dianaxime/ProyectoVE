import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/users';

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.USERS_BY_EMAIL_FETCH_COMPLETED: {
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
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch (action.type) {
    case types.USERS_BY_EMAIL_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.USERS_BY_EMAIL_FETCH_STARTED: {
      return true;
    }
    case types.USERS_BY_EMAIL_FETCH_COMPLETED: {
      return false;
    }
    case types.USERS_BY_EMAIL_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case types.USERS_BY_EMAIL_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.USERS_BY_EMAIL_FETCH_STARTED: {
      return null;
    }
    case types.USERS_BY_EMAIL_FETCH_COMPLETED: {
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

export const getUser = (state, id) => state.byId[id];
export const getUsers = state => state.order.map(id => getUser(state, id));
export const isFetchingUsers = state => state.isFetching;
export const getFetchingUsersError = state => state.error;