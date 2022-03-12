import Vue from 'vue'
import App from './App.vue'
import '@/styles/reset.less'
import router from '@/router'
import ElementUI from 'element-ui';
import echarts from 'echarts'
Vue.use(ElementUI);
Vue.prototype.$echarts=echarts
Vue.config.productionTip = false
import 'element-ui/lib/theme-chalk/index.css';
import '@/mock'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
