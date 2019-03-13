import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dragList:[]
  },
  mutations: {
    addList (state,info) {
      state.dragList.push(info)
    }
  },
  actions: {

  }
})
