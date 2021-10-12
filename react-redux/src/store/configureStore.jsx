//引进所有的reducer；
//将所有的reducer缓存起来
//暴露出store.getState()方法，给到view里面调用
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { router } from '../middleware'
import reducer from '../reducer';
const reducers = combineReducers(reducer);
// const store= createStore(reducers);
const create = process.env.NODE_ENV !== 'production' ?
    (window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__()(createStore) : createStore) : createStore
let middlewares = [ thunkMiddleware, router];
if (process.env.NODE_ENV !== `production`) {
    const { createLogger } = require(`redux-logger`);
    const logger = createLogger({
        collapsed: true,
    });
    middlewares.push(logger);
}
const createStoreWithMiddleware = applyMiddleware(
    ...middlewares
)(create)
const store = createStoreWithMiddleware(reducers);
if (module.hot) {
    console.log('热更新加载。.。。。')
}
export default store;