import * as types from '../types/associationClubRelationship';

export const startFetchingUsersByEmail = email => ({
    type: types.USERS_BY_EMAIL_FETCH_STARTED,
    payload: {
        email
    },
});

export const completeFetchingUsersByEmail = (entities, order) => ({
    type: types.USERS_BY_EMAIL_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingUsersByEmail = error => ({
    type: types.USERS_BY_EMAIL_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startAddingAssociationClubRelationship = (id, userid, idac, startdate, enddate) => ({
    type: types.ASSOCIATION_CLUB_ADD_STARTED,
    payload: {
        id,
        userid,
        idac,
        startdate,
        enddate,
    },
});

export const completeAddingAssociationClubRelationship = (oldId, associationClubRelationship) => ({
    type: types.ASSOCIATION_CLUB_ADD_COMPLETED,
    payload: {
        oldId,
        associationClubRelationship,
    },
});

export const failAddingAssociationClubRelationship = (oldId, error) => ({
    type: types.ASSOCIATION_CLUB_RELATIONSHIP_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});

export const startFetchingAssociationClubRelationship = idac => ({
    type: types.ASSOCIATION_CLUB_RELATIONSHIP_FETCH_STARTED,
    payload: {
        idac,
    },
});

export const completeFetchingAssociationClubRelationship = (entities, order) => ({
    type: types.ASSOCIATION_CLUB_RELATIONSHIP_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingAssociationClubRelationship = error => ({
    type: types.ASSOCIATION_CLUB_RELATIONSHIP_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startRemovingAssociationClubRelationship = (idac, userid) => ({
    type: types.ASSOCIATION_CLUB_RELATIONSHIP_REMOVE_STARTED,
    payload: {
        idac,
        userid,
    },
});

export const completeRemovingAssociationClubRelationship = userid => ({
    type: types.ASSOCIATION_CLUB_RELATIONSHIP_REMOVE_COMPLETED,
    payload: userid,
});

export const failRemovingAssociationClubRelationship = error => ({
    type: types.ASSOCIATION_CLUB_RELATIONSHIP_REMOVE_FAILED,
    payload: {
        error,
    },
});