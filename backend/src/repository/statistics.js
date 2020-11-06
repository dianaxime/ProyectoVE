const db = require('../db/config');

/* Este si */
const GET_ASSISTANCE_OF_CLUB=`select assistance.late, CAST(COUNT(*) as FLOAT)/(select cast(COUNT(*) as float ) from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where association_club.id=$3 and sessions.date>=$1 and sessions.date<=$2) as porcentaje
from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where association_club.id=$3 and assistance.late='p' and sessions.date>=$1 and sessions.date<=$2 group by assistance.late
union
select assistance.late, CAST(COUNT(*) as FLOAT)/(select cast(COUNT(*) as float ) from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where association_club.id=$3 and sessions.date>=$1 and sessions.date<=$2) as porcentaje
from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where association_club.id=$3 and assistance.late='a' and sessions.date>=$1 and sessions.date<=$2 group by assistance.late
union
select assistance.late, CAST(COUNT(*) as FLOAT)/(select cast(COUNT(*) as float ) from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where association_club.id=$3 and sessions.date>=$1 and sessions.date<=$2) as porcentaje
from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where association_club.id=$3 and assistance.late='t' and sessions.date>=$1 and sessions.date<=$2 group by assistance.late`;

const GET_ASSISTANCE_OF_ALL_CLUBS=`select assistance.late, CAST(COUNT(*) as FLOAT)/(select cast(COUNT(*) as float ) from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where sessions.date>=$1 and sessions.date<=$2) as porcentaje
from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where assistance.late='p' and sessions.date>=$1 and sessions.date<=$2 group by assistance.late
union
select assistance.late, CAST(COUNT(*) as FLOAT)/(select cast(COUNT(*) as float ) from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where sessions.date>=$1 and sessions.date<=$2) as porcentaje
from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where assistance.late='a' and sessions.date>=$1 and sessions.date<=$2 group by assistance.late
union
select assistance.late, CAST(COUNT(*) as FLOAT)/(select cast(COUNT(*) as float ) from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where sessions.date>=$1 and sessions.date<=$2) as porcentaje
from association_club join sessions on association_club.id = sessions.idac join assistance on sessions.id= assistance.ids where assistance.late='t' and sessions.date>=$1 and sessions.date<=$2 group by assistance.late`;

/* Este si */
const GET_PLAYERS_COUNT_IN_TOURNAMENT=`select cast(COUNT(distinct(userid)) as int) from tournament join users on tournament.userid = users.id 
where tournament.startdate>=$1 and tournament.enddate<=$2`;

/* Este si */
const GET_PLAYERS_COUNT_ON_SPORT_IN_TOURNAMENT=`select team.sport, cast(COUNT(*) as int) from tournament 
join users on tournament.userid = users.id 
join team on tournament.idt = team.id 
where tournament.startdate>=$1 and tournament.enddate<=$2 
GROUP BY team.sport`;

/* Este si*/
const GET_TEAMS_ON_RANGE_OF_TIME=`select team.sport, cast(COUNT(*) as int) from team 
where team.startdate >= $1 and team.enddate <= $2 group by team.sport`;

/* Este si */
const GET_TEAMS_OF_SPORT_ON_RANGE_OF_TIME=`select cast(COUNT(*) as int) from team
where team.startdate >= $1 and team.enddate <= $2`;

/* Este si */
const GET_PORCENTAGE_OF_GENDERS_IN_TOURNAMENTS_IN_RANGE_OF_TIME=`select team.sport, users.sex , cast(COUNT(*) as int) 
from tournament join users on tournament.userid = users.id join team on tournament.idt = team.id
where tournament.startdate >= $1 and tournament.enddate <= $2 
and users.sex = 'M' group by users.sex, team.sport`;

/* Este si */
const GET_PORCENTAGE_OF_GENDERS_IN_A_SPORT_IN_TOURNAMENTS_IN_RANGE_OF_TIME=` select team.sport, users.sex , cast(COUNT(*) as int) 
from tournament join users on tournament.userid = users.id join team on tournament.idt = team.id
where tournament.startdate >= $1 and tournament.enddate <= $2 
and users.sex = 'F' group by users.sex, team.sport`;

const GET_COUNT_OF_SCHOLARS=`select cast(COUNT(distinct(userid)) as int) from event_participation 
join users on event_participation.userid = users.id 
join event on event_participation.ide = event.id 
where event.date>=$1 and event.date<=$2`;

