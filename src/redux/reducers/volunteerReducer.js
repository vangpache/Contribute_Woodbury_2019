import { combineReducers } from 'redux';

const volunteerRoleList = (state = [], action) => {
  switch (action.type) {
    case 'SET_VOLUNTEER_ROLES':
      return action.payload;
    case 'SET_SPECIFIC_VOLUNTEERS' :
      return action.payload;
    default:
      return state;
  }
}

const specificRole = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SPECIFIC_ROLES' :
      return action.payload;
    default:
      return state
  }
}

const previousSignUps = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SIGNUP':
      return [...state, action.payload];
    case 'CLEAR_SIGNUP_LIST':
      return [];
    default:
      return state;
  }
}

export default combineReducers({
  volunteerRoleList,
  previousSignUps,
  specificRole,
  // savedVolunteers
});