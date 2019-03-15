import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dragList:[],
    dragCount:0,
    drag_showbox_status:false,
    drag_showbox_item:{},
  },
  mutations: {
    dragCount (state) {
      state.dragCount++
    },
    dragList (state,payload) {
      state.dragList.push(payload);
    },
    //删除
    dragListRemove (state,id) {
      state.dragList.forEach((item,index) =>{
        if(item.id === id){
          state.dragList.splice(index,1)
        }
      })
    },
    drag_showbox_status (state,payload){
      state.drag_showbox_status = payload
    },
    drag_showbox_item (state,payload){
      state.drag_showbox_item = payload
    }

  },
  actions: {

  }
})
