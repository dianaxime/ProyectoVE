import * as types from '../types/assistances';

export const startFetchingUsersByEmail = email => ({
    type: types.USERS_BY_EMAIL_FETCH_STARTED_S,
    payload: {
        email
    },
});

export const completeFetchingUsersByEmail = (entities, order) => ({
    type: types.USERS_BY_EMAIL_FETCH_COMPLETED_S,
    payload: {
        entities,
        order,
    },
});

export const failFetchingUsersByEmail = error => ({
    type: types.USERS_BY_EMAIL_FETCH_FAILED_S,
    payload: {
        error,
    },
});

export const startAddingAssistance = (id, userid, ids, late) => ({
    type: types.ASSISTANCE_ADD_STARTED,
    payload: {
        id,
        userid,
        ids,
        late
    },
});

export const completeAddingAssistance = (oldId, assistance) => ({
    type: types.ASSISTANCE_ADD_COMPLETED,
    payload: {
        oldId,
        assistance,
    },
});

export const failAddingAssistance = (oldId, error) => ({
    type: types.ASSISTANCE_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});

export const startFetchingAssistances = (ids, idac) => ({
    type: types.ASSISTANCES_FETCH_STARTED,
    payload: {
        ids,
        idac,
    },
});

export const completeFetchingAssistances = (entities, order) => ({
    type: types.ASSISTANCES_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingAssistances = error => ({
    type: types.ASSISTANCES_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startRemovingAssistance = (userid, ids, idac) => ({
    type: types.ASSISTANCE_REMOVE_STARTED,
    payload: {
        userid,
        ids,
        idac,
    },
});

export const completeRemovingAssistance = userid => ({
    type: types.ASSISTANCE_REMOVE_COMPLETED,
    payload: userid,
});

export const failRemovingAssistance = error => ({
    type: types.ASSISTANCE_REMOVE_FAILED,
    payload: {
        error,
    },
});