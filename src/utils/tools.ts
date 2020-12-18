import Taro from '@tarojs/taro'

export function padZero(num: number): string {
  if (num < 10) {
    return '0' + num
  }
  return num.toString()
}

export function formatTime(unix: number): string {
  let v = unix * 1000
  let date = new Date(v)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()

  return [
    y,
    m,
    d
  ].map(padZero)
    .reverse().join('/')
}

export function toast(msg: string): void {
  Taro.showToast({
    title: msg,
    icon: 'none',
    duration: 3000
  })
}

export function jump(path: string): void {
  Taro.navigateTo({
    url: `/pages/${path}`
  })
}

