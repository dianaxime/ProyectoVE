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

export const completeLogin = token => ({
    type: types.AUTHENTICATION_COMPLETED,
    payload: { token },
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