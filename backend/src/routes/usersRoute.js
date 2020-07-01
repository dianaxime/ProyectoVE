const express = require('express');

const {
    createUser,
    loginUser
} = require('../controllers/usersController');

const router = express.Router();

// users Routes

router.post('/auth/signin', createUser);
router.post('/auth/login', loginUser);

module.exports = router;