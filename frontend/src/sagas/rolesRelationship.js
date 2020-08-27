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
import * as actions from '../actions/rolesRelationship';
import * as types from '../types/rolesRelationship';
import * as schemas from '../schemas/users';

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

export function* watchUsersFetchRolesRelationship() {
    yield takeEvery(
        types.USERS_BY_EMAIL_FETCH_STARTED,
        fetchUsers,
    );
}

function* addRolesRelationship(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/relationship-roles/create`,
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
                    actions.completeAddingRoleRelationship(
                        action.payload.id,
                        info,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failAddingRoleRelationship(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failAddingRoleRelationship("Error de conexión"));
    }
}

export function* watchAddRolesRelationship() {
    yield takeEvery(
        types.ROLES_RELATIONSHIP_ADD_STARTED,
        addRolesRelationship,
    );
}

function* deleteRoleRelationship(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            if (action.payload.idw && action.payload.userid) {
                const token = yield select(selectors.getAuthToken);
                const response = yield call(
                    fetch,
                    `${API_BASE_URL}/relationship-roles/delete${action.payload.idw}/${action.payload.userid}`,
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
                        actions.completeRemovingRoleRelationship(
                            action.payload.userid
                        ),
                    );
                } else {
                    const errors = yield response.json();
                    yield put(actions.failRemovingRoleRelationship(errors.error));
                }
            }
        }
    } catch (error) {
        yield put(actions.failRemovingRoleRelationship("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchDeleteRolesRelationship() {
    yield takeEvery(
        types.ROLES_RELATIONSHIP_REMOVE_STARTED,
        deleteRoleRelationship,
    );
}