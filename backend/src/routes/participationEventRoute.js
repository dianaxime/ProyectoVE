const express = require('express');

const {
    createParticipationEvent,
    getParticipationsEvents,
    getParticipationByEvent,
    deleteParticipationByUserEvent
} = require('../controllers/participationEventController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

router.post('/participationEvent/create', verifyAuth, createParticipationEvent);
router.get('/participationEvent/all-participations', verifyAuth, getParticipationsEvents);
router.get('/participationEvent/participations-by-event/:idEvent', verifyAuth, getParticipationByEvent);
router.delete('/participationEvent/delete/:idEvent/:userid', verifyAuth, deleteParticipationByUserEvent);

module.exports = router;