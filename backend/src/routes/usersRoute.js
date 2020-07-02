const express = require('express');

const {
    createUser,
    loginUser,
    createRegister
} = require('../controllers/usersController');

const router = express.Router();

// users Routes

router.post('/auth/authorize', createUser);
router.get('/auth/authorize', createUser);
router.post('/auth/login', loginUser);
router.post('/auth/signin', createRegister);

module.exports = router;