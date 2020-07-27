const db = require('../db/config');

const CREATE_TEAM=`INSERT INTO
team(name, sport)
VALUES ($1, $2)
returning *`;

const GET_TEAMS=`SELECT * FROM team`;

const GET_TEAM_BY_NAME=`SELECT * FROM team WHERE name ILIKE $1`;

async function createTeamQuery({
    name,
    sport,
}){
    const values = [
        name,
        sport
    ];

    const data = await db.query(CREATE_TEAM, values);
    return data;
};

async function getTeamByNameQuery({name}) {
    const values = [
        name
    ];

    const data = await db.query(GET_TEAM_BY_NAME, values);
    return data;
};

async function getTeamsQuery() {
    
    const data = await db.query(GET_TEAMS);
    return data;
};

module.exports = {
    createTeamQuery,
    getTeamsQuery,
    getTeamByNameQuery
};