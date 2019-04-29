/**
 * 项目的入口文件
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
// rem的计算规则
import flexible from '@/js/flexible'

// 路由拦截
router.beforeEach((to, from, next) => {
  // ...
  next()
});

Vue.config.productionTip = false;

flexible();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
