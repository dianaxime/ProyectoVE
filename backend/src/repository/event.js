const db = require('../db/config');

const CREATE_EVENT=`INSERT INTO
event(name, classroom, description, date)
VALUES ($1, $2, $3, $4)
returning *`;

const GET_EVENTS=`SELECT * FROM event`;

const UPDATE_EVENT = 'UPDATE event SET name=$1, classroom=$2, description=$3, date=$4 WHERE id=$5 returning *';

const GET_EVENT_BY_NAME=`SELECT * FROM event WHERE name ILIKE $1`;

async function createEventQuery({
    name,
    classroom,
    description,
    date
}) {
    const values = [
        name,
        classroom,
        description,
        date
    ];

    const data = await db.query(CREATE_EVENT, values);
    return data;
};

async function getEventByNameQuery({ name}) {
    
    const values = [
        name
    ];

    const data = await db.query(GET_EVENT_BY_NAME, values);
    return data;
};

async function getEventsQuery() {
    
    const data = await db.query(GET_EVENTS);
    return data;
};

async function updateEventQuery({
    name,
    classroom,
    description,
    date,
    id
}) {
    
    const values = [
        name,
        classroom,
        description,
        date,
        id, 
    ];

    const data = await db.query(UPDATE_EVENT, values);
    return data;
};

module.exports = {
    createEventQuery,
    getEventsQuery,
    updateEventQuery,
    getEventByNameQuery
};