/*
 * @Author: geeeger
 * @Date: 2020-11-15 15:44:57
 * @Last Modified by: geeeger
 * @Last Modified time: 2020-11-15 21:00:40
 * @Description: 通用配置，按环境分
 */

const DEV_CONFIG = {
  baseUrl: 'https://test.com',
  AuthorizationKey: 'Authorization',
  UinfoKey: 'uInfoKey'
}
const PROD_CONFIG = {
  baseUrl: 'https://prod.com',
  AuthorizationKey: 'Authorization',
  UinfoKey: 'uInfoKey'
}
type ConfigType = typeof PROD_CONFIG

// eslint-disable-next-line import/no-mutable-exports
let CONFIG: ConfigType = {} as ConfigType;
if (process.env.NODE_ENV === 'development') {
  CONFIG = DEV_CONFIG
} else {
  CONFIG = PROD_CONFIG
}

export default CONFIG
