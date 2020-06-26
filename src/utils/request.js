import axios from "axios";

const BASEURL = process.env_NODE_ENV === 'production' ? '' : '/devApi'
// 创建axios，赋给变量
const service = axios.create({
  baseURL: BASEURL,
  timeout: 1000,
});

// 添加请求拦截器
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;

/**
 * 使用export default的时候，文件import不需要花括号
 * 没有使用default的时候，可以同时声明多个export，文件引用的时候要用花括号
 */