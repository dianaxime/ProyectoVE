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
    getParticipactionWorkshopsInTime,
    getParticipactionWorkshop,
    getGenderParticipactionWorkshopsInTime,
    getGenderParticipactionOfWorkshop
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
router.get('/statistics/quantity-scholars/', verifyAuth, getAllScholars);
router.get('/statistics/participation-workshops/:startdate/:enddate', verifyAuth, getParticipactionWorkshopsInTime);
router.get('/statistics/participation-workshop/:idw', verifyAuth, getParticipactionWorkshop);
router.get('/statistics/gender-participation-workshops/:startdate/:enddate', verifyAuth, getGenderParticipactionWorkshopsInTime);
router.get('/statistics/gender-participation-workshop/:idw', verifyAuth, getGenderParticipactionOfWorkshop);

module.exports = router;