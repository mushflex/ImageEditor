/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App.vue'
import jQuery from 'jquery'
global.jQuery = jQuery
global.$ = jQuery
let Bootstrap = require('bootstrap')
import '../node_modules/bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
