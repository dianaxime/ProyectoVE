const express = require('express');
const verifyAuth = require('../middleware/verifyAuth');

const {
    getAssistanceOfClub,
    getAssistanceOfClubs,
    getPlayersInTournament,
    getPlayersOfSportInTournament,
    getTeamsOfTournament,
    getTeamsOfASportInTournament,
    getGenderOfTournament,
    getGenderOfSportInTournament,
    getAllScholars,
    getFemaleScholars,
    getMaleScholars,
    getEventCount,
    getParticipactionWorkshopsInTime,
    getParticipactionWorkshop,
    getGenderParticipactionWorkshopsInTime,
    getGenderParticipactionOfWorkshop,
    getMaleUsers,
    getFemaleUsers,
    getUsersByFaculty,
    getUsersByCareer,
    getUsersByFacultyFemale,
    getUsersByFacultyMale,
    getUsersByCareerFemale,
    getUsersByCareerMale,
    getParticipationArtisticClubs,
    getParticipationArtisticClubsByClub,
    getFemaleParticipationArtisticClubsByClub,
    getMaleParticipationArtisticClubsByClub,
    getParticipationSportClubs,
    getParticipationSportClubsByClub,
    getFemaleParticipationSportClubsByClub,
    getMaleParticipationSportClubsByClub,
    getParticipationAcademicClubs,
    getParticipationAcademicClubsByClub,
    getFemaleParticipationAcademicClubsByClub,
    getMaleParticipationAcademicClubsByClub,
    getParticipationAgrupation,
    getParticipationAgrupationByClub,
    getFemaleParticipationAgrupationByClub,
    getMaleParticipationAgrupationByClub,
    getParticipationAssociation,
    getParticipationAssociationByClub,
    getFemaleParticipationAssociationByClub,
    getMaleParticipationAssociationByClub,
} = require('../controllers/statisticsController');

const router = express.Router();

// statistics Routes

router.get('/statistics/assistances-of-club/:idc/:startdate/:enddate', verifyAuth, getAssistanceOfClub);
router.get('/statistics/assistances-of-clubs/:startdate/:enddate', verifyAuth, getAssistanceOfClubs);
router.get('/statistics/players-tournament/:startdate/:enddate', verifyAuth, getPlayersInTournament);
router.get('/statistics/players-of-sport-tournament/:startdate/:enddate', verifyAuth, getPlayersOfSportInTournament);
router.get('/statistics/teams-tournament/:startdate/:enddate', verifyAuth, getTeamsOfTournament);
router.get('/statistics/teams-of-sport-tournament/:startdate/:enddate', verifyAuth, getTeamsOfASportInTournament);
router.get('/statistics/genders-tournament/:startdate/:enddate', verifyAuth, getGenderOfTournament);
router.get('/statistics/genders-of-sport-tournament/:startdate/:enddate', verifyAuth, getGenderOfSportInTournament);
router.get('/statistics/quantity-scholars/:startdate/:enddate', verifyAuth, getAllScholars);
router.get('/statistics/participation-workshops/:startdate/:enddate', verifyAuth, getParticipactionWorkshopsInTime);
router.get('/statistics/participation-workshop/:startdate/:enddate', verifyAuth, getParticipactionWorkshop);
router.get('/statistics/gender-participation-workshops/:startdate/:enddate', verifyAuth, getGenderParticipactionWorkshopsInTime);
router.get('/statistics/gender-participation-workshop/:startdate/:enddate', verifyAuth, getGenderParticipactionOfWorkshop);
router.get('/statistics/female-scholars/:startdate/:enddate', verifyAuth, getFemaleScholars);
router.get('/statistics/male-scholars/:startdate/:enddate', verifyAuth, getMaleScholars);
router.get('/statistics/count-events/:startdate/:enddate', verifyAuth, getEventCount);
router.get('/statistics/male_users', verifyAuth, getMaleUsers);
router.get('/statistics/female_users', verifyAuth, getFemaleUsers);
router.get('/statistics/users_by_faculty', verifyAuth, getUsersByFaculty);
router.get('/statistics/users_by_faculty_female', verifyAuth, getUsersByFacultyFemale);
router.get('/statistics/users_by_faculty_male', verifyAuth, getUsersByFacultyMale);
router.get('/statistics/users_by_career', verifyAuth, getUsersByCareer);
router.get('/statistics/users_by_career_female', verifyAuth, getUsersByCareerFemale);
router.get('/statistics/users_by_career_male', verifyAuth, getUsersByCareerMale);
/*Artistic club statistics */
router.get('/statistics/participations-artistic-clubs/:startdate/:enddate', verifyAuth, getParticipationArtisticClubs);
router.get('/statistics/participations-artistic-clubs-by-club/:startdate/:enddate', verifyAuth, getParticipationArtisticClubsByClub);
router.get('/statistics/female-participations-artistic-clubs-by-club/:startdate/:enddate', verifyAuth, getFemaleParticipationArtisticClubsByClub);
router.get('/statistics/male-participations-artistic-clubs-by-club/:startdate/:enddate', verifyAuth, getMaleParticipationArtisticClubsByClub);
/*Sport club statistics */
router.get('/statistics/participations-sport-clubs/:startdate/:enddate', verifyAuth, getParticipationSportClubs);
router.get('/statistics/participations-sport-clubs-by-club/:startdate/:enddate', verifyAuth, getParticipationSportClubsByClub);
router.get('/statistics/female-participations-sport-clubs-by-club/:startdate/:enddate', verifyAuth, getFemaleParticipationSportClubsByClub);
router.get('/statistics/male-participations-sport-clubs-by-club/:startdate/:enddate', verifyAuth, getMaleParticipationSportClubsByClub);
/*Academic club statistics */
router.get('/statistics/participations-academic-clubs/:startdate/:enddate', verifyAuth, getParticipationAcademicClubs);
router.get('/statistics/participations-academic-clubs-by-club/:startdate/:enddate', verifyAuth, getParticipationAcademicClubsByClub);
router.get('/statistics/female-participations-academic-clubs-by-club/:startdate/:enddate', verifyAuth, getFemaleParticipationAcademicClubsByClub);
router.get('/statistics/male-participations-academic-clubs-by-club/:startdate/:enddate', verifyAuth, getMaleParticipationAcademicClubsByClub);
/*Agrupations statistics */
router.get('/statistics/participations-agrupations/:startdate/:enddate', verifyAuth, getParticipationAgrupation);
router.get('/statistics/participations-agrupations-by-agrupation/:startdate/:enddate', verifyAuth, getParticipationAgrupationByClub);
router.get('/statistics/female-participations-agrupations-by-agrupation/:startdate/:enddate', verifyAuth, getFemaleParticipationAgrupationByClub);
router.get('/statistics/male-participations-agrupations-by-agrupation/:startdate/:enddate', verifyAuth, getMaleParticipationAgrupationByClub);
/**ASSOCIATION STATISTICS */
router.get('/statistics/participations-associations/:startdate/:enddate', verifyAuth, getParticipationAssociation);
router.get('/statistics/participations-associations-by-association/:startdate/:enddate', verifyAuth, getParticipationAssociationByClub);
router.get('/statistics/female-participations-associations-by-association/:startdate/:enddate', verifyAuth, getFemaleParticipationAssociationByClub);
router.get('/statistics/male-participations-associations-by-association/:startdate/:enddate', verifyAuth, getMaleParticipationAssociationByClub);





module.exports = router;