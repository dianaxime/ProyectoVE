require('dotenv').config();
const generator = require('generate-password');
const nodemailer = require('nodemailer');

const {
    comparePassword,
    isValidEmail,
    validatePassword,
    isEmpty,
    empty,
    generateUserToken,
} = require('../helpers/validation');

const {
    errorMessage,
    successMessage,
    status,
} = require('../helpers/status');

const {
    createUserQuery,
    loginUserQuery,
    createRegisterQuery,
    forgotPasswordQuery,
    changePasswordQuery,
    updateUserQuery,
    getPendingQuery,
    getStudentsQuery,
    getStudentByEmailQuery,
    getStudentsTeamsByIdQuery,
    getStudentsWSByIdQuery,
    getStudentsAByIdQuery,
    getStudentsCByIdQuery
} = require('../repository/users');

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

    const password = generator.generate({
        length: 10,
        numbers: true
    });

    createUserQuery({...req.body, password})
    .then(data => {
        const output = `
            <h1>Bienvenido</h1>
            <p> 
                Gracias por registrarte a la plataforma de Vida Estudiantil.
                Tu cuenta ha sido confirmada, a partir de ahora puedes 
                ingresar a la plataforma.
            </p>
            <h3>Tus datos de acceso: </h3>
            <ul>
                <li>Correo electrónico: ${data.email} </li>
                <li>Contraseña: ${password} </li>
            </ul>
            <p>    
                Si tiene alguna duda o pregunta, favor contactar a: ebperez@uvg.edu.gt
            </p>
            <p>Gracias,</p>
            <p>El equipo de VE</p>
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
            subject: 'Bienvenido(a) a la plataforma de VE!',
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
            errorMessage.error = 'Ya existe un usuario registrado con ese correo';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Ha ocurrido un error inesperado. Por favor intentalo nuevamente';
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
        errorMessage.error = 'Por favor ingresa un correo y contraseña válidos';
        return res.status(status.bad).send(errorMessage);
    }

    loginUserQuery({email})
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

    if (isEmpty(email) || isEmpty(first_name) || isEmpty(last_name) || isEmpty(carne) || isEmpty(sex) || isEmpty(type) || isEmpty(career) || isEmpty(faculty)) {
        errorMessage.error = 'Email, first name, last name, carne, sex, type, career and faculty field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    if (!isValidEmail(email)) {
        errorMessage.error = 'Por favor ingresa un correo válido';
        return res.status(status.bad).send(errorMessage);
    }

    createRegisterQuery({...req.body})
    .then(data => {
        console.log('DATA:', data); // print data;
        successMessage.data = data;
        return res.status(status.created).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'Ya existe un usuario registrado con ese correo';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

/**
 * Get students
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getStudents = async (req, res) => {
    
    getStudentsQuery()
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
 * Get student by email
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getStudentByEmail = async (req, res)=>{

    const email = req.params.email;

    if (isEmpty(email)) {
        errorMessage.error = 'Email detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    getStudentByEmailQuery({ email })
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No student found';
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
 * Get students by team id
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getStudentsTeamsById = async (req, res)=>{

    const {
        id,
    } = req.body;

    if (isEmpty(id)) {
        errorMessage.error = 'User id detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    getStudentsTeamsByIdQuery({...req.body})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No students teams found';
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

const getStudentsAbyId = async (req, res) => {
    
    const id = req.params.id;

    if (empty(id)) {
        errorMessage.error = 'ID of user detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    getStudentsAByIdQuery(id)
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No participation of student in associations';
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

const getStudentsCbyId = async (req, res) => {
    
    const id = req.params.id;

    if (empty(id)) {
        errorMessage.error = 'ID of user detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    getStudentsCByIdQuery(id)
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No participation of student in clubs';
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
 * Get students by workshop id
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getStudentsWSById=async (req, res)=>{

    const {
        id,
    } = req.body;

    if (isEmpty(id)) {
        errorMessage.error = 'User id detail is missing';
        return res.status(status.bad).send(errorMessage);
    }

    getStudentsWSByIdQuery({ id })
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No students workshops found';
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

    const password = generator.generate({
        length: 10,
        numbers: true
    });

    forgotPasswordQuery({ email, password})
    .then(data => {
        console.log('DATA:', data); // print data;
        data = data[0];
        delete data.password;
        successMessage.data = data;
        
        /**
         * Send EMAIL
        */

       const output = `
            <h1>Recuperar Contraseña</h1>
            <p> 
                Usted ha solicitado una recuperación de 
                contraseña para su cuenta en la plataforma
                de Vida Estudiantil. Hemos cambiado su contraseña
                de acceso.
            </p>
            <h3>Tus datos de acceso son: </h3>
            <ul>
                <li>Correo electrónico: ${data.email} </li>
                <li>Contraseña: ${password} </li>
            </ul>
            <p>
                Puede cambiar su contraseña desde la plataforma en
                cualquier momento, desde la opción de "Cambiar mi contraseña".
            </p>
            <p>Atentamente,</p>
            <p>El equipo de VE</p>
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
            subject: 'Recuperar Contraseña',
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

    changePasswordQuery({...req.body, email})
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

    updateUserQuery({...req.body, email})
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

    loginUserQuery({ email })
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
    
    getPendingQuery()
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
    getStudentByEmail,
    getStudentsTeamsById,
    getStudentsWSById,
    getStudentsCbyId,
    getStudentsAbyId
};