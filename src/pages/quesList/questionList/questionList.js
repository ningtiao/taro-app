import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import ProgCharts from '../../../components/progress/progress';
import rightIcon from '../../../assets/image/right-icon.png'
import StackBar from '../../../components/stackBar/stackBar';
import './index.scss'

export default class Questionlist extends Component {
  static defaultProps = {
    list: [],
  }
  state = {
    isShowNum: 0,
    hide: false,
  }
  getDetail(id) {
    console.log(111111111111)
    console.log(id)
    Taro.navigateTo({ url: '/pages/detail/detail?id=' + id })
  }
  isShowPress() {
    console.log(44)
    this.setState({
      isShowNum: 1,
      hide: true
    })
  }
  isHidePress() {
    this.setState({
      isShowNum: 0,
      hide: false
    })
  }
  render() {
    const { list } = this.props
    console.log(list)
    return (
      <View className='ques-list-content'>
        {list.map((item, itemIndex) => (
          <View className='item-list' key={item.title}>
            <View className='item-list-title'>{item.title}</View>
            {(item.questionType === 'TYPE_1' || item.questionType === 'TYPE_2' || item.questionType === 'TYPE_3'
              || item.questionType === 'TYPE_4' || item.questionType === 'TYPE_5' || item.questionType === 'TYPE_6') && (
                <View>
                  <View className='porgress-list'>
                    {item.optionList.length <= 5 && (
                      item.optionList.map((items, index) => (
                        <View className='item-porgress' key={items.index}>
                          {(index > 4) && (
                            <ProgCharts allNum={item.dataList[index][0]} isShowNum={this.state.isShowNum} key={items.index} percentageNum={parseFloat(item.dataList[index][1]) / 100} progressName={item.optionList[index].title} />
                          )}
                          {index < 5 && (
                            <ProgCharts allNum={item.dataList[index][0]} key={items.index} isShowNum={1} percentageNum={parseFloat(item.dataList[index][1]) / 100} progressName={item.optionList[index].title} />
                          )}
                        </View>
                      ))
                    )}

                    {(item.optionList.length > 5 && item.optionList.length <= 10) && (
                      <View className='atList'>
                        {!this.state.hide ? <View className='atItem' onClick={this.isShowPress.bind(this)}>显示更多</View> :
                          <View className='atItem' onClick={this.isHidePress.bind(this)}>隐藏</View>}
                      </View>
                    )}

                    {item.optionList.length > 10 && (
                      <View className='atList'>
                        <View className='atItem'>更多</View>
                        <View className='atItem'><Image className='right-icon' src={rightIcon}></Image></View>
                      </View>
                    )}

                  </View>
                  <View className='Taro-table'>
                    <View className='col'>
                      <Text className='col-text'>选项</Text>
                      <Text className='col-text'>小计</Text>
                      <Text className='col-text'>百分比</Text>
                    </View>
                    {item.optionList.map((items, index) => (
                      <View className='col' key={items.index}>
                        <Text className='col-text'>{item.optionList[index].title}</Text>
                        <Text className='col-text'>{item.dataList[index][0]}</Text>
                        <Text className='col-text'>{item.dataList[index][1]}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

            {(item.questionType === 'TYPE_8' || item.questionType === 'TYPE_7') && (
              <View>
                <View className='porgress-list'>
                  {item.optionList.map((items, index) => (
                    <View className='item-porgress' key={items.index}>
                      <ProgCharts allNum={item.dataList[index][0]} key={items.index} percentageNum={parseFloat(item.dataList[index][1]) / 100} progressName={item.optionList[index].title} />
                    </View>
                  ))}
                </View>
                <View className='Taro-table'>
                  <View className='col'>
                    <Text className='col-text'>答案选项</Text>
                    <Text className='col-text'>回复情况</Text>
                  </View>
                  {item.optionList.map((items, index) => (
                    <View className='col' key={items.index}>
                      <Text className='col-text'><Image className='col-image' src={item.optionList[index].customAttr.images.src}></Image>{item.optionList[index].title}</Text>
                      <Text className='col-text'>{item.dataList[index][0]}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {(item.questionType === 'TYPE_9' || item.questionType === 'TYPE_10' || item.questionType === 'TYPE_11' || item.questionType === 'TYPE_16' || item.questionType === 'TYPE_18'
              || item.questionType === 'TYPE_19' || item.questionType === 'TYPE_20' || item.questionType === 'TYPE_22' || item.questionType === 'TYPE_23') && (
                <View className='atList'>
                  <View className='atItem'>查看详情</View>
                  <View className='atItem' onClick={this.getDetail.bind(this, item.questionId)}><Image className='right-icon' src={rightIcon}></Image></View>
                </View>
              )}

            {(item.questionType === 'TYPE_12') && (
              <View className='detail-table' style=''>
                <View className='col'>
                  <View className='col-view'>
                    <View className='flex'><Text className='col-text col-header'>选项</Text></View>
                    {item.dataList[0].map((i, indexss) => (
                      <View key={i} className='flex'>
                        {indexss === item.dataList[0].length - 1 && (
                          <Text className='col-text col-header'>平均分</Text>
                        )}
                        {indexss < item.dataList[0].length - 1 && (
                          <Text className='col-text col-header'>{indexss + 1}</Text>
                        )}
                      </View>
                    ))}
                  </View>

                  {item.optionList.map((items, indexs) => (
                    <View className='col-view' key={items}>
                      <View className='flex'><Text className='col-text col-header'>{items.formatTitle}</Text></View>
                      {item.dataList[indexs].map((i,indexs) => (
                        <View key={i} className='flex'>
                        {/* <Text className='col-text col-header'>{i.split(',')[0]}  {parseInt(i.split(',')[1])}%</Text> */}
                        {indexs == item.dataList[0].length - 1 && (
                          <Text className='col-text col-header'>{i}</Text>
                        )}
                        {indexs < item.dataList[0].length - 1 && (
                         <Text className='col-text col-header'>{i.split(',')[0]}  {parseInt(i.split(',')[1])}%</Text>
                        )}
                        </View>
                      ))}

                    </View>
                  ))}
                </View>
              </View>
            )}

            {(item.questionType === 'TYPE_13') && (
              <StackBar list={list[itemIndex]}></StackBar>
            )}
            {(item.questionType === 'TYPE_14') && (
              <View className='Taro-table'>

                <View className='col'>
                  <Text className='col-text'></Text>
                  {item.optionList.map((items, indexs) => (
                    <Text className='col-text' key={items}>{item.optionList[indexs].title}</Text>
                  ))}
                </View>

                {item.matrixRowList.map((items, index) => (
                  <View className='col' key={items.title}>
                    <Text className='col-text'>{items.title}</Text>
                    {
                      item.dataList[index].map((ite, Ilist) => (
                        <Text className='col-text' key={ite.index}>{ite}</Text>
                      ))
                    }
                  </View>
                ))}
              </View>
            )}
            {(item.questionType === 'TYPE_15') && (
              <View className='Taro-table'>
                <View className='col'>
                  <Text className='col-text'>选项</Text>
                  <Text className='col-text'>平均分</Text>
                </View>
                {item.optionList.map((items, index) => (
                  <View className='col' key={items.index}>
                    <Text className='col-text'>{item.optionList[index].title}</Text>
                    <Text className='col-text'>{item.dataList[index][0]}</Text>
                  </View>
                ))}
              </View>
            )}
            <View className='num'>作答次数:  {item.answerNum}次</View>
          </View>
        ))}
      </View>
    )
  }
}