/*Este si */
const GET_PARTICIPATION_IN_WORKSHOPS_ON_RANGE_OF_TIME=`select cast(COUNT(distinct(userid)) as int) from participation where participation.startdate>=$1 and participation.enddate<=$2`;

/*Este si */
const GET_PARTICIPATION_IN_A_WORKSHOP=`select workshop.name, cast(COUNT(*) as int) from participation 
join workshop on participation.idw = workshop.id where 
workshop.startdate >= $1 and workshop.enddate <= $2
group by workshop.id`;

const GET_PORCENTAGE_OF_GENDERS_WORKSHOPS_IN_RANGE_OF_TIME=`select workshop.name, users.sex , cast(COUNT(*) as int) from participation 
join users on participation.userid = users.id join workshop on workshop.id = participation.idw 
where participation.startdate >= $1 and participation.enddate <= $2 and users.sex = 'M'  group by users.sex, workshop.id`;

const GET_PORCENTAGE_OF_GENDERS_IN_A_WORKSHOP=`select workshop.name, users.sex , cast(COUNT(*) as int) from participation 
join users on participation.userid = users.id join workshop on workshop.id = participation.idw 
where participation.startdate >= $1 and participation.enddate <= $2 and users.sex = 'F'  group by users.sex, workshop.id`;

/*New for scholars by gender*/

const GET_COUNT_OF_SCHOLARS_FEMALE=`select users.sex, cast(COUNT(distinct(userid)) as int) from event_participation 
join users on event_participation.userid = users.id 
join event on event_participation.ide = event.id 
where event.date>=$1 and event.date<=$2 and users.sex = 'F' group by users.sex`;

const GET_COUNT_OF_SCHOLARS_MALE=`select users.sex, cast(COUNT(distinct(userid)) as int) from event_participation 
join users on event_participation.userid = users.id 
join event on event_participation.ide = event.id 
where event.date>=$1 and event.date<=$2 and users.sex = 'M' group by users.sex`;

//get events of a range of time
const GET_COUNT_EVENTS_RANGE_TIME=`select  cast(COUNT(*) as int) from event
where event.date>=$1 and event.date<=$2`;

//Querys for users stadistics
const GET_MALE_USERS=`select users.sex, cast(COUNT(*) as int) from users 
where users.sex = 'M' group by users.sex`;
const GET_FEMALE_USERS=`select users.sex, cast(COUNT(*) as int) from users 
where users.sex = 'F' group by users.sex`;

const GET_USERS_BY_FACULTY=`select users.faculty, cast(COUNT(*) as int) from users group by users.faculty`;
const GET_USERS_BY_CAREER=`select users.career, cast(COUNT(*) as int) from users group by users.career`;

const GET_USERS_BY_FACULTY_AND_MALE=`select users.sex, users.faculty, cast(COUNT(*) as int) from users where users.sex = 'M' group by users.faculty, users.sex`;
const GET_USERS_BY_FACULTY_AND_FEMALE=`select users.sex, users.faculty, cast(COUNT(*) as int) from users where users.sex = 'F' group by users.faculty, users.sex`;

const GET_USERS_BY_CAREER_AND_MALE=`select users.sex, users.career, cast(COUNT(*) as int) from users where users.sex = 'M' group by users.career, users.sex`;
const GET_USERS_BY_CAREER_AND_FEMALE=`select users.sex, users.career, cast(COUNT(*) as int) from users where users.sex = 'F' group by users.career, users.sex`;

/*statisticS of participation for artistic club */
const GET_PARTICIPATION_OF_ARTISTIC_CLUB=`select cast(COALESCE(COUNT(distinct(userid)), 0) as int) as count from association_club_relationship 
join users on users.id = association_club_relationship.userid 
join association_club on association_club.id = association_club_relationship.idac 
where association_club.type='Club artistico' and association_club_relationship.startdate>=$1 and association_club_relationship.enddate<=$2`;

const GET_PARTICIPATION_OF_ARTISTIC_CLUB_BY_CLUB=`select association_club.name, cast(COALESCE(COUNT(distinct(userid)), 0) as int) as count from association_club_relationship 
join users on users.id = association_club_relationship.userid 
join association_club on association_club.id = association_club_relationship.idac 
where association_club.type='Club artistico' and association_club_relationship.startdate>=$1 and association_club_relationship.enddate<=$2 group by association_club.name`;

