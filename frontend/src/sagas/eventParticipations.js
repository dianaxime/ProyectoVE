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
import * as actions from '../actions/eventParticipation';
import * as types from '../types/eventParticipation';
import * as schemas from '../schemas/users';
import * as schemas1 from '../schemas/eventParticipation';

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

export function* watchUsersFetchEventParticipation() {
    yield takeEvery(
        types.USERS_BY_EMAIL_FETCH_STARTED_EVENT,
        fetchUsers,
    );
}

function* addEventParticipation(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/participationEvent/create`,
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
                    actions.completeAddingEventParticipation(
                        action.payload.id,
                        info,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failAddingEventParticipation(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failAddingEventParticipation("Error de conexión"));
    }
}

export function* watchAddEventParticipation() {
    yield takeEvery(
        types.EVENT_PARTICIPATION_ADD_STARTED,
        addEventParticipation,
    );
}

function* fetchEventParticipation(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/participationEvent/participations-by-event/${action.payload.idEvent}`,
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
                    entities: { eventParticipations },
                    result,
                } = normalize(jsonResult.data, schemas1.eventParticipations);

                yield put(
                    actions.completeFetchingEventParticipation(
                        eventParticipations,
                        result,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingEventParticipation(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingEventParticipation("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchEventParticipationFetch() {
    yield takeEvery(
        types.EVENT_PARTICIPATION_FETCH_STARTED,
        fetchEventParticipation,
    );
}

function* deleteEventParticipation(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            if (action.payload.idEvent && action.payload.userid) {
                const token = yield select(selectors.getAuthToken);
                const response = yield call(
                    fetch,
                    `${API_BASE_URL}/participationEvent/delete/${action.payload.idEvent}/${action.payload.userid}`,
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
                        actions.completeRemovingEventParticipation(
                            action.payload.userid
                        ),
                    );
                } else {
                    const errors = yield response.json();
                    yield put(actions.failRemovingEventParticipation(errors.error));
                }
            }
        }
    } catch (error) {
        yield put(actions.failRemovingEventParticipation("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchDeleteEventParticipation() {
    yield takeEvery(
        types.EVENT_PARTICIPATION_REMOVE_STARTED,
        deleteEventParticipation,
    );
}