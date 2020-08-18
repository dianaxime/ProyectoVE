const express = require('express');

const {
    createParticipation,
    getParticipations,
    getParticipationByWs,
    deleteParticipationByUserWs
} = require('../controllers/participationController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

// participation Routes

router.post('/participation/create', verifyAuth, createParticipation);
router.get('/participation/all-participations', verifyAuth, getParticipations);
router.get('/participation/participations-by-workshop/:idw', verifyAuth, getParticipationByWs);
router.delete('/participation/delete/:idw/:userid', verifyAuth, deleteParticipationByUserWs);

module.exports = router;