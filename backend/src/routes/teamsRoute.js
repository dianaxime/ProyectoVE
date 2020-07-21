const express = require('express');

const {
    createTeam,
    getTeams,
    getTeamByName
} = require('../controllers/teamController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

// team Routes

router.post('/team/create', verifyAuth, createTeam);
router.get('/team/all-teams', verifyAuth, getTeams);
router.get('/team/team-name', verifyAuth, getTeamByName);

module.exports = router;