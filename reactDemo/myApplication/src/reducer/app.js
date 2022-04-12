import { DUPLICATE_APP_ACTION } from 'actions/app';

export default function (state = { user_info: {} }, action = {}) {
  switch (action.type) {
    case DUPLICATE_APP_ACTION:
      return Object.assign({}, state, { ...action });
    default:
      return state;
  }
}