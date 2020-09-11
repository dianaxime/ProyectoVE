import {
    call,
    takeEvery,
    put,
    select,
  } from 'redux-saga/effects';
  import { normalize } from 'normalizr';
  
  import * as selectors from '../reducers';
  import * as actions from '../actions/associationClub';
  import * as types from '../types/associationClub';
  import * as schemas from '../schemas/associationClub';
  import * as actionsSelectedAssociationClub from '../actions/selectedAssociationClub';
  
  import { API_BASE_URL } from '../settings';
  
  function* fetchAssociationClubs(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/association-club/all-association-club`,
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
            entities: { associationClubs },
            result,
          } = normalize(jsonResult.data, schemas.associationClubs);
  
          yield put(
            actions.completeFetchingAssociationClubs(
              associationClubs,
              result,
            ),
          );
        } else {
          const errors = yield response.json();
          yield put(actions.failFetchingAssociationClubs(errors.error));
        }
      }
    } catch (error) {
      yield put(actions.failFetchingAssociationClubs("Error de conexión"));
      console.log("ERROR", error);
    }
  }
  
  export function* watchAssociationClubsFetch() {
    yield takeEvery(
      types.ASSOCIATION_CLUBS_FETCH_STARTED,
      fetchAssociationClubs,
    );
  }
  
  function* addAssociationClub(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/association-club/create`,
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
          const info = jsonResult.data[0];
          yield put(
            actions.completeAddingAssociationClub(
              action.payload.id,
              info,
            ),
          );
  
          yield put(
            actionsSelectedAssociationClub.selectedAssociationClub(info.id),
          );
        } else {
          const errors = yield response.json();
          yield put(actions.failAddingAssociationClub(errors.error));
        }
      }
    } catch (error) {
      yield put(actions.failAddingAssociationClub("Error de conexión"));
    }
  }
  
  export function* watchAddAssociationClub() {
    yield takeEvery(
      types.ASSOCIATION_CLUB_ADD_STARTED,
      addAssociationClub,
    );
  }
  
  function* updateAssociationClub(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/association-club/update-association-club`,
          {
            method: 'PATCH',
            body: JSON.stringify(action.payload),
            headers: {
              'Content-Type': 'application/json',
              'token': `${token}`,
            },
          }
        );
        if (response.status === 200) {
          const jsonResult = yield response.json();
          const info = jsonResult.data[0];
          yield put(
            actions.completeUpdatingAssociationClub(
              info.id,
              info,
            ),
          );
        } else {
          const errors = yield response.json();
          yield put(actions.failUpdatingAssociationClub(errors.error));
        }
      }
    } catch (error) {
      yield put(actions.failUpdatingAssociationClub("Error de conexión"));
    }
  }
  
  export function* watchUpdateAssociationClub() {
    yield takeEvery(
      types.ASSOCIATION_CLUB_UPDATE_STARTED,
      updateAssociationClub,
    );
  }