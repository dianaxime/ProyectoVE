const express = require('express');

const {
    createUser,
    loginUser,
    createRegister,
    forgotPassword,
    changePassword,
    updateUser,
    refreshToken,
    getPending,
    getStudents,
} = require('../controllers/usersController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

// users Routes

router.post('/auth/login', loginUser);
router.post('/auth/signin', createRegister);
router.patch('/auth/forgot', forgotPassword);
router.patch('/auth/authorize', verifyAuth, createUser);
router.patch('/auth/change', verifyAuth, changePassword);
router.patch('/auth/update', verifyAuth, updateUser);
router.post('/auth/token-refresh', verifyAuth, refreshToken);
router.get('/auth/pending-users', verifyAuth, getPending);
router.get('/auth/all-students', verifyAuth, getStudents);
module.exports = router;