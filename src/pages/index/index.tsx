import React from 'react'
import { View } from '@tarojs/components'
import HeaderNav from '@/components/HeaderNav/index'
import { useShareAppMessage } from '@tarojs/taro'
import Avatar from './components/Avatar/index'
import './index.scss'


type IndexProps = {}

const Index: React.FC<IndexProps> = function () {
  useShareAppMessage((res) => {
    if (res.from === 'button') {
      console.log('由页面内按钮调起')
    }
    return {
      title: 'template',
      path: '/pages/index/index'
    }
  })
  return (
    <View className='index'>
      <HeaderNav title='首页'></HeaderNav>
      <View className='head_back_img'>
        <Avatar />
      </View>
    </View>
  )
}

export default Index
