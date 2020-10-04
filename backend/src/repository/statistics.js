const db = require('../db/config');

const GET_ASSISTANCE_OF_CLUB=`select assistance.late, CAST(COUNT(*) as FLOAT)/(select cast(COUNT(*) as float ) from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where association_club.id=$3 and sessions.date>=$1 and sessions.date<=$2) as porcentaje
from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where association_club.id=$3 and assistance.late='p' and sessions.date>=$1 and sessions.date<=$2 group by assistance.late
union
select assistance.late, CAST(COUNT(*) as FLOAT)/(select cast(COUNT(*) as float ) from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where association_club.id=$3 and sessions.date>=$1 and sessions.date<=$2) as porcentaje
from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where association_club.id=$3 and assistance.late='a' and sessions.date>=$1 and sessions.date<=$2 group by assistance.late
union
select assistance.late, CAST(COUNT(*) as FLOAT)/(select cast(COUNT(*) as float ) from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where association_club.id=2 and sessions.date>=$1 and sessions.date<=$2) as porcentaje
from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where association_club.id=2 and assistance.late='t' and sessions.date>=$1 and sessions.date<=$2 group by assistance.late`;

const GET_ASSISTANCE_OF_ALL_CLUBS=`select assistance.late, CAST(COUNT(*) as FLOAT)/(select cast(COUNT(*) as float ) from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where sessions.date>=$1 and sessions.date<=$2) as porcentaje
from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where assistance.late='p' and sessions.date>=$1 and sessions.date<=$2 group by assistance.late
union
select assistance.late, CAST(COUNT(*) as FLOAT)/(select cast(COUNT(*) as float ) from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where sessions.date>=$1 and sessions.date<=$2) as porcentaje
from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where assistance.late='a' and sessions.date>=$1 and sessions.date<=$2 group by assistance.late
union
select assistance.late, CAST(COUNT(*) as FLOAT)/(select cast(COUNT(*) as float ) from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where sessions.date>=$1 and sessions.date<=$2) as porcentaje
from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where assistance.late='t' and sessions.date>=$1 and sessions.date<=$2 group by assistance.late`;

const GET_PLAYERS_COUNT_IN_TOURNAMENT=`select COUNT(*) from tournament join users on tournament.userid = users.id where tournament.startdate>=$1 and tournament.enddate<=$2`;

const GET_PLAYERS_COUNT_ON_SPORT_IN_TOURNAMENT=`select COUNT(*) from tournament join users on tournament.userid = users.id 
join team on tournament.idt = team.id 
where tournament.startdate>=$1 and tournament.enddate<=$2 and team.sport =$3`;

const GET_TEAMS_ON_RANGE_OF_TIME=`select team.name, team.sport, COUNT(*) from tournament join team on tournament.idt = team.id 
join users on tournament.userid = users.id 
where tournament.startdate>=$1 and tournament.enddate<=$2 group by team.name, team.sport`;

const GET_TEAMS_OF_SPORT_ON_RANGE_OF_TIME=`select team.name, team.sport, COUNT(*) from tournament join team on tournament.idt = team.id 
join users on tournament.userid = users.id 
where tournament.startdate>=$1 and tournament.enddate<=$2 and team.sport= $3 group by team.name, team.sport`;

const GET_PORCENTAGE_OF_GENDERS_IN_TOURNAMENTS_IN_RANGE_OF_TIME=`select users.sex , CAST(COUNT(*) as FLOAT)/(select cast(COUNT(*) as float ) from tournament join users on tournament.userid = users.id where tournament.startdate>=$1 and tournament.enddate<=$2) as porcentaje
from tournament join users on tournament.userid = users.id where tournament.startdate>=$1 and tournament.enddate<=$2 and users.sex = 'F'group by users.sex
union
select users.sex , CAST(COUNT(*) as FLOAT)/(select cast(COUNT(*) as float ) from tournament join users on tournament.userid = users.id where tournament.startdate>=$1 and tournament.enddate<=$2) as porcentaje
from tournament join users on tournament.userid = users.id where tournament.startdate>=$1 and tournament.enddate<=$2 and users.sex = 'M' group by users.sex
`;

const GET_PORCENTAGE_OF_GENDERS_IN_A_SPORT_IN_TOURNAMENTS_IN_RANGE_OF_TIME=`select users.sex , CAST(COUNT(*) as FLOAT)/(select cast(COUNT(*) as float ) from tournament join users on tournament.userid = users.id join team on tournament.idt = team.id where tournament.startdate>=$1 and tournament.enddate<=$2 and team.sport =$3) as porcentaje
from tournament join users on tournament.userid = users.id join team on tournament.idt = team.id where tournament.startdate>=$1 and tournament.enddate<=$2 and users.sex = 'F' and team.sport =$3 group by users.sex
union
select users.sex , CAST(COUNT(*) as FLOAT)/(select cast(COUNT(*) as float ) from tournament join users on tournament.userid = users.id join team on tournament.idt = team.id  where tournament.startdate>=$1 and tournament.enddate<=$2 and team.sport =$3) as porcentaje
from tournament join users on tournament.userid = users.id join team on tournament.idt = team.id where tournament.startdate>=$1 and tournament.enddate<=$2 and users.sex = 'M' and team.sport =$3 group by users.sex
`;

const GET_COUNT_OF_SCHOLARS=`select COUNT(*) from scholars`;

