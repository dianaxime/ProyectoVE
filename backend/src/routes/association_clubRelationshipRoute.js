const express = require('express');

const {
    createACParticipation,
    getACParticipations,
    getParticipationByAC,
    deleteParticipationByUserAC
} = require('../controllers/association_clubRelationshipController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

router.post('/AC-participation/create', verifyAuth, createACParticipation);
router.get('/AC-participation/all-AC-participations', verifyAuth, getACParticipations);
router.get('/AC-participation/participations-by-AC/:idac', verifyAuth, getParticipationByAC);
router.delete('/AC-participation/delete/:idac/:userid', verifyAuth, deleteParticipationByUserAC);

module.exports = router;