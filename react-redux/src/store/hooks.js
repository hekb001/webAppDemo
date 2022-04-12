import {useReducer, useContext} from 'react';

const reducer = (state, newState) => {
  let action = newState;
  if (typeof newState === 'function') {
    action = action(state)
  }
  if (newState.action && newState.payload) {
    action = newState.payload;
    if (typeof action === 'function') {
      action = action(state)
    }
  }

  return { ...state, ...action }
}
// 类似于class component中的setState
export const useSet = (initState) => {
  const [state, setState] = useReducer(reducer, initState);
  return [state, (state, actionName) => {
    setState(state)
  }]
};