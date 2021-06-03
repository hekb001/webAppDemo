import axiosInstance from 'utils/axiosInstance';
import { message } from 'antd';
const data = {
    "key": "4",
    "name": "kevin",
    "gender": "男"
}
function loadData(params) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(data)
        }, 1500);
    })
}
const localFetch = options => {
    let { method = 'get', data, url } = options;
    let timeout = options.timeout || 300001;
    // const permissionParams = initPermissionRange();
    const permissionParams = {};
    let cloneData = _.cloneDeep(data);
    cloneData = _.assign({}, cloneData, permissionParams);
    switch (method.toLowerCase()) {
      case 'get':
        return axiosInstance.get(url, {
          params: cloneData,
          timeout // 设置失效时间
        });
      case 'delete':
        return axiosInstance.delete(url, {
          params: cloneData
        });
      case 'post':
        return axiosInstance.post(url, cloneData, timeout);
      case 'put':
        return axiosInstance.put(url, cloneData);
      case 'patch':
        return axiosInstance.patch(url, cloneData);
      default:
        return axiosInstance(options);
    }
  };
export function fetch(options) {
    const opt = Object.assign(options);
    // return loadData(opt).then(data);
    return localFetch(opt).then(
        response => {
          if (response.status >= 200 && response.status < 306) {
            if (response.data.status) {
              return response.data;
            } else {
              if (response.data.msg == 'access_denied' || response.data.msg == '授权错误') {
               
              } else {
                message.error(response.data.msg);
                if (opt.errorCallback) {
                  opt.errorCallback(response, true);
                }
              }
              return null;
            }
          }
        },
        error => {
          const { response } = error;
          let msg;
          let statusCode;
          if (response && response instanceof Object) {
            const { data, statusText } = response;
            statusCode = response.status;
            msg = data.message || statusText;
          } else {
            statusCode = 600;
            msg = error.message || '网络错误';
          }
          message.error('错误');
          new Error(msg);
          return null;
          // return response
        }
      );
}