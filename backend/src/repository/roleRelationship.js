const db = require('../db/config');

const CREATE_ROLES_RELATIONSHIP=`INSERT INTO
roles_relationship(userid, idr)
VALUES ($1, $2)
returning *`;

const DELETE_RELATIONSHIP=`DELETE FROM roles_relationship
where id=$1
returning *`;

async function createRoleRelationshipQuery({
    userid,
    idr
}){
    const values = [
        userid,
        idr
    ];

    const data = await db.query(CREATE_ROLES_RELATIONSHIP, values);
    return data;
};

async function deleteRoleRelationshipQuery({
    id
}){
    const values = [
        id
    ];

    const data = await db.query(DELETE_RELATIONSHIP, values);
    return data;
};

module.exports = {
    createRoleRelationshipQuery,
    deleteRoleRelationshipQuery
};