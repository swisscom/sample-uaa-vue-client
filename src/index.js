/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router';
import router from './router'
import App from './App'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Mgr from './services/SecurityService';

Vue.use(VueRouter);
let mgr = new Mgr();

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
