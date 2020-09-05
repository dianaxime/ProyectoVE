const express = require('express');

const {
    getRole,
    getRoles
} = require('../controllers/roleController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

router.get('/role/role-by-id', verifyAuth, getRole);
router.get('/role/all-roles', verifyAuth, getRoles);

module.exports = router;