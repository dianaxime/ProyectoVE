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

const {
    createEventQuery,
    getEventsQuery,
    getEventByNameQuery,
    updateEventQuery
} = require('../repository/event');

/**
 * Create event
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const createEvent = async (req, res) => {
    const {
        name,
        classroom,
        description,
        date
    } = req.body;

    if (isEmpty(name) || isEmpty(classroom) || isEmpty(description) || isEmpty(date) ) {
        errorMessage.error = 'Name, classroom, description, date field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    createEventQuery({...req.body})
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
 * Get event by name
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getEventByName=async (req, res)=>{

    const {
        name,
    } = req.body;

    if (isEmpty(name)) {
        errorMessage.error = 'Name detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    getEventByNameQuery({...req.body})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No EVENT found';
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
 * Get Events
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getEvents = async (req, res) => {
    
    getEventsQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No Events';
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
 * Update event
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const updateEvent = async (req, res) => {
    
    const {
        name,
        classroom,
        description,
        date,
        id
    } = req.body;

    if (isEmpty(name) || isEmpty(description) || isEmpty(classroom) || isEmpty(date) ) {
        errorMessage.error = 'Name, description, classroom, date detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    updateEventQuery({...req.body})
    .then(data => {
        console.log('DATA:', data);
        data = data[0];
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
    createEvent,
    getEvents,
    updateEvent,
    getEventByName
};