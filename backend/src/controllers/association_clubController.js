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
    createACQuery,
    getACsQuery,
    getAsQuery,
    getCsQuery,
    getACByNameQuery,
    updateACQuery
} = require('../repository/association_club');

/**
 * Create association/club
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const createAC = async (req, res) => {
    const {
        name,
        type,
        description,
        startdate,
        enddate
    } = req.body;

    if (isEmpty(name) || isEmpty(type) || isEmpty(description) || isEmpty(startdate) || isEmpty(enddate) ) {
        errorMessage.error = 'Name, type, description, startdate, enddate field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    createACQuery({...req.body})
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
 * Get association/club by name
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getACByName=async (req, res)=>{

    const name = req.params.name;

    if (isEmpty(name)) {
        errorMessage.error = 'Name detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    getACByNameQuery({name})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No association/club found';
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
 * Get associations/clubs
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getACs = async (req, res) => {
    
    getACsQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No associations/clubs';
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
 * Get associations
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getAs = async (req, res) => {
    
    getAsQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No associations';
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
 * Get clubs
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getCs = async (req, res) => {
    
    getCsQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No clubs';
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
 * Update Association/club
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const updateAC = async (req, res) => {
    
    const {
        name,
        type,
        description,
        startdate,
        enddate,
        id
    } = req.body;

    if (isEmpty(name) || isEmpty(type) || isEmpty(description) || isEmpty(startdate) || isEmpty(enddate) ) {
        errorMessage.error = 'Name, type, classroom, startdate, enddate detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    updateACQuery({...req.body})
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
    createAC,
    getACs,
    getAs,
    getCs,
    updateAC,
    getACByName
};