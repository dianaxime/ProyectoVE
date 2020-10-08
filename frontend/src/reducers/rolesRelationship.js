import { combineReducers } from 'redux';

import * as types from '../types/rolesRelationship';

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.USERS_BY_EMAIL_FETCH_COMPLETED_ROLES: {
      const { entities, order } = action.payload;
      const newState = { };
      order.forEach(id => {
        newState[id] = {
          ...entities[id],
          isConfirmed: true,
        };
      });
      return newState;
    }
    case types.ROLES_RELATIONSHIP_ADD_COMPLETED: {
      const { userid, idr } = action.payload;
      const idrs = Array.from(idr)
      return {
        ...state,
        [userid]: {
          ...state[userid],
          idrs: idrs,
        },
      };
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch (action.type) {
    case types.USERS_BY_EMAIL_FETCH_COMPLETED_ROLES: {
      return  [...action.payload.order];
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.USERS_BY_EMAIL_FETCH_STARTED_ROLES: {
      return true;
    }
    case types.USERS_BY_EMAIL_FETCH_COMPLETED_ROLES: {
      return false;
    }
    case types.USERS_BY_EMAIL_FETCH_FAILED_ROLES: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case types.USERS_BY_EMAIL_FETCH_FAILED_ROLES: {
      return action.payload.error;
    }
    case types.USERS_BY_EMAIL_FETCH_STARTED_ROLES: {
      return null;
    }
    case types.USERS_BY_EMAIL_FETCH_COMPLETED_ROLES: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const byIdRole = (state = {}, action) => {
  switch (action.type) {
    case types.ROLES_FETCH_COMPLETED: {
      const { entities, order } = action.payload;
      const newState = { };
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

const orderRole = (state = [], action) => {
  switch (action.type) {
    case types.ROLES_FETCH_COMPLETED: {
      return  [...action.payload.order];
    }
    default: {
      return state;
    }
  }
};

const isFetchingRole = (state = false, action) => {
  switch (action.type) {
    case types.ROLES_FETCH_STARTED: {
      return true;
    }
    case types.ROLES_FETCH_COMPLETED: {
      return false;
    }
    case types.ROLES_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const errorRole = (state = null, action) => {
  switch (action.type) {
    case types.ROLES_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.ROLES_FETCH_STARTED: {
      return null;
    }
    case types.ROLES_FETCH_COMPLETED: {
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
  byIdRole,
  orderRole,
  isFetchingRole,
  errorRole,
});

export const getUserByEmailRolesRelation = (state, id) => state.byId[id];
export const getUsersByEmailRolesRelation = state => state.order.map(id => getUserByEmailRolesRelation(state, id));
export const isFetchingUsersByEmailRolesRelation = state => state.isFetching;
export const getFetchingUsersByEmailErrorRolesRelation = state => state.error;
/* Roles */
export const getRole = (state, id) => state.byIdRole[id];
export const getRoles = state => state.orderRole.map(id => getRole(state, id));
export const isFetchingRoles = state => state.isFetchingRole;
export const getFetchingErrorRoles = state => state.errorRole;