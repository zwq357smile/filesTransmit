import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// PC端，也就是electron
import index from '@/view_pc/index'
// 移动端
import mobile from '@/view_mobile/mobile'
import Upload from '@/view_mobile/Upload'

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
    }, {
      path: '/upload',
      name: 'upload',
      component: Upload
    }
  ]
})
