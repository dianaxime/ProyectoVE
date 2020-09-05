const db = require('../db/config');

const CREATE_TEAM=`INSERT INTO
team(name, sport, startdate, enddate)
VALUES ($1, $2, $3,$4)
returning *`;

const GET_TEAMS=`SELECT * FROM team`;

const UPDATE_TEAM = 'UPDATE team SET name=$1, sport=$2, startdate=$3, enddate=$4 WHERE id=$5 returning *';


const GET_TEAM_BY_NAME=`SELECT * FROM team WHERE name ILIKE $1`;

async function createTeamQuery({
    name,
    sport,
    startdate,
    enddate
}){

    if (sport=="indoorfootball"){
        sport="Futsal masculino"
    }
    if (sport=="womensfootball"){
        sport="Futsal femenino"
    }
    if (sport=="socceradmin"){
        sport="Futsal colaboradores"
    }
    if (sport=="volleyball"){
        sport="Voleibol"
    }
    if (sport=="basketball"){
        sport="Baloncesto"
    }
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

async function updateTeamQuery({
    name,
    sport,
    startdate,
    enddate,
    id
}) {
    if (sport=="indoorfootball"){
        sport="Futsal masculino"
    }
    if (sport=="womensfootball"){
        sport="Futsal femenino"
    }
    if (sport=="socceradmin"){
        sport="Futsal colaboradores"
    }
    if (sport=="volleyball"){
        sport="Voleibol"
    }
    if (sport=="basketball"){
        sport="Baloncesto"
    }
    const values = [
        name,
        sport,
        startdate,
        enddate,
        id, 
    ];

    const data = await db.query(UPDATE_TEAM, values);
    return data;
};

module.exports = {
    createTeamQuery,
    getTeamsQuery,
    getTeamByNameQuery,
    updateTeamQuery
};