const GET_PARTICIPATION_OF_FEMALE_ARTISTIC_CLUB_BY_CLUB=`select association_club.name, users.sex, cast(COALESCE(COUNT(distinct(userid)), 0) as int) as count from association_club_relationship 
join users on users.id = association_club_relationship.userid 
join association_club on association_club.id = association_club_relationship.idac 
where association_club.type='Club artistico' and association_club_relationship.startdate>=$1 and association_club_relationship.enddate<=$2 and users.sex='F' group by association_club.name, users.sex`;

const GET_PARTICIPATION_OF_MALE_ARTISTIC_CLUB_BY_CLUB=`select association_club.name, users.sex, cast(COALESCE(COUNT(distinct(userid)), 0) as int) as count from association_club_relationship 
join users on users.id = association_club_relationship.userid 
join association_club on association_club.id = association_club_relationship.idac 
where association_club.type='Club artistico' and association_club_relationship.startdate>=$1 and association_club_relationship.enddate<=$2 and users.sex='M' group by association_club.name, users.sex`;

/*statistic of assistance for sport club */
const GET_PARTICIPATION_OF_SPORT_CLUB=`select cast(COUNT(distinct(userid)) as int) from association_club_relationship 
join users on users.id = association_club_relationship.userid 
join association_club on association_club.id = association_club_relationship.idac 
where association_club.type='Club deportivo' and association_club_relationship.startdate>=$1 and association_club_relationship.enddate<=$2`;

const GET_PARTICIPATION_OF_SPORT_CLUB_BY_CLUB=`select association_club.name, cast(COUNT(distinct(userid)) as int) from association_club_relationship 
join users on users.id = association_club_relationship.userid 
join association_club on association_club.id = association_club_relationship.idac 
where association_club.type='Club deportivo' and association_club_relationship.startdate>=$1 and association_club_relationship.enddate<=$2 group by association_club.name`;

const GET_PARTICIPATION_OF_FEMALE_SPORT_CLUB_BY_CLUB=`select association_club.name, users.sex, cast(COUNT(distinct(userid)) as int) from association_club_relationship 
join users on users.id = association_club_relationship.userid 
join association_club on association_club.id = association_club_relationship.idac 
where association_club.type='Club deportivo' and association_club_relationship.startdate>=$1 and association_club_relationship.enddate<=$2 and users.sex='F' group by association_club.name, users.sex`;

const GET_PARTICIPATION_OF_MALE_SPORT_CLUB_BY_CLUB=`select association_club.name, users.sex, cast(COUNT(distinct(userid)) as int) from association_club_relationship 
join users on users.id = association_club_relationship.userid 
join association_club on association_club.id = association_club_relationship.idac 
where association_club.type='Club deportivo' and association_club_relationship.startdate>=$1 and association_club_relationship.enddate<=$2 and users.sex='M' group by association_club.name, users.sex`;

/*statistic of assistance for academic club */
const GET_PARTICIPATION_OF_ACADEMIC_CLUB=`select cast(COUNT(distinct(userid)) as int) from association_club_relationship 
join users on users.id = association_club_relationship.userid 
join association_club on association_club.id = association_club_relationship.idac 
where association_club.type='Club academico' and association_club_relationship.startdate>=$1 and association_club_relationship.enddate<=$2`;

const GET_PARTICIPATION_OF_ACADEMIC_CLUB_BY_CLUB=`select association_club.name, cast(COUNT(distinct(userid)) as int) from association_club_relationship 
join users on users.id = association_club_relationship.userid 
join association_club on association_club.id = association_club_relationship.idac 
where association_club.type='Club academico' and association_club_relationship.startdate>=$1 and association_club_relationship.enddate<=$2 group by association_club.name`;

const GET_PARTICIPATION_OF_FEMALE_ACADEMIC_CLUB_BY_CLUB=`select association_club.name, users.sex, cast(COUNT(distinct(userid)) as int) from association_club_relationship 
join users on users.id = association_club_relationship.userid 
join association_club on association_club.id = association_club_relationship.idac 
where association_club.type='Club academico' and association_club_relationship.startdate>=$1 and association_club_relationship.enddate<=$2 and users.sex='F' group by association_club.name, users.sex`;

