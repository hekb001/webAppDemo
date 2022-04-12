import cookie from "js-cookie";
export const GET_PROCESS_DESIGN = "GET_PROCESS_DESIGN";
export const SET_PROCESS_DESIGN = "SET_PROCESS_DESIGN";
import { fetch } from "utils/fetch";

export function getProcessList(payload = {}, next) {
  return async (dispatch) => {
    const params = Object.assign(payload);
    dispatch({
      type: GET_PROCESS_DESIGN,
      pending: true,
    });
    const data = await fetch({
      url: config.baseUrl + "/processes",
      method: "get",
      data: params,
    });
    if (data && data.status) {
      dispatch({
        type: SET_PROCESS_DESIGN,
        pending: false,
        processList: data.data,
        processMeta: data.meta,
      });
    } else {
      dispatch({
        type: SET_PROCESS_DESIGN,
        pending: false,
        processList: [],
      });
    }
    next && next(data);
  };
}

export function saveProcesses(payload = {}, next) {
  return async (dispatch) => {
    const params = Object.assign(payload);
    dispatch({
      type: GET_PROCESS_DESIGN,
      pending: true,
    });
    const data = await fetch({
      url: config.baseUrl + "/processes",
      method: "post",
      data: params,
    });
    if (data && data.status) {
      dispatch({
        type: SET_PROCESS_DESIGN,
        pending: false,
      });
    } else {
      dispatch({
        type: SET_PROCESS_DESIGN,
        pending: false,
      });
    }
    next && next(data);
  };
}

export function updateProcesses(payload = {}, next) {
  return async (dispatch) => {
    const params = Object.assign(payload);
    dispatch({
      type: GET_PROCESS_DESIGN,
      pending: true,
    });
    const data = await fetch({
      url: config.baseUrl + "/processes/" + payload.id,
      method: "put",
      data: params,
    });
    if (data && data.status) {
      dispatch({
        type: SET_PROCESS_DESIGN,
        pending: false,
      });
    } else {
      dispatch({
        type: SET_PROCESS_DESIGN,
        pending: false,
      });
    }
    next && next(data);
  };
}

export function deletaProcesses(payload = {}, next) {
  return async (dispatch) => {
    const params = Object.assign(payload);
    dispatch({
      type: GET_PROCESS_DESIGN,
      pending: true,
    });
    const data = await fetch({
      url: config.baseUrl + "/processes/" + payload.id,
      method: "delete",
      data: params,
    });
    if (data && data.status) {
      dispatch({
        type: SET_PROCESS_DESIGN,
        pending: false,
      });
    } else {
      dispatch({
        type: SET_PROCESS_DESIGN,
        pending: false,
      });
    }
    next && next(data);
  };
}

export function getProcessesDetail(payload = {}, next) {
  return async (dispatch) => {
    const params = Object.assign(payload);
    dispatch({
      type: GET_PROCESS_DESIGN,
      pending: true,
    });
    const data = await fetch({
      url: config.baseUrl + "/processes/" + payload.id,
      method: "get",
      data: params,
    });
    if (data && data.status) {
      dispatch({
        type: SET_PROCESS_DESIGN,
        pending: false,
        processDetail: data,
      });
    } else {
      dispatch({
        type: SET_PROCESS_DESIGN,
        pending: false,
        processDetail: null,
      });
    }
    next && next(data);
  };
}

export function clearProcessDetails() {
  return async (dispatch) => {
    dispatch({
      type: SET_PROCESS_DESIGN,
      pending: false,
      processDetail: null,
    });
  };
}

// /processes/{processId}/release  发布流程
export function releaseProcesses(payload = {}, next) {
  return async (dispatch) => {
    const params = Object.assign(payload);
    dispatch({
      type: GET_PROCESS_DESIGN,
      pending: true,
    });
    const data = await fetch({
      url: config.baseUrl + "/processes/" + payload.id + "/release",
      method: "put",
      data: params,
    });
    if (data && data.status) {
      dispatch({
        type: SET_PROCESS_DESIGN,
        pending: false,
      });
    } else {
      dispatch({
        type: SET_PROCESS_DESIGN,
        pending: false,
      });
    }
    next && next(data);
  };
}

// /processes/{processId}/copy 复制流程
export function copyProcesses(payload = {}, next) {
  return async (dispatch) => {
    const params = Object.assign(payload);
    dispatch({
      type: GET_PROCESS_DESIGN,
      pending: true,
    });
    const data = await fetch({
      url: config.baseUrl + "/processes/" + payload.id + "/copy",
      method: "post",
      data: params,
    });
    if (data && data.status) {
      dispatch({
        type: SET_PROCESS_DESIGN,
        pending: false,
      });
    } else {
      dispatch({
        type: SET_PROCESS_DESIGN,
        pending: false,
      });
    }
    next && next(data);
  };
}

//  /users 获取所有用户
export function getUsersList(payload = {}, next) {
  return async (dispatch) => {
    const params = Object.assign(payload);
    dispatch({
      type: GET_PROCESS_DESIGN,
      pending: true,
    });
    const data = await fetch({
      url: config.baseUrl + "/users",
      method: "get",
      data: params,
    });
    if (data && data.status) {
      dispatch({
        type: SET_PROCESS_DESIGN,
        pending: false,
        usersList: data.data,
      });
    } else {
      dispatch({
        type: SET_PROCESS_DESIGN,
        pending: false,
        usersList: null,
      });
    }
    next && next(data);
  };
}

//  /screens 获取关联表单（可填写）
export function getScreensList(payload = {}, next) {
  return async (dispatch) => {
    const params = Object.assign(payload);
    dispatch({
      type: GET_PROCESS_DESIGN,
      pending: true,
    });
    const data = await fetch({
      url: config.baseUrl + "/screens",
      method: "get",
      data: params,
    });
    if (data && data.status) {
      dispatch({
        type: SET_PROCESS_DESIGN,
        pending: false,
        screensList: data.data,
      });
    } else {
      dispatch({
        type: SET_PROCESS_DESIGN,
        pending: false,
        screensList: null,
      });
    }
    next && next(data);
  };
}

//  /screens 获取关联表单（可查看）
export function getScreensListOnlyLook(payload = {}, next) {
  return async (dispatch) => {
    const params = Object.assign(payload);
    dispatch({
      type: GET_PROCESS_DESIGN,
      pending: true,
    });
    const data = await fetch({
      url: config.baseUrl + "/screens",
      method: "get",
      data: params,
    });
    if (data && data.status) {
      dispatch({
        type: SET_PROCESS_DESIGN,
        pending: false,
        screensListOnlyLook: data.data,
      });
    } else {
      dispatch({
        type: SET_PROCESS_DESIGN,
        pending: false,
        screensListOnlyLook: null,
      });
    }
    next && next(data);
  };
}
