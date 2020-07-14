const express = require('express');

const {
    createScholars
} = require('../controllers/scholarsController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

// scholars Routes

router.post('/scholars/create', verifyAuth, createScholars);

module.exports = router;