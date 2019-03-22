export default {
    state: {
          dragCount:1  //拖曳控件id
          ,dragList:[] //控件list
          ,drag_showbox_status:false //编辑弹窗状态
          ,drag_item_cache:{} //编辑弹窗填充
          ,reference_line:false //中轴线
      }
    ,mutations: {
        dragCount (state) {
            state.dragCount++
        }
        ,dragList (state,payload) {
            state.dragList.push(payload);
        }
        //同步更新源数据位置
        ,updateItemPos(state,payload){
            state.dragList.forEach((item,index) =>{
                if(item.id === payload.id){
                    state.dragList[index].x=payload.left;
                    state.dragList[index].y=payload.top;
                }
            })
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
        ,drag_item_cache (state,payload){
            state.drag_item_cache = payload
        }
        ,reference_line(state,payload){
            state.reference_line = payload
        }

    }
    ,actions: {
    }
}