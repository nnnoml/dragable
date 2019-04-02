export default {
    state: {
          dragCount:1  //拖曳控件递增id
          ,dragId:'' //当前操作的控件id
          ,dragInfo:{
              width:0 //分辨率宽
              ,height:0 //分辨率高
              ,item_width:0 //组件宽
              ,item_height:0 //组件高
              ,item_x:0 //组件横向X
              ,item_y:0 //组件纵向Y
              ,text_plugin:'' //文本组件
              ,img_plugin:'' //图片组件
              ,scroll_img_plugin:'' //轮播组件
          } //全局信息
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
        ,dragId (state,payload){
            state.dragId = payload
        }
        //同步更新源组件位置
        ,updateItemPos(state,payload){
            state.dragList.forEach((item,index) =>{
                if(item.id === state.dragId){
                    if(typeof(payload.left)!=='undefined')
                        state.dragList[index].x=payload.left;
                    if(typeof(payload.top)!=='undefined')
                        state.dragList[index].y=payload.top;
                }
            })
        }
        //同步更新源组件大小
        ,updateItemSize(state,payload){
            state.dragList.forEach((item,index) =>{
                if(item.id === state.dragId){
                    if(typeof(payload.width)!=='undefined')
                        state.dragList[index].w=payload.width;
                    if(typeof(payload.height)!=='undefined')
                        state.dragList[index].h=payload.height;
                }
            })
        }
        //删除控件
        ,dragListRemove (state) {
            state.dragList.forEach((item,index) =>{
                if(item.id === state.dragId){
                    state.dragList.splice(index,1)
                }
            })
        }
        //组件信息
        ,dragInfo(state,payload){
            for(var key in payload){
                if(typeof(payload[key])!=undefined){
                    state.dragInfo[key] = payload[key];
                }
            }
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