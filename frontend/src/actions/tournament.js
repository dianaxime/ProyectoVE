import * as types from '../types/tournament';

export const startFetchingUsersByEmail = email => ({
    type: types.USERS_BY_EMAIL_FETCH_STARTED_TOURNAMENT,
    payload: {
        email
    },
});

export const completeFetchingUsersByEmail = (entities, order) => ({
    type: types.USERS_BY_EMAIL_FETCH_COMPLETED_TOURNAMENT,
    payload: {
        entities,
        order,
    },
});

export const failFetchingUsersByEmail = error => ({
    type: types.USERS_BY_EMAIL_FETCH_FAILED_TOURNAMENT,
    payload: {
        error,
    },
});

export const startAddingTournament = (id, userid, idt, startdate, enddate) => ({
    type: types.TOURNAMENT_ADD_STARTED,
    payload: {
        id,
        userid,
        idt,
        startdate,
        enddate,
    },
});

export const completeAddingTournament = (oldId, tournament) => ({
    type: types.TOURNAMENT_ADD_COMPLETED,
    payload: {
        oldId,
        tournament,
    },
});

export const failAddingTournament = (oldId, error) => ({
    type: types.TOURNAMENT_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});

export const startFetchingTournament = idt => ({
    type: types.TOURNAMENT_FETCH_STARTED,
    payload: {
        idt,
    },
});

export const completeFetchingTournament = (entities, order) => ({
    type: types.TOURNAMENT_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingTournament = error => ({
    type: types.TOURNAMENT_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startRemovingTournament = (idt, userid) => ({
    type: types.TOURNAMENT_REMOVE_STARTED,
    payload: {
        idt,
        userid,
    },
});

export const completeRemovingTournament = userid => ({
    type: types.TOURNAMENT_REMOVE_COMPLETED,
    payload: userid,
});

export const failRemovingTournament = error => ({
    type: types.TOURNAMENT_REMOVE_FAILED,
    payload: {
        error,
    },
});