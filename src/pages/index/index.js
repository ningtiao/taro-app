import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  goToIndex() {
    Taro.navigateTo({ url: '/pages/quesList/quesList?projectId=' + '5cb6c37d43e53d2043fcf4c0'  + '&accessToken=b7aecd2b2a7ee2a9f1eced81e53cfd39_cs_web' })
  }
  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <View className='btn' onClick={this.goToIndex}>
          点击
        </View>
      </View>
    )
  }
}
