const express = require('express');

const {
    createScholars,
    getScholars
} = require('../controllers/scholarsController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

// scholars Routes

router.post('/scholars/create', verifyAuth, createScholars);
router.get('/scholars/all-scholars', verifyAuth, getScholars);

module.exports = router;