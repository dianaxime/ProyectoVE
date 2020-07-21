const express = require('express');

const {
    createParticipation,
    getParticipations
} = require('../controllers/participationController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

// users Routes
router.post('/participation/create', verifyAuth, createParticipation);
router.get('/participation/all-participations', verifyAuth, getParticipations);
module.exports = router;