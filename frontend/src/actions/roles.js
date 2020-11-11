import * as types from '../types/roles';

export const startFetchRoles = () => ({
    type: types.FETCH_ROLES_STARTED,
});

export const completeFetchRoles = roles => ({
    type: types.FETCH_ROLES_COMPLETED,
    payload: roles,
});

export const failFetchRoles = error => ({
    type: types.FETCH_ROLES_FAILED,
    payload: error,
});