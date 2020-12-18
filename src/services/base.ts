import axios from 'axios'
import Taro from '@tarojs/taro'
import mpAdapter from 'axios-miniprogram-adapter'
import config from '@/config/index'
import { updateAuthorization } from '@/store/modules/user/action'
import store from '@/store'

axios.defaults.adapter = mpAdapter

const service = axios.create({
  baseURL: config.baseUrl,
})

service.interceptors.request.use((axiosConfig) => {
  if (axiosConfig.url && axiosConfig.url.indexOf('login') > -1) {
    return axiosConfig
  }
  if (!axiosConfig.headers) {
    axiosConfig.headers = {}
  }

  axiosConfig.headers['Authorization'] = store.getState().user.loginData.Authorization || Taro.getStorageSync(config.AuthorizationKey) || ''
  return axiosConfig
})

service.interceptors.response.use((response) => {
  // 储存用户jwt
  if (response.headers['Authorization']) {
    store.dispatch(updateAuthorization(response.headers['Authorization']))
    Taro.setStorageSync(config.AuthorizationKey, response.headers['Authorization'])
  }
  return response.data
})

export default service
