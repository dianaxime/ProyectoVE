const express = require('express');

const {
    getRole
} = require('../controllers/roleController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

router.get('/role/role-by-id', verifyAuth, getRole);

module.exports = router;