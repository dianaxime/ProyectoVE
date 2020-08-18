const db = require('../db/config');

const CREATE_SCHOLAR = `INSERT INTO
scholars(userid, hours, videoEditor, photoEditor, spokespersons, organizer)
VALUES ($1, $2, $3, $4, $5, $6)
returning *`;

const GET_SCHOLARS=`SELECT * FROM scholars`;

const GET_SCHOLARS_VIDEOEDITOR=`SELECT users.first_name, users.last_name, users.email, scholars.videoeditor FROM scholars JOIN users ON scholars.userid =users.id 
ORDER BY videoeditor DESC`;

const GET_SCHOLARS_PHOTOEDITOR=`SELECT users.first_name, users.last_name, users.email, scholars.photoeditor FROM scholars JOIN users ON scholars.userid =users.id 
ORDER BY photoeditor DESC`;

const GET_SCHOLARS_SPOKESPERSON=`SELECT users.first_name, users.last_name, users.email, scholars.spokespersons FROM scholars JOIN users ON scholars.userid =users.id 
ORDER BY spokespersons DESC`;

const GET_SCHOLARS_ORGANIZER=`SELECT users.first_name, users.last_name, users.email, scholars.organizer FROM scholars JOIN users ON scholars.userid =users.id 
ORDER BY organizer DESC`;

async function createScholarsQuery ({
    hours,
    videoEditor,
    photoEditor,
    spokespersons,
    organizer,
    userid,
}) {

    const values = [
        userid,
        hours,
        videoEditor,
        photoEditor,
        spokespersons,
        organizer
    ];

    const data = await db.query(CREATE_SCHOLAR, values);
    return data;
};

async function getScholarsVideoEditorQuery() {
    
    const data = await db.query(GET_SCHOLARS_VIDEOEDITOR);
    return data;
};

async function getScholarsPhotoEditorQuery() {
    
    const data = await db.query(GET_SCHOLARS_PHOTOEDITOR);
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

async function getScholarsQuery() {
    
    const data = await db.query(GET_SCHOLARS);
    return data;
};

module.exports = {
    createScholarsQuery,
    getScholarsQuery,
    getScholarsOrganizerQuery,
    getScholarsPhotoEditorQuery,
    getScholarsSpokesPersonQuery,
    getScholarsVideoEditorQuery
};