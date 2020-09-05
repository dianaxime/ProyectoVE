import * as types from '../types/selectedAUser';

export const selectedAUser = index => ({
    type: types.USER_SELECTED,
    payload: index,
});