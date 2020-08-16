import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/participation';

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
    case types.PARTICIPATION_ADD_COMPLETED: {
      const { participation } = action.payload;
      const newState = omit(state, participation.userid);
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
    case types.PARTICIPATION_ADD_COMPLETED: {
      const { participation } = action.payload;
      return state.filter(id => id !== participation.userid);
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

const byIdParticipation = (state = {}, action) => {
  switch (action.type) {
    case types.PARTICIPATION_FETCH_COMPLETED: {
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
    case types.PARTICIPATION_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.PARTICIPATION_ADD_COMPLETED: {
      const { oldId, participation } = action.payload;
      const newState = omit(state, oldId);
      newState[participation.id] = {
        ...participation,
        isConfirmed: true,
      };
      return newState;
    }
    default: {
      return state;
    }
  }
};

const orderParticipation = (state = [], action) => {
  switch (action.type) {
    case types.PARTICIPATION_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.PARTICIPATION_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.PARTICIPATION_ADD_COMPLETED: {
      const { oldId, participation } = action.payload;
      return state.map(id => id === oldId ? participation.id : id);
    }
    default: {
      return state;
    }
  }
};

const isFetchingParticipation = (state = false, action) => {
  switch (action.type) {
    case types.PARTICIPATION_FETCH_STARTED: {
      return true;
    }
    case types.PARTICIPATION_FETCH_COMPLETED: {
      return false;
    }
    case types.PARTICIPATION_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const errorParticipation = (state = null, action) => {
  switch (action.type) {
    case types.PARTICIPATION_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.PARTICIPATION_FETCH_STARTED: {
      return null;
    }
    case types.PARTICIPATION_FETCH_COMPLETED: {
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
  byIdParticipation,
  orderParticipation,
  isFetchingParticipation,
  errorParticipation,
});

export const getUserByEmail = (state, id) => state.byId[id];
export const getUsersOrder = state => state.order;
export const getUsersByEmail = state => state.order.map(id => getUserByEmail(state, id));
export const isFetchingUsersByEmail = state => state.isFetching;
export const getFetchingUsersByEmailError = state => state.error;
export const getParticipation = (state, id) => state.byIdParticipation[id];
export const getParticipations = state => state.order.map(id => getParticipation(state, id));
export const isFetchingParticipations = state => state.isFetchingParticipation;
export const getFetchingParticipationError = state => state.errorParticipation;