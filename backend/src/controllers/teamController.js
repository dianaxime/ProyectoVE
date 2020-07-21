require('dotenv').config();

const db = require('../db/config');

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

const CREATE_TEAM=`INSERT INTO
team(name, sport)
VALUES ($1, $2)
returning *`;

const GET_TEAMS=`SELECT * FROM team`;

/**
 * Create Workshop
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

    const values = [
        name,
        sport
    ];

    db.query(CREATE_TEAM, values)
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

const getTeams = async (req, res) => {
    
    db.query(GET_TEAMS)
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
    getTeams
};