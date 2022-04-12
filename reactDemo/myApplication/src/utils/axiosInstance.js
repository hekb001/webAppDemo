/*
 * @Author: kevin.he 
 * @Date: 2021-06-03 11:06:12 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-11-05 10:51:48
	axiosInstance实例
 */
import axios from 'axios';
import _ from 'lodash';
import qs from 'qs';
import cookie from 'js-cookie';
import config from 'config';
import Message from 'utils/message';
const axiosInstance = axios.create();
//请求拦截器
axiosInstance.interceptors.request.use(function (config) {
	if (config.method === "post" || config.method === "patch" || config.method === "put") {
		config.data = qs.stringify(config.data);
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	}
	config.headers.Authorization = `Bearer ${cookie.get('access_token')}`;
	return config;
}, function (error) {
	console.log(error, 'request error=======')
	return Promise.reject(error);
});
function redirectLogin() {
	const location = window.location
	const { origin, pathname, href } = location
	location.href =
		origin +
		'/login' +
		(pathname.includes('?') ? '' : '?') +
		`redirect=${encodeURIComponent(href)}`
}
function refreshToken() {
	const params = {
		grant_type: 'refresh_token',
		client_id: config.client_id,
		client_secret: config.client_secret,
		refresh_token: cookie.get('refresh_token'),
	}
	return axios.create()({
		method: 'GET',
		url: config.baseUrl + '/oauth/access_token',
		params,
	})
}
// 响应拦截器
let isRfreshing = false // 控制刷新 token 的状态
let requests = [] // 存储刷新 token 期间过来的 401 请求
axiosInstance.interceptors.response.use(function (response) {
	if (response && response.data) {
		const res = response.data
		if (res && !res.status) {
			if (res.msg === 'access_denied' || res.msg === '授权错误') {
				// 刷新 token
				if (!isRfreshing) {
					isRfreshing = true // 开启刷新状态
					// 尝试刷新获取新的 token
					return refreshToken()
						.then(res => {
							if (!res.data.status) {
								throw new Error('刷新 Token 失败')
							}
							// 刷新 token 成功了
							cookie.set('access_token', res.data.access_token)
							cookie.set('refresh_token', res.data.refresh_token)
							// 把 requests 队列中的请求重新发出去
							requests.forEach(cb => cb())
							// 重置 requests 数组
							requests = []
							return axiosInstance(response.config)
						})
						.catch(err => {
							console.log(err)
							cookie.remove('access_token')
							cookie.remove('refresh_token')
							redirectLogin()
							return Promise.reject(response)
						})
						.finally(() => {
							isRfreshing = false // 重置刷新状态
						})
				}
				// 刷新状态下，把请求挂起放到 requests 数组中
				return new Promise(resolve => {
					requests.push(() => {
						resolve(axiosInstance(response.config))
					})
				})
			}
		}
	}
	return response;
}, async function (error) {
	// 超出 2xx 状态码都都执行这里
	// console.log('请求响应失败了 => ', error)
	// 如果是使用的 HTTP 状态码，错误处理就写到这里
	// console.dir(error)
	if (error.response) {
		// 请求发出去收到响应了，但是状态码超出了 2xx 范围
		const { status } = error.response
		if (status === 400) {
			Message.error('请求参数错误')
		} else if (status === 401) {
			// token 无效（没有提供 token、token 是无效的、token 过期了）
			// 如果有 refresh_token 则尝试使用 refresh_token 获取新的 access_token
			if (!cookie.get('refresh_token')) {
				redirectLogin()
				return Promise.reject(error)
			}
		} else if (status === 403) {
			Message.error('没有权限，请联系管理员')
		} else if (status === 404) {
			Message.error('请求资源不存在')
		} else if (status >= 500) {
			Message.error('服务端错误，请联系管理员')
		}
	} else if (error.request) {
		// 请求发出去没有收到响应
		Message.error('请求超时，请刷新重试')
	} else {
		console.log('%c⧭', 'color: #eeff00', error);
		// 在设置请求时发生了一些事情，触发了一个错误
		Message.error(`请求失败：${error.message}`)
	}

	// 把请求失败的错误对象继续抛出，扔给上一个调用者
	return Promise.reject(error)
},
);
export default axiosInstance