require('dotenv').config();

const {
    isEmpty,
    isHoursValid,
    isPercentageValid,
    empty,
} = require('../helpers/validation');

const {
    errorMessage,
    successMessage,
    status,
} = require('../helpers/status');

const { createScholarsQuery, getScholarsQuery, getScholarsOrganizerQuery,
    getScholarsGraphicDesignQuery,
    getScholarsSpokesPersonQuery,
    getScholarsPhotoVideoEditorQuery,
    getScholarsOtherQuery,
    getScholarsLeaderQuery } = require('../repository/scholars');

/**
 * Create Scholars
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const createScholars = async (req, res) => {
    const {
        hours, 
        video_photoeditor, 
        graphicdesign, 
        spokespersons, 
        organizer, 
        leader, 
        other
    } = req.body;

    const { userid } = req.user;

    if (empty(hours) || empty(video_photoeditor) || empty(graphicdesign) || empty(spokespersons) || empty(organizer) || empty(leader) || empty(other) ) {
        errorMessage.error = 'Hours, video editor, photo editor, spokespersons and organizer field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    if (!isHoursValid(hours)){
        errorMessage.error="La cantidad de horas de beca debe ser entre 0 - 150"
        return res.status(status.bad).send(errorMessage);
    }

    if (!isPercentageValid(video_photoeditor)||!isPercentageValid(spokespersons)||!isPercentageValid(graphicdesign)||!isPercentageValid(organizer) || !isPercentageValid(leader)){
        errorMessage.error="Por favor ingresar valores entre 1 - 10"
        return res.status(status.bad).send(errorMessage);
    }
    
    createScholarsQuery({ ...req.body, userid})
    .then(data => {
        console.log('DATA Controllers:', data); // print data;
        successMessage.data = data;
        return res.status(status.created).send(successMessage);

    })
    .catch (error => {
        console.log('ERROR:', error); // print the error;
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'Ya ha registrado su formulario previamente';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Un error inesperado ha ocurrido. Por favor inténtalo nuevamente';
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
    
    getScholarsQuery()
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

/**
 * Get Scholars photo editor
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getScholarsPhotoVideoEditor = async (req, res) => {
    
    getScholarsPhotoVideoEditorQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No users with scholarships with photo or video editor experience';
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
 * Get Scholars organizers
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getScholarsOrganizer = async (req, res) => {
    
    getScholarsOrganizerQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No users with scholarships with organization experience';
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
 * Get Scholars SpokesPerson
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getScholarsSpokesPerson = async (req, res) => {
    
    getScholarsSpokesPersonQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No users with scholarships with public speaking experience';
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
 * Get Scholars VideoEditor
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getScholarsGraphicDesign = async (req, res) => {
    
    getScholarsGraphicDesignQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No users with scholarships with graphic design experience';
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

const getScholarsLeader= async (req, res) => {
    
    getScholarsLeaderQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No users with scholarships with leadership experience';
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

const getScholarsOther = async (req, res) => {
    
    getScholarsOtherQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No users with scholarships with other experience';
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
    getScholars,
    getScholarsOrganizer,
    getScholarsOther,
    getScholarsSpokesPerson,
    getScholarsLeader,
    getScholarsGraphicDesign,
    getScholarsPhotoVideoEditor
};