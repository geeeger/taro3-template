import { Action, ActionCreator } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { RootState } from "../index"

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'

export const UPDATE_UINFO_STATUS = 'UPDATE_UINFO_STATUS'

export interface LoginData {
  code?: LoginCode
  Authorization?: string
  ready: 0 | 1
}

export interface IUserInfo extends Taro.UserInfo {
  userId: number
}

export interface IUserInfoState {
  loginData: LoginData
  userInfo: IUserInfo
}

export const SAVE_LOGIN_CODE = 'SAVE_LOGIN_CODE'

export type LoginCode = string

export interface ISaveLoginCodeAction extends Action<typeof SAVE_LOGIN_CODE> {
  payload: string
}

export const SAVE_USER_DATA = 'SAVE_USER_DATA'

export interface ISaveUserDataAction extends Action<typeof SAVE_USER_DATA> {
  payload: any
}

export const UPDATE_AUTH = 'UPDATE_AUTH'

export interface IUpdateAuthorizationAction extends Action<typeof UPDATE_AUTH> {
  payload: string
}

export type SaveLoginCodeDispatch = ThunkDispatch<
  RootState,
  null,
  ISaveLoginCodeAction
>

export type SaveLoginCodeAction = ActionCreator<ThunkAction<
  Promise<ISaveLoginCodeAction>,
  RootState,
  null,
  ISaveLoginCodeAction
>>

export type AsyncLoginAction = ActionCreator<ThunkAction<
  Promise<ISaveUserDataAction>,
  RootState,
  null,
  ISaveUserDataAction
>>

export const SET_USER_INFO = 'SET_USER_INFO'

export interface ISetUserInfoAction extends Action<typeof SET_USER_INFO> {
  payload: IUserInfo
}

export const UPDATE_LOGIN_STATUS = 'UPDATE_LOGIN_STATUS'

export interface IUpdateLoginStatusAction extends Action<typeof UPDATE_LOGIN_STATUS> {
  payload: 0 | 1
}

export type LoginDispatch = ThunkDispatch<
  RootState,
  null,
  ISaveUserDataAction
>

export type LoginDispatchAction = ActionCreator<ThunkAction<
  Promise<ISaveUserDataAction>,
  RootState,
  null,
  ISaveUserDataAction
>>

export type UserActions=
| ISaveLoginCodeAction
| ISaveUserDataAction
| IUpdateAuthorizationAction
| ISetUserInfoAction
| IUpdateLoginStatusAction

