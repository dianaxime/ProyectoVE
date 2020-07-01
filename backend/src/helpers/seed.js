const pool = require('../db/dev/pool');
const {
  hashPassword,
} = require('../helpers/validation');

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * SEED Admin User
*/

module.exports = function() {
  const seedUserQuery = `INSERT INTO
    users VALUES 
    ( default, 'prueba0@gmail.com','Prueba', 'Prueba', '${hashPassword('123456789')}', '12345', 'F', 'prueba', 'prueba', 'prueba',  NOW(), NOW())`;

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

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


require('make-runnable');