const GET_PARTICIPATION_OF_MALE_ACADEMIC_CLUB_BY_CLUB=`select association_club.name, users.sex, cast(COUNT(distinct(userid)) as int) from association_club_relationship 
join users on users.id = association_club_relationship.userid 
join association_club on association_club.id = association_club_relationship.idac 
where association_club.type='Club academico' and association_club_relationship.startdate>=$1 and association_club_relationship.enddate<=$2 and users.sex='M' group by association_club.name, users.sex`;

/*statistic of assistance for AGRUPATION */
const GET_PARTICIPATION_OF_AGRUPATION_CLUB=`select cast(COUNT(distinct(userid)) as int) from association_club_relationship 
join users on users.id = association_club_relationship.userid 
join association_club on association_club.id = association_club_relationship.idac 
where association_club.type='Agrupacion' and association_club_relationship.startdate>=$1 and association_club_relationship.enddate<=$2`;

const GET_PARTICIPATION_OF_AGRUPATION_CLUB_BY_CLUB=`select association_club.name, cast(COUNT(distinct(userid)) as int) from association_club_relationship 
join users on users.id = association_club_relationship.userid 
join association_club on association_club.id = association_club_relationship.idac 
where association_club.type='Agrupacion' and association_club_relationship.startdate>=$1 and association_club_relationship.enddate<=$2 group by association_club.name`;

const GET_PARTICIPATION_OF_FEMALE_AGRUPATION_CLUB_BY_CLUB=`select association_club.name, users.sex, cast(COUNT(distinct(userid)) as int) from association_club_relationship 
join users on users.id = association_club_relationship.userid 
join association_club on association_club.id = association_club_relationship.idac 
where association_club.type='Agrupacion' and association_club_relationship.startdate>=$1 and association_club_relationship.enddate<=$2 and users.sex='F' group by association_club.name, users.sex`;

const GET_PARTICIPATION_OF_MALE_AGRUPATION_CLUB_BY_CLUB=`select association_club.name, users.sex, cast(COUNT(distinct(userid)) as int) from association_club_relationship 
join users on users.id = association_club_relationship.userid 
join association_club on association_club.id = association_club_relationship.idac 
where association_club.type='Agrupacion' and association_club_relationship.startdate>=$1 and association_club_relationship.enddate<=$2 and users.sex='M' group by association_club.name, users.sex`;


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

async function getPlayersOfSportInTournamentQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
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

async function getTeamsOfASportInTournamentQuery({ startdate, enddate}){
    const values = [
        startdate,
        enddate
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

async function getGenderOfSportInTournamentQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PORCENTAGE_OF_GENDERS_IN_A_SPORT_IN_TOURNAMENTS_IN_RANGE_OF_TIME, values);
    return data;
};

async function getAllScholarsQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];
    
    const data = await db.query(GET_COUNT_OF_SCHOLARS, values);
    return data;
};

async function getAllScholarsFemaleQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];
    
    const data = await db.query(GET_COUNT_OF_SCHOLARS_FEMALE, values);
    return data;
};

async function getAllScholarsMaleQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];
    
    const data = await db.query(GET_COUNT_OF_SCHOLARS_MALE, values);
    return data;
};

async function getCountEventsQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];
    
    const data = await db.query(GET_COUNT_EVENTS_RANGE_TIME, values);
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

async function getParticipactionWorkshopQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
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

async function getGenderParticipactionOfWorkshopQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PORCENTAGE_OF_GENDERS_IN_A_WORKSHOP, values);
    return data;
};

async function getMaleUsersQuery(){
    const data = await db.query(GET_MALE_USERS);
    return data;
};

async function getFemaleUsersQuery(){
    const data = await db.query(GET_FEMALE_USERS);
    return data;
};

async function getUsersByFacultyQuery(){
    const data = await db.query(GET_USERS_BY_FACULTY);
    return data;
};

async function getUsersByCareerQuery(){
    const data = await db.query(GET_USERS_BY_CAREER);
    return data;
};

async function getUsersByFacultyFemaleQuery(){
    const data = await db.query(GET_USERS_BY_FACULTY_AND_FEMALE);
    return data;
};

async function getUsersByFacultyMaleQuery(){
    const data = await db.query(GET_USERS_BY_FACULTY_AND_MALE);
    return data;
};

async function getUsersByCareerFemaleQuery(){
    const data = await db.query(GET_USERS_BY_CAREER_AND_FEMALE);
    return data;
};

async function getUsersByCareerMaleQuery(){
    const data = await db.query(GET_USERS_BY_CAREER_AND_MALE);
    return data;
};

