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

export const startAddingRoleRelationship = (id, userid, idw, startdate, enddate) => ({
    type: types.ROLES_RELATIONSHIP_ADD_STARTED,
    payload: {
        id,
        userid,
        idw,
        startdate,
        enddate,
    },
});

export const completeAddingRoleRelationship = (oldId, participation) => ({
    type: types.ROLES_RELATIONSHIP_ADD_COMPLETED,
    payload: {
        oldId,
        participation,
    },
});

export const failAddingRoleRelationship = (oldId, error) => ({
    type: types.ROLES_RELATIONSHIP_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});

export const startRemovingRoleRelationship = (idw, userid) => ({
    type: types.ROLES_RELATIONSHIP_REMOVE_STARTED,
    payload: {
        idw,
        userid,
    },
});

export const completeRemovingRoleRelationship = userid => ({
    type: types.ROLES_RELATIONSHIP_REMOVE_COMPLETED,
    payload: userid,
});

export const failRemovingRoleRelationship = error => ({
    type: types.ROLES_RELATIONSHIP_REMOVE_FAILED,
    payload: {
        error,
    },
});