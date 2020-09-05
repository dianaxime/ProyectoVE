import * as types from '../types/selectedRol';

export const selectedRol = index => ({
    type: types.ROL_SELECTED,
    payload: index,
});