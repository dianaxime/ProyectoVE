require('dotenv').config();

const db = require('../db/config');

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

const CREATE_SCHOLAR = `INSERT INTO
scholars(userid, hours, videoEditor, photoEditor, spokespersons, organizer)
VALUES ($1, $2, $3, $4, $5, $6)
returning *`;

const GET_SCHOLARS=`SELECT * FROM scholars`;

/**
 * Create Scholars
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const createScholars = async (req, res) => {
    const {
        hours,
        videoEditor,
        photoEditor,
        spokespersons,
        organizer,
    } = req.body;

    const { userid } = req.user;

    if (isEmpty(hours) || isEmpty(videoEditor) || isEmpty(photoEditor) || isEmpty(spokespersons) || isEmpty(organizer) ) {
        errorMessage.error = 'Hours, video editor, photo editor, spokespersons and organizer field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    if (!isHoursValid(hours)){
        errorMessage.error="Hours can not be negative or higher than 150 "
        return res.status(status.bad).send(errorMessage);
    }

    if (!isPercentageValid(videoEditor)||!isPercentageValid(spokespersons)||!isPercentageValid(photoEditor)||!isPercentageValid(organizer)){
        errorMessage.error="Percentages can not be negative or higher than 100"
        return res.status(status.bad).send(errorMessage);
    }

    const values = [
        userid,
        hours,
        videoEditor,
        photoEditor,
        spokespersons,
        organizer
    ];

    db.query(CREATE_SCHOLAR, values)
    .then(data => {
        console.log('DATA:', data); // print data;
        successMessage.data = data;
        return res.status(status.created).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'User has been already registered with a scholarship';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

/**
 * Get Scholars
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getScholars = async (req, res) => {
    
    db.query(GET_SCHOLARS)
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No users with scholarships';
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
    createScholars,
    getScholars
};