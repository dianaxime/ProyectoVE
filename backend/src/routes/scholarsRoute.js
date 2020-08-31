const express = require('express');

const {
    createScholars,
    getScholars,
    getScholarsOrganizer,
    getScholarsOther,
    getScholarsSpokesPerson,
    getScholarsLeader,
    getScholarsGraphicDesign,
    getScholarsPhotoVideoEditor
} = require('../controllers/scholarsController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

// scholars Routes

router.post('/scholars/create', verifyAuth, createScholars);
router.get('/scholars/all-scholars', verifyAuth, getScholars);
router.get('/scholars/organizer-scholars', verifyAuth, getScholarsOrganizer);
router.get('/scholars/photo-videoeditor-scholars', verifyAuth, getScholarsPhotoVideoEditor);
router.get('/scholars/spokesperson-scholars', verifyAuth, getScholarsSpokesPerson);
router.get('/scholars/graphicdesign-scholars', verifyAuth, getScholarsGraphicDesign);
router.get('/scholars/other-scholars', verifyAuth, getScholarsOther);
router.get('/scholars/leader-scholars', verifyAuth, getScholarsLeader);

module.exports = router;