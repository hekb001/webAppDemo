/*
 * @Author: kevin.he
 * @Date: 2020-09-01 16:43:42 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-09-01 16:47:55
 * 接收view当中actio派发过来的值及类型，并且分类管理
 */

const initialState = {
    data: [{
        "key": "1",
        "name": "王大斌",
        "gender": "男"
      },{
        "key": "2",
        "name": "刘小洋",
        "gender": "男"
      }]
}
const myreducer = (state=initialState, action) => {
    switch (action.type) {
      case 'ADD_DATA':
          return {
              ...state,
              data:state.data.concat(action.payload)
            }
      default: 
          return state;
    }
  }
  export default myreducer;