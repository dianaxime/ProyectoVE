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
    createParticipationQuery, 
    getParticipationsQuery,
    getParticipationByWsQuery,
} = require('../repository/participation');

/**
 * Create Participation
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const createParticipation = async (req, res) => {
    const {
        userid,
        idw,
        startdate,
        enddate
    } = req.body;

    if (isEmpty(userid) || isEmpty(idw)  || isEmpty(startdate) || isEmpty(enddate) ) {
        errorMessage.error = 'User id, id of workshop, startdate, enddate field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    createParticipationQuery({...req.body})
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
 * Get Participations
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getParticipations = async (req, res) => {
    
    getParticipationsQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No PARTICIPATIONS in workshops';
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

const getParticipationByWs = async (req, res) => {
    
    const {
        idw,
    } = req.body;

    if (isEmpty(idw)) {
        errorMessage.error = 'ID of workshop detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    getParticipationByWsQuery({...req.body})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No participation of that workshop';
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
    createParticipation,
    getParticipations,
    getParticipationByWs
};