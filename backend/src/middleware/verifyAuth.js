const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {
    errorMessage,
    status,
} = require('../helpers/status');

dotenv.config();

/**
 * Verify Token
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object|void} response object 
*/

module.exports = async function (req, res, next) {
    const { token } = req.headers;
    if (!token) {
        errorMessage.error = 'Token not provided';
        return res.status(status.bad).send(errorMessage);
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = {
            email: decoded.email,
            userid: decoded.user_id,
            first_name: decoded.first_name,
            last_name: decoded.last_name,
        };
        next();
    } catch (error) {
        errorMessage.error = 'Authentication Failed';
        return res.status(status.unauthorized).send(errorMessage);
    }
};