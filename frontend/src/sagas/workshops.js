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
  import * as actions from '../actions/workshops';
  import * as types from '../types/workshops';
  import * as schemas from '../schemas/workshops';
  
  
  const API_BASE_URL = 'http://localhost:8000/api/v1';
  
  
  function* fetchWorkshops(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/workshops/`,
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
            entities: { workshops },
            result,
          } = normalize(jsonResult, schemas.workshops);
  
          yield put(
            actions.completeFetchingWorkshops(
              workshops,
              result,
            ),
          );
        } else {
           const { non_field_errors } = yield response.json();
           yield put(actions.failFetchingWorkshops(non_field_errors[0]));
        }
      }
    } catch (error) {
      // yield put(actions.failLogin('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
  }
  
  export function* watchWorkshopsFetch() {
    yield takeEvery(
      types.WORKSHOPS_FETCH_STARTED,
      fetchWorkshops,
    );
  }
  
  function* addWorkshop(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
      console.log(isAuth);
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/workshops/`,
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
            actions.completeAddingWorkshop(
              action.payload.id,
              jsonResult,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failAddingWorkshop(non_field_errors[0]));
        }
      }
    } catch (error) {
      // yield put(actions.failLogin('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
  }
  
  export function* watchAddWorkshop() {
    yield takeEvery(
      types.WORKSHOP_ADD_STARTED,
      addWorkshop,
    );
  }
  
  function* removeWorkshop(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/workshops/${action.payload.id.id}/`,
          {
            method: 'DELETE',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 204) {
          yield put(actions.completeRemovingWorkshop());
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failRemovingWorkshop(non_field_errors[0]));
        }
      }
    } catch (error) {
      // yield put(actions.failLogin('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
  }
  
  export function* watchRemoveWorkshop() {
    yield takeEvery(
      types.WORKSHOP_REMOVE_STARTED,
      removeWorkshop,
    );
  }

  function* updateWorkshop(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/workshops/${action.payload.id.id}/`,
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
            actions.completeUpdatingWorkshop(
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
  
  export function* watchUpdateWorkshop() {
    yield takeEvery(
      types.WORKSHOP_UPDATE_STARTED,
      updateWorkshop,
    );
  }