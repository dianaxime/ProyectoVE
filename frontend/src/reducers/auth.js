import jwtDecode from 'jwt-decode';
import { combineReducers } from 'redux';

import * as types from '../types/auth';

const token = (state = null, action) => {
    switch(action.type) {
        case types.AUTHENTICATION_STARTED: {
            return null;
        }
        case types.AUTHENTICATION_COMPLETED: {
            return action.payload.token;
        }
        case types.TOKEN_REFRESH_COMPLETED: {
            return action.payload.newToken;
        }
        case types.AUTHENTICATION_IDENTITY_CLEARED: {
            return null;
        }
        default: {
            return state;
        }
    }
};

const decoded = (state = null, action) => {
    switch(action.type) {
        case types.AUTHENTICATION_STARTED: {
            return null;
        }
        case types.AUTHENTICATION_COMPLETED: {
            return jwtDecode(action.payload.token);
        }
        case types.AUTHENTICATION_FAILED: {
            return null;
        }
        case types.TOKEN_REFRESH_COMPLETED: {
            return jwtDecode(action.payload.newToken);
        }
        case types.AUTHENTICATION_IDENTITY_CLEARED: {
            return null;
        }
        default: {
            return state;
        }
    }
};

const isAuthenticating = (state = false, action) => {
    switch(action.type) {
        case types.AUTHENTICATION_STARTED: {
            return true;
        }
        case types.AUTHENTICATION_COMPLETED: {
            return false;
        }
        case types.AUTHENTICATION_FAILED: {
            return false;
        }
        case types.AUTHENTICATION_IDENTITY_CLEARED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const isRegistering = (state = false, action) => {
    switch(action.type) {
        case types.REGISTER_STARTED: {
            return true;
        }
        case types.REGISTER_COMPLETED: {
            return false;
        }
        case types.REGISTER_FAILED: {
            return false;
        }
        case types.AUTHENTICATION_IDENTITY_CLEARED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const registeringCompleted = (state = false, action) => {
    switch(action.type) {
        case types.REGISTER_STARTED: {
            return false;
        }
        case types.REGISTER_COMPLETED: {
            return true;
        }
        case types.REGISTER_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.AUTHENTICATION_STARTED: {
            return null;
        }
        case types.AUTHENTICATION_COMPLETED: {
            return null;
        }
        case types.AUTHENTICATION_FAILED: {
            return action.payload.error;
        }
        case types.AUTHENTICATION_IDENTITY_CLEARED: {
            return null;
        }
        default: {
            return state;
        }
    }
};

const isRefreshing = (state = false, action) => {
    switch(action.type) {
        case types.TOKEN_REFRESH_STARTED: {
            return true;
        }
        case types.TOKEN_REFRESH_COMPLETED: {
            return false;
        }
        case types.TOKEN_REFRESH_FAILED: {
            return false;
        }
        case types.AUTHENTICATION_IDENTITY_CLEARED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const refreshingError = (state = null, action) => {
    switch(action.type) {
        case types.TOKEN_REFRESH_STARTED: {
            return null;
        }
        case types.TOKEN_REFRESH_COMPLETED: {
            return null;
        }
        case types.TOKEN_REFRESH_FAILED: {
            return action.payload.error;
        }
        case types.AUTHENTICATION_IDENTITY_CLEARED: {
            return null;
        }
        default: {
            return state;
        }
    }
};

const registeringError = (state = null, action) => {
    switch(action.type) {
        case types.REGISTER_STARTED: {
            return null;
        }
        case types.REGISTER_COMPLETED: {
            return null;
        }
        case types.REGISTER_FAILED: {
            return action.payload.error;
        }
        case types.AUTHENTICATION_IDENTITY_CLEARED: {
            return null;
        }
        default: {
            return state;
        }
    }
};

const auth = combineReducers({
    token,
    decoded,
    isAuthenticating,
    isRefreshing,
    error,
    refreshingError,
    isRegistering,
    registeringError,
    registeringCompleted,
});


export default auth;


export const getAuthToken = state => state.token;
export const getIsAuthenticating = state => state.isAuthenticating;
export const getRegisteringError = state => state.registeringError;
export const getIsRegistering = state => state.isRegistering;
export const getAuthenticatingError = state => state.error;
export const getAuthUserID = state => state.decoded ? state.decoded.user_id : null;
export const getAuthExpiration = state => state.decoded ? state.decoded.exp : null;
export const getAuthEmail = state => state.decoded ? state.decoded.email : null;
export const getIsRefreshingToken = state => state.isRefreshing;
export const getRegisteringCompleted = state => state.registeringCompleted;
export const getRefreshingError = state => state.refreshingError;