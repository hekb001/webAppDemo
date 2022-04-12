/**
 * Date: 2021年1月12日20:38:12
 * Author: kevin.he
 * Desc: 表单设计器-hooks
 */
import {useReducer, useContext} from 'react';
import {Ctx, StoreCtx} from './context';

// 使用最顶层组件的setState
export const useGlobal = ()=>{
  return useContext(Ctx)
};

// 使用组件最顶层传入的所有props
export const useStore = ()=>{
  return useContext(StoreCtx)
};

// 类似于class component中的setState
export const useSet = (initState)=>{
  const [state, setState] = useReducer((state, newState)=>{
    let action = newState;
    if(typeof newState === 'function'){
      action = action(state)
    }
    if(newState.action && newState.payload){
      action = newState.payload;
      if(typeof action === 'function'){
        action = action(state)
      }
    }
    
    return {...state, ...action}
  }, initState);
  
  const setStateWithActionName = (state, actionName)=>{
    setState(state)
  };
  
  return [state, setStateWithActionName]
};



