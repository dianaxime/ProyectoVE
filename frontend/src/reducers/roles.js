import * as types from '../types/roles';

const userRoles = (state = null, action) => {
    switch (action.type) {
        case types.FETCH_ROLES_COMPLETED: {
            return action.payload;
        }
        case types.FETCH_ROLES_FAILED: {
            return null;
        }
        default: {
            return state;
        }
    }
};

export default userRoles;


export const getUserRoles = state => state;