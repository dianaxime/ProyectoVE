const pool = require('./pool');

pool.on('connect', () => {
    console.log('connected to the db');
});

/**
 * Create User Table
*/

const createUserTable = () => {
    const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
    (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        password VARCHAR(100) NOT NULL,
        carne VARCHAR(10),
        sex VARCHAR(10),
        type VARCHAR(100) NOT NULL,
        career VARCHAR(200) NOT NULL,
        faculty VARCHAR(200) NOT NULL,
        created_on DATE NOT NULL,
        modified_on DATE NOT NULL
    )`;

    pool.query(userCreateQuery)
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
 * Create Register Table
*/

const createRegisterTable = () => {
    const registerCreateQuery = `CREATE TABLE IF NOT EXISTS registers
    (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        carne VARCHAR(10),
        sex VARCHAR(10),
        type VARCHAR(100) NOT NULL,
        career VARCHAR(200) NOT NULL,
        faculty VARCHAR(200) NOT NULL,
        status VARCHAR(50) NOT NULL,
        created_on DATE NOT NULL,
        authorized_on DATE NOT NULL
    )`;

    pool.query(registerCreateQuery)
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
 * Create Scholars Table
*/

const createScholarsTable = () => {
    const scholarsCreateQuery = `CREATE TABLE IF NOT EXISTS scholars
    (
        id SERIAL PRIMARY KEY,
        userID INT NOT NULL,
        hours FLOAT NOT NULL,
        videoEditor INT NOT NULL,
        photoEditor INT NOT NULL,
        spokesPersons INT NOT NULL,
        organizer INT NOT NULL,
        FOREIGN KEY (userID) REFERENCES users(id)
    )`;

    pool.query(scholarsCreateQuery)
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
 * Worshop table
*/

const createWorkshoTable = () => {
    const workshopCreateQuery = `CREATE TABLE IF NOT EXISTS workshop
    (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        classroom VARCHAR(50) NOT NULL,
        description VARCHAR(300) NOT NULL,
        startdate DATE NOT NULL,
        enddate DATE NOT NULL
    )`;

    pool.query(workshopCreateQuery)
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
 * Team table
*/

const createTeamTable = () => {
    const teamCreateQuery = `CREATE TABLE IF NOT EXISTS team
    (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        sport VARCHAR(100) NOT NULL
    )`;

    pool.query(teamCreateQuery)
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
 * Tournament table
*/

const createTournamentTable = () => {
    const tournamentCreateQuery = `CREATE TABLE IF NOT EXISTS tournament
    (
        id SERIAL PRIMARY KEY,
        userID INT NOT NULL,
        idT INT NOT NULL,
        startdate DATE NOT NULL,
        enddate DATE NOT NULL,
        FOREIGN KEY (userID) REFERENCES users(id),
        FOREIGN KEY (idT) REFERENCES team(id)
    )`;

    pool.query(tournamentCreateQuery)
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
 * Participation table
*/

const createParticipationTable = () => {
    const participationCreateQuery = `CREATE TABLE IF NOT EXISTS participation
    (
        id SERIAL PRIMARY KEY,
        userID INT NOT NULL,
        idW INT NOT NULL,
        startdate DATE NOT NULL,
        enddate DATE NOT NULL,
        FOREIGN KEY (userID) REFERENCES users(id),
        FOREIGN KEY (idW) REFERENCES workshop(id)
    )`;

    pool.query(participationCreateQuery)
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
 * Drop User Table
*/

const dropUserTable = () => {
    const usersDropQuery = `DROP TABLE IF EXISTS users`;
    pool.query(usersDropQuery)
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
 * Drop Register Table
*/

const dropRegisterTable = () => {
    const registersDropQuery = `DROP TABLE IF EXISTS registers`;
    pool.query(registersDropQuery)
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
 * Drop Scholars Table
*/

const dropScholarsTable = () => {
    const scholarsDropQuery = `DROP TABLE IF EXISTS scholars`;
    pool.query(scholarsDropQuery)
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
 * Drop Workshop Table
*/

const dropWorkshopTable = () => {
    const workDropQuery = `DROP TABLE IF EXISTS workshop`;
    pool.query(workDropQuery)
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
 * Drop Team Table
*/

const dropTeamTable = () => {
    const teamDropQuery = `DROP TABLE IF EXISTS team`;
    pool.query(teamDropQuery)
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
 * Drop Participation Table
*/

const dropParticipationTable = () => {
    const participationDropQuery = `DROP TABLE IF EXISTS participation`;
    pool.query(participationDropQuery)
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
 * Drop Tournament Table
*/

const dropTournamentTable = () => {
    const tournamentDropQuery = `DROP TABLE IF EXISTS tournament`;
    pool.query(tournamentDropQuery)
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
 * Create All Tables
*/

const createAllTables = () => {
    createUserTable();
    createRegisterTable();
    createScholarsTable();
    createWorkshoTable();
    createTeamTable();
    createParticipationTable();
    createTournamentTable();
};

/**
 * Drop All Tables
*/

const dropAllTables = () => {
    dropUserTable();
    dropRegisterTable();
    dropScholarsTable();
    dropWorkshopTable();
    dropTeamTable();
    dropParticipationTable();
    dropTournamentTable();
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

module.exports = {
    createAllTables,
    dropAllTables,
};

require('make-runnable');