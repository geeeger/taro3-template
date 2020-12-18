export interface CommonResponse<T> {
  success: boolean
  msg: string
  code: number
  data: T
}

export interface LoginParams {
  thirdCode: string
  wxEncryptData?: string
  iv?: string
  firstVisitMedium?: string
  firstVisitSource?: string
}

export type LoginResponse = CommonResponse<any>

export type AuthResponse = CommonResponse<any>


