/*
 * @Author: kevin.he 
 * @Date: 2021-10-12 12:20:39 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-10-12 12:21:30
 * 路由改变通知，全局函数挂载...
 */
export const DUPLICATE_APP_ACTION = "DUPLICATE_APP_ACTION";
export function changeSideBar(routeObj) {
  return function (dispatch, getState) {
    dispatch({
      type: DUPLICATE_APP_ACTION,
      sideBarObj: {
        currentOpenKeys: routeObj.currentOpenKeys,
        currentKeyProps: routeObj.currentKeyProps,
        currentKeyThird: routeObj.currentKeyThird
      }
    });
  };
}