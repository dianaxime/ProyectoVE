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
import * as schemas1 from '../schemas/roles';

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

function* fetchRoles(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/role/all-roles`,
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
                    entities: { roles },
                    result,
                } = normalize(jsonResult.data, schemas1.roles);

                yield put(
                    actions.completeFetchingRoles(
                        roles,
                        result,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingRoles(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingRoles("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchFetchRoles() {
    yield takeEvery(
        types.ROLES_FETCH_STARTED,
        fetchRoles,
    );
}