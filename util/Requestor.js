import {ResultBean} from './ResultBean';
import {ResultCode} from './ResultCode';
import {Toast} from 'antd-mobile-rn';
import server from './AxiosConfig';
import config from '../api/serviceAPI.config';

console.log(config.URL)
/**
 * 请求工具
 * @author ZhangBosong
 * @date 2019-2-20 12:59:40
 */
export class Requestor {

  /**
   * 发送请求
   * @param {string} url 请求接口
   * @param {{}} [data] 请求参数
   * @param {string} [method=GET] 请求方式
   * @return {Promise<ResultBean>}
   */
  static send(url, data, method = 'GET') {
    return new Promise((resolve, reject) => {
      url += (url.indexOf('?') === -1 ? '?' : '&') + `t=${new Date().getTime()}`;

      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = (window.jconfig.netWorkIp ? window.jconfig.netWorkIp : config.URL) + url;
      }
      const options = {
        url,
        method,
      };

      if (method === 'GET') {
        options.params = data;
      } else if (method === 'POST') {
        options.data = data;
      }
      server(options)
        .then(async res => {
          /** @type {ResultBean} */
          const result = res instanceof ResultBean ? res : new ResultBean(res);
          // switch (result.code) {
          //   case ResultCode.NOT_AUTHORIZE:
          //     Toast.fail(result.message || '无权访问');
          //     break;
          //   case ResultCode.ERROR:
          //     Toast.fail(result.message || '操作失败');
          //     break;
          //   case ResultCode.SUCCESS:
          //     break;
          //   default:
          //     result.message && Toast.fail(result.message);
          // }
          resolve(result);
        })
        .catch(err => {
          const result = new ResultBean();
          result.message = err && err.message;
          reject(result);
          // if (process.env.NODE_ENV === 'development') {
          //   console.log(`[Requestor] `, err);
          // }
        });
    });
  }

  /**
   * GET请求
   * @param {string} url
   * @param {{}} [params]
   * @return {Promise<ResultBean>}
   */
  static get(url, params) {
    return this.send(url, params);
  }

  /**
   * POST请求
   * @param {string} url
   * @param {{}} [data]
   * @return {Promise<ResultBean>}
   */
  static post(url, data) {
    return this.send(url, data, 'POST');
  }


  /**
   * object to query string
   * @param {{}} obj
   * @param {boolean} [encode=true]
   * @return {string}
   */
  static object2query(obj, encode) {
    encode = encode === undefined ? true : encode;
    if (obj) {
      const queryStrs = [];
      for (const key in obj) {
        if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
          queryStrs.push(key + '=' + (encode ? encodeURIComponent(obj[key]) : obj[key]));
        }
      }
      return queryStrs.join('&');
    }
    return '';
  };

  /**
   * 将query对象的key-value拼接到URL上
   * @param {String} uri
   * @param {Object} query
   * @param {boolean} [encode=true]
   * @returns {String}
   */
  static addQuery2Uri(uri, query, encode) {
    encode = encode === undefined ? true : encode;
    if (uri && query && typeof query === 'object') {
      const queryStr = Requestor.object2query(query, encode);
      return uri.indexOf('?') === -1 ? uri + '?' + queryStr : uri + '&' + queryStr;
    }
    return '';
  };
}


if (process.env.NODE_ENV === 'development') {
  window._http = Requestor;
}