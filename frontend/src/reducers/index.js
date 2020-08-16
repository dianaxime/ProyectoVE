import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import auth, * as authSelectors from './auth';
import workshops, * as workshopsSelectors from './workshops';
import scholars, * as scholarsSelectors from './scholars';
import participation, * as participationSelectors from './participation';

import changeDrawer, * as changeDrawerSelectors from './changeDrawer';
import changeForgot, * as changeForgotSelectors from './modalForgot';
import changeChange, * as changeChangeSelectors from './modalChange';
import changeUpdate, * as changeUpdateSelectors from './modalUpdate';
import changeScholar, * as changeScholarSelectors from './modalScholarship';

import selectedWorkshop, * as selectedWorkshopSelectors from './selectedWorkshop';

const reducer = combineReducers({
  auth,
  changeDrawer,
  changeForgot,
  changeChange,
  changeUpdate,
  workshops,
  scholars,
  changeScholar,
  selectedWorkshop,
  participation,
  form: formReducer,
});

export default reducer;

/* Authentication */
export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getUser = state => authSelectors.getUser(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const getIsRegistering = state => authSelectors.getIsRegistering(state.auth);
export const getRegisteringError = state => authSelectors.getRegisteringError(state.auth);
export const getRegisteringCompleted = state => authSelectors.getRegisteringCompleted(state.auth);
export const isAuthenticated = state => getAuthToken(state) != null;
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
export const getAuthEmail = state => authSelectors.getAuthEmail(state.auth);
export const getIsRefreshingToken = state => authSelectors.getIsRefreshingToken(state.auth);
export const getRefreshingError = state => authSelectors.getRefreshingError(state.auth);
export const getIsRecovering = state => authSelectors.getIsRecovering(state.auth);
export const getRecoveringError = state => authSelectors.getRecoveringError(state.auth);
export const getRecoveringCompleted = state => authSelectors.getRecoveringCompleted(state.auth);
export const getIsUpdating = state => authSelectors.getIsUpdating(state.auth);
export const getUpdatingError = state => authSelectors.getUpdatingError(state.auth);
export const getIsChanging = state => authSelectors.getIsChanging(state.auth);
export const getChangingError = state => authSelectors.getChangingError(state.auth);
export const getChangingCompleted = state => authSelectors.getChangingCompleted(state.auth);
export const getPendingUser = (state, id) => authSelectors.getPendingUser(state.auth, id);
export const getPendingUsers = state => authSelectors.getPendingUsers(state.auth);
export const isFetchingPendingUsers = state => authSelectors.isFetchingPendingUsers(state.auth);
export const getFetchingPendingUsersError = state => authSelectors.getFetchingPendingUsersError(state.auth);
/* Drawer */
export const getIsOpen = state => changeDrawerSelectors.getIsOpen(state.changeDrawer);
/* Forgot Password Modal */
export const getIsForgotOpen = state => changeForgotSelectors.getIsForgotOpen(state.changeForgot);
/* Scholar Password Modal */
export const getIsScholarOpen = state => changeScholarSelectors.getIsScholarOpen(state.changeScholar);
/* Change Password Modal */
export const getIsChangeOpen = state => changeChangeSelectors.getIsChangeOpen(state.changeChange);
/* Update Password Modal */
export const getIsUpdateOpen = state => changeUpdateSelectors.getIsUpdateOpen(state.changeUpdate);
/* Workshops */
export const getWorkshop = (state, id) => workshopsSelectors.getWorkshop(state.workshops, id);
export const getWorkshops = state => workshopsSelectors.getWorkshops(state.workshops);
export const isFetchingWorkshops = state => workshopsSelectors.isFetchingWorkshops(state.workshops);
export const getFetchingWorkshopsError = state => workshopsSelectors.getFetchingWorkshopsError(state.workshops);
/* Scholars */
export const getScholar = (state, id) => scholarsSelectors.getScholar(state.scholars, id);
export const getScholars = state => scholarsSelectors.getScholars(state.scholars);
export const isFetchingScholars = state => scholarsSelectors.isFetchingScholars(state.scholars);
export const getFetchingScholarsError = state => scholarsSelectors.getFetchingScholarsError(state.scholars);
/* Selected Workshop*/
export const getSelectedWorkshop = (state) => selectedWorkshopSelectors.getSelectedWorkshop(state.selectedWorkshop)
/* Participations */
export const getUserByEmail = (state, id) => participationSelectors.getUserByEmail(state.participation, id);
export const getUsersOrder = state => participationSelectors.getUsersOrder(state.participation);
export const getUsersByEmail = state => participationSelectors.getUsersByEmail(state.participation);
export const isFetchingUsersByEmail = state => participationSelectors.isFetchingUsersByEmail(state.participation);
export const getFetchingUsersByEmailError = state => participationSelectors.getFetchingUsersByEmailError(state.participation);
export const getParticipation = (state, id) => participationSelectors.getParticipation(state.participation, id);
export const getParticipations = state => participationSelectors.getParticipations(state.participation);
export const isFetchingParticipations = state => participationSelectors.isFetchingParticipations(state.participation);
export const getFetchingParticipationError = state => participationSelectors.getFetchingParticipationError(state.participation);