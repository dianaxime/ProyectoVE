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
    deleteRoleRelationshipQuery,
    getWorkshopByRoleAndUserQuery,
    getTeamByRoleAndUserQuery } = require('../repository/roleRelationship');

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
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'User already asigned';
            return res.status(status.conflict).send(errorMessage);
        }
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

const getWorkshopByRoleAndUser=async (req, res)=>{

    const {
        id,
    } = req.body;

    if (isEmpty(id)) {
        errorMessage.error = 'UserId detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    getWorkshopByRoleAndUserQuery({...req.body})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No WORKSHOP found';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
}

const getTeamByRoleAndUser=async (req, res)=>{

    const {
        id,
    } = req.body;

    if (isEmpty(id)) {
        errorMessage.error = 'UserId detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    getTeamByRoleAndUserQuery({...req.body})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No WORKSHOP found';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
}

module.exports = {
    createRolesRelationship,
    deleteRolesRelationship,
    getWorkshopByRoleAndUser,
    getTeamByRoleAndUser
};