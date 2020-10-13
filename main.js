//导入vue组件
import Vue from 'vue'

// 导入根组件app
import App from './App'
import baseUrl from './utils/config.js'
import api from './utils/api.js'
// 取消生产提示
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$baseUrl = baseUrl 

//指定根组件类型
App.mpType = 'app'

// 实例化vue组件
const app = new Vue({
    ...App
})
// 进行挂载
app.$mount()
