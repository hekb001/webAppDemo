import cookie from 'js-cookie'
export const GET_USER_LOGIN = 'GET_USER_LOGIN'
export const SET_USER_LOGIN = 'SET_USER_LOGIN'
import { fetch } from 'utils/fetch';
export function login(payload, next) {
  return async (dispatch) => {
    const params = Object.assign(
      {
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
        grant_type: 'password'
      },
      payload,
    )
    dispatch({
      type: GET_USER_LOGIN,
      pending: true,
    })
    const data = await fetch({ url: config.baseUrl + '/oauth/token', method: 'post', data: params })
    if (data && data.status) {
      dispatch({
        type: SET_USER_LOGIN,
        pending: false,
        user: data,
      })
      const userData = data
      cookie.set('access_token', userData.access_token)
      cookie.set('refresh_token', userData.refresh_token)
    } else {
      cookie.remove('access_token')
      cookie.remove('refresh_token')
      dispatch({
        type: SET_USER_LOGIN,
        pending: false,
        user: {},
      })
    }
    next(data)
  }
}