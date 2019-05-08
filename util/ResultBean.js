import {ResultCode} from './ResultCode';


/**
 * 接口统一返回数据格式
 * @author Zhang
 * @date 2019年1月22日11:58:25
 */
export class ResultBean {
  /** @type {String} */
  code;
  /** @type {String} */
  message;
  /** @type {Object} */
  data;

  constructor(res) {
    if (res) {
      this.code = res.code;
      this.message = res.message;
      this.data = res.data;
    }
  }

  /**
   * @return {boolean}
   */
  isSuccess() {
    return this.code === ResultCode.SUCCESS;
  }

  /**
   * @return {boolean}
   */
  isError() {
    return !this.isSuccess();
  }

  /**
   * @return {boolean}
   */
  isCanUse(){
    return this.code == ResultCode.NOT_AUTHORIZE;
  }
}
