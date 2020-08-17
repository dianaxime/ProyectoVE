import {
  call,
  takeEvery,
  put,
  select,
} from 'redux-saga/effects';
import { normalize } from 'normalizr';

import * as selectors from '../reducers';
import * as actions from '../actions/teams';
import * as types from '../types/teams';
import * as schemas from '../schemas/teams';

import { API_BASE_URL } from '../settings';

function* fetchTeams(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/team/all-teams`,
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
          entities: { teams },
          result,
        } = normalize(jsonResult.data, schemas.teams);

        yield put(
          actions.completeFetchingTeams(
            teams,
            result,
          ),
        );
      } else {
        const errors = yield response.json();
        yield put(actions.failFetchingTeams(errors.error));
      }
    }
  } catch (error) {
    yield put(actions.failFetchingTeams("Error de conexión"));
    console.log("ERROR", error);
  }
}

export function* watchTeamsFetch() {
  yield takeEvery(
    types.TEAMS_FETCH_STARTED,
    fetchTeams,
  );
}

function* addTeam(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/team/create`,
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
          actions.completeAddingTeam(
            action.payload.id,
            jsonResult.data[0],
          ),
        );
      } else {
        const errors = yield response.json();
        yield put(actions.failAddingTeam(errors.error));
      }
    }
  } catch (error) {
    yield put(actions.failAddingTeam("Error de conexión"));
  }
}

export function* watchAddTeam() {
  yield takeEvery(
    types.TEAM_ADD_STARTED,
    addTeam,
  );
}

function* updateTeam(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/team/update-team`,
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
        const info = jsonResult.data[0];
        yield put(
          actions.completeUpdatingTeam(
            info.id,
            info,
          ),
        );
      } else {
        const errors = yield response.json();
        yield put(actions.failUpdatingTeam(errors.error));
      }
    }
  } catch (error) {
    yield put(actions.failUpdatingTeam("Error de conexión"));
  }
}

export function* watchUpdateTeam() {
  yield takeEvery(
    types.TEAM_UPDATE_STARTED,
    updateTeam,
  );
}