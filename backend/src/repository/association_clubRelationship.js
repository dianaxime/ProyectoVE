const db = require('../db/config');

const CREATE_AC_RELATIONSHIP=`INSERT INTO
association_club_relationship(userid, idac, startdate, enddate)
VALUES ($1, $2, $3, $4)
returning *`;

const GET_AC_RELATIONSHIPS=`SELECT * FROM association_club_relationship`;

const GET_RELATIONSHIP_BY_AC_ID=`SELECT users.id, users.first_name, users.last_name, users.email  FROM association_club_relationship  JOIN users on users.id=association_club_relationship.userid where idac=$1 `;

const DELETE_AC_RELATIONSHIP = 'DELETE FROM association_club_relationship WHERE userid = $1 AND idac = $2 returning *';

async function createACParticipationQuery ({
    userid,
    idac,
    startdate,
    enddate
}) {
    const values = [
        userid,
        idac,
        startdate,
        enddate
    ];

    const data = await db.query(CREATE_AC_RELATIONSHIP, values);
    return data; 
};

async function deleteACParticipationQuery ({
    userid,
    idac
}) {
    const values = [
        userid,
        idac
    ];

    const data = await db.query(DELETE_AC_RELATIONSHIP, values);
    return data; 
};

async function getACParticipationsQuery() {
    
    const data = await db.query(GET_AC_RELATIONSHIPS);
    return data;
};

async function getParticipationByACQuery(idac) {
    const values = [
        idac
    ];

    const data = await db.query(GET_RELATIONSHIP_BY_AC_ID, values);
    return data;
};

module.exports = {
    createACParticipationQuery,
    getACParticipationsQuery,
    getParticipationByACQuery,
    deleteACParticipationQuery
};