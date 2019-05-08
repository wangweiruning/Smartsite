let URL = 'http://192.168.1.203:7100/';

export default class HttpUtils {
  static AjaxData(url, data, method = 'POST') {
    return new Promise(((resolve, reject) => {
      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data),
      }).then(response => {
        return response.json();
      })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    }));
  }

  static AjaxDatas(url, data, method = 'GET') {
    return new Promise(((resolve, reject) => {
      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        params: JSON.stringify(data),
      }).then(response => {
        return response.json();
      })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    }));
  }
}