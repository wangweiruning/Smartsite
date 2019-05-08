import {Toast} from 'antd-mobile-rn';
import {ResultBean} from './ResultBean';
import {ResultCode} from './ResultCode';
import axios from 'axios';
import {LocalStorage} from '../api/local_storage';


const server = axios.create({
  // 请求超时时间
  timeout: 30000,
});

server.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['KKZH-AUTHC-TOKEN'] = token;
    }
    config.headers['KKZH-CUR-PROJ'] = 5;
    config.headers['KKZH-APP'] = 'y';
    return config;
  },
  error => Promise.reject(error)
);


server.interceptors.response.use(async response => {
    const result = new ResultBean(response.data);
    if (response.data && response.data.hasOwnProperty('_new_token')) {
      // 保存新Token
      await LocalStorage.set('user:token', response.data._new_token);
      window.jconfig.token = response.data._new_token;
    }
    switch (result.code) {
      case ResultCode.NOT_AUTHENTICATE:
        // 未登录
        // TODO 跳转到登录页
        return Promise.reject(result);
      default:
    }
    return Promise.resolve(result);
  },
  error => {
    // if (error && (error.status === 'ECONNABORTED' || error.message.indexOf('timeout') !== -1)) {
    //   Toast.fail('请求超时，请稍后再试!');
    // } else {
    //   Toast.fail(`请求错误！${error.message}`);
    // }
    return Promise.reject(error);
  },
);

export default server;


function getToken() {
  // 获取Token
  return window.jconfig.token;
}
