const db = require('../db/config');

const GET_ROLE_BY_ID=`SELECT id FROM roles WHERE role=$1`;

const GET_ROLES = `SELECT roles.id, roles.role, COALESCE(COUNT(roles_relationship.idr), 0) 
FROM roles LEFT JOIN roles_relationship on roles.id = roles_relationship.idr 
GROUP BY roles.id ORDER BY roles.id ASC`;

async function getRoleQuery({role}) {

    const values = [
        role
    ];
    
    const data = await db.query(GET_ROLE_BY_ID, values);
    return data;
};

async function getRolesQuery() {

    const data = await db.query(GET_ROLES);
    return data;
};

module.exports={
    getRoleQuery,
    getRolesQuery
}