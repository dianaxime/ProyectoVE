const pg = require('pg');

const dotenv = require('dotenv');

dotenv.config();

const databaseConfig = { connectionString: process.env.DATABASE_URL };
const pool = new pg.Pool(databaseConfig);

module.exports = pool;