import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import auth, * as authSelectors from './auth';
import workshops, * as workshopsSelectors from './workshops';
import scholars, * as scholarsSelectors from './scholars';
import teams, * as teamsSelectors from './teams'; 
import participation, * as participationSelectors from './participation';
import tournament, * as tournamentSelectors from './tournament';
import events, * as eventsSelectors from './events';
import eventParticipation, * as eventParticipationSelectors from './eventParticipation';
import rolesRelationship, * as rolesRelationshipSelectors from './rolesRelationship';
import associationClubRelationship, * as associationClubRelationshipSelectors from './associationClubsRelationship';
import sessions, * as sessionsSelectors from './sessions';
import associationClub, * as associationClubSelectors from './associationClub'; 
import assistances, * as assistancesSelectors from './assistances'; 
import statistics, * as statisticsSelectors from './statistics'; 

import changeDrawer, * as changeDrawerSelectors from './changeDrawer';
import changeForgot, * as changeForgotSelectors from './modalForgot';
import changeRole, * as changeRoleSelectors from './modalRoles'; 
import changeChange, * as changeChangeSelectors from './modalChange';
import changeUpdate, * as changeUpdateSelectors from './modalUpdate';
import changeScholar, * as changeScholarSelectors from './modalScholarship';
import changeAssign, * as changeAssignSelectors from './modalAssign';

import selectedWorkshop, * as selectedWorkshopSelectors from './selectedWorkshop';
import selectedTeam, * as selectedTeamSelectors from './selectedTeam'; 
import selectedEvent, * as selectedEventSelectors from './selectedEvent'; 
import selectedRol, * as selectedRolSelectors from './selectedRol';
import selectedAUser, * as selectedAUserSelectors from './selectedAUser'; 
import selectedAssociationClub, * as selectedAssociationClubSelectors from './selectedAssociationClub'; 
import selectedSession, * as selectedSessionSelectors from './selectedSession';

const reducer = combineReducers({
  auth,
  changeDrawer,
  changeForgot,
  changeRole, 
  changeChange,
  changeUpdate,
  workshops,
  teams, 
  scholars,
  changeScholar,
  selectedWorkshop,
  selectedTeam,
  participation,
  tournament,
  events,
  selectedEvent,
  eventParticipation,
  rolesRelationship,
  selectedRol,
  changeAssign,
  selectedAUser,
  associationClubRelationship, 
  associationClub,
  selectedAssociationClub, 
  sessions,
  selectedSession,
  assistances,
  statistics,
  form: formReducer,
});

export default reducer;

