import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    delay,
    select,
  } from 'redux-saga/effects';
  import { normalize } from 'normalizr';
  
  import * as selectors from '../reducers';
  import * as actions from '../actions/talleres';
  import * as types from '../types/talleres';
  import * as schemas from '../schemas/talleres';
  
  
  const API_BASE_URL = 'http://localhost:8000/api/v1';
  
  
  function* fetchTalleres(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const student = yield select(selectors.getAuthUserID)
        const response = yield call(
          fetch,
          `${API_BASE_URL}/talleres/`,
          {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          const jsonResult = yield response.json();
          const {
            entities: { talleres },
            result,
          } = normalize(jsonResult, schemas.talleres);
  
          yield put(
            actions.completeFetchingTalleres(
              talleres,
              result,
            ),
          );
        } else {
           const { non_field_errors } = yield response.json();
           yield put(actions.failFetchingTalleres(non_field_errors[0]));
        }
      }
    } catch (error) {
      // yield put(actions.failLogin('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
  }
  
  export function* watchTalleresFetch() {
    yield takeEvery(
      types.TALLERES_FETCH_STARTED,
      fetchTalleres,
    );
  }
  
  function* addTaller(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
      console.log(isAuth);
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/talleres/`,
          {
            method: 'POST',
            body: JSON.stringify(action.payload),
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 201) {
          const jsonResult = yield response.json();
          yield put(
            actions.completeAddingTaller(
              action.payload.id,
              jsonResult,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failAddingTaller(non_field_errors[0]));
        }
      }
    } catch (error) {
      // yield put(actions.failLogin('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
  }
  
  export function* watchAddTaller() {
    yield takeEvery(
      types.TALLER_ADD_STARTED,
      addTaller,
    );
  }
  
  function* removeTaller(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/talleres/${action.payload.id.id}/`,
          {
            method: 'DELETE',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 204) {
          yield put(actions.completeRemovingTaller());
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failRemovingTaller(non_field_errors[0]));
        }
      }
    } catch (error) {
      // yield put(actions.failLogin('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
  }
  
  export function* watchRemoveTaller() {
    yield takeEvery(
      types.TALLER_REMOVE_STARTED,
      removeTaller,
    );
  }

  function* updateTaller(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/talleres/${action.payload.id.id}/`,
          {
            method: 'PUT',
            body: JSON.stringify(action.payload.id),
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const jsonResult = yield response.json();
          yield put(
            actions.completeUpdatingTaller(
              action.payload.delva.id,
              jsonResult,
            ),
          );
        } else {
          console.log("ALGO SALIO MAL Y NO ENTRA COMO 200")
          
        }
      }
    } catch (error) {
      console.log("algo salio mal", error)
    }
  }
  
  export function* watchUpdateTaller() {
    yield takeEvery(
      types.TALLER_UPDATE_STARTED,
      updateTaller,
    );
  }