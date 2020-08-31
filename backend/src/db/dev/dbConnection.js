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
        userID INT NOT NULL UNIQUE,
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
        sport VARCHAR(100) NOT NULL,
        startdate DATE NOT NULL,
        enddate DATE NOT NULL
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
        FOREIGN KEY (idT) REFERENCES team(id),
        UNIQUE(userID, idT)
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
        FOREIGN KEY (idW) REFERENCES workshop(id),
        UNIQUE(userID, idW)
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
 * Event table
*/

const createEventTable = () => {
    const eventCreateQuery = `CREATE TABLE IF NOT EXISTS event
    (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        classroom VARCHAR(50) NOT NULL,
        description VARCHAR(300) NOT NULL,
        date DATE NOT NULL
    )`;

    pool.query(eventCreateQuery )
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
 * Participation event table
*/

const createEventParticipationTable = () => {
    const participationEventCreateQuery = `CREATE TABLE IF NOT EXISTS event_participation
    (
        id SERIAL PRIMARY KEY,
        userID INT NOT NULL,
        idE INT NOT NULL,
        hours FLOAT NOT NULL,
        FOREIGN KEY (userID) REFERENCES users(id),
        FOREIGN KEY (idE) REFERENCES event(id),
        UNIQUE(userID, idE)
    )`;

    pool.query(participationEventCreateQuery)
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
 * Roles tables
*/

const createRolesTable = () => {
    const rolesCreateQuery = `CREATE TABLE IF NOT EXISTS roles
    (
        id SERIAL PRIMARY KEY,
        role VARCHAR(100) NOT NULL
    )`;

    pool.query(rolesCreateQuery)
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
 * Roles relationship tables
*/

const createRolesRelationshipTable = () => {
    const rolesrelationshipCreateQuery = `CREATE TABLE IF NOT EXISTS roles_relationship
    (
        id SERIAL PRIMARY KEY,
        userID INT NOT NULL,
        idR INT NOT NULL,
        FOREIGN KEY (userID) REFERENCES users(id),
        FOREIGN KEY (idR) REFERENCES roles(id),
        UNIQUE(userID, idR)
    )`;

    pool.query(rolesrelationshipCreateQuery)
    .then((res) => {
        console.log(res);
        pool.end();
    })
    .catch((err) => {
        console.log(err);
        pool.end();
    });
};

/*Association and club table */
const createAssociationClubTable = () => {
    const associationClubCreateQuery = `CREATE TABLE IF NOT EXISTS association_club
    (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL,
        description VARCHAR(300) NOT NULL,
        startdate DATE NOT NULL,
        enddate DATE NOT NULL
    )`;

    pool.query(associationClubCreateQuery)
    .then((res) => {
        console.log(res);
        pool.end();
    })
    .catch((err) => {
        console.log(err);
        pool.end();
    });
};

/*relationship of association/club */
const createAssociationClubRelationshipTable = () => {
    const acsrelationshipCreateQuery = `CREATE TABLE IF NOT EXISTS association_club_relationship
    (
        id SERIAL PRIMARY KEY,
        userID INT NOT NULL,
        idAC INT NOT NULL,
        startdate DATE NOT NULL,
        enddate DATE NOT NULL,
        FOREIGN KEY (userID) REFERENCES users(id),
        FOREIGN KEY (idAC) REFERENCES association_club(id),
        UNIQUE(userID, idAC)
    )`;

    pool.query(acsrelationshipCreateQuery)
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
 * Drop Event Table
*/

const dropEventTable = () => {
    const eventDropQuery = `DROP TABLE IF EXISTS event`;
    pool.query(eventDropQuery)
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
 * Drop participacion Event Table
*/

const dropParticipationEventHBTable = () => {
    const participationeventDropQuery = `DROP TABLE IF EXISTS event_participation`;
    pool.query(participationeventDropQuery)
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
 * Drop Roles Table
*/

const dropRolesTable = () => {
    const rolesDropQuery = `DROP TABLE IF EXISTS roles`;
    pool.query(rolesDropQuery)
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
 * Drop participacion Event Table
*/

const dropRolesRelationshipTable = () => {
    const rolesRelationshipDropQuery = `DROP TABLE IF EXISTS roles_relationship`;
    pool.query(rolesRelationshipDropQuery)
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
 * Drop AC Table
*/

const dropACTable = () => {
    const usersDropQuery = `DROP TABLE IF EXISTS association_club`;
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
 * Drop AC relationship Table
*/

const dropACrelationshipTable = () => {
    const usersDropQuery = `DROP TABLE IF EXISTS association_club_relationship`;
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
 * Create All Tables
*/

const createAllTables = () => {
    createUserTable();
    createRegisterTable();
    createWorkshoTable();
    createScholarsTable();
    createTeamTable();
    createParticipationTable();
    createTournamentTable();
    createEventTable();
    createEventParticipationTable();
    createRolesTable();
    createRolesRelationshipTable();
    createAssociationClubTable();
    createAssociationClubRelationshipTable();

};

/**
 * Drop All Tables
*/

const dropAllTables = () => {
    dropUserTable();
    dropRegisterTable();
    dropWorkshopTable();
    dropScholarsTable();
    dropParticipationTable();
    dropTournamentTable();
    dropEventTable();
    dropParticipationEventHBTable();
    dropRolesTable();
    dropRolesRelationshipTable();
    dropTeamTable();
    dropACTable();
    dropACrelationshipTable();
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