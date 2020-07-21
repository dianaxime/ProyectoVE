const express = require('express');

const {
    createWorksop,
    getWorkshops
} = require('../controllers/workshopController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

// workshop Routes

router.post('/workshop/create', verifyAuth, createWorksop);
router.get('/workshop/all-workshops', verifyAuth, getWorkshops);

module.exports = router;