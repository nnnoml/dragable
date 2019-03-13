<template>
  <div id="DragPlugin" :style="guiSize">
    <!-- <HeaderTemp :info='info' /> -->
    <!-- <LeftTemp /> -->
    <MainCanvas />
    <bottomTemp />
  </div>
</template>

<script>
// import draggable  from 'vuedraggable'

import HeaderTemp from './HeaderTemp.vue'
import LeftTemp from './LeftTemp.vue'
import MainCanvas from './MainCanvas.vue'
import BottomTemp from './BottomTemp.vue'

export default {
  name: 'DragPlugin'
  ,components: {
    HeaderTemp
    ,LeftTemp
    ,MainCanvas
    ,BottomTemp
    // ,draggable
  }
  ,data:function(){
    return{
      info:{
        'width':0
        ,'height':0
      }
    }
  }
  ,methods:{
    getDragableInfo:function(){
      return {
        'width':'1920px'
        ,'height':'2000px'
      }
    }
    
  }
  ,computed: {
    guiSize: function () {
      return {
        'width':this.info.width
        ,'height':this.info.height
      }
    }
  }
  ,mounted:function(){
      let info = this.getDragableInfo();
      this.info = info;
  }
}
</script>

<style scoped>
#DragPlugin{
  overflow: hidden;
}
</style>
