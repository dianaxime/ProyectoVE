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

const CREATE_WORKSHOP=`INSERT INTO
workshop(name, classroom, description, startdate, enddate)
VALUES ($1, $2, $3, $4, $5)
returning *`;

const GET_WORKSHOP=`SELECT * FROM workshop`;

const UPDATE_WORKSHOP = 'UPDATE workshop SET name=$1, classroom=$2, description=$3, startdate=$4, enddate=$5 WHERE id=$6 returning *';
const GET_WORKSHOP_BY_NAME=`SELECT * FROM workshop WHERE name ILIKE $1`;
/**
 * Create Workshop
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const createWorksop = async (req, res) => {
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

    const values = [
        name,
        classroom,
        description,
        startdate,
        enddate
    ];

    db.query(CREATE_WORKSHOP, values)
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

/*get workshop by name*/
const getWorkshopByName=async (req, res)=>{

    const {
        name,
    } = req.body;

    if (isEmpty(name)) {
        errorMessage.error = 'Name detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    
    const values = [
        name
    ];

    db.query(GET_WORKSHOP_BY_NAME, values)
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
    
    db.query(GET_WORKSHOP)
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


    const values = [
        name,
        classroom,
        description,
        startdate,
        enddate,
        id, 
    ];

    db.query(UPDATE_WORKSHOP, values)
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
    createWorksop,
    getWorkshops,
    updateWorkshop,
    getWorkshopByName
};