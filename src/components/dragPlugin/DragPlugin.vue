<template>
  <div id="DragPlugin" :style="guiSize">
    <HeaderTemp :info='info' />
    <!-- <LeftTemp /> -->
    <MainCanvas />
    <bottomTemp />
    <ShowBox />
  </div>
</template>

<script>
// import draggable  from 'vuedraggable'
import HeaderTemp from './common/HeaderTemp.vue'
import LeftTemp from './common/LeftTemp.vue'
import MainCanvas from './common/MainCanvas.vue'
import BottomTemp from './common/BottomTemp.vue'
import ShowBox from './common/ShowBox.vue'


export default {
  name: 'DragPlugin'
  ,components: {
    HeaderTemp
    ,LeftTemp
    ,MainCanvas
    ,BottomTemp
    ,ShowBox
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
