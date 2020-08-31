import * as types from '../types/rolesRelationship';

export const startFetchingUsersByEmail = email => ({
    type: types.USERS_BY_EMAIL_FETCH_STARTED,
    payload: {
        email
    },
});

export const completeFetchingUsersByEmail = (entities, order) => ({
    type: types.USERS_BY_EMAIL_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});
export const failFetchingUsersByEmail = error => ({
    type: types.USERS_BY_EMAIL_FETCH_FAILED,
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

export const startAddingRoleRelationship = (id, userid, idr) => ({
    type: types.ROLES_RELATIONSHIP_ADD_STARTED,
    payload: {
        id,
        userid,
        idr,
    },
});

export const completeAddingRoleRelationship = (oldId, rolesRelation) => ({
    type: types.ROLES_RELATIONSHIP_ADD_COMPLETED,
    payload: {
        oldId,
        rolesRelation,
    },
});

export const failAddingRoleRelationship = (oldId, error) => ({
    type: types.ROLES_RELATIONSHIP_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});
