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

const CREATE_SCHOLAR = `INSERT INTO
scholars(userid, hours, videoEditor, photoEditor, spokespersons, organizer)
VALUES ($1, $2, $3, $4, $5, $6)
returning *`;

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

module.exports = {
    createScholars,
};