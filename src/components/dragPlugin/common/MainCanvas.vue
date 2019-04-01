<template>
  <div class="maincanvas">
    <div>
      <div class="zhuobu" :style="canvasHeight" @drop.prevent="drop" @dragover.prevent>
        <VueDraggableResizable
          :w="item.w"
          :h="item.h"
          :x="item.x"
          :y="item.y"
          :z="item.zindex"
          :parent="true"
          :handles="['tl','tr','bl','br']"
          
          @dblclick.native="showBox(item)"
          @activated = "onActivated(item)"
          @deactivated="onDeactivated(item)"
          @resizing="onResizing"
          @dragging="onDragging"
          v-for="(item, index) in dragList" :key='index' :id="item.id">
          <div v-html="item.dom"></div>
          <div v-show="item.activated" class="shanchu" @click="removeDrag(item,$event)">删</div>
        </VueDraggableResizable>
      </div>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

export default {
  name: 'MainCanvas'
  ,components: {
    VueDraggableResizable
  }
  ,data:function(){
    return{
    }
  }
  ,methods:{
    //拖入选区
    drop (e) {
      let info = JSON.parse(e.dataTransfer.getData('Text'))
      //鼠标当前的坐标
      info.x = e.clientX;
      info.y = e.clientY;

      info.id = info.type+'_'+info.id +'_'+ Date.parse(new Date())
      this.$store.commit('dragList',info);
    }
    //弹出层
    ,showBox(item){
      this.$store.commit('drag_showbox_status',true);
      this.$store.commit('drag_item_cache',item);
    }
    //单击事件  出现删除,记录id
    //将宽高和其他参数放置在右上角
    ,onActivated(item){
      item.activated = true;
      this.$store.commit('dragId',item.id);

      let dragList = this.$store.state.draggable.dragList;
      //单击组件 将组件信息记录
      dragList.forEach((list,index) =>{
                if(list.id === item.id){
                  this.$store.commit('dragInfo',{'item_width':list.w,'item_height':list.h});
                  this.$store.commit('dragInfo',{'item_x':list.x,'item_y':list.y});
                }
            })
      
    }
    //单击取消事件  屏蔽删除
    ,onDeactivated(item){
      item.activated = false;
      //this.$store.commit('dragId','');
    }
    //删除
    ,removeDrag(item,e){
      e.currentTarget.active = false
      this.$store.commit('dragListRemove',item.id);
    }
    //拖曳修正图片大小
    ,onResizing(left,top,width,height){
      let img_dom = document.getElementById(this.item_id).getElementsByClassName("imgs")[0];
      if(typeof(img_dom) != 'undefined'){
        img_dom.style.width=width+"px";
        img_dom.style.height=height+"px";
      }
      //改变item大小更新源
      this.$store.commit('updateItemSize',{'width':width,'height':height});
      //更新头部数据
      this.$store.commit('dragInfo',{'item_width':width,'item_height':height});
    }
    //修复拖曳数据源不更新 导致的删除item 刷新view 所有item跳回原处的bug
    ,onDragging(left,top){
      this.$store.commit('updateItemPos',{'left':left,'top':top});
      //更新头部数据
      this.$store.commit('dragInfo',{'item_x':left,'item_y':top});
    }
  }
  ,computed: {
    //如果有新控件拖进来 更新画板
    dragList () {
      return this.$store.state.draggable.dragList;
    }
    ,canvasHeight:function(){
      return {
        'width':this.$store.state.draggable.dragInfo.width+'px'
        ,'height' : (this.$store.state.draggable.dragInfo.height-50) +'px'
      }
    }
    ,item_id(){
      return this.$store.state.draggable.dragId;
    }
  }
}
</script>

<style scoped>
.maincanvas{
  position:relative;overflow:hidden;
}
.zhuobu{
  width:100%;
}
.shanchu{
  position: absolute;
  left:-30px;
  top:0px;
}
img{ width:100%;height:100%}
</style>
