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
import * as actions from '../actions/workshops';
import * as types from '../types/workshops';
import * as schemas from '../schemas/workshops';

import { API_BASE_URL } from '../settings';

function* fetchWorkshops(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/workshop/all-workshops`,
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
          entities: { workshops },
          result,
        } = normalize(jsonResult.data, schemas.workshops);

        yield put(
          actions.completeFetchingWorkshops(
            workshops,
            result,
          ),
        );
      } else {
        const errors = yield response.json();
        yield put(actions.failFetchingWorkshops(errors.error));
      }
    }
  } catch (error) {
    yield put(actions.failFetchingWorkshops("Error de conexión"));
    console.log("ERROR", error);
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
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/workshop/create`,
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
          actions.completeAddingWorkshop(
            action.payload.id,
            jsonResult.data,
          ),
        );
      } else {
        const errors = yield response.json();
        yield put(actions.failAddingWorkshop(errors.error));
      }
    }
  } catch (error) {
    yield put(actions.failAddingWorkshop("Error de conexión"));
  }
}

export function* watchAddWorkshop() {
  yield takeEvery(
    types.WORKSHOP_ADD_STARTED,
    addWorkshop,
  );
}

function* updateWorkshop(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/workshop/update-workshop`,
        {
          method: 'PATCH',
          body: JSON.stringify(action.payload),
          headers: {
            'Content-Type': 'application/json',
            'token': `${token}`,
          },
        }
      );
      console.log(response)
      if (response.status === 200) {
        const jsonResult = yield response.json();
        yield put(
          actions.completeUpdatingWorkshop(
            jsonResult.data.id,
            jsonResult.data,
          ),
        );
      } else {
        const errors = yield response.json();
        yield put(actions.failUpdatingWorkshop(errors.error));
      }
    }
  } catch (error) {
    yield put(actions.failUpdatingWorkshop("Error de conexión"));
  }
}

export function* watchUpdateWorkshop() {
  yield takeEvery(
    types.WORKSHOP_UPDATE_STARTED,
    updateWorkshop,
  );
}