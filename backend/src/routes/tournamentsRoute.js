const express = require('express');

const {
    createTournament,
    getTournaments
} = require('../controllers/tournamentController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

// users Routes
router.post('/tournaments/create', verifyAuth, createTournament);
router.get('/tournaments/all-tournaments', verifyAuth, getTournaments);
module.exports = router;