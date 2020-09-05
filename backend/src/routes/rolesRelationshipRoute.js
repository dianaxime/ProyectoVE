const express = require('express');

const {
    createRolesRelationship,
    deleteRolesRelationship,
    getWorkshopByRoleAndUser,
    getTeamByRoleAndUser,
    getUserByEmailRoles
} = require('../controllers/rolesRelationshipController');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

router.post('/relationship-roles/create', verifyAuth, createRolesRelationship);
router.delete('/relationship-roles/delete', verifyAuth, deleteRolesRelationship);
router.get('/relationship-roles/get-workshops-user', verifyAuth, getWorkshopByRoleAndUser);
router.get('/relationship-roles/get-teams-user', verifyAuth, getTeamByRoleAndUser);
router.get('/relationship-roles/get-by-email/:email', verifyAuth, getUserByEmailRoles);

module.exports = router;