import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';

/** @type {Storage} */
let storage = null;
// new Storage({
//     // 最大容量，默认值1000条数据循环存储
//     size: 2000,
//
//     // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
//     // 如果不指定则数据只会保存在内存中，重启后即丢失
//     storageBackend: AsyncStorage,
//
//     // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
//     defaultExpires: 1000 * 3600,// 一个小时
//
//     // 读写时在内存中缓存数据。默认启用。
//     enableCache: true,
//
//     // 如果storage中没有相应数据，或数据已过期，
//     // 则会调用相应的sync方法，无缝返回最新数据。
//     // sync方法的具体说明会在后文提到
//     // 你可以在构造函数这里就写好sync的方法
//     // 或是写到另一个文件里，这里require引入
//     // 或是在任何时候，直接对storage.sync进行赋值修改
//     // sync: require('./sync')
// });

const storageConfig = {
  /** 缓存数据默认过期时间 */
  defaultExpires: 1000 * 3600 * 24 * 7,
};

const _try2Json = obj => {
  try {
    return JSON.parse(obj);
  } catch (e) {
    return obj;
  }
};

export class StorageKeys {
  static GLOBAL_USER = 'user:global';
}

export class LocalStorage {
  /**
   * @return {Storage}
   * @private
   */
  static _storage() {
    return storage != null ? storage : (storage = new Storage({
      size: 2000,
      storageBackend: AsyncStorage,
      defaultExpires: 1000 * 3600,
      enableCache: true,
    }));
  };

  /**
   * 读取缓存
   * @param {String} key Key
   * @param {*} [def] 获取缓存数据为空时返回的默认值
   * @param {String} [id] 标识
   * @return {Promise<*>}
   */
  static async get(key, def, id) {
    try {
      const opts = {key};
      if (id) {
        opts.id = id;
      }
      const data = await this._storage().load(opts);
      return data ? _try2Json(data) : def;
    } catch (e) {
      return def;
    }
  };

  /**
   * 设置缓存
   * @param {String} key Key
   * @param {*} data Data
   * @param {Number} [expires={@link storageConfig.defaultExpires}] 数据过期时间，毫秒数
   * @param {String} [id] 标识ID
   * @return {Promise<void>}
   */
  static async set(key, data, expires = storageConfig.defaultExpires, id) {
    const opts = {
      key,
      data: JSON.stringify(data),
      expires,
    };
    if (id) {
      opts.id = id;
    }
    return await this._storage().save(opts);
  };

  /**
   * 删除缓存
   * @param {String} key Key
   * @param {String} [id] 标识
   * @return {Promise<void>}
   */
  static async remove(key, id) {
    const opts = {key};
    if (id) {
      opts.id = id;
    }
    return await this._storage().remove(opts);
  };

  /**
   * 清空所有map，移除所有key-id数据（但会保留只有key的数据）
   * 测试 刷新之后有效，所以应该是在退出app时执行的
   */
  static async clearMaps() {
    return await this._storage().clearMap();
  };

  /**
   * 清空某个key下的所有数据（仅key-id数据）
   * @paramas key
   */
  static async clearMapForKey(key) {
    await this._storage().clearMapForKey(key);
  };

  /**
   * 获取key下的 所有数据(仅key-id数据)
   */
  static async getAllDataForKey(key) {
    return await this._storage().getAllDataForKey(key);
  };

  /**
   * 获取某个key下的所有ID（仅key-id数据）
   */
  static async getIdsForKey(key) {
    return await this._storage().getIdsForKey(key);
  }

  /**
   * 打印所有本地缓存数据到控制台
   * @return {Promise<void>}
   */
  static async printAllData() {
    console.log('Print AsyncStorage data ↓↓↓');
    AsyncStorage.getAllKeys(async (error, keys) => {
      if (keys) {
        for (const key of keys) {
          const value = await AsyncStorage.getItem(key);
          console.log('-> ', key, ' => ', _try2Json(value));
        }
      }
    });
  }
}