/*STATISTICS OF ARTISTIC CLUBS */
async function getParticipationArtisticClubsQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PARTICIPATION_OF_ARTISTIC_CLUB, values);
    return data;
};

async function getParticipationArtisticClubsByClubQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PARTICIPATION_OF_ARTISTIC_CLUB_BY_CLUB, values);
    return data;
};

async function getFemaleParticipationArtisticClubsByClubQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PARTICIPATION_OF_FEMALE_ARTISTIC_CLUB_BY_CLUB, values);
    return data;
};

async function getMaleParticipationArtisticClubsByClubQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PARTICIPATION_OF_MALE_ARTISTIC_CLUB_BY_CLUB, values);
    return data;
};

/*STATISTICS OF SPORT CLUBS */
async function getParticipationSportClubsQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PARTICIPATION_OF_SPORT_CLUB, values);
    return data;
};

async function getParticipationSportClubsByClubQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PARTICIPATION_OF_SPORT_CLUB_BY_CLUB, values);
    return data;
};

async function getFemaleParticipationSportClubsByClubQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PARTICIPATION_OF_FEMALE_SPORT_CLUB_BY_CLUB, values);
    return data;
};

async function getMaleParticipationSportClubsByClubQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PARTICIPATION_OF_MALE_SPORT_CLUB_BY_CLUB, values);
    return data;
};

/*STATISTICS OF ACADEMIC CLUBS */
async function getParticipationAcademicClubsQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PARTICIPATION_OF_ACADEMIC_CLUB, values);
    return data;
};

async function getParticipationAcademicClubsByClubQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PARTICIPATION_OF_ACADEMIC_CLUB_BY_CLUB, values);
    return data;
};

async function getFemaleParticipationAcademicClubsByClubQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PARTICIPATION_OF_FEMALE_ACADEMIC_CLUB_BY_CLUB, values);
    return data;
};

async function getMaleParticipationAcademicClubsByClubQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PARTICIPATION_OF_MALE_ACADEMIC_CLUB_BY_CLUB, values);
    return data;
};

/*STATISTICS OF AGRUPATION */
async function getParticipationAgrupationQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PARTICIPATION_OF_AGRUPATION_CLUB, values);
    return data;
};

async function getParticipationAgrupationByClubQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PARTICIPATION_OF_AGRUPATION_CLUB_BY_CLUB, values);
    return data;
};

async function getFemaleParticipationAgrupationByClubQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PARTICIPATION_OF_FEMALE_AGRUPATION_CLUB_BY_CLUB, values);
    return data;
};

async function getMaleParticipationAgrupationByClubQuery({ startdate, enddate }){
    const values = [
        startdate,
        enddate
    ];

    const data = await db.query(GET_PARTICIPATION_OF_MALE_AGRUPATION_CLUB_BY_CLUB, values);
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
    getAllScholarsFemaleQuery,
    getAllScholarsMaleQuery,
    getCountEventsQuery,
    getParticipactionWorkshopsInTimeQuery,
    getParticipactionWorkshopQuery,
    getGenderParticipactionWorkshopsInTimeQuery,
    getGenderParticipactionOfWorkshopQuery,
    getMaleUsersQuery,
    getFemaleUsersQuery,
    getUsersByFacultyQuery,
    getUsersByCareerQuery,
    getUsersByFacultyFemaleQuery,
    getUsersByFacultyMaleQuery,
    getUsersByCareerFemaleQuery,
    getUsersByCareerMaleQuery,
    getParticipationArtisticClubsQuery,
    getParticipationArtisticClubsByClubQuery,
    getFemaleParticipationArtisticClubsByClubQuery,
    getMaleParticipationArtisticClubsByClubQuery,
    getParticipationSportClubsQuery,
    getParticipationSportClubsByClubQuery,
    getFemaleParticipationSportClubsByClubQuery,
    getMaleParticipationSportClubsByClubQuery,
    getParticipationAcademicClubsQuery,
    getParticipationAcademicClubsByClubQuery,
    getFemaleParticipationAcademicClubsByClubQuery,
    getMaleParticipationAcademicClubsByClubQuery,
    getParticipationAgrupationQuery,
    getParticipationAgrupationByClubQuery,
    getFemaleParticipationAgrupationByClubQuery,
    getMaleParticipationAgrupationByClubQuery,
};