const db = require('../db/config');

const CREATE_ROLES_RELATIONSHIP=`INSERT INTO
roles_relationship(userid, idr)
VALUES ($1, $2)
returning *`;

const DELETE_RELATIONSHIP=`DELETE FROM roles_relationship
where id=$1
returning *`;

const GET_ROLE_IN_WORKSHOPS=`select workshop.name, workshop.id from users 
join participation on users.id=participation.userid 
join workshop on workshop.id=participation.idw 
where users.id in (SELECT users.id FROM roles_relationship 
JOIN users ON users.id=roles_relationship.userid
JOIN roles ON roles.id=roles_relationship.idr WHERE roles.role='Miembro taller' and users.id=$1) and NOW()<participation.enddate and NOW()>participation.startdate`;

const GET_ROLE_IN_TEAMS=`select team.name, team.id from users 
join tournament on users.id=tournament.userid 
join team on team.id=tournament.idt 
where users.id in (SELECT users.id FROM roles_relationship 
JOIN users ON users.id=roles_relationship.userid
JOIN roles ON roles.id=roles_relationship.idr WHERE roles.role='Miembro equipo' and users.id=$1) and NOW()<tournament.enddate and NOW()>tournament.startdate`;

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

async function getWorkshopByRoleAndUserQuery({id}) {
    
    const values = [
        id
    ];

    const data = await db.query(GET_ROLE_IN_WORKSHOPS, values);
    return data;
};

async function getTeamByRoleAndUserQuery({id}) {
    
    const values = [
        id
    ];

    const data = await db.query(GET_ROLE_IN_TEAMS, values);
    return data;
};


module.exports = {
    createRoleRelationshipQuery,
    deleteRoleRelationshipQuery,
    getWorkshopByRoleAndUserQuery,
    getTeamByRoleAndUserQuery
};