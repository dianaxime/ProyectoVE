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
    createAssistanceQuery,
    getAssistancesQuery,
    getAssistanceBySessionQuery,
    deleteAssistanceQuery,
} = require('../repository/assistance');

/**
 * Create Assistance
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const createAssistance = async (req, res) => {
    const {
        userid,
        ids,
        late
    } = req.body;

    if (empty(userid) || empty(ids)  || empty(late) ) {
        errorMessage.error = 'User id, id of session, if late field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    createAssistanceQuery({...req.body})
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
 * Get Assistances
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getAssistances = async (req, res) => {
    
    getAssistancesQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No assistances';
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
 * Get Assistance by session id
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getAssistanceBySession = async (req, res) => {
    
    const ids = req.params.ids;
    const idac = req.params.idac;

    if (empty(ids) || empty(idac)) {
        errorMessage.error = 'ID of session detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    getAssistanceBySessionQuery({ids, idac})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No assistance of that session';
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

const deleteAssistanceByUserS = async (req, res) => {
    
    const ids = req.params.ids;
    const userid = req.params.userid;
    const idac = req.params.idac;

    if (empty(ids) || empty(userid) || empty(idac)) {
        errorMessage.error = 'ID of session detail is missing or user ID';
        return res.status(status.bad).send(errorMessage);
    }
    
    deleteAssistanceQuery({ids, userid, idac})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No tournament of that userid in that team';
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
    createAssistance,
    getAssistances,
    getAssistanceBySession,
    deleteAssistanceByUserS
};