const db = require('../db/config');

const CREATE_PARTICIPATION=`INSERT INTO
participation(userid, idw, startdate, enddate)
VALUES ($1, $2, $3, $4)
returning *`;

const GET_PARTICIPATIONS=`SELECT * FROM participation`;

const GET_PARTICIPATION_BY_WS_ID=`SELECT users.id, users.first_name, users.last_name, users.email  FROM participation  JOIN users on users.id=participation.userid where idw=$1 `;

async function createParticipationQuery ({
    userid,
    idw,
    startdate,
    enddate
}) {
    const values = [
        userid,
        idw,
        startdate,
        enddate
    ];

    const data = await db.query(CREATE_PARTICIPATION, values);
    return data; 
};

async function getParticipationsQuery() {
    
    const data = await db.query(GET_PARTICIPATIONS);
    return data;
};

async function getParticipationByWsQuery(idw) {
    const values = [
        idw
    ];

    const data = await db.query(GET_PARTICIPATION_BY_WS_ID, values);
    return data;
};

module.exports = {
    createParticipationQuery,
    getParticipationsQuery,
    getParticipationByWsQuery
};