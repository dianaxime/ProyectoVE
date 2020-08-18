const express = require('express');

const {
    createEvent,
    getEvents,
    updateEvent,
    getEventByName
} = require('../controllers/eventController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

// event Routes

router.post('/event/create', verifyAuth, createEvent);
router.get('/event/all-events', verifyAuth, getEvents);
router.get('/event/event-name', verifyAuth, getEventByName);
router.patch('/event/update-event', verifyAuth, updateEvent);


module.exports = router;