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


  const byIdFemaleScholars = (state = [], action) => {
    switch (action.type) {
      case types.FEMALE_SCHOLARS_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingFemaleScholars = (state = false, action) => {
    switch (action.type) {
      case types.FEMALE_SCHOLARS_FETCH_STARTED: {
        return true;
      }
      case types.FEMALE_SCHOLARS_FETCH_COMPLETED: {
        return false;
      }
      case types.FEMALE_SCHOLARS_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorFemaleScholars = (state = null, action) => {
    switch (action.type) {
      case types.FEMALE_SCHOLARS_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.FEMALE_SCHOLARS_FETCH_STARTED: {
        return null;
      }
      case types.FEMALE_SCHOLARS_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdMaleScholars = (state = [], action) => {
    switch (action.type) {
      case types.MALE_SCHOLARS_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingMaleScholars = (state = false, action) => {
    switch (action.type) {
      case types.MALE_SCHOLARS_FETCH_STARTED: {
        return true;
      }
      case types.MALE_SCHOLARS_FETCH_COMPLETED: {
        return false;
      }
      case types.MALE_SCHOLARS_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorMaleScholars = (state = null, action) => {
    switch (action.type) {
      case types.MALE_SCHOLARS_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.MALE_SCHOLARS_FETCH_STARTED: {
        return null;
      }
      case types.MALE_SCHOLARS_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };
  

  const byIdCountEvents = (state = [], action) => {
    switch (action.type) {
      case types.COUNT_EVENTS_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingCountEvents = (state = false, action) => {
    switch (action.type) {
      case types.COUNT_EVENTS_FETCH_STARTED: {
        return true;
      }
      case types.COUNT_EVENTS_FETCH_COMPLETED: {
        return false;
      }
      case types.COUNT_EVENTS_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorCountEvents = (state = null, action) => {
    switch (action.type) {
      case types.COUNT_EVENTS_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.COUNT_EVENTS_FETCH_STARTED: {
        return null;
      }
      case types.COUNT_EVENTS_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdMaleUsers = (state = [], action) => {
    switch (action.type) {
      case types.MALE_USERS_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingMaleUsers = (state = false, action) => {
    switch (action.type) {
      case types.MALE_USERS_FETCH_STARTED: {
        return true;
      }
      case types.MALE_USERS_FETCH_COMPLETED: {
        return false;
      }
      case types.MALE_USERS_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorMaleUsers = (state = null, action) => {
    switch (action.type) {
      case types.MALE_USERS_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.MALE_USERS_FETCH_STARTED: {
        return null;
      }
      case types.MALE_USERS_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdFemaleUsers = (state = [], action) => {
    switch (action.type) {
      case types.FEMALE_USERS_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingFemaleUsers = (state = false, action) => {
    switch (action.type) {
      case types.FEMALE_USERS_FETCH_STARTED: {
        return true;
      }
      case types.FEMALE_USERS_FETCH_COMPLETED: {
        return false;
      }
      case types.FEMALE_USERS_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorFemaleUsers = (state = null, action) => {
    switch (action.type) {
      case types.FEMALE_USERS_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.FEMALE_USERS_FETCH_STARTED: {
        return null;
      }
      case types.FEMALE_USERS_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdUsersFaculty = (state = [], action) => {
    switch (action.type) {
      case types.USERS_FACULTY_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingUsersFaculty = (state = false, action) => {
    switch (action.type) {
      case types.USERS_FACULTY_FETCH_STARTED: {
        return true;
      }
      case types.USERS_FACULTY_FETCH_COMPLETED: {
        return false;
      }
      case types.USERS_FACULTY_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorUsersFaculty = (state = null, action) => {
    switch (action.type) {
      case types.USERS_FACULTY_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.USERS_FACULTY_FETCH_STARTED: {
        return null;
      }
      case types.USERS_FACULTY_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdFemaleUsersFaculty = (state = [], action) => {
    switch (action.type) {
      case types.F_USERS_FACULTY_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingFemaleUsersFaculty = (state = false, action) => {
    switch (action.type) {
      case types.F_USERS_FACULTY_FETCH_STARTED: {
        return true;
      }
      case types.F_USERS_FACULTY_FETCH_COMPLETED: {
        return false;
      }
      case types.F_USERS_FACULTY_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorFemaleUsersFaculty = (state = null, action) => {
    switch (action.type) {
      case types.F_USERS_FACULTY_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.F_USERS_FACULTY_FETCH_STARTED: {
        return null;
      }
      case types.F_USERS_FACULTY_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdMaleUsersFaculty = (state = [], action) => {
    switch (action.type) {
      case types.M_USERS_FACULTY_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingMaleUsersFaculty = (state = false, action) => {
    switch (action.type) {
      case types.M_USERS_FACULTY_FETCH_STARTED: {
        return true;
      }
      case types.M_USERS_FACULTY_FETCH_COMPLETED: {
        return false;
      }
      case types.M_USERS_FACULTY_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorMaleUsersFaculty = (state = null, action) => {
    switch (action.type) {
      case types.M_USERS_FACULTY_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.M_USERS_FACULTY_FETCH_STARTED: {
        return null;
      }
      case types.M_USERS_FACULTY_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdUsersCareer = (state = [], action) => {
    switch (action.type) {
      case types.USERS_CAREER_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingUsersCareer = (state = false, action) => {
    switch (action.type) {
      case types.USERS_CAREER_FETCH_STARTED: {
        return true;
      }
      case types.USERS_CAREER_FETCH_COMPLETED: {
        return false;
      }
      case types.USERS_CAREER_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorUsersCareer = (state = null, action) => {
    switch (action.type) {
      case types.USERS_CAREER_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.USERS_CAREER_FETCH_STARTED: {
        return null;
      }
      case types.USERS_CAREER_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdFemaleUsersCareer = (state = [], action) => {
    switch (action.type) {
      case types.F_USERS_CAREER_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingFemaleUsersCareer = (state = false, action) => {
    switch (action.type) {
      case types.F_USERS_CAREER_FETCH_STARTED: {
        return true;
      }
      case types.F_USERS_CAREER_FETCH_COMPLETED: {
        return false;
      }
      case types.F_USERS_CAREER_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorFemaleUsersCareer = (state = null, action) => {
    switch (action.type) {
      case types.F_USERS_CAREER_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.F_USERS_CAREER_FETCH_STARTED: {
        return null;
      }
      case types.F_USERS_CAREER_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdMaleUsersCareer = (state = [], action) => {
    switch (action.type) {
      case types.M_USERS_CAREER_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingMaleUsersCareer = (state = false, action) => {
    switch (action.type) {
      case types.M_USERS_CAREER_FETCH_STARTED: {
        return true;
      }
      case types.M_USERS_CAREER_FETCH_COMPLETED: {
        return false;
      }
      case types.M_USERS_CAREER_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorMaleUsersCareer = (state = null, action) => {
    switch (action.type) {
      case types.M_USERS_CAREER_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.M_USERS_CAREER_FETCH_STARTED: {
        return null;
      }
      case types.M_USERS_CAREER_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdParticipationArtClubs = (state = [], action) => {
    switch (action.type) {
      case types.PARTICIPATION_ARTCLUBS_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingParticipationArtClubs = (state = false, action) => {
    switch (action.type) {
      case types.PARTICIPATION_ARTCLUBS_FETCH_STARTED: {
        return true;
      }
      case types.PARTICIPATION_ARTCLUBS_FETCH_COMPLETED: {
        return false;
      }
      case types.PARTICIPATION_ARTCLUBS_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorParticipationArtClubs = (state = null, action) => {
    switch (action.type) {
      case types.PARTICIPATION_ARTCLUBS_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PARTICIPATION_ARTCLUBS_FETCH_STARTED: {
        return null;
      }
      case types.PARTICIPATION_ARTCLUBS_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };  


  const byIdParticipationArtClub = (state = [], action) => {
    switch (action.type) {
      case types.PARTICIPATION_ARTCLUB_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingParticipationArtClub = (state = false, action) => {
    switch (action.type) {
      case types.PARTICIPATION_ARTCLUB_FETCH_STARTED: {
        return true;
      }
      case types.PARTICIPATION_ARTCLUB_FETCH_COMPLETED: {
        return false;
      }
      case types.PARTICIPATION_ARTCLUB_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorParticipationArtClub = (state = null, action) => {
    switch (action.type) {
      case types.PARTICIPATION_ARTCLUB_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PARTICIPATION_ARTCLUB_FETCH_STARTED: {
        return null;
      }
      case types.PARTICIPATION_ARTCLUB_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };  


  const byIdParticipationArtClubF = (state = [], action) => {
    switch (action.type) {
      case types.PARTICIPATION_ARTCLUB_F_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingParticipationArtClubF = (state = false, action) => {
    switch (action.type) {
      case types.PARTICIPATION_ARTCLUB_F_FETCH_STARTED: {
        return true;
      }
      case types.PARTICIPATION_ARTCLUB_F_FETCH_COMPLETED: {
        return false;
      }
      case types.PARTICIPATION_ARTCLUB_F_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorParticipationArtClubF = (state = null, action) => {
    switch (action.type) {
      case types.PARTICIPATION_ARTCLUB_F_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PARTICIPATION_ARTCLUB_F_FETCH_STARTED: {
        return null;
      }
      case types.PARTICIPATION_ARTCLUB_F_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  }; 


  const byIdParticipationArtClubM = (state = [], action) => {
    switch (action.type) {
      case types.PARTICIPATION_ARTCLUB_M_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingParticipationArtClubM = (state = false, action) => {
    switch (action.type) {
      case types.PARTICIPATION_ARTCLUB_M_FETCH_STARTED: {
        return true;
      }
      case types.PARTICIPATION_ARTCLUB_M_FETCH_COMPLETED: {
        return false;
      }
      case types.PARTICIPATION_ARTCLUB_M_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorParticipationArtClubM = (state = null, action) => {
    switch (action.type) {
      case types.PARTICIPATION_ARTCLUB_M_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PARTICIPATION_ARTCLUB_M_FETCH_STARTED: {
        return null;
      }
      case types.PARTICIPATION_ARTCLUB_M_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  }
  
  
  const byIdParticipationSportClubs = (state = [], action) => {
    switch (action.type) {
      case types.PARTICIPATION_SPORTCLUBS_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingParticipationSportClubs = (state = false, action) => {
    switch (action.type) {
      case types.PARTICIPATION_SPORTCLUBS_FETCH_STARTED: {
        return true;
      }
      case types.PARTICIPATION_SPORTCLUBS_FETCH_COMPLETED: {
        return false;
      }
      case types.PARTICIPATION_SPORTCLUBS_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorParticipationSportClubs = (state = null, action) => {
    switch (action.type) {
      case types.PARTICIPATION_SPORTCLUBS_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PARTICIPATION_SPORTCLUBS_FETCH_STARTED: {
        return null;
      }
      case types.PARTICIPATION_SPORTCLUBS_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };  


  const byIdParticipationSportClub = (state = [], action) => {
    switch (action.type) {
      case types.PARTICIPATION_SPORTCLUB_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingParticipationSportClub = (state = false, action) => {
    switch (action.type) {
      case types.PARTICIPATION_SPORTCLUB_FETCH_STARTED: {
        return true;
      }
      case types.PARTICIPATION_SPORTCLUB_FETCH_COMPLETED: {
        return false;
      }
      case types.PARTICIPATION_SPORTCLUB_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorParticipationSportClub = (state = null, action) => {
    switch (action.type) {
      case types.PARTICIPATION_SPORTCLUB_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PARTICIPATION_SPORTCLUB_FETCH_STARTED: {
        return null;
      }
      case types.PARTICIPATION_SPORTCLUB_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };  


  const byIdParticipationSportClubF = (state = [], action) => {
    switch (action.type) {
      case types.PARTICIPATION_SPORTCLUB_F_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingParticipationSportClubF = (state = false, action) => {
    switch (action.type) {
      case types.PARTICIPATION_SPORTCLUB_F_FETCH_STARTED: {
        return true;
      }
      case types.PARTICIPATION_SPORTCLUB_F_FETCH_COMPLETED: {
        return false;
      }
      case types.PARTICIPATION_SPORTCLUB_F_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorParticipationSportClubF = (state = null, action) => {
    switch (action.type) {
      case types.PARTICIPATION_SPORTCLUB_F_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PARTICIPATION_SPORTCLUB_F_FETCH_STARTED: {
        return null;
      }
      case types.PARTICIPATION_SPORTCLUB_F_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdParticipationSportClubM = (state = [], action) => {
    switch (action.type) {
      case types.PARTICIPATION_SPORTCLUB_M_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingParticipationSportClubM = (state = false, action) => {
    switch (action.type) {
      case types.PARTICIPATION_SPORTCLUB_M_FETCH_STARTED: {
        return true;
      }
      case types.PARTICIPATION_SPORTCLUB_M_FETCH_COMPLETED: {
        return false;
      }
      case types.PARTICIPATION_SPORTCLUB_M_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorParticipationSportClubM = (state = null, action) => {
    switch (action.type) {
      case types.PARTICIPATION_SPORTCLUB_M_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PARTICIPATION_SPORTCLUB_M_FETCH_STARTED: {
        return null;
      }
      case types.PARTICIPATION_SPORTCLUB_M_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdParticipationAcadClubs = (state = [], action) => {
    switch (action.type) {
      case types.PARTICIPATION_ACADEMICCLUBS_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingParticipationAcadClubs = (state = false, action) => {
    switch (action.type) {
      case types.PARTICIPATION_ACADEMICCLUBS_FETCH_STARTED: {
        return true;
      }
      case types.PARTICIPATION_ACADEMICCLUBS_FETCH_COMPLETED: {
        return false;
      }
      case types.PARTICIPATION_ACADEMICCLUBS_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorParticipationAcadClubs = (state = null, action) => {
    switch (action.type) {
      case types.PARTICIPATION_ACADEMICCLUBS_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PARTICIPATION_ACADEMICCLUBS_FETCH_STARTED: {
        return null;
      }
      case types.PARTICIPATION_ACADEMICCLUBS_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };  


  const byIdParticipationAcadClub = (state = [], action) => {
    switch (action.type) {
      case types.PARTICIPATION_ACADEMICCLUB_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingParticipationAcadClub = (state = false, action) => {
    switch (action.type) {
      case types.PARTICIPATION_ACADEMICCLUB_FETCH_STARTED: {
        return true;
      }
      case types.PARTICIPATION_ACADEMICCLUB_FETCH_COMPLETED: {
        return false;
      }
      case types.PARTICIPATION_ACADEMICCLUB_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorParticipationAcadClub = (state = null, action) => {
    switch (action.type) {
      case types.PARTICIPATION_ACADEMICCLUB_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PARTICIPATION_ACADEMICCLUB_FETCH_STARTED: {
        return null;
      }
      case types.PARTICIPATION_ACADEMICCLUB_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };  


  const byIdParticipationAcadClubF = (state = [], action) => {
    switch (action.type) {
      case types.PARTICIPATION_ACADEMICCLUB_F_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingParticipationAcadClubF = (state = false, action) => {
    switch (action.type) {
      case types.PARTICIPATION_ACADEMICCLUB_F_FETCH_STARTED: {
        return true;
      }
      case types.PARTICIPATION_ACADEMICCLUB_F_FETCH_COMPLETED: {
        return false;
      }
      case types.PARTICIPATION_ACADEMICCLUB_F_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorParticipationAcadClubF = (state = null, action) => {
    switch (action.type) {
      case types.PARTICIPATION_ACADEMICCLUB_F_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PARTICIPATION_ACADEMICCLUB_F_FETCH_STARTED: {
        return null;
      }
      case types.PARTICIPATION_ACADEMICCLUB_F_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdParticipationAcadClubM = (state = [], action) => {
    switch (action.type) {
      case types.PARTICIPATION_ACADEMICCLUB_M_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingParticipationAcadClubM = (state = false, action) => {
    switch (action.type) {
      case types.PARTICIPATION_ACADEMICCLUB_M_FETCH_STARTED: {
        return true;
      }
      case types.PARTICIPATION_ACADEMICCLUB_M_FETCH_COMPLETED: {
        return false;
      }
      case types.PARTICIPATION_ACADEMICCLUB_M_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorParticipationAcadClubM = (state = null, action) => {
    switch (action.type) {
      case types.PARTICIPATION_ACADEMICCLUB_M_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PARTICIPATION_ACADEMICCLUB_M_FETCH_STARTED: {
        return null;
      }
      case types.PARTICIPATION_ACADEMICCLUB_M_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdParticipationAgrupations = (state = [], action) => {
    switch (action.type) {
      case types.PARTICIPATION_AGRUPATIONS_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingParticipationAgrupations = (state = false, action) => {
    switch (action.type) {
      case types.PARTICIPATION_AGRUPATIONS_FETCH_STARTED: {
        return true;
      }
      case types.PARTICIPATION_AGRUPATIONS_FETCH_COMPLETED: {
        return false;
      }
      case types.PARTICIPATION_AGRUPATIONS_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorParticipationAgrupations = (state = null, action) => {
    switch (action.type) {
      case types.PARTICIPATION_AGRUPATIONS_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PARTICIPATION_AGRUPATIONS_FETCH_STARTED: {
        return null;
      }
      case types.PARTICIPATION_AGRUPATIONS_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };  


  const byIdParticipationAgrupation = (state = [], action) => {
    switch (action.type) {
      case types.PARTICIPATION_AGRUPATION_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingParticipationAgrupation = (state = false, action) => {
    switch (action.type) {
      case types.PARTICIPATION_AGRUPATION_FETCH_STARTED: {
        return true;
      }
      case types.PARTICIPATION_AGRUPATION_FETCH_COMPLETED: {
        return false;
      }
      case types.PARTICIPATION_AGRUPATION_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorParticipationAgrupation = (state = null, action) => {
    switch (action.type) {
      case types.PARTICIPATION_AGRUPATION_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PARTICIPATION_AGRUPATION_FETCH_STARTED: {
        return null;
      }
      case types.PARTICIPATION_AGRUPATION_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };  


  const byIdParticipationAgrupationF = (state = [], action) => {
    switch (action.type) {
      case types.PARTICIPATION_AGRUPATION_F_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingParticipationAgrupationF = (state = false, action) => {
    switch (action.type) {
      case types.PARTICIPATION_AGRUPATION_F_FETCH_STARTED: {
        return true;
      }
      case types.PARTICIPATION_AGRUPATION_F_FETCH_COMPLETED: {
        return false;
      }
      case types.PARTICIPATION_AGRUPATION_F_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorParticipationAgrupationF = (state = null, action) => {
    switch (action.type) {
      case types.PARTICIPATION_AGRUPATION_F_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PARTICIPATION_AGRUPATION_F_FETCH_STARTED: {
        return null;
      }
      case types.PARTICIPATION_AGRUPATION_F_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };


  const byIdParticipationAgrupationM = (state = [], action) => {
    switch (action.type) {
      case types.PARTICIPATION_AGRUPATION_M_FETCH_COMPLETED: {
        return action.payload.entities;
      }
      default: {
        return state;
      }
    }
  };
  
  const isFetchingParticipationAgrupationM = (state = false, action) => {
    switch (action.type) {
      case types.PARTICIPATION_AGRUPATION_M_FETCH_STARTED: {
        return true;
      }
      case types.PARTICIPATION_AGRUPATION_M_FETCH_COMPLETED: {
        return false;
      }
      case types.PARTICIPATION_AGRUPATION_M_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const errorParticipationAgrupationM = (state = null, action) => {
    switch (action.type) {
      case types.PARTICIPATION_AGRUPATION_M_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.PARTICIPATION_AGRUPATION_M_FETCH_STARTED: {
        return null;
      }
      case types.PARTICIPATION_AGRUPATION_M_FETCH_COMPLETED: {
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
    byIdFemaleScholars,
    isFetchingFemaleScholars,
    errorFemaleScholars,
    byIdMaleScholars,
    isFetchingMaleScholars,
    errorMaleScholars,
    byIdCountEvents,
    isFetchingCountEvents,
    errorCountEvents,
    byIdMaleUsers,
    isFetchingMaleUsers,
    errorMaleUsers,
    byIdFemaleUsers,
    isFetchingFemaleUsers,
    errorFemaleUsers,
    byIdUsersFaculty,
    isFetchingUsersFaculty,
    errorUsersFaculty,
    byIdFemaleUsersFaculty,
    isFetchingFemaleUsersFaculty,
    errorFemaleUsersFaculty,
    byIdMaleUsersFaculty,
    isFetchingMaleUsersFaculty,
    errorMaleUsersFaculty,
    byIdUsersCareer,
    isFetchingUsersCareer,
    errorUsersCareer,
    byIdFemaleUsersCareer,
    isFetchingFemaleUsersCareer,
    errorFemaleUsersCareer,
    byIdMaleUsersCareer,
    isFetchingMaleUsersCareer,
    errorMaleUsersCareer,
    byIdParticipationArtClubs,
    isFetchingParticipationArtClubs,
    errorParticipationArtClubs,
    byIdParticipationArtClub,
    isFetchingParticipationArtClub,
    errorParticipationArtClub,
    byIdParticipationArtClubF,
    isFetchingParticipationArtClubF,
    errorParticipationArtClubF,
    byIdParticipationArtClubM,
    isFetchingParticipationArtClubM,
    errorParticipationArtClubM,
    byIdParticipationSportClubs,
    isFetchingParticipationSportClubs,
    errorParticipationSportClubs,
    byIdParticipationSportClub,
    isFetchingParticipationSportClub,
    errorParticipationSportClub,
    byIdParticipationSportClubF,
    isFetchingParticipationSportClubF,
    errorParticipationSportClubF,
    byIdParticipationSportClubM,
    isFetchingParticipationSportClubM,
    errorParticipationSportClubM,
    byIdParticipationAcadClubs,
    isFetchingParticipationAcadClubs,
    errorParticipationAcadClubs,
    byIdParticipationAcadClub,
    isFetchingParticipationAcadClub,
    errorParticipationAcadClub,
    byIdParticipationAcadClubF,
    isFetchingParticipationAcadClubF,
    errorParticipationAcadClubF,
    byIdParticipationAcadClubM,
    isFetchingParticipationAcadClubM,
    errorParticipationAcadClubM,
    byIdParticipationAgrupations,
    isFetchingParticipationAgrupations,
    errorParticipationAgrupations,
    byIdParticipationAgrupation,
    isFetchingParticipationAgrupation,
    errorParticipationAgrupation,
    byIdParticipationAgrupationF,
    isFetchingParticipationAgrupationF,
    errorParticipationAgrupationF,
    byIdParticipationAgrupationM,
    isFetchingParticipationAgrupationM,
    errorParticipationAgrupationM,
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
  export const getFemaleScholars = state => state.byIdFemaleScholars;
  export const getIsFetchingFemaleScholars = state => state.isFetchingFemaleScholars;
  export const getFetchingFemaleScholarsError = state => state.errorFemaleScholars;
  export const getMaleScholars = state => state.byIdMaleScholars;
  export const getIsFetchingMaleScholars = state => state.isFetchingMaleScholars;
  export const getFetchingMaleScholarsError = state => state.errorMaleScholars;
  export const getCountEvents = state => state.byIdCountEvents;
  export const getIsFetchingCountEvents = state => state.isFetchingCountEvents;
  export const getFetchingCountEventsError = state => state.errorCountEvents;
  export const getMaleUsers = state => state.byIdMaleUsers;
  export const getIsFetchingMaleUsers = state => state.isFetchingMaleUsers;
  export const getFetchingMaleUsersError = state => state.errorMaleUsers;
  export const getFemaleUsers = state => state.byIdFemaleUsers;
  export const getIsFetchingFemaleUsers = state => state.isFetchingFemaleUsers;
  export const getFetchingFemaleUsersError = state => state.errorFemaleUsers;
  export const getUsersFaculty = state => state.byIdUsersFaculty;
  export const getIsFetchingUsersFaculty = state => state.isFetchingUsersFaculty;
  export const getFetchingUsersFacultyError = state => state.errorUsersFaculty;
  export const getFemaleUsersFaculty = state => state.byIdFemaleUsersFaculty;
  export const getIsFetchingFemaleUsersFaculty = state => state.isFetchingFemaleUsersFaculty;
  export const getFetchingFemaleUsersFacultyError = state => state.errorFemaleUsersFaculty;
  export const getMaleUsersFaculty = state => state.byIdMaleUsersFaculty;
  export const getIsFetchingMaleUsersFaculty = state => state.isFetchingMaleUsersFaculty;
  export const getFetchingMaleUsersFacultyError = state => state.errorMaleUsersFaculty;
  export const getUsersCareer = state => state.byIdUsersCareer;
  export const getIsFetchingUsersCareer = state => state.isFetchingUsersCareer;
  export const getFetchingUsersCareerError = state => state.errorUsersCareer;
  export const getFemaleUsersCareer = state => state.byIdFemaleUsersCareer;
  export const getIsFetchingFemaleUsersCareer = state => state.isFetchingFemaleUsersCareer;
  export const getFetchingFemaleUsersCareerError = state => state.errorFemaleUsersCareer;
  export const getMaleUsersCareer = state => state.byIdMaleUsersCareer;
  export const getIsFetchingMaleUsersCareer = state => state.isFetchingMaleUsersCareer;
  export const getFetchingMaleUsersCareerError = state => state.errorMaleUsersCareer;
  export const getParticipationArtClubs = state => state.byIdParticipationArtClubs;
  export const getIsFetchingParticipationArtClubs = state => state.isFetchingParticipationArtClubs;
  export const getFetchingParticipationArtClubsError = state => state.errorParticipationArtClubs;
  export const getParticipationArtClub = state => state.byIdParticipationArtClub;
  export const getIsFetchingParticipationArtClub = state => state.isFetchingParticipationArtClub;
  export const getFetchingParticipationArtClubError = state => state.errorParticipationArtClub;
  export const getParticipationArtClubF = state => state.byIdParticipationArtClubF;
  export const getIsFetchingParticipationArtClubF = state => state.isFetchingParticipationArtClubF;
  export const getFetchingParticipationArtClubFError = state => state.errorParticipationArtClubF;
  export const getParticipationArtClubM = state => state.byIdParticipationArtClubM;
  export const getIsFetchingParticipationArtClubM = state => state.isFetchingParticipationArtClubM;
  export const getFetchingParticipationArtClubMError = state => state.errorParticipationArtClubM;
  export const getParticipationSportClubs = state => state.byIdParticipationSportClubs;
  export const getIsFetchingParticipationSportClubs = state => state.isFetchingParticipationSportClubs;
  export const getFetchingParticipationSportClubsError = state => state.errorParticipationSportClubs;
  export const getParticipationSportClub = state => state.byIdParticipationSportClub;
  export const getIsFetchingParticipationSportClub = state => state.isFetchingParticipationSportClub;
  export const getFetchingParticipationSportClubError = state => state.errorParticipationSportClub;
  export const getParticipationSportClubF = state => state.byIdParticipationSportClubF;
  export const getIsFetchingParticipationSportClubF = state => state.isFetchingParticipationSportClubF;
  export const getFetchingParticipationSportClubFError = state => state.errorParticipationSportClubF;
  export const getParticipationSportClubM = state => state.byIdParticipationSportClubM;
  export const getIsFetchingParticipationSportClubM = state => state.isFetchingParticipationSportClubM;
  export const getFetchingParticipationSportClubMError = state => state.errorParticipationSportClubM;
  export const getParticipationAcadClubs = state => state.byIdParticipationAcadClubs;
  export const getIsFetchingParticipationAcadClubs = state => state.isFetchingParticipationAcadClubs;
  export const getFetchingParticipationAcadClubsError = state => state.errorParticipationAcadClubs;
  export const getParticipationAcadClub = state => state.byIdParticipationAcadClub;
  export const getIsFetchingParticipationAcadClub = state => state.isFetchingParticipationAcadClub;
  export const getFetchingParticipationAcadClubError = state => state.errorParticipationAcadClub;
  export const getParticipationAcadClubF = state => state.byIdParticipationAcadClubF;
  export const getIsFetchingParticipationAcadClubF = state => state.isFetchingParticipationAcadClubF;
  export const getFetchingParticipationAcadClubFError = state => state.errorParticipationAcadClubF;
  export const getParticipationAcadClubM = state => state.byIdParticipationAcadClubM;
  export const getIsFetchingParticipationAcadClubM = state => state.isFetchingParticipationAcadClubM;
  export const getFetchingParticipationAcadClubMError = state => state.errorParticipationAcadClubM;
  export const getParticipationAgrupations = state => state.byIdParticipationAgrupations;
  export const getIsFetchingParticipationAgrupations = state => state.isFetchingParticipationAgrupations;
  export const getFetchingParticipationAgrupationsError = state => state.errorParticipationAgrupations;
  export const getParticipationAgrupation = state => state.byIdParticipationAgrupation;
  export const getIsFetchingParticipationAgrupation = state => state.isFetchingParticipationAgrupation;
  export const getFetchingParticipationAgrupationError = state => state.errorParticipationAgrupation;
  export const getParticipationAgrupationF = state => state.byIdParticipationAgrupationF;
  export const getIsFetchingParticipationAgrupationF = state => state.isFetchingParticipationAgrupationF;
  export const getFetchingParticipationAgrupationFError = state => state.errorParticipationAgrupationF;
  export const getParticipationAgrupationM = state => state.byIdParticipationAgrupationM;
  export const getIsFetchingParticipationAgrupationM = state => state.isFetchingParticipationAgrupationM;
  export const getFetchingParticipationAgrupationMError = state => state.errorParticipationAgrupationM;