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
  import * as actionsSelectedTeam from '../actions/selectedTeam';
  
  import { API_BASE_URL } from '../settings';
  
  function* fetchAssociatonClubs(action) {
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
            entities: { associatonClubs },
            result,
          } = normalize(jsonResult.data, schemas.associatonClubs);
  
          yield put(
            actions.completeFetchingAssociatonClubs(
              associatonClubs,
              result,
            ),
          );
        } else {
          const errors = yield response.json();
          yield put(actions.failFetchingAssociatonClubs(errors.error));
        }
      }
    } catch (error) {
      yield put(actions.failFetchingAssociatonClubs("Error de conexión"));
      console.log("ERROR", error);
    }
  }
  
  export function* watchAssociationClubsFetch() {
    yield takeEvery(
      types.ASSOCIATION_CLUBS_FETCH_STARTED,
      fetchAssociatonClubs,
    );
  }
  
  function* addAssociatonClub(action) {
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
            actions.completeAddingAssociatonClub(
              action.payload.id,
              info,
            ),
          );
  
          yield put(
            actionsSelectedAssociatonClub.selectedAssociatonClub(info.id),
          );
        } else {
          const errors = yield response.json();
          yield put(actions.failAddingAssociatonClub(errors.error));
        }
      }
    } catch (error) {
      yield put(actions.failAddingAssociatonClub("Error de conexión"));
    }
  }
  
  export function* watchAddAssociatonClub() {
    yield takeEvery(
      types.ASSOCIATION_CLUB_ADD_STARTED,
      addAssociatonClub,
    );
  }
  
  function* updateAssociatonClub(action) {
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
            actions.completeUpdatingAssociatonClub(
              info.id,
              info,
            ),
          );
        } else {
          const errors = yield response.json();
          yield put(actions.failUpdatingAssociatonClub(errors.error));
        }
      }
    } catch (error) {
      yield put(actions.failUpdatingAssociatonClub("Error de conexión"));
    }
  }
  
  export function* watchUpdateAssociatonClub() {
    yield takeEvery(
      types.ASSOCIATION_CLUB_UPDATE_STARTED,
      updateAssociatonClub,
    );
  }