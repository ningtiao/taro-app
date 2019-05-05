import Taro from '@tarojs/taro'
import qs from 'qs'
import {HTTPCnst, HTTP_ERROR} from '../YdConfig';

/**
 * 检查http状态值
 * @param response
 * @returns {*}
 */
function checkHttpStatus(response) {
  Taro.stopPullDownRefresh();

  // Taro.hideNavigationBarLoading();

  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response.data
  } else if (response.statusCode == 400) {

  }
  const message = HTTP_ERROR[response.statusCode] || `ERROR CODE: ${response.statusCode}`
  const error = new Error(message);
  error.data = response.data;
  error.text = message;
  error.code = response.statusCode;
  throw  error
}

/**
 * 检查返回值是否正常
 */
function checkSuccess(data) {
  if (data instanceof ArrayBuffer && typeof data === 'string') {
    return data
  }
  if(
    typeof data.code === 'number' &&
    (data.code === 1001 || data.code === 101)
  ){
    Taro.removeStorageSync('token')
    Taro.showToast({title: 'token失效,返回登录', icon: 'none',});
    Taro.redirectTo({url:'/pages/login/index'})
    return false
  }
  if (
    typeof data.code === 'number' &&
    data.code === 102
  ) {
    return data
  }
  if(
    data.constructor===Array
  ) {
    return data
  }

  const message = (data.errMsg || data.message) || '服务器异常';
  const error = new Error(message);
  error.data = data;
  error.text = data;
  error.code = data.code;
  throw error
}

/**
 * 请求错误处理
 */
function throwError(err) {
  if(err && err.message.indexOf('token')>-1){
    Taro.showToast({title: 'token失效，返回登录页', icon: 'none',});
    Taro.redirectTo({url:'/pages/login/index'})
  }
  if(err && err.message==='Failed to fetch'){
    Taro.showToast({title: '连接服务器失败', icon: 'none',});
    return
  }
  // Taro.hideNavigationBarLoading();
  // Taro.hideNavigationBarLoading();

  const error = new Error((err.errMsg || err.message) || '服务器正在维护中!');
  error.code = 500;
  throw error;
}

export default {
  request(server,options,method,ischeck=false) {

    // Taro.showNavigationBarLoading();
    /*检测token是否过期*/
    if(!Taro.getStorageSync('token')){Taro.navigateTo({url:'/pages/login/index'})}
    if(server==='H5_url'){
      if(options.hasOwnProperty('header')){
        Object.assign(options.header,{"Authorization":Taro.getStorageSync('token')})
      }else{
        options.header={
          "Authorization":Taro.getStorageSync('token'),
        }
      }
    }else{
      /*排除登录接口,没有给token，自动加入*/
      if(method==='POST'){
        if(options && options.url.indexOf('accessToken')<0){
          options.url=options.url.includes('?')?options.url+"&accessToken="+Taro.getStorageSync('token'):options.url+"?accessToken="+Taro.getStorageSync('token')
        }
      }else{
        if(!(options && options.data.hasOwnProperty('accessToken')) && options.url!=='auth/logonH5'){
          Object.assign(options.data,{"accessToken":Taro.getStorageSync('token')})
        }
      }
    }
    const {url} = options;
    return Taro.request({
      ...options,
      method: method || 'GET',
      url: `${HTTPCnst[server]}${url}`,
      header: {
        ...options.header
      },
    }).then(checkHttpStatus)
      .then((res) => {
        if(ischeck){return res}
        return checkSuccess(res)
      })
      .catch(error => {
        throwError(error)
      })

  },
  /*对于某些接口，根本没有返回code,我们可以强制跳过检测*/
  get(server,options,ischeck) {
    return this.request(server,{
      ...options
    },'GET',ischeck)
  },
  post(server,options,ischeck) {
    return this.request(server,{
      ...options,
      data: qs.stringify(options.data)
    }, 'POST',ischeck)
  }
}
