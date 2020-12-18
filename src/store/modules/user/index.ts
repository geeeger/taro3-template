/*
 * @Author: geeeger
 * @Date: 2020-11-15 20:25:27
 * @Last Modified by: geeeger
 * @Last Modified time: 2020-11-21 21:11:18
 * @Description: 例子
 */
import Taro from "@tarojs/taro"
import { Reducer } from "redux"
import config from "@/config/index"
import { SAVE_LOGIN_CODE, SAVE_USER_DATA, UPDATE_AUTH, IUserInfoState, UserActions, UPDATE_LOGIN_STATUS, SET_USER_INFO } from './types'

const userInfo = JSON.parse(Taro.getStorageSync(config.UinfoKey) || '{}')

const Authorization = Taro.getStorageSync(config.AuthorizationKey) || ''

const INITIAL_STATE: IUserInfoState = {
  loginData: {
    code: '',
    Authorization,
    ready: 0
  },
  userInfo: {
    avatarUrl: '',
    city: '',
    country: '',
    gender: 0,
    language: 'zh_CN',
    nickName: '游客',
    province: '',
    ...userInfo
  }
}

const userReducer: Reducer<
  IUserInfoState,
  UserActions
> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_LOGIN_CODE:
      return {
        ...state,
        loginData: {
          ...state.loginData,
          code: action.payload
        }
      }
    case UPDATE_AUTH:
      return {
        ...state,
        loginData: {
          ...state.loginData,
          Authorization: action.payload
        }
      }
    case SET_USER_INFO:
    case SAVE_USER_DATA:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.payload
        }
      }
    case UPDATE_LOGIN_STATUS:
      return {
        ...state,
        loginData: {
          ...state.loginData,
          ready: action.payload
        }
      }
    default:
      return state
  }
}

export default userReducer
