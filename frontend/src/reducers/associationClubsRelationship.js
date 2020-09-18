import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/associationClubRelationship';

const byId = (state = {}, action) => {
    switch (action.type) {
      case types.USERS_BY_EMAIL_FETCH_COMPLETED_AC: {
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
      case types.ASSOCIATION_CLUB_RELATIONSHIP_ADD_COMPLETED: {
        const { associationClubRelationship } = action.payload;
        const newState = omit(state, associationClubRelationship.userid);
        return newState;
      }
      default: {
        return state;
      }
    }
  };
  
  const order = (state = [], action) => {
    switch (action.type) {
      case types.USERS_BY_EMAIL_FETCH_COMPLETED_AC: {
        return  [...action.payload.order];
      }
      case types.ASSOCIATION_CLUB_RELATIONSHIP_ADD_COMPLETED: {
        const { associationClubRelationship } = action.payload;
        return state.filter(id => id !== associationClubRelationship.userid);
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetching = (state = false, action) => {
    switch (action.type) {
      case types.USERS_BY_EMAIL_FETCH_STARTED_AC: {
        return true;
      }
      case types.USERS_BY_EMAIL_FETCH_COMPLETED_AC: {
        return false;
      }
      case types.USERS_BY_EMAIL_FETCH_FAILED_AC: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const error = (state = null, action) => {
    switch (action.type) {
      case types.USERS_BY_EMAIL_FETCH_FAILED_AC: {
        return action.payload.error;
      }
      case types.USERS_BY_EMAIL_FETCH_STARTED_AC: {
        return null;
      }
      case types.USERS_BY_EMAIL_FETCH_COMPLETED_AC: {
        return null;
      }
      default: {
        return state;
      }
    }
  };
  
  const byIdAssociationClubRelationship = (state = {}, action) => {
    switch (action.type) {
      case types.ASSOCIATION_CLUB_RELATIONSHIP_FETCH_COMPLETED: {
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
      case types.ASSOCIATION_CLUB_RELATIONSHIP_ADD_STARTED: {
        const newState = { ...state };
        newState[action.payload.id] = {
          ...action.payload,
          isConfirmed: false,
        };
        return newState;
      }
      case types.ASSOCIATION_CLUB_RELATIONSHIP_ADD_COMPLETED: {
        const { oldId, associationClubRelationship } = action.payload;
        const newState = omit(state, oldId);
        newState[associationClubRelationship.id] = {
          ...associationClubRelationship,
          isConfirmed: true,
        };
        return newState;
      }
      case types.ASSOCIATION_CLUB_RELATIONSHIP_REMOVE_COMPLETED: {
        const newState = omit(state, action.payload);
        return newState;
      }
      default: {
        return state;
      }
    }
  };
  
  const orderAssociationClubRelationship = (state = [], action) => {
    switch (action.type) {
      case types.ASSOCIATION_CLUB_RELATIONSHIP_FETCH_COMPLETED: {
        return [...action.payload.order];
      }
      case types.ASSOCIATION_CLUB_RELATIONSHIP_ADD_STARTED: {
        return [...state, action.payload.id];
      }
      case types.ASSOCIATION_CLUB_RELATIONSHIP_ADD_COMPLETED: {
        const { oldId, associationClubRelationship } = action.payload;
        return state.map(id => id === oldId ? associationClubRelationship.id : id);
      }
      case types.ASSOCIATION_CLUB_RELATIONSHIP_REMOVE_COMPLETED: {
        return state.filter(id => id !== action.payload);
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingAssociationClubRelationship = (state = false, action) => {
    switch (action.type) {
      case types.ASSOCIATION_CLUB_RELATIONSHIP_FETCH_STARTED: {
        return true;
      }
      case types.ASSOCIATION_CLUB_RELATIONSHIP_FETCH_COMPLETED: {
        return false;
      }
      case types.ASSOCIATION_CLUB_RELATIONSHIP_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorAssociationClubRelationship = (state = null, action) => {
    switch (action.type) {
      case types.ASSOCIATION_CLUB_RELATIONSHIP_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.ASSOCIATION_CLUB_RELATIONSHIP_FETCH_STARTED: {
        return null;
      }
      case types.ASSOCIATION_CLUB_RELATIONSHIP_FETCH_COMPLETED: {
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
    byIdAssociationClubRelationship,
    orderAssociationClubRelationship,
    isFetchingAssociationClubRelationship,
    errorAssociationClubRelationship,
  });
  
  export const getUserByEmailAssociationClubRelationship = (state, id) => state.byId[id];
  export const getUsersOrderAssociationClubRelationship = state => state.order;
  export const getUsersByEmailAssociationClubRelationship = state => state.order.map(id => getUserByEmailAssociationClubRelationship(state, id));
  export const isFetchingUsersByEmailAssociationClubRelationship = state => state.isFetching;
  export const getFetchingUsersByEmailErrorAssociationClubRelationship = state => state.error;
  export const getAssociationClubRelationship = (state, id) => state.byIdAssociationClubRelationship[id];
  export const getAssociationClubRelationships = state => state.orderAssociationClubRelationship.map(id => getAssociationClubRelationship(state, id));
  export const isFetchingAssociationClubRelationships = state => state.isFetchingAssociationClubRelationship;
  export const getFetchingAssociationClubRelationshipError = state => state.errorAssociationClubRelationship;