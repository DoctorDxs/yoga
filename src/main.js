// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AwesomePicker from 'vue-awesome-picker';

import VueClipboard from 'vue-clipboard2'
import InfiniteLoading from 'vue-infinite-loading';
import Toast from './plugins/toast/index';
import loading from './plugins/loading/index';
import modal from './plugins/modal/index';
import bg from './plugins/bg/index';
import backhome from './plugins/backhome/index';

import './plugins/toast/index.css';
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
Vue.use(Mint);


Vue.use(InfiniteLoading)
Vue.use(backhome)
Vue.use(bg)
Vue.use(loading)
Vue.use(modal)
Vue.use(AwesomePicker);
Vue.use(VueClipboard)
Vue.use(Toast)


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
      if (userInfo.mobile) { // phone
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




