//引进所有的reducer；
//将所有的reducer缓存起来
//暴露出store.getState()方法，给到view里面调用
import {createStore,combineReducers} from 'redux';
import reducer from '../reducer';
const reducers = combineReducers(reducer);
const store= createStore(reducers)
export default store;