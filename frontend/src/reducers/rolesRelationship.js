import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/rolesRelationship';

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.USERS_BY_EMAIL_FETCH_COMPLETED: {
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
      return  [...action.payload.order];
    }
    case types.ROLES_RELATIONSHIP_ADD_COMPLETED: {
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

const byIdRolesRelationship = (state = {}, action) => {
  switch (action.type) {
    case types.ROLES_RELATIONSHIP_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.ROLES_RELATIONSHIP_ADD_COMPLETED: {
      const { oldId, rolesRelationship } = action.payload;
      const newState = omit(state, oldId);
      newState[rolesRelationship.id] = {
        ...rolesRelationship,
        isConfirmed: true,
      };
      return newState;
    }
    case types.ROLES_RELATIONSHIP_REMOVE_COMPLETED: {
      const newState = omit(state, action.payload);
      return newState;
    }
    default: {
      return state;
    }
  }
};

const orderRolesRelationship = (state = [], action) => {
  switch (action.type) {
    case types.ROLES_RELATIONSHIP_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.ROLES_RELATIONSHIP_ADD_COMPLETED: {
      const { oldId, rolesRelationship } = action.payload;
      return state.map(id => id === oldId ? rolesRelationship.id : id);
    }
    case types.ROLES_RELATIONSHIP_REMOVE_COMPLETED: {
      return state.filter(id => id !== action.payload);
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
  byIdRolesRelationship,
  orderRolesRelationship,
});

export const getUserByEmailRolesRelation = (state, id) => state.byId[id];
export const getUsersByEmailRolesRelation = state => state.order.map(id => getUserByEmailRolesRelation(state, id));
export const isFetchingUsersByEmailRolesRelation = state => state.isFetching;
export const getFetchingUsersByEmailErrorRolesRelation = state => state.error;
export const getRolesRelationship = (state, id) => state.byIdRolesRelationship[id];
export const getRolesRelationships = state => state.orderRolesRelationship.map(id => getRolesRelationship(state, id));
