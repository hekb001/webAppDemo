
import { GET_PROCESS_DESIGN, SET_PROCESS_DESIGN } from 'actions/processDesign'
export default function myreducer(state = {}, action) {
  switch (action.type) {
    case GET_PROCESS_DESIGN:
      return Object.assign({}, state, { ...action })
    case SET_PROCESS_DESIGN:
      return Object.assign({}, state, { ...action })
    default:
      return state
  }
};