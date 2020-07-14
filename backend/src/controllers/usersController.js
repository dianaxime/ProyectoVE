require('dotenv').config();
const moment = require('moment');
const generator = require('generate-password');
const nodemailer = require('nodemailer');

const db = require('../db/config');

const {
    hashPassword,
    comparePassword,
    isValidEmail,
    validatePassword,
    isEmpty,
    generateUserToken,
} = require('../helpers/validation');

const {
    errorMessage,
    successMessage,
    status,
} = require('../helpers/status');

const SEARCH_REGISTER = 'SELECT * FROM registers WHERE email=$1 ORDER BY id DESC';
const UPDATE_REGISTER = 'UPDATE registers SET status=$1 WHERE email=$2 returning *';
const CREATE_USER = `INSERT INTO
    users(email, first_name, last_name, password, carne, sex, type, career, faculty, created_on, modified_on)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
returning *`;
const LOGIN_USER = 'SELECT * FROM users WHERE email = $1';
const CREATE_REGISTER = `INSERT INTO
    registers(email, first_name, last_name, carne, sex, type, career, faculty, status, created_on, authorized_on)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
returning *`;
const UPDATE_PASSWORD = 'UPDATE users SET password=$1, modified_on=$2 WHERE email=$3 returning *';
const UPDATE_USER = `UPDATE users SET first_name=$1, last_name=$2, carne=$3, sex=$4, type=$5, career=$6,
faculty=$7, modified_on=$8 WHERE email=$9 returning *`;
const GET_PENDING = `SELECT * FROM registers WHERE status=$1`;

const GET_STUDENTS= `SELECT * FROM users WHERE type=$1`;



/**
 * Create A User
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const createUser = async (req, res) => {
    
    const {
        email,
    } = req.body;

    const created_on = moment(new Date());
    const modified_on = moment(new Date());

    const password = generator.generate({
        length: 10,
        numbers: true
    });

    const hashedPassword = hashPassword(password);
    
    db.tx(async t => {
        let data = await t.one(SEARCH_REGISTER, [email]);
        let values = [
            'authorized',
            email,
        ];
        const update  = await t.one(UPDATE_REGISTER, values);
        values = [
            data.email,
            data.first_name,
            data.last_name,
            hashedPassword,
            data.carne,
            data.sex,
            data.type,
            data.career,
            data.faculty,
            created_on,
            modified_on,
        ];
        console.log(values);
        const create = await t.one(CREATE_USER, values);
        return update;
    })
    .then(data => {
        const output = `
            <h1>Welcome</h1>
            <p> 
                Thank you for signing up for Vida Estudiantil. 
                Your account has been confirmed. 
                You can login to VE and enjoy it freely.
            </p>
            <h3>Your Account Details </h3>
            <ul>
                <li>Login email: ${data.email} </li>
                <li>Password: ${password} </li>
            </ul>
            <p>    
                If you have any questions or concerns, please contact: ebperez@uvg.edu.gt
            </p>
            <p>Thanks,</p>
            <p>VE Team </p>
        `;
        // print new user id + new event id;
        console.log('DATA:', data);
        successMessage.data = data;
        
        /**
         * Send EMAIL
        */
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        
        const mailOptions = {
            from: process.env.EMAIL,
            to: data.email,
            subject: 'Welcome to VE platform!',
            html: output //html body
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(status.success).send(successMessage);
            }
        });
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'User with that EMAIL already exist';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

