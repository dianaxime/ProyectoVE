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
import * as actions from '../actions/sessions';
import * as types from '../types/sessions';
import * as schemas from '../schemas/associationClub';
import * as schemas1 from '../schemas/sessions';
import * as actionsSelectedSession from '../actions/selectedSession';

import { API_BASE_URL } from '../settings';

function* fetchClubs(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/association-club/association-club-name/${action.payload.name}`,
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
                    entities: { associationClubs },
                    result,
                } = normalize(jsonResult.data, schemas.associationClubs);

                yield put(
                    actions.completeFetchingClubsByName(
                        associationClubs,
                        result,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingClubsByName(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingClubsByName("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchClubsFetchSession() {
    yield takeEvery(
        types.CLUBS_BY_NAME_FETCH_STARTED_AC,
        fetchClubs,
    );
}

function* addSession(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/sessions/create`,
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
                    actions.completeAddingSession(
                        action.payload.id,
                        info,
                    ),
                );
                yield put(
                    actionsSelectedSession.selectedSession(info.id),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failAddingSession(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failAddingSession("Error de conexión"));
    }
}

export function* watchAddSession() {
    yield takeEvery(
        types.SESSION_ADD_STARTED,
        addSession,
    );
}

function* fetchSessions(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/sessions/session-by-ac/${action.payload.idac}`,
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
                    entities: { sessions },
                    result,
                } = normalize(jsonResult.data, schemas1.sessions);

                yield put(
                    actions.completeFetchingSessions(
                        sessions,
                        result,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingSessions(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingSessions("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchSessionsFetch() {
    yield takeEvery(
        types.SESSIONS_FETCH_STARTED,
        fetchSessions,
    );
}

function* fetchSessionsFormat(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/sessions/sessions-by-ac/${action.payload.idac}`,
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
                
                yield put(
                    actions.completeFetchingSessionsFormat(
                        jsonResult.data
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingSessionsFormat(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingSessionsFormat("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchSessionsFormatFetch() {
    yield takeEvery(
        types.SESSIONS_FORMAT_FETCH_STARTED,
        fetchSessionsFormat,
    );
}