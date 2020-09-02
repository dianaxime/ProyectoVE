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
    createParticipationEventQuery,
    getParticipationsEventQuery,
    getParticipationByEQuery,
    deleteEventParticipationQuery
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

    if (empty(userid) || empty(idEvent)  || empty(hours) ) {
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
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'User already asigned';
            return res.status(status.conflict).send(errorMessage);
        }
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
    
    const idEvent = req.params.idEvent;

    if (empty(idEvent)) {
        errorMessage.error = 'ID of event detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    getParticipationByEQuery({idEvent})
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

const deleteParticipationByUserEvent = async (req, res) => {
    
    const idEvent = req.params.idEvent;
    const userid = req.params.userid;

    if (empty(idEvent) || empty(userid)) {
        errorMessage.error = 'ID of workshop detail is missing or user ID';
        return res.status(status.bad).send(errorMessage);
    }
    
    deleteEventParticipationQuery({idEvent, userid})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No participation of that userid in that workshop';
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
    getParticipationByEvent,
    deleteParticipationByUserEvent
};