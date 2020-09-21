import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/eventParticipation';

const byId = (state = {}, action) => {
    switch (action.type) {
      case types.USERS_BY_EMAIL_FETCH_COMPLETED_EVENT: {
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
      case types.EVENT_PARTICIPATION_ADD_COMPLETED: {
        const { eventParticipation } = action.payload;
        const newState = omit(state, eventParticipation.userid);
        return newState;
      }
      default: {
        return state;
      }
    }
  };
  
  const order = (state = [], action) => {
    switch (action.type) {
      case types.USERS_BY_EMAIL_FETCH_COMPLETED_EVENT: {
        return  [...action.payload.order];
      }
      case types.EVENT_PARTICIPATION_ADD_COMPLETED: {
        const { eventParticipation } = action.payload;
        return state.filter(id => id !== eventParticipation.userid);
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetching = (state = false, action) => {
    switch (action.type) {
      case types.USERS_BY_EMAIL_FETCH_STARTED_EVENT: {
        return true;
      }
      case types.USERS_BY_EMAIL_FETCH_COMPLETED_EVENT: {
        return false;
      }
      case types.USERS_BY_EMAIL_FETCH_FAILED_EVENT: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const error = (state = null, action) => {
    switch (action.type) {
      case types.USERS_BY_EMAIL_FETCH_FAILED_EVENT: {
        return action.payload.error;
      }
      case types.USERS_BY_EMAIL_FETCH_STARTED_EVENT: {
        return null;
      }
      case types.USERS_BY_EMAIL_FETCH_COMPLETED_EVENT: {
        return null;
      }
      default: {
        return state;
      }
    }
  };
  
  const byIdEventParticipation = (state = {}, action) => {
    switch (action.type) {
      case types.EVENT_PARTICIPATION_FETCH_COMPLETED: {
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
      case types.EVENT_PARTICIPATION_ADD_STARTED: {
        const newState = { ...state };
        newState[action.payload.id] = {
          ...action.payload,
          isConfirmed: false,
        };
        return newState;
      }
      case types.EVENT_PARTICIPATION_ADD_COMPLETED: {
        const { oldId, eventParticipation } = action.payload;
        const newState = omit(state, oldId);
        newState[eventParticipation.id] = {
          ...eventParticipation,
          isConfirmed: true,
        };
        return newState;
      }
      case types.EVENT_PARTICIPATION_REMOVE_COMPLETED: {
        const newState = omit(state, action.payload);
        return newState;
      }
      default: {
        return state;
      }
    }
  };
  
  const orderEventParticipation = (state = [], action) => {
    switch (action.type) {
      case types.EVENT_PARTICIPATION_FETCH_COMPLETED: {
        return [...action.payload.order];
      }
      case types.EVENT_PARTICIPATION_ADD_STARTED: {
        return [...state, action.payload.id];
      }
      case types.EVENT_PARTICIPATION_ADD_COMPLETED: {
        const { oldId, eventParticipation } = action.payload;
        return state.map(id => id === oldId ? eventParticipation.id : id);
      }
      case types.EVENT_PARTICIPATION_REMOVE_COMPLETED: {
        return state.filter(id => id !== action.payload);
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingEventParticipation = (state = false, action) => {
    switch (action.type) {
      case types.EVENT_PARTICIPATION_FETCH_STARTED: {
        return true;
      }
      case types.EVENT_PARTICIPATION_FETCH_COMPLETED: {
        return false;
      }
      case types.EVENT_PARTICIPATION_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorEventParticipation = (state = null, action) => {
    switch (action.type) {
      case types.EVENT_PARTICIPATION_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.EVENT_PARTICIPATION_FETCH_STARTED: {
        return null;
      }
      case types.EVENT_PARTICIPATION_FETCH_COMPLETED: {
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
    byIdEventParticipation,
    orderEventParticipation,
    isFetchingEventParticipation,
    errorEventParticipation,
  });
  
  export const getUserByEmailEventParticipation = (state, id) => state.byId[id];
  export const getUsersOrderEventParticipationt = state => state.order;
  export const getUsersByEmailEventParticipation = state => state.order.map(id => getUserByEmailEventParticipation(state, id));
  export const isFetchingUsersByEmailEventParticipation = state => state.isFetching;
  export const getFetchingUsersByEmailErrorEventParticipation = state => state.error;
  export const getEventParticipation = (state, id) => state.byIdEventParticipation[id];
  export const getEventParticipations = state => state.orderEventParticipation.map(id => getEventParticipation(state, id));
  export const isFetchingEventParticipations = state => state.isFetchingEventParticipation;
  export const getFetchingEventParticipationError = state => state.errorEventParticipation;