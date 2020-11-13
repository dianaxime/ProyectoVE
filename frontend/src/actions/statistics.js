import * as types from '../types/statistics';

export const startFetchingAssistanceClub = (idc, startdate, enddate) => ({
    type: types.ASSISTANCE_CLUB_FETCH_STARTED,
    payload: {
        idc,
        startdate,
        enddate
    },
});

export const completeFetchingAssistanceClub = entities => ({
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

export const completeFetchingAssistanceClubs = entities => ({
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

export const completeFetchingPlayers = entities => ({
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

export const completeFetchingPlayersSport = entities => ({
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

export const completeFetchingTeamst = entities => ({
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

export const completeFetchingTeamstSport = entities => ({
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

export const completeFetchingGendert = entities => ({
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

export const completeFetchingGendertSport = entities => ({
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

export const completeFetchingScholarss = entities => ({
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

export const completeFetchingParticipationWKTime = entities => ({
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

export const completeFetchingParticipationWK = entities => ({
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

export const completeFetchingParticipationWKTimeG = entities => ({
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

export const completeFetchingParticipationWKG = entities => ({
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


export const startFetchingFemaleScholars = (startdate, enddate) => ({
    type: types.FEMALE_SCHOLARS_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingFemaleScholars = entities => ({
    type: types.FEMALE_SCHOLARS_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingFemaleScholars = error => ({
    type: types.FEMALE_SCHOLARS_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingMaleScholars = (startdate, enddate) => ({
    type: types.MALE_SCHOLARS_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingMaleScholars = entities => ({
    type: types.MALE_SCHOLARS_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingMaleScholars = error => ({
    type: types.MALE_SCHOLARS_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingCountEvents = (startdate, enddate) => ({
    type: types.COUNT_EVENTS_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingCountEvents = entities => ({
    type: types.COUNT_EVENTS_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingCountEvents = error => ({
    type: types.COUNT_EVENTS_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingMaleUsers = () => ({
    type: types.MALE_USERS_FETCH_STARTED,
    payload: {
    },
});

export const completeFetchingMaleUsers = entities => ({
    type: types.MALE_USERS_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingMaleUsers = error => ({
    type: types.MALE_USERS_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingFemaleUsers = () => ({
    type: types.FEMALE_USERS_FETCH_STARTED,
    payload: {
    },
});

export const completeFetchingFemaleUsers = entities => ({
    type: types.FEMALE_USERS_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingFemaleUsers = error => ({
    type: types.FEMALE_USERS_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingUsersFaculty = () => ({
    type: types.USERS_FACULTY_FETCH_STARTED,
    payload: {
    },
});

export const completeFetchingUsersFaculty = entities => ({
    type: types.USERS_FACULTY_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingUsersFaculty = error => ({
    type: types.USERS_FACULTY_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingFemaleUsersFaculty = () => ({
    type: types.F_USERS_FACULTY_FETCH_STARTED,
    payload: {
    },
});

export const completeFetchingFemaleUsersFaculty = entities => ({
    type: types.F_USERS_FACULTY_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingFemaleUsersFaculty = error => ({
    type: types.F_USERS_FACULTY_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingMaleUsersFaculty = () => ({
    type: types.M_USERS_FACULTY_FETCH_STARTED,
    payload: {
    },
});

export const completeFetchingMaleUsersFaculty = entities => ({
    type: types.M_USERS_FACULTY_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingMaleUsersFaculty = error => ({
    type: types.M_USERS_FACULTY_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingUsersCareer = () => ({
    type: types.USERS_CAREER_FETCH_STARTED,
    payload: {
    },
});

export const completeFetchingUsersCareer = entities => ({
    type: types.USERS_CAREER_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingUsersCareer = error => ({
    type: types.USERS_CAREER_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingFemaleUsersCareer = () => ({
    type: types.F_USERS_CAREER_FETCH_STARTED,
    payload: {
    },
});

export const completeFetchingFemaleUsersCareer = entities => ({
    type: types.F_USERS_CAREER_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingFemaleUsersCareer = error => ({
    type: types.F_USERS_CAREER_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingMaleUsersCareer = () => ({
    type: types.M_USERS_CAREER_FETCH_STARTED,
    payload: {
    },
});

export const completeFetchingMaleUsersCareer = entities => ({
    type: types.M_USERS_CAREER_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingMaleUsersCareer = error => ({
    type: types.M_USERS_CAREER_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationArtClubs = (startdate, enddate) => ({
    type: types.PARTICIPATION_ARTCLUBS_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingParticipationArtClubs = entities => ({
    type: types.PARTICIPATION_ARTCLUBS_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationArtClubs = error => ({
    type: types.PARTICIPATION_ARTCLUBS_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationArtClub = (startdate, enddate) => ({
    type: types.PARTICIPATION_ARTCLUB_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingParticipationArtClub = entities => ({
    type: types.PARTICIPATION_ARTCLUB_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationArtClub = error => ({
    type: types.PARTICIPATION_ARTCLUB_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationArtClubF = (startdate, enddate) => ({
    type: types.PARTICIPATION_ARTCLUB_F_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingParticipationArtClubF = entities => ({
    type: types.PARTICIPATION_ARTCLUB_F_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationArtClubF = error => ({
    type: types.PARTICIPATION_ARTCLUB_F_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationArtClubM = (startdate, enddate) => ({
    type: types.PARTICIPATION_ARTCLUB_M_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingParticipationArtClubM = entities => ({
    type: types.PARTICIPATION_ARTCLUB_M_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationArtClubM = error => ({
    type: types.PARTICIPATION_ARTCLUB_M_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationSportClubs = (startdate, enddate) => ({
    type: types.PARTICIPATION_SPORTCLUBS_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingParticipationSportClubs = entities => ({
    type: types.PARTICIPATION_SPORTCLUBS_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationSportClubs = error => ({
    type: types.PARTICIPATION_SPORTCLUBS_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationSportClub = (startdate, enddate) => ({
    type: types.PARTICIPATION_SPORTCLUB_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingParticipationSportClub = entities => ({
    type: types.PARTICIPATION_SPORTCLUB_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationSportClub = error => ({
    type: types.PARTICIPATION_SPORTCLUB_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationSportClubF = (startdate, enddate) => ({
    type: types.PARTICIPATION_SPORTCLUB_F_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingParticipationSportClubF = entities => ({
    type: types.PARTICIPATION_SPORTCLUB_F_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationSportClubF = error => ({
    type: types.PARTICIPATION_SPORTCLUB_F_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationSportClubM = (startdate, enddate) => ({
    type: types.PARTICIPATION_SPORTCLUB_M_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingParticipationSportClubM = entities => ({
    type: types.PARTICIPATION_SPORTCLUB_M_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationSportClubM = error => ({
    type: types.PARTICIPATION_SPORTCLUB_M_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationAcadClubs = (startdate, enddate) => ({
    type: types.PARTICIPATION_ACADEMICCLUBS_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingParticipationAcadClubs = entities => ({
    type: types.PARTICIPATION_ACADEMICCLUBS_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationAcadClubs = error => ({
    type: types.PARTICIPATION_ACADEMICCLUBS_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationAcadClub = (startdate, enddate) => ({
    type: types.PARTICIPATION_ACADEMICCLUB_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingParticipationAcadClub = entities => ({
    type: types.PARTICIPATION_ACADEMICCLUB_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationAcadClub = error => ({
    type: types.PARTICIPATION_ACADEMICCLUB_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationAcadClubF = (startdate, enddate) => ({
    type: types.PARTICIPATION_ACADEMICCLUB_F_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingParticipationAcadClubF = entities => ({
    type: types.PARTICIPATION_ACADEMICCLUB_F_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationAcadClubF = error => ({
    type: types.PARTICIPATION_ACADEMICCLUB_F_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationAcadClubM = (startdate, enddate) => ({
    type: types.PARTICIPATION_ACADEMICCLUB_M_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingParticipationAcadClubM = entities => ({
    type: types.PARTICIPATION_ACADEMICCLUB_M_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationAcadClubM = error => ({
    type: types.PARTICIPATION_ACADEMICCLUB_M_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationAgrupations = (startdate, enddate) => ({
    type: types.PARTICIPATION_AGRUPATIONS_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingParticipationAgrupations = entities => ({
    type: types.PARTICIPATION_AGRUPATIONS_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationAgrupations = error => ({
    type: types.PARTICIPATION_AGRUPATIONS_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationAgrupation = (startdate, enddate) => ({
    type: types.PARTICIPATION_AGRUPATION_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingParticipationAgrupation = entities => ({
    type: types.PARTICIPATION_AGRUPATION_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationAgrupation = error => ({
    type: types.PARTICIPATION_AGRUPATION_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationAgrupationF = (startdate, enddate) => ({
    type: types.PARTICIPATION_AGRUPATION_F_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingParticipationAgrupationF = entities => ({
    type: types.PARTICIPATION_AGRUPATION_F_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationAgrupationF = error => ({
    type: types.PARTICIPATION_AGRUPATION_F_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationAgrupationM = (startdate, enddate) => ({
    type: types.PARTICIPATION_AGRUPATION_M_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingParticipationAgrupationM = entities => ({
    type: types.PARTICIPATION_AGRUPATION_M_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationAgrupationM = error => ({
    type: types.PARTICIPATION_AGRUPATION_M_FETCH_FAILED,
    payload: {
        error,
    },
});



export const startFetchingParticipationAssociations = (startdate, enddate) => ({
    type: types.PARTICIPATION_ASSOCIATIONS_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingParticipationAssociations = entities => ({
    type: types.PARTICIPATION_ASSOCIATIONS_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationAssociations = error => ({
    type: types.PARTICIPATION_ASSOCIATIONS_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationAssociation = (startdate, enddate) => ({
    type: types.PARTICIPATION_ASSOCIATION_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingParticipationAssociation = entities => ({
    type: types.PARTICIPATION_ASSOCIATION_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationAssociation = error => ({
    type: types.PARTICIPATION_ASSOCIATION_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationAssociationF = (startdate, enddate) => ({
    type: types.PARTICIPATION_ASSOCIATION_F_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingParticipationAssociationF = entities => ({
    type: types.PARTICIPATION_ASSOCIATION_F_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationAssociationF = error => ({
    type: types.PARTICIPATION_ASSOCIATION_F_FETCH_FAILED,
    payload: {
        error,
    },
});


export const startFetchingParticipationAssociationM = (startdate, enddate) => ({
    type: types.PARTICIPATION_ASSOCIATION_M_FETCH_STARTED,
    payload: {
        startdate,
        enddate
    },
});

export const completeFetchingParticipationAssociationM = entities => ({
    type: types.PARTICIPATION_ASSOCIATION_M_FETCH_COMPLETED,
    payload: {
        entities,
    },
});

export const failFetchingParticipationAssociationM = error => ({
    type: types.PARTICIPATION_ASSOCIATION_M_FETCH_FAILED,
    payload: {
        error,
    },
});