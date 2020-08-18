const db = require('../db/config');

const GET_ROLE_BY_ID=`SELECT id FROM roles WHERE role=$1`;

async function getRoleQuery({role}) {

    const values = [
        role
    ];
    
    const data = await db.query(GET_ROLE_BY_ID, values);
    return data;
};

module.exports={
    getRoleQuery
}