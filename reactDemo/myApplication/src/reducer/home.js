/*
 * @Author: kevin.he
 * @Date: 2020-09-01 16:43:42 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-10-12 12:20:02
 * 接收view当中actio派发过来的值及类型，并且分类管理
 */
export default function myreducer(state = {}, action) {
    switch (action.type) {
        case 'ASYNC_DATA':
            return Object.assign(
                {}, state, { ...action }
            )
        default:
            return state;
    }
};