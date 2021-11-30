import axios from "axios";
// import { Message } from 'view-design'

const service = axios.create({
  // timeout: 30000
});

// 1.请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求头里配置token
    // const token = getToken();
    // if(token) {
    //   config.headers.token = token;
    // }
    // Message.loading({
    //   content: 'Loading...',
    //   duration: 0
    // });
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 2.响应拦截器
service.interceptors.response.use(
  (response) => {
    // Message.destroy();
    // Message.success({
    //   content: 'success!'
    // });
    return response;
  },
  (error) => {
    // 接收到异常响应的处理开始
    if (error && error.response) {
      // 2.1 公共错误处理
      // 2.2 根据响应码具体处理
      switch (error.response.status) {
        case 400:
          error.message = "错误请求";
          break;
        case 401:
          error.message = "未授权，请重新登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求错误,未找到该资源";
          // window.location.href = "/NotFound";
          break;
        case 405:
          error.message = "请求方法未允许";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器端出错";
          break;
        case 501:
          error.message = "网络未实现";
          break;
        case 502:
          error.message = "网络错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网络超时";
          break;
        case 505:
          error.message = "http版本不支持该请求";
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      }
      // Message.destroy();
      // Message.error({
      //   background: true,
      //   content: error.message
      // });
    } else if (JSON.stringify(error).includes("timeout")) {
      // Message.destroy();
      // 超时处理
      // Message.error({
      //   background: true,
      //   content: '服务器响应超时，请刷新当前页'
      // });
    } else {
      // Message.destroy();
      // Message.error({
      //   background: true,
      //   content: '连接服务器失败'
      // });
    }
  }
);

// 3.导出文件
export default service;
