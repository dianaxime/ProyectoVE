const express = require('express');

const {
    createUser,
    siginUser
} = require('../controllers/usersController');

const router = express.Router();

// users Routes

router.post('/auth/signup', createUser);
router.post('/auth/signin', siginUser);

module.exports = router;