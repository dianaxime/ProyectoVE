const db = require('../db/config');

const CREATE_ASSISTANCE=`INSERT INTO
assistance(userid, ids, late)
VALUES ($1, $2, $3)
returning *`;

const GET_ASSISTANCES=`SELECT * FROM assistance`;

const GET_ASSISTANCE_BY_SESSION_ID=`SELECT users.id, users.first_name, users.last_name, users.email, assistance.late  FROM assistance 
JOIN users ON users.id=assistance.userid JOIN sessions ON sessions.id = assistance.ids 
WHERE sessions.date = $1 AND sessions.idac = $2`;

const DELETE_ASSISTANCE = `DELETE FROM assistance USING sessions 
WHERE sessions.id = assistance.ids AND userid = $1 AND sessions.date = $2 AND sessions.idac = $3 returning *`;

async function createAssistanceQuery({
    userid,
    ids,
    late
}){
    
    const values = [
        userid,
        ids,
        late
    ];

    const data = await db.query(CREATE_ASSISTANCE, values);
    return data;
};

async function getAssistancesQuery(){
    
    const data = await db.query(GET_ASSISTANCES);
    return data;
};

async function getAssistanceBySessionQuery({ ids, idac }){
    const values = [
        ids,
        idac
    ];

    console.log("aca", ids, idac);
    const data = await db.query(GET_ASSISTANCE_BY_SESSION_ID, values);
    return data;
};

async function deleteAssistanceQuery ({
    ids,
    userid,
    idac
}) {
    const values = [
        userid,
        ids,
        idac
    ];

    const data = await db.query(DELETE_ASSISTANCE, values);
    return data; 
};

module.exports = {
    createAssistanceQuery,
    getAssistancesQuery,
    getAssistanceBySessionQuery,
    deleteAssistanceQuery
};