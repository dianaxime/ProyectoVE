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
    getStudentByEmail,
    getStudentsTeamsById,
    getStudentsWSById,
    getStudentsCbyId,
    getStudentsAbyId,
    getStudentsSessionsById,
    getScholarHours,
    getRole
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
router.get('/auth/student-email/:email', verifyAuth, getStudentByEmail);
router.get('/auth/students-teams', verifyAuth, getStudentsTeamsById);
router.get('/auth/students-workshops', verifyAuth, getStudentsWSById);
router.get('/auth/students-associations/:id', verifyAuth, getStudentsAbyId);
router.get('/auth/students-clubs/:id', verifyAuth, getStudentsCbyId);
router.get('/auth/students-sessions/:id', verifyAuth, getStudentsSessionsById);
router.get('/auth/scholars-hours/:startdate/:enddate', verifyAuth, getScholarHours);
router.get('/auth/role/', verifyAuth, getRole);


module.exports = router;