/**
 * LogIn
 * @param {object} req
 * @param {object} res 
 * @returns {object} user object 
*/

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (isEmpty(email) || isEmpty(password)) {
        errorMessage.error = 'Email or Password detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    if (!isValidEmail(email) || !validatePassword(password)) {
        errorMessage.error = 'Please enter a valid Email or Password';
        return res.status(status.bad).send(errorMessage);
    }

    db.query(LOGIN_USER, [email])
    .then(data => {
        console.log('DATA:', data); // print data;
        data = data[0];
        if (!data) {
            errorMessage.error = 'User with this email does not exist';
            return res.status(status.notfound).send(errorMessage);
        }
    
        if (!comparePassword(data.password, password)) {
            errorMessage.error = 'The password you provided is incorrect';
            return res.status(status.bad).send(errorMessage);
        }
        const token = generateUserToken(data.email, data.id, data.is_admin, data.first_name, data.last_name);
        delete data.password;
        successMessage.data = data;
        successMessage.data.token = token;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

/**
 * Create A Register
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const createRegister = async (req, res) => {
    const {
        email,
        first_name,
        last_name,
        carne,
        sex,
        type,
        career,
        faculty,
    } = req.body;

    const created_on = moment(new Date());
    const authorized_on = moment(new Date());
    const state = 'pending';

    if (isEmpty(email) || isEmpty(first_name) || isEmpty(last_name) || isEmpty(carne) || isEmpty(sex) || isEmpty(type) || isEmpty(career) || isEmpty(faculty)) {
        errorMessage.error = 'Email, first name, last name, carne, sex, type, career and faculty field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    if (!isValidEmail(email)) {
        errorMessage.error = 'Please enter a valid Email';
        return res.status(status.bad).send(errorMessage);
    }

    const values = [
        email,
        first_name,
        last_name,
        carne,
        sex,
        type,
        career,
        faculty,
        state,
        created_on,
        authorized_on,
    ];

    db.query(CREATE_REGISTER, values)
    .then(data => {
        console.log('DATA:', data); // print data;
        successMessage.data = data;
        return res.status(status.created).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'User with that EMAIL already exist';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

const getStudents=async (req, res)=>{
    db.query(GET_STUDENTS, ['student'])
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No students found';
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
 * Forgot Password
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const forgotPassword = async (req, res) => {
    
    const {
        email,
    } = req.body;

    if (isEmpty(email)) {
        errorMessage.error = 'Email detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    if (!isValidEmail(email)) {
        errorMessage.error = 'Please enter a valid Email';
        return res.status(status.bad).send(errorMessage);
    }

    const modified_on = moment(new Date());

    const password = generator.generate({
        length: 10,
        numbers: true
    });

    const hashedPassword = hashPassword(password);
    
    const values = [
        hashedPassword,
        modified_on,
        email
    ];

    db.query(UPDATE_PASSWORD, values)
    .then(data => {
        console.log('DATA:', data); // print data;
        data = data[0];
        delete data.password;
        successMessage.data = data;
        
        /**
         * Send EMAIL
        */

       const output = `
            <h1>Recover Password</h1>
            <p> 
                You requested the password recovery for
                your account on VE. We have reset your
                access password.
            </p>
            <h3>Your Account Details </h3>
            <ul>
                <li>Login email: ${data.email} </li>
                <li>New Password: ${password} </li>
            </ul>
            <p>    
                You can change your password in the change password option.
            </p>
            <p>Sincerely,</p>
            <p>VE Team </p>
       `;
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        
        const mailOptions = {
            from: process.env.EMAIL,
            to: data.email,
            subject: 'Recover Password',
            html: output //html body
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(status.success).send(successMessage);
            }
        });
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

/**
 * Change Password
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const changePassword = async (req, res) => {
    
    const {
        oldPassword,
        newPassword,
    } = req.body;

    const { email } = req.user;

    if (isEmpty(email) || isEmpty(oldPassword) || isEmpty(newPassword)) {
        errorMessage.error = 'Email or Password detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    if (!isValidEmail(email) || !validatePassword(newPassword) || !validatePassword(oldPassword)) {
        errorMessage.error = 'Please enter a valid Email or Password';
        return res.status(status.bad).send(errorMessage);
    }

    const modified_on = moment(new Date());

    const hashedPassword = hashPassword(newPassword);

    const values = [
        hashedPassword,
        modified_on,
        email
    ];

    db.tx(async t => {
        let data = await t.one(LOGIN_USER, [email]);
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'User with this email does not exist';
            return res.status(status.notfound).send(errorMessage);
        }
    
        if (!comparePassword(data.password, oldPassword)) {
            errorMessage.error = 'The password you provided is incorrect';
            return res.status(status.bad).send(errorMessage);
        }
        const user = await t.one(UPDATE_PASSWORD, values);
        return user;
    })
    .then(data => {
        // print new user id + new event id;
        console.log('DATA:', data);
        //data = data[0];
        delete data.password;
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
 * Update User
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const updateUser = async (req, res) => {
    
    const {
        first_name,
        last_name,
        carne,
        sex,
        type,
        career,
        faculty
    } = req.body;

    const { email } = req.user;

    if (isEmpty(email) || isEmpty(first_name) || isEmpty(last_name) || isEmpty(carne) || isEmpty(sex) || isEmpty(type) || isEmpty(career) || isEmpty(faculty)) {
        errorMessage.error = 'Email, first name, last name, carne, sex, type, career or faculty detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    const modified_on = moment(new Date());

    const values = [
        first_name,
        last_name,
        carne,
        sex,
        type,
        career,
        faculty,
        modified_on,
        email
    ];

    db.query(UPDATE_USER, values)
    .then(data => {
        console.log('DATA:', data);
        data = data[0];
        delete data.password;
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
 * Refresh Token
 * @param {object} req
 * @param {object} res 
 * @returns {object} user object 
*/

const refreshToken = async (req, res) => {
    const { email } = req.user;

    if (isEmpty(email)) {
        errorMessage.error = 'Email detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    db.query(LOGIN_USER, [email])
    .then(data => {
        console.log('DATA:', data); // print data;
        data = data[0];
        if (!data) {
            errorMessage.error = 'User with this email does not exist';
            return res.status(status.notfound).send(errorMessage);
        }
        const token = generateUserToken(data.email, data.id, data.first_name, data.last_name);
        delete data.password;
        successMessage.data = data;
        successMessage.data.token = token;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

/**
 * Get Pending Users
 * @param {object} req
 * @param {object} res 
 * @returns {object} user object 
*/

const getPending = async (req, res) => {
    
    db.query(GET_PENDING, ['pending'])
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No users pending approval';
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
    createUser,
    loginUser,
    createRegister,
    forgotPassword,
    changePassword,
    updateUser,
    refreshToken,
    getPending,
    getStudents,
};