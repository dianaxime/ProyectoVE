require('dotenv').config();

const {
    isEmpty,
    isHoursValid,
    isPercentageValid,
} = require('../helpers/validation');

const {
    errorMessage,
    successMessage,
    status,
} = require('../helpers/status');

const { createRoleRelationshipQuery,
    deleteRoleRelationshipQuery } = require('../repository/roleRelationship');

/**
 * Create Participation
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const createRolesRelationship = async (req, res) => {
    const {
        userid,
        idr
    } = req.body;

    if (isEmpty(userid) || isEmpty(idr) ) {
        errorMessage.error = 'User id, id of role cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    createRoleRelationshipQuery({...req.body})
    .then(data => {
        console.log('DATA:', data); // print data;
        successMessage.data = data;
        return res.status(status.created).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

const deleteRolesRelationship = async (req, res) => {
    const {
        id
    } = req.body;

    if (isEmpty(id)) {
        errorMessage.error = 'id of relationship cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    deleteRoleRelationshipQuery({...req.body})
    .then(data => {
        console.log('DATA:', data); // print data;
        successMessage.data = data;
        return res.status(status.nocontent).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

module.exports = {
    createRolesRelationship,
    deleteRolesRelationship
};