const express = require('express');

const {
    createTeam,
    getTeams
} = require('../controllers/teamController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

// users Routes
router.post('/team/create', verifyAuth, createTeam);
router.get('/team/all-teams', verifyAuth, getTeams);
module.exports = router;