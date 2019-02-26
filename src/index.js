/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router';
import router from './router'
import App from './App'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
