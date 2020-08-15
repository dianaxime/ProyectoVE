const pool = require('../db/dev/pool');
const {
  hashPassword,
} = require('../helpers/validation');

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * SEED Roles
*/

module.exports = function() {
  const seedRolesQuery = `INSERT INTO
    roles VALUES 
    (default,'Administrador'),
    (default,'Asistentes'),
    (default,'Auxiliar oficina'),
    (default,'Miembro asociacion'),
    (default,'Miembro taller'),
    (default,'Miembro equipo'),
    (default,'Miembro club'),
    (default,'Auxiliar eventos');`;

  pool.query(seedRolesQuery)
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