const express = require('express');

const {
    createAssistance,
    getAssistances,
    getAssistanceBySession,
    deleteAssistanceByUserS
} = require('../controllers/assistanceController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

// tournament Routes

router.post('/assistances/create', verifyAuth, createAssistance);
router.get('/assistances/all-assistances', verifyAuth, getAssistances);
router.get('/assistances/assistances-by-session/:ids/:idac', verifyAuth, getAssistanceBySession);
router.delete('/assistances/delete/:ids/:userid/:idac', verifyAuth, deleteAssistanceByUserS);

module.exports = router;