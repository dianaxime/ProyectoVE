import * as types from '../types/modalUserScholarHours';

export const checkScholarHours = open => ({
  type: types.USERSCHOLARHOURS_OPENED,
  payload: open,
});