import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { Provider } from 'react-redux'

import store from './store'

import config from './config/index'

import './app.scss'
import { login, updateLoginStatus } from './store/modules/user/action'
import { LoginDispatch } from './store/modules/user/types'
import { toast } from './utils'

class App extends Component {
  componentDidMount () {
    // const launchOption = Taro.getLaunchOptionsSync()

    // 登录
    Taro.checkSession()
      .then(() => {
        let sessionId = Taro.getStorageSync(config.AuthorizationKey)
        if (!sessionId) {
          throw new Error('not login in')
        }
        store.dispatch(updateLoginStatus(1))

      })
      .catch(() => {
        (store.dispatch as LoginDispatch)(login())
          .then(() => {
            store.dispatch(updateLoginStatus(1))
          })
          .catch(() => {
            toast('登录失败，请稍后尝试')
          })
      })

  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
