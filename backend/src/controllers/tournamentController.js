require('dotenv').config();

const {
    empty,
} = require('../helpers/validation');

const {
    errorMessage,
    successMessage,
    status,
} = require('../helpers/status');

const {
    createTournamentQuery,
    getTournamentsQuery,
    getTournamentByTeamQuery,
    deleteTournamentQuery,
} = require('../repository/tournament');

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

    if (empty(userid) || empty(idt)  || empty(startdate) || empty(enddate) ) {
        errorMessage.error = 'User id, id of team, startdate, enddate field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    createTournamentQuery({...req.body})
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

/**
 * Get Tournaments
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getTournaments = async (req, res) => {
    
    getTournamentsQuery()
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
    
    const idt = req.params.idt;

    if (empty(idt)) {
        errorMessage.error = 'ID of team detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    getTournamentByTeamQuery(idt)
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

const deleteTournamentByUserT = async (req, res) => {
    
    const idt = req.params.idt;
    const userid = req.params.userid;

    if (empty(idt) || empty(userid)) {
        errorMessage.error = 'ID of team detail is missing or user ID';
        return res.status(status.bad).send(errorMessage);
    }
    
    deleteParticipationQuery({idt, userid})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No participation of that userid in that team';
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
    getTournamentByTeam,
    deleteTournamentByUserT
};