const express = require('express');

const {
    createSession,
    getSessions,
    getSessionByDate
} = require('../controllers/sessionsController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

// session Routes

router.post('/sessions/create', verifyAuth, createSession);
router.get('/sessions/all-sessions', verifyAuth, getSessions);
router.get('/sessions/sessions-by-date/:idac/:date', verifyAuth, getSessionByDate);

module.exports = router;