import * as types from '../types/rolesRelationship';

export const startFetchingUsersByEmail = email => ({
    type: types.USERS_BY_EMAIL_FETCH_STARTED_ROLES,
    payload: {
        email
    },
});

export const completeFetchingUsersByEmail = (entities, order) => ({
    type: types.USERS_BY_EMAIL_FETCH_COMPLETED_ROLES,
    payload: {
        entities,
        order,
    },
});
export const failFetchingUsersByEmail = error => ({
    type: types.USERS_BY_EMAIL_FETCH_FAILED_ROLES,
    payload: {
        error,
    },
});


export const startFetchingRoles = () => ({
    type: types.ROLES_FETCH_STARTED,
});

export const completeFetchingRoles = (entities, order) => ({
    type: types.ROLES_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingRoles = error => ({
    type: types.ROLES_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startAddingRoleRelationship = (userid, idr) => ({
    type: types.ROLES_RELATIONSHIP_ADD_STARTED,
    payload: {
        userid,
        idr,
    },
});

export const completeAddingRoleRelationship = (userid, idr) => ({
    type: types.ROLES_RELATIONSHIP_ADD_COMPLETED,
    payload: {
        userid,
        idr,
    },
});

export const failAddingRoleRelationship = error => ({
    type: types.ROLES_RELATIONSHIP_ADD_FAILED,
    payload: {
        error,
    },
});
