<template>
  <div style='position: relative; overflow:hidden;'>
    <div>
      <!-- <div style="width:300px;float:left">
        <ul>
          <li v-for="item in tags" :key='item.id'>
            <img src="https://www.slyun.com/static/guanwang_2018/images/app_phone.png" 
              :id='item.id'
              class='msg'
              @dragstart="dragstart"
              @dragend="imgEnd"
              draggable="true" />
          </li>
        </ul>
      </div> -->
      <!-- 自由移动区域 -->
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

          v-for="(item, index) in dragList" :key='index' :id="item.id">
          <div v-html="item.dom"></div>
          <div v-show="item.activated" class="shanchu" @click="removeDrag(item)">删</div>
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
      info.id = info.id + Date.parse(new Date())
      this.$store.commit('dragList',info);
    }
    //弹出层
    ,showBox(item){
      this.$store.commit('drag_showbox_status',true);
      this.$store.commit('drag_showbox_item',item);
    }
    //单击事件  出现删除,记录id
    ,onActivated(item){
      item.activated = true;
      this.item_id = item.id;
    }
    //单击取消事件  屏蔽删除
    ,onDeactivated(item){
      item.activated = false;
      this.item_id = '';
    }
    //删除
    ,removeDrag(item){
      this.$store.commit('dragListRemove',item.id);
    }
    //拖曳修正图片大小
    ,onResizing(left,top,width,height){
      let img_dom = document.getElementById(this.item_id).getElementsByClassName("imgs")[0];
      if(typeof(img_dom) != 'undefined'){
        img_dom.style.width=width+"px";;
        img_dom.style.height=height+"px";;
      }
    }
  }
  ,computed: {
    dragList () {
      return this.$store.state.dragList
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
</style>
