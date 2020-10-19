import * as types from '../types/statistics';

export const startFetchingAssistanceClub = (idc, startdate, enddate) => ({
    type: types.ASSISTANCE_CLUB_FETCH_STARTED,
    payload: {
        idc,
        startdate, 
        enddate
    },
});

export const completeFetchingAssistanceClub = (entities) => ({
    type: types.ASSISTANCE_CLUB_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingAssistanceClub = error => ({
    type: types.ASSISTANCE_CLUB_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingAssistanceClubs = (startdate, enddate) => ({
    type: types.ASSISTANCE_CLUBS_FETCH_STARTED,
    payload: {
        startdate, 
        enddate
    },
});

export const completeFetchingAssistanceClubs = (entities) => ({
    type: types.ASSISTANCE_CLUBS_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingAssistanceClubs = error => ({
    type: types.ASSISTANCE_CLUBS_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingPlayers = (startdate, enddate) => ({
    type: types.PLAYERS_FETCH_STARTED,
    payload: {
        startdate, 
        enddate
    },
});

export const completeFetchingPlayers = (entities) => ({
    type: types.PLAYERS_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingPlayers = error => ({
    type: types.PLAYERS_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingPlayersSport = (startdate, enddate) => ({
    type: types.PLAYERS_SPORT_FETCH_STARTED,
    payload: {
        startdate, 
        enddate
    },
});

export const completeFetchingPlayersSport = (entities) => ({
    type: types.PLAYERS_SPORT_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingPlayersSport = error => ({
    type: types.PLAYERS_SPORT_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingTeamst = (startdate, enddate) => ({
    type: types.TEAMST_FETCH_STARTED,
    payload: {
        startdate, 
        enddate,
    },
});

export const completeFetchingTeamst = (entities) => ({
    type: types.TEAMST_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingTeamst = error => ({
    type: types.TEAMST_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingTeamstSport = (startdate, enddate) => ({
    type: types.TEAMST_SPORT_FETCH_STARTED,
    payload: {
        startdate, 
        enddate
    },
});

export const completeFetchingTeamstSport = (entities) => ({
    type: types.TEAMST_SPORT_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingTeamstSport = error => ({
    type: types.TEAMST_SPORT_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingGendert = (startdate, enddate) => ({
    type: types.GENDERT_FETCH_STARTED,
    payload: {
        startdate, 
        enddate,
    },
});

export const completeFetchingGendert = (entities) => ({
    type: types.GENDERT_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingGendert = error => ({
    type: types.GENDERT_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingGendertSport = (startdate, enddate) => ({
    type: types.GENDERT_SPORT_FETCH_STARTED,
    payload: {
        startdate, 
        enddate
    },
});

export const completeFetchingGendertSport = (entities) => ({
    type: types.GENDERT_SPORT_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingGendertSport = error => ({
    type: types.GENDERT_SPORT_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingScholarss = () => ({
    type: types.SCHOLARSS_FETCH_STARTED,
    payload: {
    },
});

export const completeFetchingScholarss = (entities) => ({
    type: types.SCHOLARSS_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingScholarss = error => ({
    type: types.SCHOLARSS_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationWKTime = (startdate, enddate) => ({
    type: types.PARTICIPATIONWK_TIME_FETCH_STARTED,
    payload: {
        startdate, 
        enddate
    },
});

export const completeFetchingParticipationWKTime = (entities) => ({
    type: types.PARTICIPATIONWK_TIME_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationWKTime = error => ({
    type: types.PARTICIPATIONWK_TIME_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationWK = (startdate, enddate) => ({
    type: types.PARTICIPATIONWK_FETCH_STARTED,
    payload: {
        startdate, 
        enddate
    },
});

export const completeFetchingParticipationWK = (entities) => ({
    type: types.PARTICIPATIONWK_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationWK = error => ({
    type: types.PARTICIPATIONWK_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationWKTimeG = (startdate, enddate) => ({
    type: types.PARTICIPATIONWK_TIME_G_FETCH_STARTED,
    payload: {
        startdate, 
        enddate
    },
});

export const completeFetchingParticipationWKTimeG = (entities) => ({
    type: types.PARTICIPATIONWK_TIME_G_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationWKTimeG = error => ({
    type: types.PARTICIPATIONWK_TIME_G_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationWKG = (startdate, enddate) => ({
    type: types.PARTICIPATIONWK_G_FETCH_STARTED,
    payload: {
        startdate, 
        enddate
    },
});

export const completeFetchingParticipationWKG = (entities) => ({
    type: types.PARTICIPATIONWK_G_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationWKG = error => ({
    type: types.PARTICIPATIONWK_G_FETCH_FAILED,
    payload: {
        error,
    },
});