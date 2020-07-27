const db = require('../db/config');

const CREATE_TOURNAMENT=`INSERT INTO
tournament(userid, idt, startdate, enddate)
VALUES ($1, $2, $3, $4)
returning *`;

const GET_TOURNAMENTS=`SELECT * FROM tournament`;

const GET_TOURNAMENT_BY_TEAM_ID=`SELECT users.id, users.first_name, users.last_name, users.email  FROM tournament JOIN users on users.id=tournament.userid where idt=$1 `;

async function createTournamentQuery({
    userid,
    idt,
    startdate,
    enddate
}){
    const values = [
        userid,
        idt,
        startdate,
        enddate
    ];

    const data = await db.query(CREATE_TOURNAMENT, values);
    return data;
};

async function getTournamentsQuery(){
    
    const data = await db.query(GET_TOURNAMENTS);
    return data;
};

async function getTournamentByTeamQuery({ idt }){
    const values = [
        idt
    ];

    const data = await db.query(GET_TOURNAMENT_BY_TEAM_ID, values);
    return data;
};

module.exports = {
    createTournamentQuery,
    getTournamentsQuery,
    getTournamentByTeamQuery
};