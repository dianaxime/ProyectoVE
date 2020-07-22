const express = require('express');

const {
    createTournament,
    getTournaments,
    getTournamentByTeam
} = require('../controllers/tournamentController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

// tournament Routes

router.post('/tournaments/create', verifyAuth, createTournament);
router.get('/tournaments/all-tournaments', verifyAuth, getTournaments);
router.get('/tournaments/tournaments-by-team', verifyAuth, getTournamentByTeam);

module.exports = router;