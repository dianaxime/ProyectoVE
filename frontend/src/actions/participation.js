import * as types from '../types/participation';

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

export const startAddingParticipation = (id, userid, idw, startdate, enddate) => ({
    type: types.PARTICIPATION_ADD_STARTED,
    payload: {
        id,
        userid,
        idw,
        startdate,
        enddate,
    },
});

export const completeAddingParticipation = (oldId, participation) => ({
    type: types.PARTICIPATION_ADD_COMPLETED,
    payload: {
        oldId,
        participation,
    },
});

export const failAddingParticipation = (oldId, error) => ({
    type: types.PARTICIPATION_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});

export const startFetchingParticipation = idw => ({
    type: types.PARTICIPATION_FETCH_STARTED,
    payload: {
        idw,
    },
});

export const completeFetchingParticipation = (entities, order) => ({
    type: types.PARTICIPATION_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingParticipation = error => ({
    type: types.PARTICIPATION_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startRemovingParticipation = (idw, userid) => ({
    type: types.PARTICIPATION_REMOVE_STARTED,
    payload: {
        idw,
        userid,
    },
});

export const completeRemovingParticipation = userid => ({
    type: types.PARTICIPATION_REMOVE_COMPLETED,
    payload: userid,
});

export const failRemovingParticipation = error => ({
    type: types.PARTICIPATION_REMOVE_FAILED,
    payload: {
        error,
    },
});