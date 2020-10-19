import { combineReducers } from 'redux';

import * as types from '../types/statistics';

  const byIdAssistanceClub = (state = [], action) => {
    switch (action.type) {
      case types.ASSISTANCE_CLUB_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingAssistanceClub = (state = false, action) => {
    switch (action.type) {
      case types.ASSISTANCE_CLUB_FETCH_STARTED: {
        return true;
      }
      case types.ASSISTANCE_CLUB_FETCH_COMPLETED: {
        return false;
      }
      case types.ASSISTANCE_CLUB_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorAssistanceClub = (state = null, action) => {
    switch (action.type) {
      case types.ASSISTANCE_CLUB_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.ASSISTANCE_CLUB_FETCH_STARTED: {
        return null;
      }
      case types.ASSISTANCE_CLUB_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdAssistanceClubs = (state = [], action) => {
    switch (action.type) {
      case types.ASSISTANCE_CLUBS_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingAssistanceClubs = (state = false, action) => {
    switch (action.type) {
      case types.ASSISTANCE_CLUBS_FETCH_STARTED: {
        return true;
      }
      case types.ASSISTANCE_CLUBS_FETCH_COMPLETED: {
        return false;
      }
      case types.ASSISTANCE_CLUBS_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorAssistanceClubs = (state = null, action) => {
    switch (action.type) {
      case types.ASSISTANCE_CLUBS_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.ASSISTANCE_CLUBS_FETCH_STARTED: {
        return null;
      }
      case types.ASSISTANCE_CLUBS_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdPlayers = (state = [], action) => {
    switch (action.type) {
      case types.PLAYERS_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingPlayers = (state = false, action) => {
    switch (action.type) {
      case types.PLAYERS_FETCH_STARTED: {
        return true;
      }
      case types.PLAYERS_FETCH_COMPLETED: {
        return false;
      }
      case types.PLAYERS_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorPlayers = (state = null, action) => {
    switch (action.type) {
      case types.PLAYERS_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PLAYERS_FETCH_STARTED: {
        return null;
      }
      case types.PLAYERS_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdPlayersSport = (state = [], action) => {
    switch (action.type) {
      case types.PLAYERS_SPORT_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingPlayersSport = (state = false, action) => {
    switch (action.type) {
      case types.PLAYERS_SPORT_FETCH_STARTED: {
        return true;
      }
      case types.PLAYERS_SPORT_FETCH_COMPLETED: {
        return false;
      }
      case types.PLAYERS_SPORT_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorPlayersSport = (state = null, action) => {
    switch (action.type) {
      case types.PLAYERS_SPORT_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PLAYERS_SPORT_FETCH_STARTED: {
        return null;
      }
      case types.PLAYERS_SPORT_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdTeamsT = (state = [], action) => {
    switch (action.type) {
      case types.TEAMST_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingTeamsT = (state = false, action) => {
    switch (action.type) {
      case types.TEAMST_FETCH_STARTED: {
        return true;
      }
      case types.TEAMST_FETCH_COMPLETED: {
        return false;
      }
      case types.TEAMST_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorTeamsT = (state = null, action) => {
    switch (action.type) {
      case types.TEAMST_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.TEAMST_FETCH_STARTED: {
        return null;
      }
      case types.TEAMST_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdTeamsTSport = (state = [], action) => {
    switch (action.type) {
      case types.TEAMST_SPORT_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingTeamsTSport = (state = false, action) => {
    switch (action.type) {
      case types.TEAMST_SPORT_FETCH_STARTED: {
        return true;
      }
      case types.TEAMST_SPORT_FETCH_COMPLETED: {
        return false;
      }
      case types.TEAMST_SPORT_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorTeamsTSport = (state = null, action) => {
    switch (action.type) {
      case types.TEAMST_SPORT_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.TEAMST_SPORT_FETCH_STARTED: {
        return null;
      }
      case types.TEAMST_SPORT_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdGendert = (state = [], action) => {
    switch (action.type) {
      case types.GENDERT_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingGendert = (state = false, action) => {
    switch (action.type) {
      case types.GENDERT_FETCH_STARTED: {
        return true;
      }
      case types.GENDERT_FETCH_COMPLETED: {
        return false;
      }
      case types.GENDERT_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorGendert = (state = null, action) => {
    switch (action.type) {
      case types.GENDERT_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.GENDERT_FETCH_STARTED: {
        return null;
      }
      case types.GENDERT_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdGendertSport = (state = [], action) => {
    switch (action.type) {
      case types.GENDERT_SPORT_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingGendertSport = (state = false, action) => {
    switch (action.type) {
      case types.GENDERT_SPORT_FETCH_STARTED: {
        return true;
      }
      case types.GENDERT_SPORT_FETCH_COMPLETED: {
        return false;
      }
      case types.GENDERT_SPORT_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorGendertSport = (state = null, action) => {
    switch (action.type) {
      case types.GENDERT_SPORT_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.GENDERT_SPORT_FETCH_STARTED: {
        return null;
      }
      case types.GENDERT_SPORT_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdScholarss = (state = [], action) => {
    switch (action.type) {
      case types.SCHOLARSS_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingScholarss = (state = false, action) => {
    switch (action.type) {
      case types.SCHOLARSS_FETCH_STARTED: {
        return true;
      }
      case types.SCHOLARSS_FETCH_COMPLETED: {
        return false;
      }
      case types.SCHOLARSS_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorScholarss = (state = null, action) => {
    switch (action.type) {
      case types.SCHOLARSS_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.SCHOLARSS_FETCH_STARTED: {
        return null;
      }
      case types.SCHOLARSS_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };
  

  const byIdParticipationwkTime = (state = [], action) => {
    switch (action.type) {
      case types.PARTICIPATIONWK_TIME_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingParticipationwkTime = (state = false, action) => {
    switch (action.type) {
      case types.PARTICIPATIONWK_TIME_FETCH_STARTED: {
        return true;
      }
      case types.PARTICIPATIONWK_TIME_FETCH_COMPLETED: {
        return false;
      }
      case types.PARTICIPATIONWK_TIME_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorParticipationwkTime = (state = null, action) => {
    switch (action.type) {
      case types.PARTICIPATIONWK_TIME_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PARTICIPATIONWK_TIME_FETCH_STARTED: {
        return null;
      }
      case types.PARTICIPATIONWK_TIME_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdParticipationwk = (state = [], action) => {
    switch (action.type) {
      case types.PARTICIPATIONWK_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingParticipationwk = (state = false, action) => {
    switch (action.type) {
      case types.PARTICIPATIONWK_FETCH_STARTED: {
        return true;
      }
      case types.PARTICIPATIONWK_FETCH_COMPLETED: {
        return false;
      }
      case types.PARTICIPATIONWK_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorParticipationwk = (state = null, action) => {
    switch (action.type) {
      case types.PARTICIPATIONWK_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PARTICIPATIONWK_FETCH_STARTED: {
        return null;
      }
      case types.PARTICIPATIONWK_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdParticipationwkTimeg = (state = [], action) => {
    switch (action.type) {
      case types.PARTICIPATIONWK_TIME_G_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingParticipationwkTimeg = (state = false, action) => {
    switch (action.type) {
      case types.PARTICIPATIONWK_TIME_G_FETCH_STARTED: {
        return true;
      }
      case types.PARTICIPATIONWK_TIME_G_FETCH_COMPLETED: {
        return false;
      }
      case types.PARTICIPATIONWK_TIME_G_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorParticipationwkTimeg = (state = null, action) => {
    switch (action.type) {
      case types.PARTICIPATIONWK_TIME_G_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PARTICIPATIONWK_TIME_G_FETCH_STARTED: {
        return null;
      }
      case types.PARTICIPATIONWK_TIME_G_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdParticipationwkG = (state = [], action) => {
    switch (action.type) {
      case types.PARTICIPATIONWK_G_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingParticipationwkG = (state = false, action) => {
    switch (action.type) {
      case types.PARTICIPATIONWK_G_FETCH_STARTED: {
        return true;
      }
      case types.PARTICIPATIONWK_G_FETCH_COMPLETED: {
        return false;
      }
      case types.PARTICIPATIONWK_G_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorParticipationwkG = (state = null, action) => {
    switch (action.type) {
      case types.PARTICIPATIONWK_G_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PARTICIPATIONWK_G_FETCH_STARTED: {
        return null;
      }
      case types.PARTICIPATIONWK_G_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };

  export default combineReducers({
    byIdAssistanceClub,
    isFetchingAssistanceClub,
    errorAssistanceClub,
    byIdAssistanceClubs,
    isFetchingAssistanceClubs,
    errorAssistanceClubs,
    byIdPlayers,
    isFetchingPlayers,
    errorPlayers,
    byIdPlayersSport,
    isFetchingPlayersSport,
    errorPlayersSport,
    byIdTeamsT,
    isFetchingTeamsT,
    errorTeamsT,
    byIdTeamsTSport,
    isFetchingTeamsTSport,
    errorTeamsTSport,
    byIdGendert,
    isFetchingGendert,
    errorGendert,
    byIdGendertSport,
    isFetchingGendertSport,
    errorGendertSport,
    byIdScholarss,
    isFetchingScholarss,
    errorScholarss,
    byIdParticipationwkTime,
    isFetchingParticipationwkTime,
    errorParticipationwkTime,
    byIdParticipationwk,
    isFetchingParticipationwk,
    errorParticipationwk,
    byIdParticipationwkTimeg,
    isFetchingParticipationwkTimeg,
    errorParticipationwkTimeg,
    byIdParticipationwkG,
    isFetchingParticipationwkG,
    errorParticipationwkG,
  });
  
  

  export const getAssistanceClub = state => state.byIdAssistanceClub;
  export const getIsFetchingAssistanceClub = state => state.isFetchingAssistanceClub;
  export const getFetchingAssistanceClubError = state => state.errorAssistanceClub;
  export const getAssistanceClubs = state => state.byIdAssistanceClubs;
  export const getIsFetchingAssistanceClubs = state => state.isFetchingAssistanceClubs;
  export const getFetchingAssistanceClubsError = state => state.errorAssistanceClubs;
  export const getPlayers = state => state.byIdPlayers;
  export const getIsFetchingPlayers = state => state.isFetchingPlayers;
  export const getFetchingPlayersError = state => state.errorPlayers;
  export const getPlayersSport = state => state.byIdPlayersSport;
  export const getIsFetchingPlayersSport = state => state.isFetchingPlayersSport;
  export const getFetchingPlayersSportError = state => state.errorPlayersSport;
  export const getTeamsT = state => state.byIdTeamsT;
  export const getIsFetchingTeamsT = state => state.isFetchingTeamsT;
  export const getFetchingTeamsTError = state => state.errorTeamsT;
  export const getTeamsTSport = state => state.byIdTeamsTSport;
  export const getIsFetchingTeamsTSport = state => state.isFetchingTeamsTSport;
  export const getFetchingTeamsTSportError = state => state.errorTeamsTSport;
  export const getGendert = state => state.byIdGendert;
  export const getIsFetchingGendert = state => state.isFetchingGendert;
  export const getFetchingGendertError = state => state.errorGendert;
  export const getGendertSport = state => state.byIdGendertSport;
  export const getIsFetchingGendertSport = state => state.isFetchingGendertSport;
  export const getFetchingGendertSportError = state => state.errorGendertSport;
  export const getScholarss = state => state.byIdScholarss;
  export const getIsFetchingScholarss = state => state.isFetchingScholarss;
  export const getFetchingScholarssError = state => state.errorScholarss;
  export const getParticipationwkTime = state => state.byIdParticipationwkTime;
  export const getIsFetchingParticipationwkTime = state => state.isFetchingParticipationwkTime;
  export const getFetchingParticipationwkTimeError = state => state.errorParticipationwkTime;
  export const getParticipationwk = state => state.byIdParticipationwk;
  export const getIsFetchingParticipationwk = state => state.isFetchingParticipationwk;
  export const getFetchingParticipationwkError = state => state.errorParticipationwk;
  export const getParticipationwkTimeg = state => state.byIdParticipationwkTimeg;
  export const getIsFetchingParticipationwkTimeg = state => state.isFetchingParticipationwkTimeg;
  export const getFetchingParticipationwkTimegError = state => state.errorParticipationwkTimeg;
  export const getParticipationwkG = state => state.byIdParticipationwkG;
  export const getIsFetchingParticipationwkG = state => state.isFetchingParticipationwkG;
  export const getFetchingParticipationwkGError = state => state.errorParticipationwkG;