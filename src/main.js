import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./icons"
import "./router/premit.js"
// 自定义全局组件
// Vue.component('svg-icon', {
//   template: "<div>dddddd</div>"
// })

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueCompositionApi);

// 路由守卫
// router.beforeEach((to, from, next) => {
//   console.log(to) //下一个页面
//   console.log(from) // 离开之前的页面（上一个）
//   console.log(next)
//   next()  // to
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
