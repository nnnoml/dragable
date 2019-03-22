<template>
  <div style='position: relative; overflow:hidden;'>
    <div>
      <div class="zhuobu" @drop.prevent="drop" @dragover.prevent>
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
    <div v-if="reference_line" class="midline_1"></div>
    <div v-if="reference_line" class="midline_2"></div>
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
      item_id:'',
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
    ,onActivated(item){
      item.activated = true;
      this.item_id = item.id;
      console.log('focus',this.$store.state.draggable.dragList);
    }
    //单击取消事件  屏蔽删除
    ,onDeactivated(item){
      item.activated = false;
      this.item_id = '';
    }
    //删除
    ,removeDrag(item,e){
      console.log('remove',this.$store.state.draggable.dragList);
      e.currentTarget.active = false
      this.$store.commit('dragListRemove',item.id);
      console.log('removed',this.$store.state.draggable.dragList);
    }
    //拖曳修正图片大小
    ,onResizing(left,top,width,height){
      let img_dom = document.getElementById(this.item_id).getElementsByClassName("imgs")[0];
      if(typeof(img_dom) != 'undefined'){
        img_dom.style.width=width+"px";
        img_dom.style.height=height+"px";
      }
    }
    //修复拖曳数据源不更新 导致的删除item 刷新view 所有item跳回原处的bug
    ,onDragging(left,top){
      this.$store.commit('updateItemPos',{'id':this.item_id,'left':left,'top':top});
    }
  }
  ,computed: {
    //如果有新控件拖进来 更新画板
    dragList () {
      return this.$store.state.draggable.dragList;
    }
    //如果勾选了
    ,reference_line(){
      return this.$store.state.draggable.reference_line;
    }
  }
}
</script>

<style scoped>
.msg{
  position: absolute;
}
.zhuobu{
  height:700px;width:800px;border:1px solid red;
  float:left
}
.shanchu{
  position: absolute;
  left:-30px;
  top:0px;
}
img{ width:100%;height:100%}
.midline_1{
    width: 2px;
    height: 100%;
    background: #d6d6d6;
    position: absolute;
    left: 50%;
}
.midline_2{
    width: 100%;
    height: 2px;
    background: #d6d6d6;
    position: absolute;
    top: 50%;
}
</style>
