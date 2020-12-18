import Taro from "@tarojs/taro"
import { View, Image, Text } from "@tarojs/components"
import React from "react"
import backImg from "@/assets/images/back.svg"
import home from "@/assets/images/home.png"
import "./index.scss"

interface Props {
    method?: string;
    title?: string;
}

const Index: React.FC<Props> = function (props: Props) {
    const { method, title = '' } = props;
    const info = Taro.getMenuButtonBoundingClientRect()
    const back = () => {
        Taro.navigateBack({
            delta: 1
        })
    }
    const toHome = () => {
        Taro.reLaunch({
            url: '/pages/index/index'
        })
    }

    return (
        <View className='headerWrap' style={'top:' + info.top + 'px;height:' + info.height + 'px;position:fixed;'}>
            {
                method == 'back' ? <Image className='back' onClick={back} src={backImg}></Image>
                    : method == 'home' ? <Image className='back' onClick={toHome} src={home}></Image>
                        : method == 'both' ? <View className='both'>
                            <Image className='back' onClick={back} src={backImg}></Image>
                            <Image className='back' onClick={toHome} src={home}></Image>
                        </View>
                            : null
            }
            <Text className='title'>{title}</Text>
            <View className='placeHolder'></View>
        </View>
    )
}

export default Index
