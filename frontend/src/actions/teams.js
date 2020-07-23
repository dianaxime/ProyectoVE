import * as types from '../types/teams';

export const startFetchingTeams = () => ({
  type: types.TEAMS_FETCH_STARTED,
});

export const completeFetchingTeams = (entities, order) => ({
  type: types.TEAMS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingTeams = error => ({
  type: types.TEAMS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingTeam = (id, name, classroom, description, startdate, enddate) => ({
  type: types.TEAMS_ADD_STARTED,
  payload: {
    id,
    name,
    classroom,
    description,
    startdate,
    enddate,
  },
});

export const completeAddingTeam = (oldId, team) => ({
  type: types.TEAMS_ADD_COMPLETED,
  payload: {
    oldId,
    team,
  },
});

export const failAddingTeam = (oldId, error) => ({
  type: types.TEAMS_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startUpdatingTeam = (id, name, classroom, description, startdate, enddate) => ({
  type: types.TEAMS_UPDATE_STARTED,
  payload: {
    id,
    name,
    classroom,
    description,
    startdate,
    enddate,
  },
});

export const completeUpdatingTeam = (id, team) => ({
  type: types.TEAMS_UPDATE_COMPLETED,
  payload: {
    id,
    team,
  },
});

export const failUpdatingTeam = (id, error) => ({
  type: types.TEAMS_UPDATE_FAILED,
  payload: {
    id,
    error,
  },
});