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
    createParticipationEventQuery,
    getParticipationsEventQuery,
    getParticipationByEQuery,
} = require('../repository/participationEvent');

/**
 * Create Participation on event
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const createParticipationEvent = async (req, res) => {
    const {
        userid,
        idEvent,
        hours
    } = req.body;

    if (isEmpty(userid) || isEmpty(idEvent)  || isEmpty(hours) ) {
        errorMessage.error = 'User id, id of event and hours field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    createParticipationEventQuery({...req.body})
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
 * Get Participations on events
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getParticipationsEvents = async (req, res) => {
    
    getParticipationsEventQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No PARTICIPATIONS in events';
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

const getParticipationByEvent = async (req, res) => {
    
    const {
        idEvent,
    } = req.body;

    if (isEmpty(idEvent)) {
        errorMessage.error = 'ID of event detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    getParticipationByEQuery({...req.body})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No participation of that event';
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
    createParticipationEvent,
    getParticipationsEvents,
    getParticipationByEvent
};