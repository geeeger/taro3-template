import Taro from "@tarojs/taro"
import { login as loginApi } from "@/services/apis/user"
import config from "@/config/index"
import { LoginParams } from "@/services/apis/typings"
import store from "@/store"
import { SAVE_USER_DATA, SAVE_LOGIN_CODE, ISaveLoginCodeAction, ISaveUserDataAction, UPDATE_AUTH, IUpdateAuthorizationAction, SaveLoginCodeAction, AsyncLoginAction, ISetUserInfoAction, SET_USER_INFO, LoginDispatchAction, IUserInfo, IUpdateLoginStatusAction, UPDATE_LOGIN_STATUS } from "./types"

export const saveLoginCode = (code: string): ISaveLoginCodeAction => {
  return {
    type: SAVE_LOGIN_CODE,
    payload: code
  }
}

export const saveLoginData = (data: any): ISaveUserDataAction => {
  Taro.setStorageSync(config.UinfoKey, JSON.stringify(Object.assign({}, store.getState().user.userInfo, data)))
  return {
    type: SAVE_USER_DATA,
    payload: data
  }
}

export const saveLoginCodeAction: SaveLoginCodeAction = () => async (dispatch) => {
  const { code } = await Taro.login()
  return dispatch(saveLoginCode(code))
}

export const updateAuthorization = (payload: string): IUpdateAuthorizationAction => {
  return {
    type: UPDATE_AUTH,
    payload: payload
  }
}

export const loginAction: AsyncLoginAction  = (code: string) => {
  return async (dispatch) => {

    const params: LoginParams = {
      thirdCode: code
    }

    try {
      const setting = await Taro.getSetting()
      if (setting.authSetting['scope.userInfo']) {
        const {
          encryptedData,
          iv
        } = await Taro.getUserInfo()
        if (encryptedData && iv) {
          params.wxEncryptData = encryptedData
          params.iv = iv
        }
      }
    } catch (e) {
      // nothing
    }

    const result = await loginApi(params)
    if (!result.success) {
      throw new Error(result.msg)
    }
    return dispatch(saveLoginData(result.data))
  }
}

export const setUserInfo = (uinfo: IUserInfo): ISetUserInfoAction => {
  Taro.setStorageSync(config.UinfoKey, JSON.stringify(Object.assign({}, store.getState().user.userInfo, uinfo)))
  return {
    type: SET_USER_INFO,
    payload: uinfo
  }
}

export const login: LoginDispatchAction = () => async (dispatch) => {
    let { payload: code } = await dispatch(saveLoginCodeAction())
    return dispatch(loginAction(code))
}

export const updateLoginStatus = (status: 0 | 1): IUpdateLoginStatusAction => {
  return {
    type: UPDATE_LOGIN_STATUS,
    payload: status
  }
}
