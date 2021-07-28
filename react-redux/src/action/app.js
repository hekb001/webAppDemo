export const DUPLICATE_APP_ACTION = "DUPLICATE_APP_ACTION";
export function changeSideBar(routeObj) {
    return function(dispatch, getState) {
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