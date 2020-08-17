const db = require('../db/config');

const CREATE_WORKSHOP=`INSERT INTO
workshop(name, classroom, description, startdate, enddate)
VALUES ($1, $2, $3, $4, $5)
returning *`;

const GET_WORKSHOP=`SELECT * FROM workshop`;

const UPDATE_WORKSHOP = 'UPDATE workshop SET name=$1, classroom=$2, description=$3, startdate=$4, enddate=$5 WHERE id=$6 returning *';

const GET_WORKSHOP_BY_NAME=`SELECT * FROM workshop WHERE name ILIKE $1`;

async function createWorkshopQuery({
    name,
    classroom,
    description,
    startdate,
    enddate
}) {
    const values = [
        name,
        classroom,
        description,
        startdate,
        enddate
    ];

    const data = await db.query(CREATE_WORKSHOP, values);
    return data;
};

async function getWorkshopByNameQuery({ name}) {
    
    const values = [
        name
    ];

    const data = await db.query(GET_WORKSHOP_BY_NAME, values);
    return data;
};

async function getWorkshopsQuery() {
    
    const data = await db.query(GET_WORKSHOP);
    return data;
};

async function updateWorkshopQuery({
    name,
    classroom,
    description,
    startdate,
    enddate,
    id
}) {
    
    const values = [
        name,
        classroom,
        description,
        startdate,
        enddate,
        id, 
    ];

    const data = await db.query(UPDATE_WORKSHOP, values);
    return data;
};

module.exports = {
    createWorkshopQuery,
    getWorkshopsQuery,
    updateWorkshopQuery,
    getWorkshopByNameQuery
};