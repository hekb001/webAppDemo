/*
 * @Author: kevin.he
 * @Date: 2020-09-01 16:43:42 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-06-03 13:27:27
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
        const url = 'http://hrmapi.x3.mila66.com/Api/Attendance/AttendanceRecord2/updateDayAttend';
        params = {
            day: '2021-06-01',
            emp_ids: '31650',
            access_token: 'UZVqY9hfCjBlAx3R29pf5EXlqXmXs9QRcqDpUkjp',
            company_id: '581',
            langType: '1',
        }
        const data = await fetch({ url: url, method: 'post', data: params })
        console.log('%c', 'color:red', JSON.stringify(data))
        const dispatchData = {
            type: 'ASYNC_DATA',
            pending: false,
            asyncPayload: data
        }
        dispatch(dispatchData)
    }
}
export function getAsyncData1(params = {}) {
    return async function (dispatch) {
        dispatch({
            type: 'ASYNC_DATA',
            pending: true
          });
        const url = 'http://hrmapi.x5.mila66.com/Api/AttendanceRecord/employeesMonth';
        params={
            huanqueapp: '1',
            sign_date: '2021-06',
            access_token: 'UZVqY9hfCjBlAx3R29pf5EXlqXmXs9QRcqDpUkjp',
            company_uuid: 'F3D39D32-1264-A077-2C96-CCF173718016',
            company_id: '581',
            langType: '1',
            uuid:'FD0C8301-61A3-5B06-918A-FD584706EE66'
        }
        const data = await fetch({url,data:params})
        console.log('%c','color:red',JSON.stringify(data))
        const dispatchData = {
            type:'ASYNC_DATA',
            pending: false,
            asyncPayload:data
        }
        dispatch(dispatchData)
    }
}