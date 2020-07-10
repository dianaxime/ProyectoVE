import * as types from '../types/auth';

export const startRegister = (
    email,
    first_name,
    last_name,
    carne,
    sex,
    type,
    career,
    faculty
) => ({
    type: types.REGISTER_STARTED,
    payload: {
        email,
        first_name,
        last_name,
        carne,
        sex,
        type,
        career,
        faculty
    },
});

export const completeRegister = () => ({
    type: types.REGISTER_COMPLETED,
});

export const failRegister = error => ({
    type: types.REGISTER_FAILED,
    payload: { error },
});

export const startLogin = (email, password) => ({
    type: types.AUTHENTICATION_STARTED,
    payload: { email, password },
});

export const completeLogin = (token, data) => ({
    type: types.AUTHENTICATION_COMPLETED,
    payload: {
        token,
        data
    },
});

export const failLogin = error => ({
    type: types.AUTHENTICATION_FAILED,
    payload: { error },
});

export const logout = () => ({
    type: types.AUTHENTICATION_IDENTITY_CLEARED,
});

export const startTokenRefresh = () => ({
    type: types.TOKEN_REFRESH_STARTED,
});

export const completeTokenRefresh = newToken => ({
    type: types.TOKEN_REFRESH_COMPLETED,
    payload: { newToken },
});

export const failTokenRefresh = error => ({
    type: types.TOKEN_REFRESH_FAILED,
    payload: { error },
});

export const startRecover = email => ({
    type: types.RECOVER_STARTED,
    payload: { email },
});

export const completeRecover = () => ({
    type: types.RECOVER_COMPLETED,
});

export const failRecover = error => ({
    type: types.RECOVER_FAILED,
    payload: { error },
});

export const startUpdateUser = (
    first_name,
    last_name,
    carne,
    sex,
    type,
    career,
    faculty
) => ({
    type: types.UPDATE_USER_STARTED,
    payload: {
        first_name,
        last_name,
        carne,
        sex,
        type,
        career,
        faculty
    },
});

export const completeUpdateUser = data => ({
    type: types.UPDATE_USER_COMPLETED,
    payload: data,
});

export const failUpdateUser = error => ({
    type: types.UPDATE_USER_FAILED,
    payload: { error },
});

export const startChangePass = (oldPassword, newPassword) => ({
    type: types.CHANGE_PASSWORD_STARTED,
    payload: { oldPassword, newPassword },
});

export const completeChangePass = () => ({
    type: types.CHANGE_PASSWORD_COMPLETED,
});

export const failChangePass = error => ({
    type: types.CHANGE_PASSWORD_FAILED,
    payload: { error },
});

export const startAuthorize = email => ({
    type: types.AUTHORIZE_USER_STARTED,
    payload: { email },
});

export const completeAuthorize =  id => ({
    type: types.AUTHORIZE_USER_COMPLETED,
    payload: id,
});

export const failAuthorize = error => ({
    type: types.AUTHORIZE_USER_FAILED,
    payload: { error },
});

export const startFetchingUsers = () => ({
    type: types.PENDING_USERS_FETCH_STARTED,
});

export const completeFetchingUsers = (entities, order) => ({
    type: types.PENDING_USERS_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    }
});

export const failFetchingUsers = error => ({
    type: types.PENDING_USERS_FETCH_FAILED,
    payload: { error },
});