/* Authentication */
export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getUser = state => authSelectors.getUser(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const isAuthenticated = state => getAuthToken(state) != null;
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
export const getAuthEmail = state => authSelectors.getAuthEmail(state.auth);
export const getIsRefreshingToken = state => authSelectors.getIsRefreshingToken(state.auth);
export const getRefreshingError = state => authSelectors.getRefreshingError(state.auth);
export const getRegisteringStatus = state => authSelectors.getRegisteringStatus(state.auth);
export const getRecoveringStatus = state => authSelectors.getRecoveringStatus(state.auth);
export const getUpdatingStatus = state => authSelectors.getUpdatingStatus(state.auth);
export const getChangingStatus = state => authSelectors.getChangingStatus(state.auth);
export const getPendingUser = (state, id) => authSelectors.getPendingUser(state.auth, id);
export const getPendingUsers = state => authSelectors.getPendingUsers(state.auth);
export const isFetchingPendingUsers = state => authSelectors.isFetchingPendingUsers(state.auth);
export const getFetchingPendingUsersError = state => authSelectors.getFetchingPendingUsersError(state.auth);
/* Drawer */
export const getIsOpen = state => changeDrawerSelectors.getIsOpen(state.changeDrawer);
/* Forgot Password Modal */
export const getIsForgotOpen = state => changeForgotSelectors.getIsForgotOpen(state.changeForgot);
/* Scholar Password Modal */
export const getIsScholarOpen = state => changeScholarSelectors.getIsScholarOpen(state.changeScholar);
/* Change Password Modal */
export const getIsChangeOpen = state => changeChangeSelectors.getIsChangeOpen(state.changeChange);
/* Update Password Modal */
export const getIsUpdateOpen = state => changeUpdateSelectors.getIsUpdateOpen(state.changeUpdate);
/* Assign Password Modal */
export const getIsAssignOpen = state => changeAssignSelectors.getIsAssignOpen(state.changeAssign);
/* Workshops */
export const getWorkshop = (state, id) => workshopsSelectors.getWorkshop(state.workshops, id);
export const getWorkshops = state => workshopsSelectors.getWorkshops(state.workshops);
export const isFetchingWorkshops = state => workshopsSelectors.isFetchingWorkshops(state.workshops);
export const getFetchingWorkshopsError = state => workshopsSelectors.getFetchingWorkshopsError(state.workshops);
export const getWorkshopStatus = state => workshopsSelectors.getWorkshopStatus(state.workshops);
/* Teams */
export const getTeam = (state, id) => teamsSelectors.getTeam(state.teams, id);
export const getTeams = state => teamsSelectors.getTeams(state.teams);
export const isFetchingTeams = state => teamsSelectors.isFetchingTeams(state.teams);
export const getFetchingTeamsError = state => teamsSelectors.getFetchingTeamsError(state.teams);
export const getTeamStatus = state => teamsSelectors.getTeamStatus(state.teams);
/* Scholars */
export const getScholar = (state, id) => scholarsSelectors.getScholar(state.scholars, id);
export const getScholars = state => scholarsSelectors.getScholars(state.scholars);
export const isFetchingScholars = state => scholarsSelectors.isFetchingScholars(state.scholars);
export const getFetchingScholarsError = state => scholarsSelectors.getFetchingScholarsError(state.scholars);
export const getScholarStatus = state => scholarsSelectors.getScholarStatus(state.scholars);
/* Selected Workshop*/
export const getSelectedWorkshop = (state) => selectedWorkshopSelectors.getSelectedWorkshop(state.selectedWorkshop)
/* Selected Team */ 
export const getSelectedTeam = (state) => selectedTeamSelectors.getSelectedTeam(state.selectedTeam)
/* Selected Event */ 
export const getSelectedEvent = (state) => selectedEventSelectors.getSelectedEvent(state.selectedEvent)
/* Participations */
export const getUserByEmail = (state, id) => participationSelectors.getUserByEmail(state.participation, id);
export const getUsersOrder = state => participationSelectors.getUsersOrder(state.participation);
export const getUsersByEmail = state => participationSelectors.getUsersByEmail(state.participation);
export const isFetchingUsersByEmail = state => participationSelectors.isFetchingUsersByEmail(state.participation);
export const getFetchingUsersByEmailError = state => participationSelectors.getFetchingUsersByEmailError(state.participation);
export const getParticipation = (state, id) => participationSelectors.getParticipation(state.participation, id);
export const getParticipations = state => participationSelectors.getParticipations(state.participation);
export const isFetchingParticipations = state => participationSelectors.isFetchingParticipations(state.participation);
export const getFetchingParticipationError = state => participationSelectors.getFetchingParticipationError(state.participation);
/* Tournament */
export const getUserByEmailTournament = (state, id) => tournamentSelectors.getUserByEmailTournament(state.tournament, id);
export const getUsersOrderTournament = state => tournamentSelectors.getUsersOrderTournament(state.tournament);
export const getUsersByEmailTournament = state => tournamentSelectors.getUsersByEmailTournament(state.tournament);
export const isFetchingUsersByEmailTournament = state => tournamentSelectors.isFetchingUsersByEmailTournament(state.tournament);
export const getFetchingUsersByEmailErrorTournament = state => tournamentSelectors.getFetchingUsersByEmailErrorTournament(state.tournament);
export const getTournament = (state, id) => tournamentSelectors.getTournament(state.tournament, id);
export const getTournaments = state => tournamentSelectors.getTournaments(state.tournament);
export const isFetchingTournaments = state => tournamentSelectors.isFetchingTournaments(state.tournament);
export const getFetchingTournamentError = state => tournamentSelectors.getFetchingTournamentError(state.tournament);
/* Events */
export const getEvent = (state, id) => eventsSelectors.getEvent(state.events, id);
export const getEvents = state => eventsSelectors.getEvents(state.events);
export const isFetchingEvents = state => eventsSelectors.isFetchingEvents(state.events);
export const getFetchingEventsError = state => eventsSelectors.getFetchingEventsError(state.events);
export const getEventStatus = state => eventsSelectors.getEventStatus(state.events);
/* events participation */
export const getUserByEmailEventParticipation = (state, id) => eventParticipationSelectors.getUserByEmailEventParticipation(state.eventParticipation, id);
export const getUsersByEmailEventParticipation = state => eventParticipationSelectors.getUsersByEmailEventParticipation(state.eventParticipation);
export const isFetchingUsersByEmailEventParticipation = state => eventParticipationSelectors.isFetchingUsersByEmailEventParticipation(state.eventParticipation);
export const getFetchingUsersByEmailErrorEventParticipation = state => eventParticipationSelectors.getFetchingUsersByEmailErrorEventParticipation(state.eventParticipation);
export const getEventParticipation = (state, id) => eventParticipationSelectors.getEventParticipation(state.eventParticipation, id);
export const getEventParticipations = state => eventParticipationSelectors.getEventParticipations(state.eventParticipation);
export const isFetchingEventParticipations = state => eventParticipationSelectors.isFetchingEventParticipations(state.eventParticipation);
export const getFetchingEventParticipationError = state => eventParticipationSelectors.getFetchingEventParticipationError(state.eventParticipation);
/* Roles Relationship */
export const getUserByEmailRolesRelation = (state, id) => rolesRelationshipSelectors.getUserByEmailRolesRelation(state.rolesRelationship, id);
export const getUsersByEmailRolesRelation = state => rolesRelationshipSelectors.getUsersByEmailRolesRelation(state.rolesRelationship);
export const isFetchingUsersByEmailRolesRelation = state => rolesRelationshipSelectors.isFetchingUsersByEmailRolesRelation(state.rolesRelationship);
export const getFetchingUsersByEmailErrorRolesRelation = state => rolesRelationshipSelectors.getFetchingUsersByEmailErrorRolesRelation(state.rolesRelationship);
/* Roles  Modal */
export const getIsRolesOpen = state => changeRoleSelectors.getIsRolesOpen(state.changeRole);
/* Roles */
export const getRole = (state, id) => rolesRelationshipSelectors.getRole(state.rolesRelationship, id);
export const getRoles = state => rolesRelationshipSelectors.getRoles(state.rolesRelationship);
export const isFetchingRoles = state => rolesRelationshipSelectors.isFetchingRoles(state.rolesRelationship);
export const getFetchingErrorRoles = state => rolesRelationshipSelectors.getFetchingErrorRoles(state.rolesRelationship);
/* Selected Rol */ 
export const getSelectedRol = (state) => selectedRolSelectors.getSelectedRol(state.selectedRol)
/* Selected AUser */ 
export const getSelectedAUser = (state) => selectedAUserSelectors.getSelectedAUser(state.selectedAUser)
/* Association Club Relationship */
export const getUserByEmailAssociationClubRelationship = (state, id) => associationClubRelationshipSelectors.getUserByEmailAssociationClubRelationship(state.associationClubRelationship, id);
export const getUsersOrderAssociationClubRelationship = state => associationClubRelationshipSelectors.getUsersOrderAssociationClubRelationship(state.associationClubRelationship);
export const getUsersByEmailAssociationClubRelationship = state => associationClubRelationshipSelectors.getUsersByEmailAssociationClubRelationship(state.associationClubRelationship);
export const isFetchingUsersByEmailAssociationClubRelationship = state => associationClubRelationshipSelectors.isFetchingUsersByEmailAssociationClubRelationship(state.associationClubRelationship);
export const getFetchingUsersByEmailErrorAssociationClubRelationship = state => associationClubRelationshipSelectors.getFetchingUsersByEmailErrorAssociationClubRelationship(state.associationClubRelationship);
export const getAssociationClubRelationship = (state, id) => associationClubRelationshipSelectors.getAssociationClubRelationship(state.associationClubRelationship, id);
export const getAssociationClubRelationships = state => associationClubRelationshipSelectors.getAssociationClubRelationships(state.associationClubRelationship);
export const isFetchingAssociationClubRelationships = state => associationClubRelationshipSelectors.isFetchingAssociationClubRelationships(state.associationClubRelationship);
export const getFetchingAssociationClubRelationshipError = state => associationClubRelationshipSelectors.getFetchingAssociationClubRelationshipError(state.associationClubRelationship);
/* Association Club */
export const getAssociationClub = (state, id) => associationClubSelectors.getAssociationClub(state.associationClub, id);
export const getAssociationClubs = state => associationClubSelectors.getAssociationClubs(state.associationClub);
export const isFetchingAssociationClubs = state => associationClubSelectors.isFetchingAssociationClubs(state.associationClub);
export const getFetchingAssociationClubsError = state => associationClubSelectors.getFetchingAssociationClubsError(state.associationClub);
export const getAssociationClubStatus = state => associationClubSelectors.getAssociationClubStatus(state.associationClub);
/* Selected Association Club */ 
export const getSelectedAssociationClub = (state) => selectedAssociationClubSelectors.getSelectedAssociationClub(state.selectedAssociationClub);
/* Association Club Relationship */
export const getClubByNameSession = (state, id) => sessionsSelectors.getClubByNameSession(state.sessions, id);
export const getClubsOrderSession = state => sessionsSelectors.getClubsOrderSession(state.sessions);
export const getClubsByNameSession = state => sessionsSelectors.getClubsByNameSession(state.sessions);
export const isFetchingClubsByNameSession = state => sessionsSelectors.isFetchingClubsByNameSession(state.sessions);
export const getFetchingClubByNameErrorSession = state => sessionsSelectors.getFetchingClubByNameErrorSession(state.sessions);
export const getSession = (state, id) => sessionsSelectors.getSession(state.sessions, id);
export const getSessions = state => sessionsSelectors.getSessions(state.sessions);
export const isFetchingSessions = state => sessionsSelectors.isFetchingSessions(state.sessions);
export const getFetchingSessionError = state => sessionsSelectors.getFetchingSessionError(state.sessions);
export const getSessionStatus = state => sessionsSelectors.getSessionStatus(state.sessions);
export const getSessionFormat = state => sessionsSelectors.getSessionFormat(state.sessions);
/* Selected Session*/
export const getSelectedSession = (state) => selectedSessionSelectors.getSelectedSession(state.selectedSession)
/* Assistances */
export const getUserByEmailAssistance = (state, id) => assistancesSelectors.getUserByEmailAssistance(state.assistances, id);
export const getUsersOrderAssistance = state => assistancesSelectors.getUsersOrderAssistance(state.assistances);
export const getUsersByEmailAssistance = state => assistancesSelectors.getUsersByEmailAssistance(state.assistances);
export const isFetchingUsersByEmailAssistance = state => assistancesSelectors.isFetchingUsersByEmailAssistance(state.assistances);
export const getFetchingUsersByEmailErrorAssistance = state => assistancesSelectors.getFetchingUsersByEmailErrorAssistance(state.assistances);
export const getAssistance = (state, id) => assistancesSelectors.getAssistance(state.assistances, id);
export const getAssistances = state => assistancesSelectors.getAssistances(state.assistances);
export const isFetchingAssistances = state => assistancesSelectors.isFetchingAssistances(state.assistances);
export const getFetchingAssistanceError = state => assistancesSelectors.getFetchingAssistanceError(state.assistances);
/* Statistics */
export const getAssistanceClub = state => statisticsSelectors.getAssistanceClub(state.statistics);
export const getIsFetchingAssistanceClub = state => statisticsSelectors.getIsFetchingAssistanceClub(state.statistics);
export const getFetchingAssistanceClubError = state => statisticsSelectors.getFetchingAssistanceClubError(state.statistics);
export const getAssistanceClubs = state => statisticsSelectors.getAssistanceClubs(state.statistics);
export const getIsFetchingAssistanceClubs = state => statisticsSelectors.getIsFetchingAssistanceClubs(state.statistics);
export const getFetchingAssistanceClubsError = state => statisticsSelectors.getFetchingAssistanceClubsError(state.statistics);
export const getPlayers = state => statisticsSelectors.getPlayers(state.statistics);
export const getIsFetchingPlayers = state => statisticsSelectors.getIsFetchingPlayers(state.statistics);
export const getFetchingPlayersError = state => statisticsSelectors.getFetchingPlayersError(state.statistics);
export const getPlayersSport = state => statisticsSelectors.getPlayersSport(state.statistics);
export const getIsFetchingPlayersSport = state => statisticsSelectors.getIsFetchingPlayersSport(state.statistics);
export const getFetchingPlayersSportError = state => statisticsSelectors.getFetchingPlayersSportError(state.statistics);
export const getTeamsT = state => statisticsSelectors.getTeamsT(state.statistics);
export const getIsFetchingTeamsT = state => statisticsSelectors.getIsFetchingTeamsT(state.statistics);
export const getFetchingTeamsTError = state => statisticsSelectors.getFetchingTeamsTError(state.statistics);
export const getTeamsTSport = state => statisticsSelectors.getTeamsTSport(state.statistics);
export const getIsFetchingTeamsTSport = state => statisticsSelectors.getIsFetchingTeamsTSport(state.statistics);
export const getFetchingTeamsTSportError = state => statisticsSelectors.getFetchingTeamsTSportError(state.statistics);
export const getGendert = state => statisticsSelectors.getGendert(state.statistics);
export const getIsFetchingGendert= state => statisticsSelectors.getIsFetchingGendert(state.statistics);
export const getFetchingGendertError = state => statisticsSelectors.getFetchingGendertError(state.statistics);
export const getGendertSport = state => statisticsSelectors.getGendertSport(state.statistics);
export const getIsFetchingGendertSport = state => statisticsSelectors.getIsFetchingGendertSport(state.statistics);
export const getFetchingGendertSportError = state => statisticsSelectors.getFetchingGendertSportError(state.statistics);
export const getScholarss = state => statisticsSelectors.getScholarss(state.statistics);
export const getIsFetchingScholarss = state => statisticsSelectors.getIsFetchingScholarss(state.statistics);
export const getFetchingScholarssError = state => statisticsSelectors.getFetchingScholarssError(state.statistics);
export const getParticipationwk = state => statisticsSelectors.getParticipationwk(state.statistics);
export const getIsFetchingParticipationwk = state => statisticsSelectors.getIsFetchingParticipationwk(state.statistics);
export const getFetchingParticipationwkError = state => statisticsSelectors.getFetchingParticipationwkError(state.statistics);
export const getParticipationwkTimeg = state => statisticsSelectors.getParticipationwkTimeg(state.statistics);
export const getIsFetchingParticipationwkTimeg = state => statisticsSelectors.getIsFetchingParticipationwkTimeg(state.statistics);
export const getFetchingParticipationwkTimegError = state => statisticsSelectors.getFetchingParticipationwkTimegError(state.statistics);
export const getParticipationwkTime = state => statisticsSelectors.getParticipationwkTime(state.statistics);
export const getIsFetchingParticipationwkTime = state => statisticsSelectors.getIsFetchingParticipationwkTime(state.statistics);
export const getFetchingParticipationwkTimeError = state => statisticsSelectors.getFetchingParticipationwkTimeError(state.statistics);
export const getParticipationwkG = state => statisticsSelectors.getParticipationwkG(state.statistics);
export const getIsFetchingParticipationwkG = state => statisticsSelectors.getIsFetchingParticipationwkG(state.statistics);
export const getFetchingParticipationwkGError = state => statisticsSelectors.getFetchingParticipationwkGError(state.statistics);