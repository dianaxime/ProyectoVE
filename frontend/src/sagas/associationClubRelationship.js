import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    //delay,
    select,
} from 'redux-saga/effects';
import { normalize } from 'normalizr';

import * as selectors from '../reducers';
import * as actions from '../actions/associationClubRelationship';
import * as types from '../types/associationClubRelationship';
import * as schemas from '../schemas/users';
import * as schemas1 from '../schemas/associationClubRelationship';

import { API_BASE_URL } from '../settings';

function* fetchUsers(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/auth/student-email/${action.payload.email}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': `${token}`,
                    },
                }
            );
            if (response.status === 200) {
                const jsonResult = yield response.json();
                const {
                    entities: { users },
                    result,
                } = normalize(jsonResult.data, schemas.users);

                yield put(
                    actions.completeFetchingUsersByEmail(
                        users,
                        result,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingUsersByEmail(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingUsersByEmail("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchUsersFetchAssociationClubRelationship() {
    yield takeEvery(
        types.USERS_BY_EMAIL_FETCH_STARTED,
        fetchUsers,
    );
}

function* addAssociationClubRelationship(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/AC-participation/create`,
                {
                    method: 'POST',
                    body: JSON.stringify(action.payload),
                    headers: {
                        'Content-Type': 'application/json',
                        'token': `${token}`,
                    },
                }
            );
            if (response.status === 201) {
                const jsonResult = yield response.json();
                const info = jsonResult.data[0]
                yield put(
                    actions.completeAddingAssociationClubRelationship(
                        action.payload.id,
                        info,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failAddingAssociationClubRelationship(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failAddingAssociationClubRelationship("Error de conexión"));
    }
}

export function* watchAddAssociationClubRelationship() {
    yield takeEvery(
        types.ASSOCIATION_CLUB_RELATIONSHIP_ADD_STARTED,
        addAssociationClubRelationship,
    );
}

function* fetchAssociationClubRelationship(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/AC-participation/participations-by-AC/${action.payload.idac}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': `${token}`,
                    },
                }
            );
            if (response.status === 200) {
                const jsonResult = yield response.json();
                const {
                    entities: { associationClubRelationships },
                    result,
                } = normalize(jsonResult.data, schemas1.associationClubRelationships);

                yield put(
                    actions.completeFetchingAssociationClubRelationship(
                        associationClubRelationships,
                        result,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingAssociationClubRelationship(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingAssociationClubRelationship("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchAssociationClubRelationshipFetch() {
    yield takeEvery(
        types.ASSOCIATION_CLUB_RELATIONSHIP_FETCH_STARTED,
        fetchAssociationClubRelationship,
    );
}

function* deleteAssociationClubRelationship(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            if (action.payload.idac && action.payload.userid) {
                const token = yield select(selectors.getAuthToken);
                const response = yield call(
                    fetch,
                    `${API_BASE_URL}/AC-participation/delete/${action.payload.idac}/${action.payload.userid}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'token': `${token}`,
                        },
                    }
                );
                if (response.status === 200) {
                    
                    yield put(
                        actions.completeRemovingAssociationClubRelationship(
                            action.payload.userid
                        ),
                    );
                } else {
                    const errors = yield response.json();
                    yield put(actions.failRemovingAssociationClubRelationship(errors.error));
                }
            }
        }
    } catch (error) {
        yield put(actions.failRemovingAssociationClubRelationship("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchDeleteAssociationClubRelationship() {
    yield takeEvery(
        types.ASSOCIATION_CLUB_RELATIONSHIP_REMOVE_STARTED,
        deleteAssociationClubRelationship,
    );
}