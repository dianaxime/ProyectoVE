const express = require('express');

const {
    createAC,
    getACs,
    getAs,
    getCs,
    updateAC,
    getACByName
} = require('../controllers/association_clubController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

// workshop Routes

router.post('/association-club/create', verifyAuth, createAC);
router.get('/association-club/all-association-club', verifyAuth, getACs);
router.get('/association-club/all-association', verifyAuth, getAs);
router.get('/association-club/all-club', verifyAuth, getCs);
router.get('/association-club/association-club-name/:name', verifyAuth, getACByName);
router.patch('/association-club/update-association-club', verifyAuth, updateAC);


module.exports = router;