const db = require('../db/config');

const moment = require('moment');

const {
    hashPassword,
} = require('../helpers/validation');

const SEARCH_REGISTER = 'SELECT * FROM registers WHERE email=$1 ORDER BY id DESC';
const UPDATE_REGISTER = 'UPDATE registers SET status=$1 WHERE email=$2 returning *';
const CREATE_USER = `INSERT INTO
    users(email, first_name, last_name, password, carne, sex, type, career, faculty, created_on, modified_on)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
returning *`;
const LOGIN_USER = 'SELECT * FROM users WHERE email = $1';
const CREATE_REGISTER = `INSERT INTO
    registers(email, first_name, last_name, carne, sex, type, career, faculty, status, created_on, authorized_on)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
returning *`;
const UPDATE_PASSWORD = 'UPDATE users SET password=$1, modified_on=$2 WHERE email=$3 returning *';
const UPDATE_USER = `UPDATE users SET first_name=$1, last_name=$2, carne=$3, sex=$4, type=$5, career=$6,
faculty=$7, modified_on=$8 WHERE email=$9 returning *`;
const GET_PENDING = `SELECT * FROM registers WHERE status=$1`;

const GET_STUDENTS= `SELECT * FROM users WHERE type=$1`;

const GET_STUDENT_BY_EMAIL= `SELECT id, email, first_name, last_name, carne FROM users WHERE email ILIKE '%'|| $1 || '%'`;

const GET_TEAMS_BY_STUDENT_ID= `SELECT team.name, team.sport, team.id FROM users JOIN tournament ON users.id=tournament.userid
JOIN team ON team.id=tournament.idt WHERE users.id=$1`;

const GET_WS_BY_STUDENT_ID= `SELECT workshop.name, workshop.description FROM users JOIN participation ON users.id=participation.userid
JOIN workshop ON workshop.id=participation.idw WHERE users.id=$1`;

const GET_ASSOCIATION_BY_STUDENT_ID=`SELECT association_club.name, association_club.description FROM users JOIN association_club_relationship ON users.id=association_club_relationship.userid
JOIN association_club ON association_club.id=association_club_relationship.idac WHERE users.id=$1 and association_club.type='asociación'`;

const GET_CLUB_BY_STUDENT_ID=`SELECT association_club.name, association_club.description FROM users JOIN association_club_relationship ON users.id=association_club_relationship.userid
JOIN association_club ON association_club.id=association_club_relationship.idac WHERE users.id=$1 and association_club.type='club'`;

const GET_SESSIONS_BY_STUDENT_ID=`SELECT sessions.date, association_club.name FROM users JOIN assistance ON users.id=assistance.userid
JOIN sessions ON assistance.ids=sessions.id
JOIN association_club on association_club.id=sessions.idac 
WHERE users.id=$1`;

const GET_SCHOLAR_HOURS=`select cast(SUM(event_participation.hours) as int) from event_participation 
join users on event_participation.userid = users.id 
join event on event_participation.ide = event.id 
where event.date>=$1 and event.date<=$2 and users.id=$3;`;

async function createUserQuery({email, password}) {
    
    const created_on = moment(new Date());
    const modified_on = moment(new Date());

    const hashedPassword = hashPassword(password);
    
    const respuesta = await db.tx(async t => {
        return t.one(SEARCH_REGISTER, [email])
        .then(data => {
            const values = [
                data.email,
                data.first_name,
                data.last_name,
                hashedPassword,
                data.carne,
                data.sex,
                data.type,
                data.career,
                data.faculty,
                created_on,
                modified_on,
            ];
            console.log(values);
            return t.one(CREATE_USER, values)
            .then(() => {
                return t.one(UPDATE_REGISTER, ['authorized', email])
            })
        })
    });
    return respuesta;
};

async function loginUserQuery({email}) {
    
    const data = await db.query(LOGIN_USER, [email]);
    return data;
};

async function createRegisterQuery({
    email,
    first_name,
    last_name,
    carne,
    sex,
    type,
    career,
    faculty,
}) {
    
    const created_on = moment(new Date());
    const authorized_on = moment(new Date());
    const state = 'pending';

    const values = [
        email,
        first_name,
        last_name,
        carne,
        sex,
        type,
        career,
        faculty,
        state,
        created_on,
        authorized_on,
    ];

    const data = await db.query(CREATE_REGISTER, values);
    return data;
};

async function getStudentsQuery() {
    
    const data = await db.query(GET_STUDENTS, ['student']);
    return data;
};

async function getStudentByEmailQuery({ email }){

    const values = [
        email
    ];

    const data = await db.query(GET_STUDENT_BY_EMAIL, values);
    return data;
};

async function getStudentsTeamsByIdQuery({ id }) {

    const values = [
        id
    ];

    const data = db.query(GET_TEAMS_BY_STUDENT_ID, values);
    return data;
};

async function getStudentsWSByIdQuery({ id }) {

    const values = [
        id
    ];

    const data = db.query(GET_WS_BY_STUDENT_ID, values);
    return data;
};

async function getStudentsAByIdQuery( id ) {

    const values = [
        id
    ];

    const data = await db.query(GET_ASSOCIATION_BY_STUDENT_ID, values);
    return data;
};

async function getStudentsCByIdQuery( id ) {

    const values = [
        id
    ];

    const data = await db.query(GET_CLUB_BY_STUDENT_ID, values);
    return data;
};

async function getStudentsSessionsByIdQuery( id ) {

    const values = [
        id
    ];

    const data = await db.query(GET_SESSIONS_BY_STUDENT_ID, values);
    return data;
};

async function forgotPasswordQuery({ email, password }) {
    
    const modified_on = moment(new Date());

    const hashedPassword = hashPassword(password);
    
    const values = [
        hashedPassword,
        modified_on,
        email
    ];

    const data = await db.query(UPDATE_PASSWORD, values);
    return data;
};

async function changePasswordQuery({ newPassword, email}) {
    
    const modified_on = moment(new Date());

    const hashedPassword = hashPassword(newPassword);

    const values = [
        hashedPassword,
        modified_on,
        email
    ];

    const data = await db.query(UPDATE_PASSWORD, values);
    return data;
};

async function updateUserQuery({
    first_name,
    last_name,
    carne,
    sex,
    type,
    career,
    faculty,
    email
}) {
    
    const modified_on = moment(new Date());

    const values = [
        first_name,
        last_name,
        carne,
        sex,
        type,
        career,
        faculty,
        modified_on,
        email
    ];

    const data = await db.query(UPDATE_USER, values);
    return data;
};

async function getPendingQuery() {
    
    const data = await db.query(GET_PENDING, ['pending']);
    return data;
};

async function getScholarHourseQuery({ startdate, enddate, userid }){
    const values = [
        startdate,
        enddate,
        userid
    ];

    const data = await db.query(GET_SCHOLAR_HOURS, values);
    return data;
};

module.exports = {
    createUserQuery,
    loginUserQuery,
    createRegisterQuery,
    forgotPasswordQuery,
    changePasswordQuery,
    updateUserQuery,
    getPendingQuery,
    getStudentsQuery,
    getStudentByEmailQuery,
    getStudentsTeamsByIdQuery,
    getStudentsWSByIdQuery,
    getStudentsCByIdQuery,
    getStudentsAByIdQuery,
    getStudentsSessionsByIdQuery,
    getScholarHourseQuery
};