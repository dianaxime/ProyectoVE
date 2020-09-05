const db = require('../db/config');

const CREATE_SCHOLAR = `INSERT INTO
scholars(userid, hours, video_photoeditor, graphicdesign, spokespersons, organizer, leader, other)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
returning *`;

const GET_SCHOLARS=`SELECT * FROM scholars`;

const GET_SCHOLARS_VIDEOPHOTOEDITOR=`SELECT users.first_name, users.last_name, users.email, scholars.video_photoeditor FROM scholars JOIN users ON scholars.userid =users.id 
ORDER BY video_photoeditor DESC`;

const GET_SCHOLARS_GRAPHICDESIGN=`SELECT users.first_name, users.last_name, users.email, scholars.graphicdesign FROM scholars JOIN users ON scholars.userid =users.id 
ORDER BY graphicdesign DESC`;

const GET_SCHOLARS_SPOKESPERSON=`SELECT users.first_name, users.last_name, users.email, scholars.spokespersons FROM scholars JOIN users ON scholars.userid =users.id 
ORDER BY spokespersons DESC`;

const GET_SCHOLARS_ORGANIZER=`SELECT users.first_name, users.last_name, users.email, scholars.organizer FROM scholars JOIN users ON scholars.userid =users.id 
ORDER BY organizer DESC`;

const GET_SCHOLARS_LEADER=`SELECT users.first_name, users.last_name, users.email, scholars.leader FROM scholars JOIN users ON scholars.userid =users.id 
ORDER BY leader DESC`;

const GET_SCHOLARS_OTHER=`SELECT users.first_name, users.last_name, users.email, scholars.other FROM scholars JOIN users ON scholars.userid =users.id 
ORDER BY other DESC`;

async function createScholarsQuery ({
    userid, 
    hours, 
    video_photoeditor, 
    graphicdesign, 
    spokespersons, 
    organizer, 
    leader, 
    other
}) {

    const values = [
        userid, 
        hours, 
        video_photoeditor, 
        graphicdesign, 
        spokespersons, 
        organizer, 
        leader, 
        other
    ];

    const data = await db.query(CREATE_SCHOLAR, values);
    return data;
};

async function getScholarsPhotoVideoEditorQuery() {
    
    const data = await db.query(GET_SCHOLARS_VIDEOPHOTOEDITOR);
    return data;
};

async function getScholarsGraphicDesignQuery() {
    
    const data = await db.query(GET_SCHOLARS_GRAPHICDESIGN);
    return data;
};

async function getScholarsSpokesPersonQuery() {
    
    const data = await db.query(GET_SCHOLARS_SPOKESPERSON);
    return data;
};

async function getScholarsOrganizerQuery() {
    
    const data = await db.query(GET_SCHOLARS_ORGANIZER);
    return data;
};

async function getScholarsLeaderQuery() {
    
    const data = await db.query(GET_SCHOLARS_LEADER);
    return data;
};

async function getScholarsOtherQuery() {
    
    const data = await db.query(GET_SCHOLARS_OTHER);
    return data;
};

async function getScholarsQuery() {
    
    const data = await db.query(GET_SCHOLARS);
    return data;
};

module.exports = {
    createScholarsQuery,
    getScholarsQuery,
    getScholarsOrganizerQuery,
    getScholarsGraphicDesignQuery,
    getScholarsSpokesPersonQuery,
    getScholarsPhotoVideoEditorQuery,
    getScholarsOtherQuery,
    getScholarsLeaderQuery
};