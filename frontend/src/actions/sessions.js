import * as types from '../types/sessions';

export const startFetchingClubsByName = club => ({
    type: types.CLUBS_BY_NAME_FETCH_STARTED_AC,
    payload: {
        club
    },
});

export const completeFetchingClubsByName = (entities, order) => ({
    type: types.CLUBS_BY_NAME_FETCH_COMPLETED_AC,
    payload: {
        entities,
        order,
    },
});

export const failFetchingClubsByName = error => ({
    type: types.CLUBS_BY_NAME_FETCH_FAILED_AC,
    payload: {
        error,
    },
});

export const startAddingSession = (id, idac, date) => ({
    type: types.SESSION_ADD_STARTED,
    payload: {
        id,
        idac,
        date
    },
});

export const completeAddingSession = (oldId, session) => ({
    type: types.SESSION_ADD_COMPLETED,
    payload: {
        oldId,
        session,
    },
});

export const failAddingSession = (oldId, error) => ({
    type: types.SESSION_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});

export const startFetchingSessions = idac => ({
    type: types.SESSIONS_FETCH_STARTED,
    payload: {
        idac,
    },
});

export const completeFetchingSessions = (entities, order) => ({
    type: types.SESSIONS_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingSessions = error => ({
    type: types.SESSIONS_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingSessionsFormat = idac => ({
    type: types.SESSIONS_FORMAT_FETCH_STARTED,
    payload: {
        idac,
    },
});

export const completeFetchingSessionsFormat = sessions => ({
    type: types.SESSIONS_FORMAT_FETCH_COMPLETED,
    payload: {
        sessions
    },
});

export const failFetchingSessionsFormat = error => ({
    type: types.SESSIONS_FORMAT_FETCH_FAILED,
    payload: {
        error,
    },
});

export const changeSessionStatus = () => ({
    type: types.SET_SESSION_STATUS,
});
