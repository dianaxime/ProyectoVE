import { fork, all } from 'redux-saga/effects';

import {
    watchLoginStarted,
    watchRefreshTokenStarted,
    watchRegisterStarted,
    watchRecoverStarted,
    watchUpdateUserStarted,
    watchChangePassStarted,
    watchFetchingUsersStarted,
    watchAuthorizeStarted,
} from './auth';

import {
    watchAddWorkshop,
    watchWorkshopsFetch,
    watchUpdateWorkshop,
} from './workshops';

import {
    watchAddScholar,
    watchScholarsFetch,
} from './scholars';
import { 
    watchUpdateTeam, 
    watchAddTeam, 
    watchTeamsFetch 
} from './teams';

import {
    watchUsersFetch,
    watchParticipationFetch,
    watchAddParticipation,
    watchDeleteParticipation,
} from './participation';

import {
    watchUsersFetchTournament,
    watchTournamentFetch,
    watchAddTournament,
    watchDeleteTournament,
} from './tournament';

import {
    watchAddEvent,
    watchEventsFetch,
    watchUpdateEvent,
    watchScholarsHoursFetch,
} from './events';

import {
    watchUsersFetchEventParticipation,
    watchEventParticipationFetch,
    watchAddEventParticipation,
    watchDeleteEventParticipation,
} from './eventParticipations';

import {
    watchUsersFetchRolesRelationship,
    watchAddRolesRelationship,
    watchFetchRoles,
} from './rolesRelationship';

import {
    watchUsersFetchAssociationClubRelationship,
    watchAssociationClubRelationshipFetch,
    watchAddAssociationClubRelationship,
    watchDeleteAssociationClubRelationship,
} from './associationClubRelationship'; 

import { 
    watchAddAssociationClub, 
    watchUpdateAssociationClub, 
    watchAssociationClubsFetch 
} from './associationClub';

import {
    watchClubsFetchSession,
    watchSessionsFetch,
    watchAddSession,
    watchSessionsFormatFetch,
    watchUpdateSession
} from './sessions';

import {
    watchUsersFetchAssistance,
    watchAssistancesFetch,
    watchAddAssistance,
    watchDeleteAssistance,
} from './assistances';

import {
    watchAssistanceClubFetch,
    watchAssistanceClubsFetch,
    watchPlayersFetch,
    watchPlayersSportFetch,
    watchTeamstFetch,
    watchTeamstSportFetch,
    watchGendertFetch,
    watchGendertSportFetch,
    watchScholarssFetch,
    watchParticipationWKTimeFetch,
    watchParticipationWKFetch,
    watchParticipationWKTimeGFetch,
    watchParticipationWKGFetch,
} from './statistics'; 

function* mainSaga() {
    yield all([
        /* Auth */
        fork(watchLoginStarted),
        fork(watchRefreshTokenStarted),
        fork(watchRegisterStarted),
        fork(watchRecoverStarted),
        fork(watchUpdateUserStarted),
        fork(watchChangePassStarted),
        fork(watchFetchingUsersStarted),
        fork(watchAuthorizeStarted),
        /* Workshop */
        fork(watchAddWorkshop),
        fork(watchWorkshopsFetch),
        fork(watchUpdateWorkshop),
        /* Scholar */
        fork(watchAddScholar),
        fork(watchScholarsFetch),
        /* Teams */ 
        fork(watchAddTeam),
        fork(watchTeamsFetch),
        fork(watchUpdateTeam),
        /* Participation */
        fork(watchUsersFetch),
        fork(watchParticipationFetch),
        fork(watchAddParticipation),
        fork(watchDeleteParticipation),
        /* Tournaments */
        fork(watchUsersFetchTournament),
        fork(watchTournamentFetch),
        fork(watchAddTournament),
        fork(watchDeleteTournament),
        /* Events */ 
        fork(watchAddEvent),
        fork(watchEventsFetch),
        fork(watchUpdateEvent),
        fork(watchScholarsHoursFetch),
        /* events participations */
        fork(watchUsersFetchEventParticipation),
        fork(watchEventParticipationFetch),
        fork(watchAddEventParticipation),
        fork(watchDeleteEventParticipation),
        /* Roles Relationship */
        fork(watchUsersFetchRolesRelationship),
        fork(watchAddRolesRelationship),
        fork(watchFetchRoles),
        /* Association Club Relationship */
        fork(watchUsersFetchAssociationClubRelationship),
        fork(watchAssociationClubRelationshipFetch),
        fork(watchAddAssociationClubRelationship),
        fork(watchDeleteAssociationClubRelationship),
        /* Association Club */ 
        fork(watchAddAssociationClub),
        fork(watchAssociationClubsFetch),
        fork(watchUpdateAssociationClub),
        /* Sessions */
        fork(watchClubsFetchSession),
        fork(watchSessionsFetch),
        fork(watchAddSession),
        fork(watchSessionsFormatFetch),
        fork(watchUpdateSession),
        /* Assistances */
        fork(watchUsersFetchAssistance),
        fork(watchAssistancesFetch),
        fork(watchAddAssistance),
        fork(watchDeleteAssistance),
        /* Estadistics */
        fork(watchAssistanceClubFetch),
        fork(watchAssistanceClubsFetch),
        fork(watchPlayersFetch),
        fork(watchPlayersSportFetch),
        fork(watchTeamstFetch),
        fork(watchTeamstSportFetch),
        fork(watchGendertFetch),
        fork(watchGendertSportFetch),
        fork(watchScholarssFetch),
        fork(watchParticipationWKTimeFetch),
        fork(watchParticipationWKFetch),
        fork(watchParticipationWKTimeGFetch),
        fork(watchParticipationWKGFetch),
    ]);
}

export default mainSaga;