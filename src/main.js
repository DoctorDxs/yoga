// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AwesomePicker from 'vue-awesome-picker';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueClipboard from 'vue-clipboard2'
import Croppa from 'vue-croppa'

import Toast from './plugins/toast/index';
import loading from './plugins/loading/index';

import './plugins/toast/index.css';
import 'swiper/dist/css/swiper.css'
import 'vue-croppa/dist/vue-croppa.css'

Vue.use(loading)
Vue.use(VueAwesomeSwiper)
Vue.use(AwesomePicker);
Vue.use(VueClipboard)
Vue.use(Toast)
Vue.use(Croppa) 


// rem h5 适配
import 'amfe-flexible/index.js'

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requirePhone)){ // 判断该路由是否需要登录权限
      let userInfo = localStorage.getItem("userInfo")
      if (userInfo) {
        userInfo = JSON.parse(userInfo)
      };
      // 判断是否存在   phone
      if (userInfo.mobile) { // 判断当前的token是否存在
          next();
      }else {
          next('/bindTel')
     }
  } else {
      next();
  }
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})




