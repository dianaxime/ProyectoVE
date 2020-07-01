const express = require('express');

const seedUser = require('../controllers/seedUserController');

const router = express.Router();

// seed user Route
router.get('/user/seed', seedUser);

module.exports = router;