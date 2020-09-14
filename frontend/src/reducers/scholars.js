import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/scholars';

const byId = (state = {}, action) => {
    switch (action.type) {
        case types.SCHOLARS_FETCH_COMPLETED: {
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
        case types.SCHOLAR_ADD_STARTED: {
            const newState = { ...state };
            newState[action.payload.id] = {
                ...action.payload,
                isConfirmed: false,
            };
            return newState;
        }
        case types.SCHOLAR_ADD_COMPLETED: {
            const { oldId, scholar } = action.payload;
            const newState = omit(state, oldId);
            newState[scholar.id] = {
                ...scholar,
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
        case types.SCHOLARS_FETCH_COMPLETED: {
            return [...action.payload.order];
        }
        case types.SCHOLAR_ADD_STARTED: {
            return [...state, action.payload.id];
        }
        case types.SCHOLAR_ADD_COMPLETED: {
            const { oldId, scholar } = action.payload;
            return state.map(id => id === oldId ? scholar.id : id);
        }
        default: {
            return state;
        }
    }
};

const isFetching = (state = false, action) => {
    switch (action.type) {
        case types.SCHOLARS_FETCH_STARTED: {
            return true;
        }
        case types.SCHOLARS_FETCH_COMPLETED: {
            return false;
        }
        case types.SCHOLARS_FETCH_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch (action.type) {
        case types.SCHOLARS_FETCH_FAILED: {
            return action.payload.error;
        }
        case types.SCHOLARS_FETCH_STARTED: {
            return null;
        }
        case types.SCHOLARS_FETCH_COMPLETED: {
            return null;
        }
        default: {
            return state;
        }
    }
};

const status = (state = null, action) => {
    switch (action.type){
        case types.SCHOLAR_ADD_STARTED:{
            return null;
        }
        case types.SCHOLAR_ADD_COMPLETED: {
            return 'SUCCESS';
        }
        case types.SET_SCHOLAR_STATUS: {
            return null;
        }
        case types.SCHOLAR_ADD_FAILED:{
            return action.payload.error;
        }
        default: {
            return state;
        }
    }
}

export default combineReducers({
    byId,
    order,
    isFetching,
    error,
    status,
});

export const getScholar = (state, id) => state.byId[id];
export const getScholars = state => state.order.map(id => getScholar(state, id));
export const isFetchingScholars = state => state.isFetching;
export const getFetchingScholarsError = state => state.error;
export const getScholarStatus = state => state.status;