const db = require('../db/config');

const CREATE_SCHOLAR = `INSERT INTO
scholars(userid, hours, videoEditor, photoEditor, spokespersons, organizer)
VALUES ($1, $2, $3, $4, $5, $6)
returning *`;

const GET_SCHOLARS=`SELECT * FROM scholars`;

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

async function getScholarsQuery() {
    
    const data = await db.query(GET_SCHOLARS);
    return data;
};

module.exports = {
    createScholarsQuery,
    getScholarsQuery
};