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
    createWorkshopQuery,
    getWorkshopsQuery,
    getWorkshopByNameQuery,
    updateWorkshopQuery
} = require('../repository/workshop');

/**
 * Create Workshop
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const createWorkshop = async (req, res) => {
    const {
        name,
        classroom,
        description,
        startdate,
        enddate
    } = req.body;

    if (isEmpty(name) || isEmpty(classroom) || isEmpty(description) || isEmpty(startdate) || isEmpty(enddate) ) {
        errorMessage.error = 'Name, classroom, description, startdate, enddate field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    createWorkshopQuery({...req.body})
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
 * Get workshop by name
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getWorkshopByName=async (req, res)=>{

    const {
        name,
    } = req.body;

    if (isEmpty(name)) {
        errorMessage.error = 'Name detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    getWorkshopByNameQuery({...req.body})
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

/**
 * Get Workshops
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getWorkshops = async (req, res) => {
    
    getWorkshopsQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No workshops';
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
 * Update Workshop
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const updateWorkshop = async (req, res) => {
    
    const {
        name,
        classroom,
        description,
        startdate,
        enddate,
        id
    } = req.body;

    if (isEmpty(name) || isEmpty(description) || isEmpty(classroom) || isEmpty(startdate) || isEmpty(enddate) ) {
        errorMessage.error = 'Name, description, classroom, startdate, enddate detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    updateWorkshopQuery({...req.body})
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
    createWorkshop,
    getWorkshops,
    updateWorkshop,
    getWorkshopByName
};