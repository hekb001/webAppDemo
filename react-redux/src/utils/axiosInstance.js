/*
 * @Author: kevin.he 
 * @Date: 2021-06-03 11:06:12 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-06-03 13:07:15
    axiosInstance实例
 */

import axios from 'axios';
import _ from 'lodash';
import qs from 'qs';
const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(function (config) {
	if (config.method === "post" || config.method === "patch" || config.method === "put"){
        config.data = qs.stringify(config.data);
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return config;

}, function (error) {
	console.log(error,'request error=======')
	return Promise.reject(error);
});
axiosInstance.interceptors.response.use(function (response) {
	// Do something with response data
	return response;
}, function (error) {
	// const status = error.response.status
	console.log(error,'interceptors error=======')
	console.log(error.response,'interceptors error response=======')
	// if(status === 500) {
	// 	notification.error({
	// 		// icon:
	// 		description:'服务器异常'
	// 	})
	// }
	if(error.response){
		// switch (error.response.status) {
	 //      case 401:
	 //        // this.redirectTo(document, '/')
	 //        break;
	 //      case 404:
	 //        // this.redirectTo(document, '/404')
	 //        break;
	 //      default:
	 //        // this.redirectTo(document, '/500')
	 //        break;
	 //    }
	 //  	return Promise.reject(error.response.data)
	}
	// if(err.response) {
	// 	console.log(error.response,'response error=======')
	// }
	// Do something with response error
	return Promise.reject(error);
});
export default axiosInstance