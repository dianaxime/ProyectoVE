import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import auth, * as authSelectors from './auth';
import changeDrawer, * as changeDrawerSelectors from './changeDrawer';

const reducer = combineReducers({
  auth,
  changeDrawer,
  form: formReducer,
});

export default reducer;

/* Authentication */
export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const getIsRegistering = state => authSelectors.getIsRegistering(state.auth);
export const getRegisteringError = state => authSelectors.getRegisteringError(state.auth);
export const isAuthenticated = state => getAuthToken(state) != null;
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
export const getAuthEmail = state => authSelectors.getAuthEmail(state.auth);
export const getIsRefreshingToken = state => authSelectors.getIsRefreshingToken(state.auth);
export const getRefreshingError = state => authSelectors.getRefreshingError(state.auth);
export const getRegisteringCompleted = state => authSelectors.getRegisteringCompleted(state.auth);
/* Drawer */
export const getIsOpen = state => changeDrawerSelectors.getIsOpen(state.changeDrawer);