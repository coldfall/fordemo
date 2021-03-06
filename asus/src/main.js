import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import router from './assets/js/router.js'


Vue.use(VueRouter)

import Mint from 'mint-ui';
Vue.use(Mint);

import Vuex from 'vuex'
Vue.use(Vuex)
import store from './assets/js/data.js'

import '../node_modules/mint-ui/lib/style.css'

import './assets/css/animate.css'
import './assets/iconfont/iconfont.css'

import axios from 'axios';
Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
