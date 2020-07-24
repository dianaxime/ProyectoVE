import * as types from '../types/modalScholarship';

export const changeScholar = open => ({
  type: types.SCHOLARSHIP_OPENED,
  payload: open,
});