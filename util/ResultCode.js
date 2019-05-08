/**
 * 接口返回状态码定义
 * @author Zhang
 * @date 2019-1-22 11:59:31
 */
export class ResultCode {
  /**
   * 成功
   * @type {string}
   */
  static get SUCCESS() {
    return 'S10000';
  };

  /**
   * 失败
   * @type {string}
   */
  static get ERROR() {
    return 'S10001';
  };

  /**
   * 未授权
   */
  static get NOT_AUTHORIZE() {
    return 'S10004';
  }

  /**
   * 未认证
   */
  static get NOT_AUTHENTICATE() {
    return 'S10005'
  }
}
