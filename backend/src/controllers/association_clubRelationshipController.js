require('dotenv').config();

const {
    empty
} = require('../helpers/validation');

const {
    errorMessage,
    successMessage,
    status,
} = require('../helpers/status');

const { 
    createACParticipationQuery, 
    getACParticipationsQuery,
    getParticipationByACQuery,
    deleteACParticipationQuery,
} = require('../repository/association_clubRelationship');

/**
 * Create AC Participation
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const createACParticipation = async (req, res) => {
    const {
        userid,
        idac,
        startdate,
        enddate
    } = req.body;

    if (empty(userid) || empty(idac)  || empty(startdate) || empty(enddate) ) {
        errorMessage.error = 'User id, id of association/club, startdate, enddate field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    createACParticipationQuery({...req.body})
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
 * Get AC Participations
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getACParticipations = async (req, res) => {
    
    getACParticipationsQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No PARTICIPATIONS in associations/clubs';
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

const getParticipationByAC = async (req, res) => {
    
    const idac = req.params.idac;

    if (empty(idac)) {
        errorMessage.error = 'ID of workshop detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    getParticipationByACQuery(idac)
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No participation of that association/club';
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

const deleteParticipationByUserAC = async (req, res) => {
    
    const idac = req.params.idac;
    const userid = req.params.userid;

    if (empty(idac) || empty(userid)) {
        errorMessage.error = 'ID of association/club or userid detail is missing or user ID';
        return res.status(status.bad).send(errorMessage);
    }
    
    deleteACParticipationQuery({idac, userid})
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
    createACParticipation,
    getACParticipations,
    getParticipationByAC,
    deleteParticipationByUserAC
};