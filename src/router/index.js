import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import index from '@/view_pc/index'
import mobile from '@/view_mobile/mobile'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }, {
      path: '/mobile',
      name: 'mobile',
      component: mobile
    }
  ]
})
