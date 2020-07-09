import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import auth, * as authSelectors from './auth';
import changeDrawer, * as changeDrawerSelectors from './changeDrawer';
import changeForgot, * as changeForgotSelectors from './modalForgot';
import changeChange, * as changeChangeSelectors from './modalChange';
import changeUpdate, * as changeUpdateSelectors from './modalUpdate';

const reducer = combineReducers({
  auth,
  changeDrawer,
  changeForgot,
  changeChange,
  changeUpdate,
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
/* Drawer */
export const getIsOpen = state => changeDrawerSelectors.getIsOpen(state.changeDrawer);
/* Forgot Password Modal */
export const getIsForgotOpen = state => changeForgotSelectors.getIsForgotOpen(state.changeForgot);
/* Change Password Modal */
export const getIsChangeOpen = state => changeChangeSelectors.getIsChangeOpen(state.changeChange);
/* Update Password Modal */
export const getIsUpdateOpen = state => changeUpdateSelectors.getIsUpdateOpen(state.changeUpdate);