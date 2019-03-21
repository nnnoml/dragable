export default {
    state: {
          dragCount:0  //拖曳控件id
          ,dragList:[] //控件list
          ,drag_showbox_status:false //编辑弹窗状态
          ,drag_showbox_item:{} //编辑弹窗填充
          ,reference_line:false //中轴线
      }
    ,mutations: {
        dragCount (state) {
            state.dragCount++
        }
        ,dragList (state,payload) {
            state.dragList.push(payload);
        }
        //删除控件
        ,dragListRemove (state,id) {
            state.dragList.forEach((item,index) =>{
                if(item.id === id){
                    state.dragList.splice(index,1)
                }
            })
        }
        ,drag_showbox_status (state,payload){
            state.drag_showbox_status = payload
        }
        ,drag_showbox_item (state,payload){
            state.drag_showbox_item = payload
        }
        ,reference_line(state,payload){
            state.reference_line = payload
        }

    }
    ,actions: {
    }
}