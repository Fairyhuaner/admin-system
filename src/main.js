import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/reset.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/permission'

// 一次性把所有按需导出给导出来
import * as obj from '@/filters'
// Object.keys 获取到对象所有的属性名组成的一个数组
Object.keys(obj).forEach(key => {
  // 批量创建过滤器
  Vue.filter(key, obj[key])
})

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