const GET_PARTICIPATION_IN_WORKSHOPS_ON_RANGE_OF_TIME=`select COUNT(*) from participation where participation.startdate>=$1 and participation.enddate<=$2`;

const GET_PARTICIPATION_IN_A_WORKSHOP=`select COUNT(*) from participation join workshop on participation.idw = workshop.id where workshop.id=$1`;

const GET_PORCENTAGE_OF_GENDERS_WORKSHOPS_IN_RANGE_OF_TIME=`select users.sex , CAST(COUNT(*) as FLOAT)/(select cast(COUNT(*) as float ) from participation join users on participation.userid = users.id where participation.startdate>=$1 and participation.enddate<=$2) as porcentaje
from participation join users on participation.userid = users.id where participation.startdate>=$1 and participation.enddate<=$2 and users.sex = 'F' group by users.sex
union
select users.sex , CAST(COUNT(*) as FLOAT)/(select cast(COUNT(*) as float ) from participation join users on participation.userid = users.id where participation.startdate>=$1 and participation.enddate<=$2) as porcentaje
from participation join users on participation.userid = users.id where participation.startdate>=$1 and participation.enddate<=$2 and users.sex = 'M'  group by users.sex
`;

const GET_PORCENTAGE_OF_GENDERS_IN_A_WORKSHOP=`select users.sex , CAST(COUNT(*) as FLOAT)/(select cast(COUNT(*) as float ) from participation join users on participation.userid = users.id join workshop on participation.idw = workshop.id where workshop.id=$1) as porcentaje
from participation join users on participation.userid = users.id join workshop on participation.idw = workshop.id where workshop.id=$1 and users.sex = 'F' group by users.sex
union
select users.sex , CAST(COUNT(*) as FLOAT)/(select cast(COUNT(*) as float ) from participation join users on participation.userid = users.id join workshop on participation.idw = workshop.id where workshop.id=$1) as porcentaje
from participation join users on participation.userid = users.id join workshop on participation.idw = workshop.id where workshop.id=$1 and users.sex = 'M'  group by users.sex
`;

async function getAssistanceOfClubQuery({ idc, startdate, enddate }){
    const values = [
        startdate,
        enddate,
        idc
    ];

    const data = await db.query(GET_ASSISTANCE_OF_CLUB, values);
    return data;
};

async function getAssistanceOfAllClubsQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_ASSISTANCE_OF_ALL_CLUBS, values);
    return data;
};

async function getPlayersInTournamentQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PLAYERS_COUNT_IN_TOURNAMENT, values);
    return data;
};

async function getPlayersOfSportInTournamentQuery({ startdate, enddate, sport }){
    const values = [
        startdate,
        enddate, 
        sport
    ];

    const data = await db.query(GET_PLAYERS_COUNT_ON_SPORT_IN_TOURNAMENT, values);
    return data;
};

async function getTeamsOfTournamentQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_TEAMS_ON_RANGE_OF_TIME, values);
    return data;
};

async function getTeamsOfASportInTournamentQuery({ startdate, enddate, sport }){
    const values = [
        startdate,
        enddate,
        sport
    ];

    const data = await db.query(GET_TEAMS_OF_SPORT_ON_RANGE_OF_TIME, values);
    return data;
};

async function getGenderOfTournamentQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PORCENTAGE_OF_GENDERS_IN_TOURNAMENTS_IN_RANGE_OF_TIME, values);
    return data;
};

async function getGenderOfSportInTournamentQuery({ startdate, enddate, sport }){
    const values = [
        startdate,
        enddate,
        sport
    ];

    const data = await db.query(GET_PORCENTAGE_OF_GENDERS_IN_A_SPORT_IN_TOURNAMENTS_IN_RANGE_OF_TIME, values);
    return data;
};

async function getAllScholarsQuery(){
    
    const data = await db.query(GET_COUNT_OF_SCHOLARS);
    return data;
};

async function getParticipactionWorkshopsInTimeQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PARTICIPATION_IN_WORKSHOPS_ON_RANGE_OF_TIME, values);
    return data;
};

async function getParticipactionWorkshopQuery({ idw }){
    const values = [
        idw
    ];

    const data = await db.query(GET_PARTICIPATION_IN_A_WORKSHOP, values);
    return data;
};

async function getGenderParticipactionWorkshopsInTimeQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PORCENTAGE_OF_GENDERS_WORKSHOPS_IN_RANGE_OF_TIME, values);
    return data;
};

async function getGenderParticipactionOfWorkshopQuery({ idw }){
    const values = [
        idw
    ];

    const data = await db.query(GET_PORCENTAGE_OF_GENDERS_IN_A_WORKSHOP, values);
    return data;
};

module.exports = {
    getAssistanceOfClubQuery,
    getAssistanceOfAllClubsQuery,
    getPlayersInTournamentQuery,
    getPlayersOfSportInTournamentQuery,
    getTeamsOfTournamentQuery,
    getTeamsOfASportInTournamentQuery,
    getGenderOfTournamentQuery,
    getGenderOfSportInTournamentQuery,
    getAllScholarsQuery,
    getParticipactionWorkshopsInTimeQuery,
    getParticipactionWorkshopQuery,
    getGenderParticipactionWorkshopsInTimeQuery,
    getGenderParticipactionOfWorkshopQuery

};