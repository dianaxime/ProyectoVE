const express = require('express');

const {
    createSession,
    getSessions,
    getSessionByDate,
    getSessionsByAC,
    getSessionByAC,
} = require('../controllers/sessionsController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

// session Routes

router.post('/sessions/create', verifyAuth, createSession);
router.get('/sessions/all-sessions', verifyAuth, getSessions);
router.get('/sessions/sessions-by-date/:idac/:date', verifyAuth, getSessionByDate);
router.get('/sessions/sessions-by-ac/:idac', verifyAuth, getSessionsByAC);
router.get('/sessions/session-by-ac/:idac', verifyAuth, getSessionByAC);

module.exports = router;