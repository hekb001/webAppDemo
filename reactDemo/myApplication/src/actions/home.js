/*
 * @Author: kevin.he 
 * @Date: 2021-10-12 12:21:36 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-12-09 10:18:51
 * 主页 
 */

import { fetch } from 'utils/fetch';
export function myaction() {
    return {
        type: 'ASYNC_DATA',
        pending: false,
        asyncPayload: {
            "key": "3",
            "name": "张胖卓",
            "gender": "男"
        }
    }
}
export function getAsyncData(params = {}) {
    // return async function (dispatch) {
    //     dispatch({
    //         type: 'ASYNC_DATA',
    //         pending: true
    //     });
    //     const url = config.hrmUrl+ '/Api/Attendance/AttendanceRecord2/updateDayAttend';
    //     console.log('%c' + JSON.stringify(url), 'color:red')
    //     params = {
    //         day: '2021-06-01',
    //         emp_ids: '31650',
    //         access_token: 'UZVqY9hfCjBlAx3R29pf5EXlqXmXs9QRcqDpUkjp',
    //         company_id: '581',
    //         langType: '1',
    //     }
    //     const data = await fetch({ url: url, method: 'post', data: params })
    //     console.log('%c' + JSON.stringify(data), 'color:red')
    //     const dispatchData = {
    //         type: 'ASYNC_DATA',
    //         pending: false,
    //         asyncPayload: data
    //     }
    //     dispatch(dispatchData)
    //     // dispatch(myaction())
    // }
}
