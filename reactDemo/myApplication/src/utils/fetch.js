import axiosInstance from 'utils/axiosInstance';
const localFetch = options => {
  let { method = 'get', data, url } = options;
  let timeout = options.timeout || 1000000;
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
  return localFetch(opt).then(
    response => {
      if (response.status >= 200 && response.status < 306) {
        if (response.data.status) {
          return response.data;
        } else {
          return null;
        }
      }
    },
  );
}