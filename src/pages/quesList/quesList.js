import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView,Text } from '@tarojs/components'
import Questionlist from './questionList/questionList'
// import {Loading} from '@components/loading'
import api from '../../services/api'
import { getWindowHeight } from '../../utils/style'
import './quesList.scss'

export default class Index extends Component {
  constructor () {
    super()
    this.state = {
      scrollY: true,
      quesResult: [],
      loaded: false,
      hasMore: false,
      quesList: [],
      page: 1,
      Loading: false,
      questionId: '',
      itemIndex: 0
    }
    // this.click  = this.click.bind(this)
  }
  ScrollToUpper() { //滚动到顶部事件
    console.log('滚动到顶部事件')

    // this.props.Upper()
  }
  ScrollToLower() { //滚动到底部事件
    // console.log(this.state.quesList.questionList[this.state.itemIndex + 1].id == '')
    console.log(1)
    if(this.state.quesList.questionList.length == this.state.itemIndex + 1) {
      this.setState({
        hasMore: true,
      })
      return false
    }
    this.setState({
      page: this.state.page + 1,
      itemIndex: this.state.itemIndex + 1,
      Loading: true,
      questionId: this.state.quesList.questionList[this.state.itemIndex + 1].id
    },() => {
      setTimeout(()=>{
        this.getQuestionStatisticalResult()
      },500)
   })
  

  }
  config = {
    navigationBarTitleText: '基本图表'
  }
  getQuestionList = (id) => {
    // Loading.open()
    console.log(this.$router.params.accessToken)
    Taro.setStorageSync('token',this.$router.params.accessToken)
    const params = {
      accessToken: this.$router.params.accessToken,
      projectId: this.$router.params.projectId 
    }
    api.get('shopguide_url',{url:'questionnaire/getQuestionnaireStatisticalResult',data:params}).then((res)=>{
      console.log(res.dataObject)
      console.log(res.dataObject.questionList[0].id)
      this.setState({
        questionId: res.dataObject.questionList[0].id,
        quesList: res.dataObject,
      })
      // Loading.close()
      setTimeout(()=>{
        this.getQuestionStatisticalResult(id)
      },300)
    })
  }
  getQuestionStatisticalResult = (id) => {
    console.log(this.state.page)
    // Taro.getStorageSync('token')
    console.log(this.$router.params.accessToken)
    const question = {
      accessToken: Taro.getStorageSync('token'),
      questionId: this.state.questionId,
      page: this.state.page,
      rows: 1
    }
    let _self = this
    api.get('shopguide_url',{url:'questionnaire/question/getQuestionStatisticalResult',data:question}).then((res)=>{
      let ques = [..._self.state.quesResult]
      ques.push(res.dataObject)
      _self.setState({
        quesResult: ques,
        loaded: true,
        Loading: false
      })
      console.log(_self.state.quesResult,'66666666')
    })
  }
  componentWillMount () {
    const id = this.$router.params.id
    this.getQuestionList(id)
  }

  componentDidMount () {
    
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    let  loadingMore = null
    if(this.state.Loading == true) {
      loadingMore = <View className='loadMoreGif'>
                    <View className='zan-loading' />
                    <View className='text'>加载中...</View>
                  </View>
    } else {
      loadingMore = null
    }

    if (!this.state.loaded) {
      return 
    }

    let { quesList, quesResult } = this.state
    console.log(quesResult, '66666111116')
    return (
      <View class='ques'>
        {/* <NavBar></NavBar> */}
        <ScrollView
          className='dragUpdata'
          scrollY={this.state.scrollY}
          lowerThreshold='100'
          onScrollToUpper={this.ScrollToUpper.bind(this)}
          onScrollToLower={this.ScrollToLower.bind(this)}
          style={{ height: getWindowHeight(false) }}
        >
          <View className='question-content'>
            <View className='title'>
              <Text className='title-text'>{quesList.title}</Text>
            </View>
            <View className='data statistics'>
                <View className='data-flex'>
                  <View className='data-flex-title'>问卷总数</View>
                  <View className='data-flex-total'>{quesList.projectNum}份</View>
                </View>
                <View className='data-flex'>
                  <View className='data-flex-title'>平均答题时长</View>
                  <View className='data-flex-total'>{(Math.floor(quesList.answerAvgTime/3600) + '分' + quesList.answerAvgTime%60 +　'秒')}</View>
                </View>
            </View>
            <Questionlist list={quesResult} />
            {loadingMore}
            {this.state.hasMore &&
              <View className='home__loading home__loading--not-more'>
                <Text className='home__loading-txt'>暂无更多内容!</Text>
              </View>
            }
            {quesResult.length == 1 &&
              <View onClick={this.ScrollToLower.bind(this)} className='home__loading home__loading--not-more'>
                <Text className='home__loading-txt'>点击加载更多</Text>
              </View>
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}
