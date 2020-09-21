const db = require('../db/config');

const CREATE_ASSISTANCE=`INSERT INTO
assistance(userid, ids, late)
VALUES ($1, $2, $3)
returning *`;

const GET_ASSISTANCES=`SELECT * FROM assistance`;

const GET_ASSISTANCE_BY_SESSION_ID=`SELECT users.id, users.first_name, users.last_name, users.email  FROM assistance JOIN users on users.id=assistance.userid where ids=$1 `;

const DELETE_ASSISTANCE = 'DELETE FROM assistance WHERE userid = $1 AND ids = $2 returning *';

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

async function getAssistanceBySessionQuery({ ids }){
    const values = [
        ids
    ];

    const data = await db.query(GET_ASSISTANCE_BY_SESSION_ID, values);
    return data;
};

async function deleteAssistanceQuery ({
    userid,
    ids
}) {
    const values = [
        userid,
        ids
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