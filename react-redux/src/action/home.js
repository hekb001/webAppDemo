/*
 * @Author: kevin.he
 * @Date: 2020-09-01 16:43:42 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-01-06 15:28:22
 * 接收view当中actio派发过来的值及类型，并且分类管理
 */
import { fetch } from 'utils/fetch';
export function myaction() {
    return {
        type: 'ADD_DATA',
        payload: {
            "key": "3",
            "name": "张胖卓",
            "gender": "男"
        }
    }
}
export function getAsyncData(params = {}) {
    return async function (dispatch) {
        dispatch({
            type: 'ASYNC_DATA',
            pending: true
          });
        const url = process.env.home;
        const data = await fetch(url, params)
        const dispatchData = {
            type:'ASYNC_DATA',
            pending: false,
            asyncPayload:data
        }
        dispatch(dispatchData)
    }
}