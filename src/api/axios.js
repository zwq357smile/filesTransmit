import axios from 'axios';
import qs from 'qs';
import config from '@/js/config';

axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = `http://localhost:${config.requestPort}`; // 项目中请求处理文件的路径
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/** 请求拦截
 *1、请求配置正确(符合axios的规范)
 正常发请求post、request.data
 post请求的request.data序列化处理
 *2、请求配置错误(不符合axios的规范)
 不发请求
 **/
axios.interceptors.request.use(function (request) {
  if (request.method === 'post') { // post请求参数序列化处理
    for (let item in request.data) {
      if (typeof (request.data[item]) === 'object') {
        request.data[item] = JSON.stringify(request.data[item]);
      }
    }
    request.data = qs.stringify(request.data);
  }
  return request;
}, function (error) {
  console.log('请求错误：' + error);
});

/** 响应拦截
 *1、后端正常响应（成功或失败）：
 resolve(data)
 data:{Tag,Result,Message}
 *2、后端响应失败（没有正常收到后端返回值）
 reject(error)
 error:浏览器响应失败返回值，包括code、message
 **/

/* axios.interceptors.request.use(function(req){
  console.log(req);
  return req;
},function(error){
  let errorMsg = error;
  if(error.message.indexOf('timeout') > -1){
    errorMsg = '请求超时';
  }else{
    switch(error.message){
      case 'Network Error':
        errorMsg = '网络无法连接';
        break;
      default:
        break;
    }
  }
  console.log('响应失败：' + errorMsg);
  return Promise.reject(error);
}); */

/* axios.interceptors.response.use(function(response){
  if(!response.data){
    console.log('请求失败，没有返回数据');
  }else{
    try{//请求成功，反序列化处理；
      // response.data = JSON.parse(response.data);
    }catch(e){}
  }
  return response.data;
},function(error){
  let errorMsg = error;
  if(error.message.indexOf('timeout') > -1){
    errorMsg = '请求超时';
  }else{
    switch(error.message){
      case 'Network Error':
        errorMsg = '网络无法连接';
        break;
      default:
        break;
    }
  }
  console.log('响应失败：' + errorMsg);
  return Promise.reject(error);
}); */

export default axios;
