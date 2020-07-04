const moment = require('moment');
const generator = require('generate-password');
const nodemailer = require('nodemailer');

const dbQuery = require('../db/dev/dbQuery');

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

    const searchRegisterQuery = 'SELECT * FROM registers WHERE email=$1 ORDER BY id DESC';

    const updateRegisterQuery = 'UPDATE registers SET status=$1 WHERE email=$2 returning *';

    const createUserQuery = `INSERT INTO
    users(email, first_name, last_name, password, carne, sex, type, career, faculty, created_on, modified_on)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    returning *`;
    
    let values = [
        email
    ];
    console.log(values);

    try {
        await dbQuery.query('BEGIN');
        const { rows } = await dbQuery.query(searchRegisterQuery, values);
        const user_info = rows;
        console.log(Object.values(user_info[0]));
        const user_values = Object.values(user_info[0]);
        values = [
            'authorized',
            email,
        ];
        const { update } = await dbQuery.query(updateRegisterQuery, values);
        values = [
            user_values[1],
            user_values[2],
            user_values[3],
            hashedPassword,
            user_values[4],
            user_values[5],
            user_values[6],
            user_values[7],
            user_values[8],
            created_on,
            modified_on,
        ];
        const { create } = await dbQuery.query(createUserQuery, values);
        const complete = await dbQuery.query('COMMIT');
        const dbResponse = rows[0];
        console.log(dbResponse);
        successMessage.data = dbResponse;
        
        /**
         * Send EMAIL
        */
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'proyectoplataformas2019@gmail.com',
                pass: 'Apps2019'
            }
        });
        
        const output = `
        <h1>Welcome</h1>
        <p> 
            Thank you for signing up for Vida Estudiantil. 
            Your account has been confirmed. 
            You can login to VE and enjoy it freely.
        </p>
        <h3>Your Account Details </h3>
        <ul>
            <li>Login email: ${dbResponse.email} </li>
            <li>Password: ${password} </li>
        </ul>
        <p>    
            If you have any questions or concerns, please contact: ebperez@uvg.edu.gt
        </p>
        <p>Thanks,</p>
        <p>DesignEvo Team </p>
        `;
        
        const mailOptions = {
            from: 'proyectoplataformas2019@gmail.com',
            to: dbResponse.email,
            subject: 'Welcome to VE platform!',
            html: output //html body
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(status.created).send(successMessage);
            }
        });

    } catch (error) {
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'User with that EMAIL already exist';
            return res.status(status.conflict).send(errorMessage);
        }
        finish = await dbQuery.query('ROLLBACK');
        errorMessage.error = 'Operation was not successful';
        console.log(error)
        return res.status(status.error).send(errorMessage);
    }
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

    const loginUserQuery = 'SELECT * FROM users WHERE email = $1';
    try {
        const { rows } = await dbQuery.query(loginUserQuery, [email]);
        const dbResponse = rows[0];

        if (!dbResponse) {
            errorMessage.error = 'User with this email does not exist';
            return res.status(status.notfound).send(errorMessage);
        }

        if (!comparePassword(dbResponse.password, password)) {
            errorMessage.error = 'The password you provided is incorrect';
            return res.status(status.bad).send(errorMessage);
        }

        const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.is_admin, dbResponse.first_name, dbResponse.last_name);
        delete dbResponse.password;
        successMessage.data = dbResponse;
        successMessage.data.token = token;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        console.log(error);
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
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
        errorMessage.error = 'Email, password, first name, last name, carne, sex, type, career and faculty field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    if (!isValidEmail(email)) {
        errorMessage.error = 'Please enter a valid Email';
        return res.status(status.bad).send(errorMessage);
    }

    const createRegisterQuery = `INSERT INTO
    registers(email, first_name, last_name, carne, sex, type, career, faculty, status, created_on, authorized_on)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    returning *`;

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

    try {
        const { rows } = await dbQuery.query(createRegisterQuery, values);
        const dbResponse = rows[0];
        successMessage.data = dbResponse;
        return res.status(status.created).send(successMessage);
    } catch (error) {
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'User with that EMAIL already exist';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        console.log(error);
        return res.status(status.error).send(errorMessage);
    }
};

module.exports = {
    createUser,
    loginUser,
    createRegister
};