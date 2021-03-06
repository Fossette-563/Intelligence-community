import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/common.scss'
import install from '@/utils/components'
import '@/permission'
/**引入自定义指令*/
import './directive/permission'

import Fragment from 'vue-fragment'

Vue.use(Fragment.Plugin)
Vue.use(install)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
