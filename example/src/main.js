import Vue from 'vue'
import App from './App'
import router from './router'
import WxUI from '../../src/index.js'
Vue.use(WxUI)

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})