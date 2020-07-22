require('dotenv').config();

const db = require('../db/config');

const {
    isEmpty,
} = require('../helpers/validation');

const {
    errorMessage,
    successMessage,
    status,
} = require('../helpers/status');

const CREATE_TOURNAMENT=`INSERT INTO
tournament(userid, idt, startdate, enddate)
VALUES ($1, $2, $3, $4)
returning *`;

const GET_TOURNAMENTS=`SELECT * FROM tournament`;

const GET_TOURNAMENT_BY_TEAM_ID=`SELECT users.id, users.first_name, users.last_name, users.email  FROM tournament JOIN users on users.id=tournament.userid where idt=$1 `;

/**
 * Create Tournament
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const createTournament = async (req, res) => {
    const {
        userid,
        idt,
        startdate,
        enddate
    } = req.body;

    if (isEmpty(userid) || isEmpty(idt)  || isEmpty(startdate) || isEmpty(enddate) ) {
        errorMessage.error = 'User id, id of team, startdate, enddate field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    const values = [
        userid,
        idt,
        startdate,
        enddate
    ];

    db.query(CREATE_TOURNAMENT, values)
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
 * Get Tournaments
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getTournaments = async (req, res) => {
    
    db.query(GET_TOURNAMENTS)
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No tournaments';
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

/**
 * Get Tournament by team id
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getTournamentByTeam = async (req, res) => {
    
    const {
        idt,
    } = req.body;

    if (isEmpty(idt)) {
        errorMessage.error = 'ID of team detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    
    const values = [
        idt
    ];

    db.query(GET_TOURNAMENT_BY_TEAM_ID, values)
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No tournaments of that team';
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
    createTournament,
    getTournaments,
    getTournamentByTeam
};