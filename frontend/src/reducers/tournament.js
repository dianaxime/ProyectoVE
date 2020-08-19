import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/tournament';

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
      case types.TOURNAMENT_ADD_COMPLETED: {
        const { tournament } = action.payload;
        const newState = omit(state, tournament.userid);
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
      case types.TOURNAMENT_ADD_COMPLETED: {
        const { tournament } = action.payload;
        return state.filter(id => id !== tournament.userid);
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
  
  const byIdTournament = (state = {}, action) => {
    switch (action.type) {
      case types.TOURNAMENT_FETCH_COMPLETED: {
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
      case types.TOURNAMENT_ADD_STARTED: {
        const newState = { ...state };
        newState[action.payload.id] = {
          ...action.payload,
          isConfirmed: false,
        };
        return newState;
      }
      case types.TOURNAMENT_ADD_COMPLETED: {
        const { oldId, tournament } = action.payload;
        const newState = omit(state, oldId);
        newState[tournament.id] = {
          ...tournament,
          isConfirmed: true,
        };
        return newState;
      }
      case types.TOURNAMENT_REMOVE_COMPLETED: {
        const newState = omit(state, action.payload);
        return newState;
      }
      default: {
        return state;
      }
    }
  };
  
  const orderTournament = (state = [], action) => {
    switch (action.type) {
      case types.TOURNAMENT_FETCH_COMPLETED: {
        return [...action.payload.order];
      }
      case types.TOURNAMENT_ADD_STARTED: {
        return [...state, action.payload.id];
      }
      case types.TOURNAMENT_ADD_COMPLETED: {
        const { oldId, tournament } = action.payload;
        return state.map(id => id === oldId ? tournament.id : id);
      }
      case types.TOURNAMENT_REMOVE_COMPLETED: {
        return state.filter(id => id !== action.payload);
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingTournament = (state = false, action) => {
    switch (action.type) {
      case types.TOURNAMENT_FETCH_STARTED: {
        return true;
      }
      case types.TOURNAMENT_FETCH_COMPLETED: {
        return false;
      }
      case types.TOURNAMENT_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorTournament = (state = null, action) => {
    switch (action.type) {
      case types.TOURNAMENT_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.TOURNAMENT_FETCH_STARTED: {
        return null;
      }
      case types.TOURNAMENT_FETCH_COMPLETED: {
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
    byIdTournament,
    orderTournament,
    isFetchingTournament,
    errorTournament,
  });
  
  export const getUserByEmailTournament = (state, id) => state.byId[id];
  export const getUsersOrderTournament = state => state.order;
  export const getUsersByEmailTournament = state => state.order.map(id => getUserByEmailTournament(state, id));
  export const isFetchingUsersByEmailTournament = state => state.isFetching;
  export const getFetchingUsersByEmailErrorTournament = state => state.error;
  export const getTournament = (state, id) => state.byIdTournament[id];
  export const getTournaments = state => state.orderTournament.map(id => getTournament(state, id));
  export const isFetchingTournaments = state => state.isFetchingTournament;
  export const getFetchingTournamentError = state => state.errorTournament;