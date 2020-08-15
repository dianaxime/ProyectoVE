const express = require('express');

const {
    createRolesRelationship,
    deleteRolesRelationship
} = require('../controllers/rolesRelationshipController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

router.post('/relationship-roles/create', verifyAuth, createRolesRelationship);
router.delete('/relationship-roles/delete', verifyAuth, deleteRolesRelationship);

module.exports = router;