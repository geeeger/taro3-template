import service from "../base";
import { AuthResponse, LoginParams, LoginResponse } from "./typings";

/**
 * 用户账号登录
 *
 * @export
 * @param {LoginParams} params
 * @return {*}  {Promise<LoginResponse>}
 */
export function login(params: LoginParams): Promise<LoginResponse> {
  return service.post('/account/login', params)
}

/**
 * 用户鉴权
 *
 * @export
 * @param {LoginParams} params
 * @return {*}  {Promise<AuthResponse>}
 */
export function authorise(params: LoginParams): Promise<AuthResponse> {
  return service.post('/account/authorise', params)
}

/**
 * 绑定手机号
 *
 * @export
 * @param {LoginParams} params
 * @return {*}  {Promise<any>}
 */
export function phone(params: LoginParams): Promise<any> {
  return service.post('/account/phone', params)
}

export function updateUserInfo(params: Taro.UserInfo): Promise<any> {
  return service.post('/account/userInfo', params)
}
