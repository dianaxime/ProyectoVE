import {
    call,
    takeEvery,
    put,
    select,
    // race,
    // all,
    // delay,
} from 'redux-saga/effects';

import { normalize } from 'normalizr';
import * as selectors from '../reducers';
import * as actions from '../actions/auth';
import * as types from '../types/auth';
import * as schemas from '../schemas/pendingUsers';

import { API_BASE_URL, URL } from '../settings';

function* register(action) {
    try {
        console.log(action.payload);
        const response = yield call(
            fetch,
            `${API_BASE_URL}/auth/signin`,
            {
                method: 'POST',
                body: JSON.stringify(action.payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        console.log(response);
        if (response.status === 201) {
            yield put(actions.completeRegister());
        } else {
            const errors = yield response.json();
            yield put(actions.failRegister(errors.error));
        }
    } catch (error) {
        yield put(actions.failRegister("Error de conexión"));
    }
}

export function* watchRegisterStarted() {
    yield takeEvery(
        types.REGISTER_STARTED,
        register,
    );
}

function* login(action) {
    try {
        const response = yield call(
            fetch,
            `${API_BASE_URL}/auth/login`,
            {
                method: 'POST',
                body: JSON.stringify(action.payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        if (response.status === 200) {
            const resp = yield response.json();
            console.log(resp);
            yield put(actions.completeLogin(resp.data.token, resp.data));
        } else {
            const errors = yield response.json();
            console.log(errors);
            yield put(actions.failLogin(errors.error));
        }
    } catch (error) {
        console.log(error);
        yield put(actions.failLogin("Error de conexión"));
    }
}

export function* watchLoginStarted() {
    yield takeEvery(
        types.AUTHENTICATION_STARTED,
        login,
    );
}

function* refreshToken(action) {
    const isAuth = yield select(selectors.isAuthenticated);
    if (isAuth) {
        const expiration = yield select(selectors.getAuthExpiration);
        const now = parseInt(new Date().getTime() / 1000);
        if (expiration - now < 400) {
            try {
                const token = yield select(selectors.getAuthToken);
                const response = yield call(
                    fetch,
                    `${API_BASE_URL}/auth/token-refresh`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'token': `${token}`,
                        },
                    },
                );

                if (response.status === 200) {
                    const jResponse = yield response.json();
                    yield put(actions.completeTokenRefresh(jResponse.data.token));
                } else {
                    // TODO: poner un redirect al home (login)
                    const errors = yield response.json();
                    console.log(errors);
                    yield put(actions.failTokenRefresh(errors.error));
                    yield put(actions.logout());
                    window.location.href = URL + 'auth';
                }
            } catch (error) {
                // TODO: poner un redirect al home (login)
                yield put(actions.failTokenRefresh("Error de conexión"));
                yield put(actions.logout());
                window.location.href = URL + 'auth';
            }
        }
    }
}

export function* watchRefreshTokenStarted() {
    yield takeEvery(
        types.TOKEN_REFRESH_STARTED,
        refreshToken,
    );
}

function* recover(action) {
    try {
        console.log(action.payload);
        const response = yield call(
            fetch,
            `${API_BASE_URL}/auth/forgot`,
            {
                method: 'PATCH',
                body: JSON.stringify(action.payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        console.log(response);
        if (response.status === 200) {
            yield put(actions.completeRecover());
        } else {
            const errors = yield response.json();
            yield put(actions.failRecover(errors.error));
        }
    } catch (error) {
        yield put(actions.failRecover("Error de conexión"));
    }
}

export function* watchRecoverStarted() {
    yield takeEvery(
        types.RECOVER_STARTED,
        recover,
    );
}

function* updateUser(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            console.log(action.payload);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/auth/update`,
                {
                    method: 'PATCH',
                    body: JSON.stringify(action.payload),
                    headers: {
                        'Content-Type': 'application/json',
                        'token': `${token}`,
                    },
                },
            );
            console.log(response);
            if (response.status === 200) {
                const resp = yield response.json();
                console.log(resp);
                yield put(actions.completeUpdateUser(resp.data));
            } else {
                const errors = yield response.json();
                yield put(actions.failUpdateUser(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failUpdateUser("Error de conexión"));
    }
}

export function* watchUpdateUserStarted() {
    yield takeEvery(
        types.UPDATE_USER_STARTED,
        updateUser,
    );
}

function* changePass(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            console.log(action.payload);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/auth/change`,
                {
                    method: 'PATCH',
                    body: JSON.stringify(action.payload),
                    headers: {
                        'Content-Type': 'application/json',
                        'token': `${token}`,
                    },
                },
            );
            if (response.status === 200) {
                yield put(actions.completeChangePass());
            } else {
                const errors = yield response.json();
                yield put(actions.failChangePass(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failChangePass("Error de conexión"));
    }
}

export function* watchChangePassStarted() {
    yield takeEvery(
        types.CHANGE_PASSWORD_STARTED,
        changePass,
    );
}

function* fetchPendingUsers(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/auth/pending-users`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': `${token}`,
                    },
                },
            );
            if (response.status === 200) {
                const jsonResult = yield response.json();
                const {
                    entities: { pendingUsers },
                    result,
                } = normalize(jsonResult.data, schemas.pendingUsers);
                yield put(actions.completeFetchingUsers(pendingUsers, result));
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingUsers(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingUsers("Error de conexión"));
    }
}

export function* watchFetchingUsersStarted() {
    yield takeEvery(
        types.PENDING_USERS_FETCH_STARTED,
        fetchPendingUsers,
    );
}

function* authorizeUser(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/auth/authorize`,
                {
                    method: 'PATCH',
                    body: JSON.stringify(action.payload),
                    headers: {
                        'Content-Type': 'application/json',
                        'token': `${token}`,
                    },
                },
            );
            if (response.status === 200) {
                const jsonResult = yield response.json();
                yield put(actions.completeAuthorize(jsonResult.data.id));
            } else {
                const errors = yield response.json();
                yield put(actions.failAuthorize(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failAuthorize("Error de conexión"));
    }
}

export function* watchAuthorizeStarted() {
    yield takeEvery(
        types.AUTHORIZE_USER_STARTED,
        authorizeUser,
    );
}