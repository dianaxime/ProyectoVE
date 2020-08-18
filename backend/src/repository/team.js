const db = require('../db/config');

const CREATE_TEAM=`INSERT INTO
team(name, sport, startdate, enddate)
VALUES ($1, $2, $3,$4)
returning *`;

const GET_TEAMS=`SELECT * FROM team`;

const GET_TEAM_BY_NAME=`SELECT * FROM team WHERE name ILIKE $1`;

async function createTeamQuery({
    name,
    sport,
    startdate,
    enddate
}){
    const values = [
        name,
        sport,
        startdate,
        enddate
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