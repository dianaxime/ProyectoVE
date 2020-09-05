const express = require('express');

const {
    createWorkshop,
    getWorkshops,
    updateWorkshop,
    getWorkshopByName
} = require('../controllers/workshopController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

// workshop Routes

router.post('/workshop/create', verifyAuth, createWorkshop);
router.get('/workshop/all-workshops', verifyAuth, getWorkshops);
router.get('/workshop/workshop-name', verifyAuth, getWorkshopByName);
router.patch('/workshop/update-workshop', verifyAuth, updateWorkshop);


module.exports = router;