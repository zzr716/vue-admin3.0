import Vue from "vue";
import Vuex from "vuex";
import { Login, GetSms } from '@/api/login';
import Cookie from "cookie_js";

Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {
//     isCollaps: JSON.parse(sessionStorage.getItem('isCollaspse')) || false,
//     // isCollaps: JSON.parse(Cookie.get('isCollaspse')) || false,
//     count: 10
//   },
//   getters: {
//     count: (state) => state.count + 10
//     // count: function (state) {
//     //   return state.count + 10
//     // }
//   },
//   mutations: {
//     SET_COLLAPS(state){
//       state.isCollaps = !state.isCollaps
//       console.log(state.isCollaps)
//       // html5本地存储
//       sessionStorage.setItem('isCollaspse', JSON.stringify(state.isCollaps))
//       // Cookie.set('isCollaspse', JSON.stringify(state.isCollaps))
//     },
//     SET_COUNT(state, value){
//       state.count = value
//       console.log( state.count)
//     }
//   },
//   actions: {
//     setMenuStatus (content, data) { //第一个参数 content.state,content.getters,content.commit
//       console.log(content)
//       // 第二个参数对应传进来的参数
//       // content.commit('SET_COLLAPS')
//       // 异步，请求接口返回数据后，接着去做别的事情
//       /**
//        * b接口，a接口
//        * b接口需要a接口返回的数据
//        */
//     },
//     login (content, data) {
//       return new Promise((resolve, reject) => {
//         Login(data).then((response) => {
//           resolve()
//         }).catch(error => {
//           reject()
//         })
//       })
//     }
//     // 解构写第一个参数
//     // setMenuStatus ({state, getters}, data) { //第一个参数 content.state,content.getters,content.commit
//     // }
//   },
//   modules: {
    
//   }
// });

import app from "./modules/app.js";
import login from "./modules/login.js";
export default new Vuex.Store({
  modules: {
    app,
    login
  }
})