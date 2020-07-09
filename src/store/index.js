import Vue from "vue";
import Vuex from "vuex";
import Cookie from "cookie_js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollaps: JSON.parse(sessionStorage.getItem('isCollaspse')) || false,
    // isCollaps: JSON.parse(Cookie.get('isCollaspse')) || false,
    count: 10
  },
  getters: {
    count: (state) => state.count + 10
    // count: function (state) {
    //   return state.count + 10
    // }
  },
  mutations: {
    SET_COLLAPS(state){
      state.isCollaps = !state.isCollaps
      console.log(state.isCollaps)
      // html5本地存储
      sessionStorage.setItem('isCollaspse', JSON.stringify(state.isCollaps))
      // Cookie.set('isCollaspse', JSON.stringify(state.isCollaps))
    },
    SET_COUNT(state, value){
      state.count = value
      console.log( state.count)
    }
  },
  actions: {},
  modules: {}
});
