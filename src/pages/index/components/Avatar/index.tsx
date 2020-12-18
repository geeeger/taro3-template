import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Button, Text, Image, ITouchEvent, Block } from '@tarojs/components'
import Taro from "@tarojs/taro"
import avatar from '@/assets/images/avatar.png'
import { RootState } from '@/store/modules/index'
import { setUserInfo } from '@/store/modules/user/action'
import { updateUserInfo } from '@/services/apis/user'
import { toast } from '@/utils/index'
import config from '@/config/index'
import './index.scss'

type IndexProps = {}

const Index: React.FC<IndexProps> = function () {
  const userInfo = useSelector((state: RootState) => state.user.userInfo)
  const ready = useSelector((state: RootState) => state.user.loginData.ready)
  const [CanIUse] = useState(Taro.canIUse('button.open-type.getUserInfo'))
  const dispatch = useDispatch()

  const getUInfoAction = async (e: ITouchEvent) => {

    const { userInfo: uInfo } = e.detail;

    if (userInfo) {
      try {
        const res = await updateUserInfo(uInfo)
        if (res.success) {
          Taro.removeStorageSync(config.AuthorizationKey)
          dispatch(setUserInfo(uInfo))
        }
      } catch (err) {
        toast('更新用户信息出错，请稍后再试')
      }
    } else {
      toast('您未进行授权，我们将不会更新您的个人信息')
    }
  }

  const getTips = () => {
    toast('您当前版本不支持授权按钮，请更新微信')
  }
  return (
    <View className='avatar_name'>
      { userInfo.avatarUrl && ready
        ? <Image className='avatar' src={userInfo.avatarUrl}></Image>
        : (<Block>
          {
            CanIUse
              ? (
                <Button
                  className='user-face-btn'
                  plain
                  open-type='getUserInfo'
                  onGetUserInfo={getUInfoAction}
                >
                  <Image className='avatar' mode='aspectFit' src={userInfo.avatarUrl || avatar} />
                </Button>
              )
              : <Image className='avatar' src={userInfo.avatarUrl} onClick={getTips}></Image>
          }
        </Block>)
      }
      <Text className='name'>{userInfo.nickName === '游客' ? '游客(点击头像授权)' : userInfo.nickName}</Text>
    </View>
  )
}

export default Index

