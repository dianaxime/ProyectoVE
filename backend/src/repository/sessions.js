const db = require('../db/config');

const CREATE_SESSION=`INSERT INTO
sessions(idac, date)
VALUES ($1, $2)
returning *`;

const GET_SESSIONS=`SELECT * FROM sessions`;

const GET_SESSION_BY_DATE=`SELECT * FROM sessions WHERE date= $1 AND idac=$2 LIMIT 1`;

const GET_SESSION_BY_AC=`SELECT sessions.date, association_club.name FROM sessions JOIN association_club ON sessions.idac=association_club.id
WHERE association_club.id=$1`;

const GET_SESSIONS_BY_AC=`SELECT EXTRACT(year from date) as year, EXTRACT(month from date) as month, EXTRACT(day from date) as day from sessions where sessions.idac=$1`;

const UPDATE_SESSION = 'UPDATE sessions SET date=$1 WHERE id=$2 returning *';

async function createSessionQuery({
    idac,
    date
}) {
    const values = [
        idac,
        date
    ];

    const data = await db.query(CREATE_SESSION, values);
    return data;
};

async function getSessionByDateQuery({date, idac}) {
    
    const values = [
        date, 
        idac
    ];

    const data = await db.query(GET_SESSION_BY_DATE, values);
    return data;
};

async function getSessionByACQuery({date, idac}) {
    
    const values = [ 
        idac
    ];

    const data = await db.query(GET_SESSION_BY_AC, values);
    return data;
};

async function getSessionsByACQuery({date, idac}) {
    
    const values = [ 
        idac
    ];

    const data = await db.query(GET_SESSIONS_BY_AC, values);
    return data;
};

async function getSessionsQuery() {
    
    const data = await db.query(GET_SESSIONS);
    return data;
};

async function updateSessionQuery({
    id, date
}) {
    
    const values = [
        date,
        id, 
    ];

    const data = await db.query(UPDATE_SESSION, values);
    return data;
};

module.exports = {
    createSessionQuery,
    getSessionsQuery,
    getSessionByDateQuery,
    getSessionByACQuery,
    getSessionsByACQuery,
    updateSessionQuery,
};