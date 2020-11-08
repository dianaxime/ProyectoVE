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
import * as actions from '../actions/events';
import * as types from '../types/events';
import * as schemas from '../schemas/events';
import * as actionsSelectedEvent from '../actions/selectedEvent';

import { API_BASE_URL } from '../settings';

function* fetchEvents(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/event/all-events`,
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
          entities: { events },
          result,
        } = normalize(jsonResult.data, schemas.events);

        yield put(
          actions.completeFetchingEvents(
            events,
            result,
          ),
        );
      } else {
        const errors = yield response.json();
        yield put(actions.failFetchingEvents(errors.error));
      }
    }
  } catch (error) {
    yield put(actions.failFetchingEvents("Error de conexión"));
    console.log("ERROR", error);
  }
}

export function* watchEventsFetch() {
  yield takeEvery(
    types.EVENTS_FETCH_STARTED,
    fetchEvents,
  );
}

function* addEvent(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/event/create`,
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
          actions.completeAddingEvent(
            action.payload.id,
            info,
          ),
        );

        yield put(
          actionsSelectedEvent.selectedEvent(info.id),
        );
      } else {
        const errors = yield response.json();
        yield put(actions.failAddingEvent(errors.error));
      }
    }
  } catch (error) {
    yield put(actions.failAddingEvent("Error de conexión"));
  }
}

export function* watchAddEvent() {
  yield takeEvery(
    types.EVENT_ADD_STARTED,
    addEvent,
  );
}

function* updateEvent(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/event/update-event`,
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
        const info = jsonResult.data;
        yield put(
          actions.completeUpdatingEvent(
            info.id,
            info,
          ),
        );
      } else {
        const errors = yield response.json();
        yield put(actions.failUpdatingEvent(errors.error));
      }
    }
  } catch (error) {
    yield put(actions.failUpdatingEvent("Error de conexión"));
  }
}

export function* watchUpdateEvent() {
  yield takeEvery(
    types.EVENT_UPDATE_STARTED,
    updateEvent,
  );
}

function* fetchScholarsHours(action) {
  try {
      const isAuth = yield select(selectors.isAuthenticated);

      if (isAuth) {
          const token = yield select(selectors.getAuthToken);
          const response = yield call(
              fetch,
              `${API_BASE_URL}/auth/scholars-hours/${action.payload.startdate}/${action.payload.enddate}`,
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
                  actions.completeFetchingScholarsHours(
                      jsonResult.data[0],
                  ),
              );
          } else {
              const errors = yield response.json();
              yield put(actions.failFetchingScholarsHours(errors.error));
          }
      }
  } catch (error) {
      yield put(actions.failFetchingScholarsHours("Error de conexión"));
      console.log("ERROR", error);
  }
}

export function* watchScholarsHoursFetch() {
  yield takeEvery(
      types.SCHOLARS_HOURS_FETCH_STARTED,
      fetchScholarsHours,
  );
}