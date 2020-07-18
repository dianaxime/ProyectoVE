import { fork, all } from 'redux-saga/effects';

import {
    watchLoginStarted,
    watchRefreshTokenStarted,
    watchRegisterStarted,
    watchRecoverStarted,
    watchUpdateUserStarted,
    watchChangePassStarted,
    watchFetchingUsersStarted,
    watchAuthorizeStarted,
} from './auth';

import {
    watchAddTaller,
    watchTalleresFetch,
    watchRemoveTaller,
    watchUpdateTaller
  } from './talleres';

function* mainSaga() {
    yield all([
        /* Auth */
        fork(watchLoginStarted),
        fork(watchRefreshTokenStarted),
        fork(watchRegisterStarted),
        fork(watchRecoverStarted),
        fork(watchUpdateUserStarted),
        fork(watchChangePassStarted),
        fork(watchFetchingUsersStarted),
        fork(watchAuthorizeStarted),
        fork(watchAddTaller),
        fork(watchTalleresFetch),
        fork(watchRemoveTaller),
        fork(watchUpdateTaller),
    ]);
}

export default mainSaga;