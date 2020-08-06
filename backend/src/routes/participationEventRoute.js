const express = require('express');

const {
    createParticipationEvent,
    getParticipationsEvents,
    getParticipationByEvent
} = require('../controllers/participationEventController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

router.post('/participation/create', verifyAuth, createParticipationEvent);
router.get('/participation/all-participations', verifyAuth, getParticipationsEvents);
router.get('/participation/participations-by-workshop', verifyAuth, getParticipationByEvent);

module.exports = router;