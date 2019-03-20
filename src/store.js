import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drag:{
      dragCount:0
      ,dragList:[]
      ,drag_showbox_status:false
      ,drag_showbox_item:{}
    }
  },
  mutations: {
    dragCount (state) {
      state.drag.dragCount++
    },
    dragList (state,payload) {
      state.drag.dragList.push(payload);
    },
    //删除
    dragListRemove (state,id) {
      state.drag.dragList.forEach((item,index) =>{
        if(item.id === id){
          state.drag.dragList.splice(index,1)
        }
      })
    },
    drag_showbox_status (state,payload){
      state.drag.drag_showbox_status = payload
    },
    drag_showbox_item (state,payload){
      state.drag.drag_showbox_item = payload
    }

  },
  actions: {

  }
})
