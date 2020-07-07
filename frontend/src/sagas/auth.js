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
import * as actions from '../actions/auth';
import * as types from '../types/auth';
  
import { API_BASE_URL } from '../settings';
  
function* register(action) {
    try {
        console.log(action.payload);
        const response = yield call(
            fetch,
            `${API_BASE_URL}/auth/signin`,
            {
                method: 'POST',
                body: JSON.stringify(action.payload),
                headers:{
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
        yield put(actions.failRegister("Connection refused"));
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
                headers:{
                    'Content-Type': 'application/json',
                },
            },
        );
    
        if (response.status === 200) {
            const  resp  = yield response.json();
            console.log(resp);
            yield put(actions.completeLogin(resp.data.token));
        } else {
            const errors = yield response.json();
            console.log(errors);
            yield put(actions.failLogin(errors.error));
        }
    } catch (error) {
        console.log(error);
        yield put(actions.failLogin("Connection refused"));
    }
}
  
export function* watchLoginStarted() {
    yield takeEvery(
        types.AUTHENTICATION_STARTED,
        login,
    );
}
  
function* refreshToken(action) {
    const expiration = yield select(selectors.getAuthExpiration);
    const now =  parseInt(new Date().getTime() / 1000);
    if (expiration - now < 300) {
        try {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/token-refresh/`,
                {
                    method: 'POST',
                    body: JSON.stringify({ token }),
                    headers:{
                    'Content-Type': 'application/json',
                    },
                },
            );
    
            if (response.status === 200) {
                const jResponse = yield response.json();
                yield put(actions.completeTokenRefresh(jResponse.token));
            } else {
                // TODO: poner un redirect al home (login)
                const errors = yield response.json();
                console.log(errors);
                yield put(actions.failTokenRefresh(errors.error));
            }
        } catch (error) {
            // TODO: poner un redirect al home (login)
            yield put(actions.failTokenRefresh("Connection refused"));
        }
    }
}
  
export function* watchRefreshTokenStarted() {
    yield takeEvery(
        types.TOKEN_REFRESH_STARTED,
        refreshToken,
    );
}