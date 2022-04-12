/*
 * @Author: kevin.he 
 * @Date: 2021-11-19 13:19:24 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-12-09 10:19:10
 * 表单设计器
 */
export const GET_FORM_DESIGN = "GET_FORM_DESIGN";
export const SET_FORM_DESIGN = "SET_FORM_DESIGN";
import { fetch } from "utils/fetch";
import _ from 'lodash'
/**
 * 表单设计-获取表单列表
 * @param
 * @param
 * GET /screens
 */
export function getFormDesignList(payload, next) {
  return async (dispatch) => {
    const params = _.assign(payload);
    dispatch({
      type: GET_FORM_DESIGN,
      pending: true,
    });
    const res = await fetch({
      url: config.baseUrl + "/screens",
      method: "get",
      data: params,
    });
    if (res && res.status) {
      dispatch({
        type: SET_FORM_DESIGN,
        pending: false,
        formDesignList: res.data,
      });
    } else {
      dispatch({
        type: SET_FORM_DESIGN,
        pending: false,
        formDesignList: [],
      });
    }
    next && next(res);
  };
}
/**
 * 表单设计-新增编辑表单
 * @param
 * @param
 * POST /screens
 */
export function saveFormDesign(payload, next) {
  return async (dispatch) => {
    const params = _.assign(payload);
    dispatch({
      type: GET_FORM_DESIGN,
      pending: true,
    });
    const res = await fetch({
      url: payload.screen_category_id=='1'?config.baseUrl + "/screens":config.baseUrl + "/screens/"+ payload.screen_category_id,
      method: payload.screen_category_id=='1'?"post":"put",
      data: params,
    });
    if (res && res.status) {
      dispatch({
        type: SET_FORM_DESIGN,
        pending: false,
      });

    } else {
      dispatch({
        type: SET_FORM_DESIGN,
        pending: false,
        formDesignList: [],
      });
    }
    next && next(res, false);
  };
}
/**
 * 表单设计-删除表单
 * @param
 * @param
 * POST /screens
 */
export function delFormDesign(payload, next) {
  return async (dispatch) => {
    const params = _.assign(payload);
    dispatch({
      type: GET_FORM_DESIGN,
      pending: true,
    });
    const res = await fetch({
      url: config.baseUrl + "/screens/" + payload.screens_id,
      method: "delete",
      data: params,
    });
    if (res && res.status) {
      dispatch({
        type: SET_FORM_DESIGN,
        pending: false,
      });

    } else {
      dispatch({
        type: SET_FORM_DESIGN,
        pending: false,
        formDesignList: [],
      });
    }
    next && next(res, false);
  };
}
