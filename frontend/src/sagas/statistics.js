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

function* fetchFemaleScholars(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/female-scholars/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingFemaleScholars(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingFemaleScholars(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingFemaleScholars("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchFemaleScholarsFetch() {
    yield takeEvery(
        types.FEMALE_SCHOLARS_FETCH_STARTED,
        fetchFemaleScholars,
    );
}

function* fetchMaleScholars(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/male-scholars/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingMaleScholars(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingMaleScholars(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingMaleScholars("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchMaleScholarsFetch() {
    yield takeEvery(
        types.MALE_SCHOLARS_FETCH_STARTED,
        fetchMaleScholars,
    );
}

function* fetchCountEvents(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/count-events/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingCountEvents(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingCountEvents(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingCountEvents("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchCountEventsFetch() {
    yield takeEvery(
        types.COUNT_EVENTS_FETCH_STARTED,
        fetchCountEvents,
    );
}

function* fetchMaleUsers(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/male_users`,
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
                    actions.completeFetchingMaleUsers(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingMaleUsers(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingMaleUsers("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchMaleUsersFetch() {
    yield takeEvery(
        types.MALE_USERS_FETCH_STARTED,
        fetchMaleUsers,
    );
}

function* fetchFemaleUsers(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/female_users`,
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
                    actions.completeFetchingFemaleUsers(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingFemaleUsers(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingFemaleUsers("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchFemaleUsersFetch() {
    yield takeEvery(
        types.FEMALE_USERS_FETCH_STARTED,
        fetchFemaleUsers,
    );
}

function* fetchUsersFaculty(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/users_by_faculty`,
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
                    actions.completeFetchingUsersFaculty(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingUsersFaculty(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingUsersFaculty("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchUsersFacultyFetch() {
    yield takeEvery(
        types.USERS_FACULTY_FETCH_STARTED,
        fetchUsersFaculty,
    );
}

function* fetchFemaleUsersFaculty(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/users_by_faculty_female`,
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
                    actions.completeFetchingFemaleUsersFaculty(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingFemaleUsersFaculty(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingFemaleUsersFaculty("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchFemaleUsersFacultyFetch() {
    yield takeEvery(
        types.F_USERS_FACULTY_FETCH_STARTED,
        fetchFemaleUsersFaculty,
    );
}

function* fetchMaleUsersFaculty(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/users_by_faculty_male`,
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
                    actions.completeFetchingMaleUsersFaculty(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingMaleUsersFaculty(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingMaleUsersFaculty("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchMaleUsersFacultyFetch() {
    yield takeEvery(
        types.M_USERS_FACULTY_FETCH_STARTED,
        fetchMaleUsersFaculty,
    );
}

function* fetchUsersCareer(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/users_by_career`,
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
                    actions.completeFetchingUsersCareer(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingUsersCareer(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingUsersCareer("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchUsersCareerFetch() {
    yield takeEvery(
        types.USERS_CAREER_FETCH_STARTED,
        fetchUsersCareer,
    );
}

function* fetchFemaleUsersCareer(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/users_by_career_female`,
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
                    actions.completeFetchingFemaleUsersCareer(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingFemaleUsersCareer(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingFemaleUsersCareer("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchFemaleUsersCareerFetch() {
    yield takeEvery(
        types.F_USERS_CAREER_FETCH_STARTED,
        fetchFemaleUsersCareer,
    );
}

function* fetchMaleUsersCareer(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/users_by_career_male`,
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
                    actions.completeFetchingMaleUsersCareer(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingMaleUsersCareer(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingMaleUsersCareer("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchMaleUsersCareerFetch() {
    yield takeEvery(
        types.M_USERS_CAREER_FETCH_STARTED,
        fetchMaleUsersCareer,
    );
}

function* fetchParticipationArtClubs(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/participations-artistic-clubs/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingParticipationArtClubs(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingParticipationArtClubs(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingParticipationArtClubs("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchParticipationArtClubsFetch() {
    yield takeEvery(
        types.PARTICIPATION_ARTCLUBS_FETCH_STARTED,
        fetchParticipationArtClubs,
    );
}

function* fetchParticipationArtClub(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/participations-artistic-clubs-by-club/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingParticipationArtClub(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingParticipationArtClub(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingParticipationArtClub("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchParticipationArtClubFetch() {
    yield takeEvery(
        types.PARTICIPATION_ARTCLUB_FETCH_STARTED,
        fetchParticipationArtClub,
    );
}

function* fetchParticipationArtClubF(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/female-participations-artistic-clubs-by-club/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingParticipationArtClubF(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingParticipationArtClubF(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingParticipationArtClubF("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchParticipationArtClubFFetch() {
    yield takeEvery(
        types.PARTICIPATION_ARTCLUB_F_FETCH_STARTED,
        fetchParticipationArtClubF,
    );
}

function* fetchParticipationArtClubM(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/male-participations-artistic-clubs-by-club/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingParticipationArtClubM(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingParticipationArtClubM(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingParticipationArtClubM("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchParticipationArtClubMFetch() {
    yield takeEvery(
        types.PARTICIPATION_ARTCLUB_M_FETCH_STARTED,
        fetchParticipationArtClubM,
    );
}

function* fetchParticipationSportClubs(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/participations-sport-clubs/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingParticipationSportClubs(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingParticipationSportClubs(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingParticipationSportClubs("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchParticipationSportClubsFetch() {
    yield takeEvery(
        types.PARTICIPATION_SPORTCLUBS_FETCH_STARTED,
        fetchParticipationSportClubs,
    );
}

function* fetchParticipationSportClub(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/participations-sport-clubs-by-club/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingParticipationSportClub(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingParticipationSportClub(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingParticipationSportClub("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchParticipationSportClubFetch() {
    yield takeEvery(
        types.PARTICIPATION_SPORTCLUB_FETCH_STARTED,
        fetchParticipationSportClub,
    );
}

function* fetchParticipationSportClubF(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/female-participations-sport-clubs-by-club/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingParticipationSportClubF(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingParticipationSportClubF(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingParticipationSportClubF("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchParticipationSportClubFFetch() {
    yield takeEvery(
        types.PARTICIPATION_SPORTCLUB_F_FETCH_STARTED,
        fetchParticipationSportClubF,
    );
}

function* fetchParticipationSportClubM(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/male-participations-sport-clubs-by-club/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingParticipationSportClubM(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingParticipationSportClubM(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingParticipationSportClubM("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchParticipationSportClubMFetch() {
    yield takeEvery(
        types.PARTICIPATION_SPORTCLUB_M_FETCH_STARTED,
        fetchParticipationSportClubM,
    );
}

function* fetchParticipationAcadClubs(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/participations-academic-clubs/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingParticipationAcadClubs(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingParticipationAcadClubs(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingParticipationAcadClubs("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchParticipationAcadClubsFetch() {
    yield takeEvery(
        types.PARTICIPATION_ACADEMICCLUBS_FETCH_STARTED,
        fetchParticipationAcadClubs,
    );
}

function* fetchParticipationAcadClub(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/participations-academic-clubs/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingParticipationAcadClub(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingParticipationAcadClub(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingParticipationAcadClub("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchParticipationAcadClubFetch() {
    yield takeEvery(
        types.PARTICIPATION_ACADEMICCLUB_FETCH_STARTED,
        fetchParticipationAcadClub,
    );
}

function* fetchParticipationAcadClubF(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/female-participations-academic-clubs-by-club/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingParticipationAcadClubF(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingParticipationAcadClubF(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingParticipationAcadClubF("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchParticipationAcadClubFFetch() {
    yield takeEvery(
        types.PARTICIPATION_ACADEMICCLUB_F_FETCH_STARTED,
        fetchParticipationAcadClubF,
    );
}

function* fetchParticipationAcadClubM(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/male-participations-academic-clubs-by-club/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingParticipationAcadClubM(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingParticipationAcadClubM(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingParticipationAcadClubM("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchParticipationAcadClubMFetch() {
    yield takeEvery(
        types.PARTICIPATION_ACADEMICCLUB_M_FETCH_STARTED,
        fetchParticipationAcadClubM,
    );
}

function* fetchParticipationAgrupations(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/participations-agrupations/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingParticipationAgrupations(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingParticipationAgrupations(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingParticipationAgrupations("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchParticipationAgrupationsFetch() {
    yield takeEvery(
        types.PARTICIPATION_AGRUPATIONS_FETCH_STARTED,
        fetchParticipationAgrupations,
    );
}

function* fetchParticipationAgrupation(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/participations-agrupations-by-agrupation/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingParticipationAgrupation(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingParticipationAgrupation(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingParticipationAgrupation("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchParticipationAgrupationFetch() {
    yield takeEvery(
        types.PARTICIPATION_AGRUPATION_FETCH_STARTED,
        fetchParticipationAgrupation,
    );
}

function* fetchParticipationAgrupationF(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/female-participations-agrupations-by-agrupation/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingParticipationAgrupationF(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingParticipationAgrupationF(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingParticipationAgrupationF("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchParticipationAgrupationFFetch() {
    yield takeEvery(
        types.PARTICIPATION_AGRUPATION_F_FETCH_STARTED,
        fetchParticipationAgrupationF,
    );
}

function* fetchParticipationAgrupationM(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/statistics/male-participations-agrupations-by-agrupation/${action.payload.startdate}/${action.payload.enddate}`,
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
                    actions.completeFetchingParticipationAgrupationM(
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingParticipationAgrupationM(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingParticipationAgrupationM("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchParticipationAgrupationMFetch() {
    yield takeEvery(
        types.PARTICIPATION_AGRUPATION_M_FETCH_STARTED,
        fetchParticipationAgrupationM,
    );
}

