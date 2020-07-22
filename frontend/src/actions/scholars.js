import * as types from '../types/scholars';

export const startFetchingScholars = () => ({
    type: types.SCHOLARS_FETCH_STARTED,
});

export const completeFetchingScholars = (entities, order) => ({
    type: types.SCHOLARS_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingScholars = error => ({
    type: types.SCHOLARS_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startAddingScholar = (id, name, classroom, description, startdate, enddate) => ({
    type: types.SCHOLAR_ADD_STARTED,
    payload: {
        id,
        name,
        classroom,
        description,
        startdate,
        enddate,
    },
});

export const completeAddingScholar = (oldId, scholar) => ({
    type: types.SCHOLAR_ADD_COMPLETED,
    payload: {
        oldId,
        scholar,
    },
});

export const failAddingScholar = (oldId, error) => ({
    type: types.SCHOLAR_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});