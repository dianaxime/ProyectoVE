const express = require('express');

const {
    createUser,
    loginUser,
    createRegister,
    forgotPassword,
    changePassword
} = require('../controllers/usersController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

// users Routes

router.post('/auth/login', loginUser);
router.post('/auth/signin', createRegister);
router.post('/auth/forgot', forgotPassword);
router.post('/auth/authorize', verifyAuth, createUser);
router.post('/auth/change', verifyAuth, changePassword);

module.exports = router;