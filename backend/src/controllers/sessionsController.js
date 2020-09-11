require('dotenv').config();

const db = require('../db/config');

const {
    isEmpty,
    empty,
} = require('../helpers/validation');

const {
    errorMessage,
    successMessage,
    status,
} = require('../helpers/status');

const {
    createSessionQuery,
    getSessionsQuery,
    getSessionByDateQuery,
    getSessionByACQuery
} = require('../repository/sessions');

/**
 * Create event
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const createSession = async (req, res) => {
    const {
        idac,
        date
    } = req.body;

    if (isEmpty(idac) || isEmpty(date) ) {
        errorMessage.error = 'Id of club/association and date field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    createSessionQuery({...req.body})
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
 * Get session by date
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getSessionByDate=async (req, res)=>{

    const date = req.params.date;
    const idac = req.params.idac;

    if (empty(date) || empty(idac)) {
        errorMessage.error = 'Date and id detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    getSessionByDateQuery({date, idac})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No sessions with that ac and date found';
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
 * Get session by AC
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/
const getSessionByAC=async (req, res)=>{

    const idac = req.params.idac;

    if (empty(idac)) {
        errorMessage.error = 'Id detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    getSessionByACQuery({idac})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No sessions with that ac found';
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
 * Get sessions
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getSessions = async (req, res) => {
    
    getSessionsQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No Sessions';
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
    createSession,
    getSessions,
    getSessionByDate,
    getSessionByAC
};