/*
 * @Author: kevin.he 
 * @Date: 2021-11-19 13:26:24 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-11-19 15:50:02
 * 表单设计器
 */
import { GET_FORM_DESIGN, SET_FORM_DESIGN } from 'actions/formDesign';
export default function myreducer(state = {}, action) {
  switch (action.type) {
    case GET_FORM_DESIGN:
      return Object.assign({}, state, { ...action })
    case SET_FORM_DESIGN:
      return Object.assign({}, state, { ...action })
    default:
      return state
  }
};