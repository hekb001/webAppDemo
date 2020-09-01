//引进所有的reducer；
//将所有的reducer缓存起来
//暴露出store.getState()方法，给到view里面调用
import {createStore} from 'redux';
import reducer from '../reducer';
const store= createStore(reducer)
export default store;