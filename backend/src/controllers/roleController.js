require('dotenv').config();

const {
    isEmpty,
    isHoursValid,
    isPercentageValid,
} = require('../helpers/validation');

const {
    errorMessage,
    successMessage,
    status,
} = require('../helpers/status');

const { getRoleQuery} = require('../repository/roles');

/**
 * Get role
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getRole = async (req, res) => {

    const {
        role,
    } = req.body;

    if (isEmpty(role)) {
        errorMessage.error = 'Role detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    getRoleQuery({...req.body})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No roles';
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
    getRole
};