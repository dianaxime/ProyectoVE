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
import * as actions from '../actions/scholars';
import * as types from '../types/scholars';
import * as schemas from '../schemas/scholars';

import { API_BASE_URL } from '../settings';

function* fetchScholars(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/scholars/all-scholars`,
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
                    entities: { scholars },
                    result,
                } = normalize(jsonResult.data, schemas.scholars);

                yield put(
                    actions.completeFetchingScholars(
                        scholars,
                        result,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failFetchingScholars(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingScholars("Error de conexión"));
        console.log("ERROR", error);
    }
}

export function* watchScholarsFetch() {
    yield takeEvery(
        types.SCHOLARS_FETCH_STARTED,
        fetchScholars,
    );
}

function* addScholar(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/scholars/create`,
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
                yield put(
                    actions.completeAddingScholar(
                        action.payload.id,
                        jsonResult.data,
                    ),
                );
            } else {
                const errors = yield response.json();
                yield put(actions.failAddingScholar(errors.error));
            }
        }
    } catch (error) {
        yield put(actions.failAddingScholar("Error de conexión"));
    }
}

export function* watchAddScholar() {
    yield takeEvery(
        types.SCHOLAR_ADD_STARTED,
        addScholar,
    );
}