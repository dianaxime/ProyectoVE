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
    watchAddWorkshop,
    watchWorkshopsFetch,
    watchUpdateWorkshop,
} from './workshops';

import {
    watchAddScholar,
    watchScholarsFetch,
} from './scholars';

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
        /* Workshop */
        fork(watchAddWorkshop),
        fork(watchWorkshopsFetch),
        fork(watchUpdateWorkshop),
        /* Scholar */
        fork(watchAddScholar),
        fork(watchScholarsFetch),
    ]);
}

export default mainSaga;