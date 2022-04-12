
import { GET_USER_LOGIN, SET_USER_LOGIN } from 'actions/user'
export default function myreducer(state = {}, action) {
  switch (action.type) {
    case GET_USER_LOGIN:
      return Object.assign({}, state, { ...action })
    case SET_USER_LOGIN:
      return Object.assign({}, state, { ...action })
    default:
      return state
  }
};