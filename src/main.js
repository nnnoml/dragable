import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store/store'

Vue.config.productionTip = false
Vue.prototype.axios = axios

/**
 * axios 封装成ajax
 * @param url 访问路径
 * @param data 访问参数
 * @param type 请求类型 get post
 * @param callback 回调方法
 */
Vue.prototype.ajax=(url,data,type,callback)=>{
  axios[type](url, {
      params: data
  })
  .then(function (response) {
    eval(callback)(response.data);
  })
  .catch(function (error) {
    window.console.log(error);
  });
}

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
