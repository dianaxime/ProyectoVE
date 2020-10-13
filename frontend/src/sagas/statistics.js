import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    //delay,
    select,
} from 'redux-saga/effects';

import * as selectors from '../reducers';
import * as actions from '../actions/statistics';
import * as types from '../types/statistics';

import { API_BASE_URL } from '../settings';


function* fetchAssistanceClub(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/assistances-of-club/${action.payload.idc}/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingAssistanceClub(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingAssistanceClub(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingAssistanceClub("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchAssistanceClubFetch() {
    yield takeEvery(
        types.ASSISTANCE_CLUB_FETCH_STARTED,
        fetchAssistanceClub,
    );
}


function* fetchAssistanceClubs(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/assistances-of-clubs/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingAssistanceClubs(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingAssistanceClubs(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingAssistanceClubs("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchAssistanceClubsFetch() {
    yield takeEvery(
        types.ASSISTANCE_CLUBS_FETCH_STARTED,
        fetchAssistanceClubs,
    );
}

function* fetchPlayers(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/players-tournament/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingPlayers(
                        jsonResult.data[0],
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingPlayers(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingPlayers("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchPlayersFetch() {
    yield takeEvery(
        types.PLAYERS_FETCH_STARTED,
        fetchPlayers,
    );
}

function* fetchPlayersSport(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/players-of-sport-tournament/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingPlayersSport(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingPlayersSport(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingPlayersSport("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchPlayersSportFetch() {
    yield takeEvery(
        types.PLAYERS_SPORT_FETCH_STARTED,
        fetchPlayersSport,
    );
}

function* fetchTeamst(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/teams-tournament/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingTeamst(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingTeamst(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingTeamst("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchTeamstFetch() {
    yield takeEvery(
        types.TEAMST_FETCH_STARTED,
        fetchTeamst,
    );
}

function* fetchTeamstSport(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/teams-of-sport-tournament/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingTeamstSport(
                        jsonResult.data[0],
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingTeamstSport(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingTeamstSport("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchTeamstSportFetch() {
    yield takeEvery(
        types.TEAMST_SPORT_FETCH_STARTED,
        fetchTeamstSport,
    );
}

function* fetchGendert(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/genders-tournament/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingGendert(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingGendert(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingGendert("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchGendertFetch() {
    yield takeEvery(
        types.GENDERT_FETCH_STARTED,
        fetchGendert,
    );
}

function* fetchGendertSport(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/genders-of-sport-tournament/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingGendertSport(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingGendertSport(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingGendertSport("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchGendertSportFetch() {
    yield takeEvery(
        types.GENDERT_SPORT_FETCH_STARTED,
        fetchGendertSport,
    );
}

function* fetchScholarss(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/quantity-scholars/`,
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
                    actions.completeFetchingScholarss(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingScholarss(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingScholarss("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchScholarssFetch() {
    yield takeEvery(
        types.SCHOLARSS_FETCH_STARTED,
        fetchScholarss,
    );
}

function* fetchParticipationWKTime(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/participation-workshops/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingParticipationWKTime(
                        jsonResult.data[0],
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingParticipationWKTime(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingParticipationWKTime("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchParticipationWKTimeFetch() {
    yield takeEvery(
        types.PARTICIPATIONWK_TIME_FETCH_STARTED,
        fetchParticipationWKTime,
    );
}

function* fetchParticipationWK(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/participation-workshop/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingParticipationWK(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingParticipationWK(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingParticipationWK("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchParticipationWKFetch() {
    yield takeEvery(
        types.PARTICIPATIONWK_FETCH_STARTED,
        fetchParticipationWK,
    );
}

function* fetchParticipationWKTimeG(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/gender-participation-workshops/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingParticipationWKTimeG(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingParticipationWKTimeG(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingParticipationWKTimeG("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchParticipationWKTimeGFetch() {
    yield takeEvery(
        types.PARTICIPATIONWK_TIME_G_FETCH_STARTED,
        fetchParticipationWKTimeG,
    );
}

function* fetchParticipationWKG(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/gender-participation-workshop/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingParticipationWKG(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingParticipationWKG(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingParticipationWKG("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchParticipationWKGFetch() {
    yield takeEvery(
        types.PARTICIPATIONWK_TIME_G_FETCH_STARTED,
        fetchParticipationWKG,
    );
}
