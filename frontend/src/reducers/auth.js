import jwtDecode from 'jwt-decode';
import { combineReducers } from 'redux';
import omit from 'lodash/omit';
import storage from 'redux-persist/lib/storage';
import * as types from '../types/auth';

const token = (state = null, action) => {
    switch (action.type) {
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
            storage.removeItem('persist:rootx');
            return null;
        }
        case types.TOKEN_REFRESH_FAILED: {
            storage.removeItem('persist:rootx');
            return null;
        }
        default: {
            return state;
        }
    }
};

const decoded = (state = null, action) => {
    switch (action.type) {
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

const user = (state = null, action) => {
    switch (action.type) {
        case types.AUTHENTICATION_STARTED: {
            return null;
        }
        case types.AUTHENTICATION_COMPLETED: {
            const newState = action.payload.data;
            delete newState.token;
            return newState;
        }
        case types.AUTHENTICATION_FAILED: {
            return null;
        }
        case types.AUTHENTICATION_IDENTITY_CLEARED: {
            return null;
        }
        case types.UPDATE_USER_COMPLETED: {
            return action.payload;
        }
        case types.TOKEN_REFRESH_FAILED: {
            return null;
        }
        default: {
            return state;
        }
    }
};

const isAuthenticating = (state = false, action) => {
    switch (action.type) {
        case types.AUTHENTICATION_STARTED: {
            return true;
        }
        case types.AUTHENTICATION_COMPLETED: {
            return false;
        }
        case types.AUTHENTICATION_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch (action.type) {
        case types.AUTHENTICATION_STARTED: {
            return null;
        }
        case types.AUTHENTICATION_COMPLETED: {
            return null;
        }
        case types.AUTHENTICATION_FAILED: {
            return action.payload.error;
        }
        default: {
            return state;
        }
    }
};

const isRefreshing = (state = false, action) => {
    switch (action.type) {
        case types.TOKEN_REFRESH_STARTED: {
            return true;
        }
        case types.TOKEN_REFRESH_COMPLETED: {
            return false;
        }
        case types.TOKEN_REFRESH_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const refreshingError = (state = null, action) => {
    switch (action.type) {
        case types.TOKEN_REFRESH_STARTED: {
            return null;
        }
        case types.TOKEN_REFRESH_COMPLETED: {
            return null;
        }
        case types.TOKEN_REFRESH_FAILED: {
            return action.payload.error;
        }
        default: {
            return state;
        }
    }
};

const registeringStatus = (state = null, action) => {
    switch (action.type) {
        case types.REGISTER_STARTED: {
            return null;
        }
        case types.REGISTER_COMPLETED: {
            return 'SUCCESS';
        }
        case types.REGISTER_FAILED: {
            return action.payload.error;
        }
        default: {
            return state;
        }
    }
};

const recoveringStatus = (state = null, action) => {
    switch (action.type) {
        case types.RECOVER_STARTED: {
            return null;
        }
        case types.RECOVER_COMPLETED: {
            return 'SUCCESS';
        }
        case types.RECOVER_FAILED: {
            return 'ERROR';
        }
        default: {
            return state;
        }
    }
};

const updatingStatus = (state = false, action) => {
    switch (action.type) {
        case types.UPDATE_USER_STARTED: {
            return null;
        }
        case types.UPDATE_USER_COMPLETED: {
            return 'SUCCESS';
        }
        case types.UPDATE_USER_FAILED: {
            return 'ERROR';
        }
        default: {
            return state;
        }
    }
};

const changingStatus = (state = null, action) => {
    switch (action.type) {
        case types.CHANGE_PASSWORD_STARTED: {
            return null;
        }
        case types.CHANGE_PASSWORD_COMPLETED: {
            return 'SUCCESS';
        }
        case types.CHANGE_PASSWORD_FAILED: {
            return 'ERROR';
        }
        default: {
            return state;
        }
    }
};

const byId = (state = {}, action) => {
    switch (action.type) {
        case types.PENDING_USERS_FETCH_COMPLETED: {
            const { entities, order } = action.payload;
            const newState = { ...state };
            order.forEach(id => {
                newState[id] = {
                    ...entities[id],
                };
            });

            return newState;
        }
        case types.AUTHORIZE_USER_COMPLETED: {
            return omit(state, action.payload);
        }
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch (action.type) {
        case types.PENDING_USERS_FETCH_COMPLETED: {
            return [...action.payload.order];
        }
        case types.AUTHORIZE_USER_COMPLETED: {
            return state.filter(id => id !== action.payload);
        }
        default: {
            return state;
        }
    }
};

const isFetching = (state = false, action) => {
    switch (action.type) {
        case types.PENDING_USERS_FETCH_STARTED: {
            return true;
        }
        case types.PENDING_USERS_FETCH_COMPLETED: {
            return false;
        }
        case types.PENDING_USERS_FETCH_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const fetchingError = (state = null, action) => {
    switch (action.type) {
        case types.PENDING_USERS_FETCH_FAILED: {
            return action.payload.error;
        }
        case types.PENDING_USERS_FETCH_STARTED: {
            return null;
        }
        case types.PENDING_USERS_FETCH_COMPLETED: {
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
    registeringStatus,
    updatingStatus,
    user,
    recoveringStatus,
    changingStatus,
    byId,
    order,
    isFetching,
    fetchingError,
});


export default auth;


export const getAuthToken = state => state.token;
export const getUser = state => state.user;
export const getIsAuthenticating = state => state.isAuthenticating;
export const getAuthenticatingError = state => state.error;
export const getAuthUserID = state => state.decoded ? state.decoded.user_id : null;
export const getAuthExpiration = state => state.decoded ? state.decoded.exp : null;
export const getAuthEmail = state => state.decoded ? state.decoded.email : null;
export const getIsRefreshingToken = state => state.isRefreshing;
export const getRefreshingError = state => state.refreshingError;
export const getPendingUser = (state, id) => state.byId[id];
export const getPendingUsers = state => state.order.map(id => getPendingUser(state, id));
export const isFetchingPendingUsers = state => state.isFetching;
export const getFetchingPendingUsersError = state => state.error;
export const getRegisteringStatus = state => state.registeringStatus;
export const getRecoveringStatus = state => state.recoveringStatus;
export const getUpdatingStatus = state => state.updatingStatus;
export const getChangingStatus = state => state.changingStatus;