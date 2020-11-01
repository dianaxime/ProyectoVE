import {
    call,
    takeEvery,
    put,
    select,
    // race,
    // all,
    // delay,
} from 'redux-saga/effects';

import * as selectors from '../reducers';
import * as actions from '../actions/roles';
import * as types from '../types/roles';

import { API_BASE_URL } from '../settings';

function* fetchUserRoles(action) {
    const isAuth = yield select(selectors.isAuthenticated);
    if (isAuth) {
        try {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/auth/role/`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': `${token}`,
                    },
                },
            );

            if (response.status === 200) {
                const jResponse = yield response.json();
                yield put(actions.completeFetchRoles(jResponse.data));
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchRoles(errors.error));
            }
        } catch (error) {
            yield put(actions.failFetchRoles("Error de conexión"));
        }
    }
}


export function* watchFetchUserRolesStarted() {
    yield takeEvery(
        types.FETCH_ROLES_STARTED,
        fetchUserRoles,
    );
}
