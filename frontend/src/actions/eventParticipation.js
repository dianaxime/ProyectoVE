import * as types from '../types/eventParticipation';

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

export const startAddingEventParticipation = (id, userid, ide, hours) => ({
    type: types.EVENT_PARTICIPATION_ADD_STARTED,
    payload: {
        id,
        userid,
        ide,
        hours,
    },
});

export const completeAddingEventParticipation = (oldId, eventParticipation) => ({
    type: types.EVENT_PARTICIPATION_ADD_COMPLETED,
    payload: {
        oldId,
        eventParticipation,
    },
});

export const failAddingEventParticipation = (oldId, error) => ({
    type: types.EVENT_PARTICIPATION_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});

export const startFetchingEventParticipation = ide => ({
    type: types.EVENT_PARTICIPATION_FETCH_STARTED,
    payload: {
        ide,
    },
});

export const completeFetchingEventParticipation = (entities, order) => ({
    type: types.EVENT_PARTICIPATION_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingEventParticipation = error => ({
    type: types.EVENT_PARTICIPATION_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startRemovingEventParticipation = (ide, userid) => ({
    type: types.EVENT_PARTICIPATION_REMOVE_STARTED,
    payload: {
        ide,
        userid,
    },
});

export const completeRemovingEventParticipation = userid => ({
    type: types.EVENT_PARTICIPATION_REMOVE_COMPLETED,
    payload: userid,
});

export const failRemovingEventParticipation = error => ({
    type: types.EVENT_PARTICIPATION_REMOVE_FAILED,
    payload: {
        error,
    },
});