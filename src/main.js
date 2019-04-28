/**
 * 项目的入口文件
 */
import Vue from 'vue'
import App from './App'
import router from './router'
// rem的计算规则
import flexible from '@/js/flexible'
Vue.config.productionTip = false;

flexible();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
