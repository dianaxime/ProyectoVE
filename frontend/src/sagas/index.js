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
    watchUsersFetchAssociationClub,
    watchAssociationClubFetch,
    watchAddAssociationClub,
    watchDeleteAssociationClub,
} from './associationClubRelationship'; 

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
        /* events participations */
        fork(watchUsersFetchEventParticipation),
        fork(watchEventParticipationFetch),
        fork(watchAddEventParticipation),
        fork(watchDeleteEventParticipation),
        /* Roles Relationship */
        fork(watchUsersFetchRolesRelationship),
        fork(watchAddRolesRelationship),
        fork(watchFetchRoles),
         /* Association Club */
         fork(watchUsersFetchAssociationClubRelationship),
         fork(watchAssociationClubFetchRelationship),
         fork(watchAddAssociationClubRelationship),
         fork(watchDeleteAssociationClubRelationship),
    ]);
}

export default mainSaga;