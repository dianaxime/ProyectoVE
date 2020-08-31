const db = require('../db/config');

const CREATE_ASSOCIATION_CLUB=`INSERT INTO
association_club(name, type, description, startdate, enddate)
VALUES ($1, $2, $3, $4, $5)
returning *`;

const GET_ASSOCIATIONS_CLUBS=`SELECT * FROM association_club`;

const GET_CLUBS=`SELECT * FROM association_club where type='club'`;

const GET_ASSOCIATIONS=`SELECT * FROM association_club where type='asociación'`;

const UPDATE_ASSOCIATION_CLUB = 'UPDATE association_club SET name=$1, type=$2, description=$3, startdate=$4, enddate=$5 WHERE id=$6 returning *';

const GET_ASSOCIATION_CLUB_BY_NAME=`SELECT * FROM association_club WHERE name ILIKE $1`;

async function createACQuery({
    name,
    type,
    description,
    startdate,
    enddate
}) {
    const values = [
        name,
        type,
        description,
        startdate,
        enddate
    ];

    const data = await db.query(CREATE_ASSOCIATION_CLUB, values);
    return data;
};

async function getACByNameQuery({ name}) {
    
    const values = [
        name
    ];

    const data = await db.query(GET_ASSOCIATION_CLUB_BY_NAME, values);
    return data;
};

async function getACsQuery() {
    
    const data = await db.query(GET_ASSOCIATIONS_CLUBS);
    return data;
};

async function getAsQuery() {
    
    const data = await db.query(GET_ASSOCIATIONS);
    return data;
};

async function getCsQuery() {
    
    const data = await db.query(GET_CLUBS);
    return data;
};

async function updateACQuery({
    name,
    type,
    description,
    startdate,
    enddate,
    id
}) {
    
    const values = [
        name,
        type,
        description,
        startdate,
        enddate,
        id, 
    ];

    const data = await db.query(UPDATE_ASSOCIATION_CLUB, values);
    return data;
};

module.exports = {
    createACQuery,
    getACsQuery,
    getAsQuery,
    getCsQuery,
    updateACQuery,
    getACByNameQuery
};