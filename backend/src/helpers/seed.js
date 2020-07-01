const pool = require('../db/dev/pool');

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * SEED Admin User
*/

const seed = () => {
  const seedUserQuery = `INSERT INTO
    users VALUES 
    ( default, 'dianaxime0@gmail.com', 'Prueba', 'Prueba', '123456', default, NOW())`;

  pool.query(seedUserQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Seed users
*/

module.exports = function() { 
  seed();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


require('make-runnable');