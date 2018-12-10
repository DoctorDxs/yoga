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



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})




