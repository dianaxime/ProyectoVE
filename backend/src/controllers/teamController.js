require('dotenv').config();

const {
    isEmpty,
} = require('../helpers/validation');

const {
    errorMessage,
    successMessage,
    status,
} = require('../helpers/status');

const {
    createTeamQuery,
    getTeamsQuery,
    getTeamByNameQuery
} = require('../repository/team');

/**
 * Create Team
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const createTeam = async (req, res) => {
    const {
        name,
        sport,
    } = req.body;

    if (isEmpty(name) || isEmpty(sport) ) {
        errorMessage.error = 'Name, sport fields cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    createTeamQuery({...req.body})
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

/**
 * Get team by name
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getTeamByName=async (req, res)=>{

    const {
        name,
    } = req.body;

    if (isEmpty(name)) {
        errorMessage.error = 'Name detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    getTeamByNameQuery({...req.body})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No TEAM found';
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

/**
 * Get Teams
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getTeams = async (req, res) => {
    
    getTeamsQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No TEAMS';
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
};

module.exports = {
    createTeam,
    getTeams,
    getTeamByName
};