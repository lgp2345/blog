import Vue from 'vue'
import App from './App.vue'
// import router from './router'
// import store from './store'
import axios from 'axios'

import ElementUI from 'element-ui';

//axios拦截器
axios.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    return Promise.reject(error)
}); 

Vue.use(ElementUI);

Vue.config.productionTip = false;
//将axios添加到vue的原型属性中
Vue.prototype.$http = axios;

new Vue({
//   router,
//   store,
  render: function (h) { return h(App) }
}).$mount('#app')
