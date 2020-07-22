const express = require('express');

const {
    createParticipation,
    getParticipations,
    getParticipationByWs
} = require('../controllers/participationController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

// participation Routes

router.post('/participation/create', verifyAuth, createParticipation);
router.get('/participation/all-participations', verifyAuth, getParticipations);
router.get('/participation/participations-by-workshop', verifyAuth, getParticipationByWs);

module.exports = router;