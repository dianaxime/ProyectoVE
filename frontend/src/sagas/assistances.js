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
import * as actions from '../actions/assistances';
import * as types from '../types/assistances';
import * as schemas from '../schemas/users';
import * as schemas1 from '../schemas/assistances';

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

export function* watchUsersFetchAssistance() {
    yield takeEvery(
        types.USERS_BY_EMAIL_FETCH_STARTED_S,
        fetchUsers,
    );
}

function* addAssistance(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/assistances/create`,
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
                    actions.completeAddingAssistance(
                        action.payload.id,
                        info,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failAddingAssistance(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failAddingAssistance("Error de conexión"));
    }
}

export function* watchAddAssistance() {
    yield takeEvery(
        types.ASSISTANCE_ADD_STARTED,
        addAssistance,
    );
}

function* fetchAssistances(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/assistances/assistances-by-session/${action.payload.ids}/${action.payload.idac}`,
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
                    entities: { assistances },
                    result,
                } = normalize(jsonResult.data, schemas1.assistances);

                yield put(
                    actions.completeFetchingAssistances(
                        assistances,
                        result,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingAssistances(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingAssistances("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchAssistancesFetch() {
    yield takeEvery(
        types.ASSISTANCES_FETCH_STARTED,
        fetchAssistances,
    );
}

function* deleteAssistance(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            if (action.payload.ids && action.payload.userid) {
                const token = yield select(selectors.getAuthToken);
                const response = yield call(
                    fetch,
                    `${API_BASE_URL}/assistances/delete/${action.payload.ids}/${action.payload.userid}/${action.payload.idac}`,
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
                        actions.completeRemovingAssistance(
                            action.payload.userid
                        ),
                    );
                } else {
                    const errors = yield response.json();
                    yield put(actions.failRemovingAssistance(errors.error));
                }
            }
        }
    } catch (error) {
        yield put(actions.failRemovingAssistance("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchDeleteAssistance() {
    yield takeEvery(
        types.ASSISTANCE_REMOVE_STARTED,
        deleteAssistance,
    );
}