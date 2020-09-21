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
import * as actions from '../actions/tournament';
import * as types from '../types/tournament';
import * as schemas from '../schemas/users';
import * as schemas1 from '../schemas/tournament';

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

export function* watchUsersFetchTournament() {
    yield takeEvery(
        types.USERS_BY_EMAIL_FETCH_STARTED_TOURNAMENT,
        fetchUsers,
    );
}

function* addTournament(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/tournaments/create`,
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
                    actions.completeAddingTournament(
                        action.payload.id,
                        info,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failAddingTournament(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failAddingTournament("Error de conexión"));
    }
}

export function* watchAddTournament() {
    yield takeEvery(
        types.TOURNAMENT_ADD_STARTED,
        addTournament,
    );
}

function* fetchTournament(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/tournaments/tournaments-by-team/${action.payload.idt}`,
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
                    entities: { tournaments },
                    result,
                } = normalize(jsonResult.data, schemas1.tournaments);

                yield put(
                    actions.completeFetchingTournament(
                        tournaments,
                        result,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingTournament(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingTournament("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchTournamentFetch() {
    yield takeEvery(
        types.TOURNAMENT_FETCH_STARTED,
        fetchTournament,
    );
}

function* deleteTournament(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            if (action.payload.idt && action.payload.userid) {
                const token = yield select(selectors.getAuthToken);
                const response = yield call(
                    fetch,
                    `${API_BASE_URL}/tournaments/delete/${action.payload.idt}/${action.payload.userid}`,
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
                        actions.completeRemovingTournament(
                            action.payload.userid
                        ),
                    );
                } else {
                    const errors = yield response.json();
                    yield put(actions.failRemovingTournament(errors.error));
                }
            }
        }
    } catch (error) {
        yield put(actions.failRemovingTournament("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchDeleteTournament() {
    yield takeEvery(
        types.TOURNAMENT_REMOVE_STARTED,
        deleteTournament,
    );
}