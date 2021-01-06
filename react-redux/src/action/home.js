/*
 * @Author: kevin.he
 * @Date: 2020-09-01 16:43:42 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-01-06 15:01:14
 * 接收view当中actio派发过来的值及类型，并且分类管理
 */

export  function myaction () {
    return  {
        type: 'ADD_DATA',
        payload: {
              "key": "3",
              "name": "张胖卓",
              "gender": "男"
        }
    }
}
export function getAsyncData(){
    return function (dispatch) {
            dispatch({
                type: 'ASYNC_DATA',
                asyncPayload: {
                    "key": "4",
                    "name": "kevin",
                    "gender": "男"
                }
        })
    }
}