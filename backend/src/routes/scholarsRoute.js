const express = require('express');

const {
    createScholars,
    getScholars,
    getScholarsOrganizer,
    getScholarsPhotoEditor,
    getScholarsSpokesPerson,
    getScholarsVideoEditor
} = require('../controllers/scholarsController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

// scholars Routes

router.post('/scholars/create', verifyAuth, createScholars);
router.get('/scholars/all-scholars', verifyAuth, getScholars);
router.get('/scholars/organizer-scholars', verifyAuth, getScholarsOrganizer);
router.get('/scholars/photoeditor-scholars', verifyAuth, getScholarsPhotoEditor);
router.get('/scholars/spokesperson-scholars', verifyAuth, getScholarsSpokesPerson);
router.get('/scholars/videoeditor-scholars', verifyAuth, getScholarsVideoEditor);

module.exports = router;