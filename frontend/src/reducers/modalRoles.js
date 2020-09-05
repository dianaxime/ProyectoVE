import * as types from '../types/modalRoles';

const changeRoles = (state = false, action) => {
  switch (action.type) {
    case types.ROLES_OPENED: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default changeRoles;

export const getIsRolesOpen = state => state;