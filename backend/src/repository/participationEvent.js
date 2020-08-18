const db = require('../db/config');

const CREATE_PARTICIPATION_EVENT=`INSERT INTO
event_participation(userid, idEvent, hours)
VALUES ($1, $2, $3, $4)
returning *`;

const GET_PARTICIPATIONS_EVENT=`SELECT * FROM event_participation`;

const GET_PARTICIPATION_BY_E_ID=`SELECT users.id, users.first_name, users.last_name, users.email  FROM event_participation  JOIN users on users.id=event_participation.userid where idEvent=$1 `;

async function createParticipationEventQuery ({
    userid,
    idEvent,
    hours
}) {
    const values = [
        userid,
        idEvent,
        hours
    ];

    const data = await db.query(CREATE_PARTICIPATION_EVENT, values);
    return data; 
};

async function getParticipationsEventQuery() {
    
    const data = await db.query(GET_PARTICIPATIONS_EVENT);
    return data;
};

async function getParticipationByEQuery(idEvent) {
    const values = [
        idEvent
    ];

    const data = await db.query(GET_PARTICIPATION_BY_E_ID, values);
    return data;
};

module.exports = {
    createParticipationEventQuery,
    getParticipationsEventQuery,
    getParticipationByEQuery
};