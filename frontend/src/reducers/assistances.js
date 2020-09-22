import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/assistances';

const byId = (state = {}, action) => {
    switch (action.type) {
      case types.USERS_BY_EMAIL_FETCH_COMPLETED_S: {
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
      case types.ASSISTANCE_ADD_COMPLETED: {
        const { assistance } = action.payload;
        const newState = omit(state, assistance.userid);
        return newState;
      }
      default: {
        return state;
      }
    }
  };
  
  const order = (state = [], action) => {
    switch (action.type) {
      case types.USERS_BY_EMAIL_FETCH_COMPLETED_S: {
        return  [...action.payload.order];
      }
      case types.ASSISTANCE_ADD_COMPLETED: {
        const { assistance } = action.payload;
        return state.filter(id => id !== assistance.userid);
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetching = (state = false, action) => {
    switch (action.type) {
      case types.USERS_BY_EMAIL_FETCH_STARTED_S: {
        return true;
      }
      case types.USERS_BY_EMAIL_FETCH_COMPLETED_S: {
        return false;
      }
      case types.USERS_BY_EMAIL_FETCH_FAILED_S: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const error = (state = null, action) => {
    switch (action.type) {
      case types.USERS_BY_EMAIL_FETCH_FAILED_S: {
        return action.payload.error;
      }
      case types.USERS_BY_EMAIL_FETCH_STARTED_S: {
        return null;
      }
      case types.USERS_BY_EMAIL_FETCH_COMPLETED_S: {
        return null;
      }
      default: {
        return state;
      }
    }
  };
  
  const byIdAssistance = (state = {}, action) => {
    switch (action.type) {
      case types.ASSISTANCES_FETCH_COMPLETED: {
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
      case types.ASSISTANCE_ADD_STARTED: {
        const newState = { ...state };
        newState[action.payload.id] = {
          ...action.payload,
          isConfirmed: false,
        };
        return newState;
      }
      case types.ASSISTANCE_ADD_COMPLETED: {
        const { oldId, assistance } = action.payload;
        const newState = omit(state, oldId);
        newState[assistance.id] = {
          ...assistance,
          isConfirmed: true,
        };
        return newState;
      }
      case types.ASSISTANCE_REMOVE_COMPLETED: {
        const newState = omit(state, action.payload);
        return newState;
      }
      default: {
        return state;
      }
    }
  };
  
  const orderAssistance = (state = [], action) => {
    switch (action.type) {
      case types.ASSISTANCES_FETCH_COMPLETED: {
        return [...action.payload.order];
      }
      case types.ASSISTANCE_ADD_STARTED: {
        return [...state, action.payload.id];
      }
      case types.ASSISTANCE_ADD_COMPLETED: {
        const { oldId, assistance } = action.payload;
        return state.map(id => id === oldId ? assistance.id : id);
      }
      case types.ASSISTANCE_REMOVE_COMPLETED: {
        return state.filter(id => id !== action.payload);
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingAssistance = (state = false, action) => {
    switch (action.type) {
      case types.ASSISTANCES_FETCH_STARTED: {
        return true;
      }
      case types.ASSISTANCES_FETCH_COMPLETED: {
        return false;
      }
      case types.ASSISTANCES_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorAssistance = (state = null, action) => {
    switch (action.type) {
      case types.ASSISTANCES_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.ASSISTANCES_FETCH_STARTED: {
        return null;
      }
      case types.ASSISTANCES_FETCH_COMPLETED: {
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
    byIdAssistance,
    orderAssistance,
    isFetchingAssistance,
    errorAssistance,
  });
  
  export const getUserByEmailAssistance = (state, id) => state.byId[id];
  export const getUsersOrderAssistance = state => state.order;
  export const getUsersByEmailAssistance = state => state.order.map(id => getUserByEmailAssistance(state, id));
  export const isFetchingUsersByEmailAssistance = state => state.isFetching;
  export const getFetchingUsersByEmailErrorAssistance = state => state.error;
  export const getAssistance = (state, id) => state.byIdAssistance[id];
  export const getAssistances = state => state.orderAssistance.map(id => getAssistance(state, id));
  export const isFetchingAssistances = state => state.isFetchingAssistance;
  export const getFetchingAssistanceError = state => state.errorAssistance;

