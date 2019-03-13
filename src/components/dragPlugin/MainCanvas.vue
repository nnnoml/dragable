<template>
  <div style='position: relative; overflow:hidden;'>
    <div>
      <div style="width:300px;float:left">
        <ul>
          <li v-for="item in tags" :key='item.id'>
            <img src="https://www.slyun.com/static/guanwang_2018/images/app_phone.png" 
              :id='item.id'
              class='msg'
              @dragstart="dragstart"
              @dragend="imgEnd"
              draggable="true">
          </li>
        </ul>
      </div>
      <!-- 自由移动区域 -->
      <div class="zhuobu" @drop.prevent="drop" @dragover.prevent @click="test">
        <img src="https://www.slyun.com/static/guanwang_2018/images/app_phone.png" 
          class='msg' 
          :style="{left:item.x+'px',top:item.y+'px'}" 
          @dragstart="imgStart($event,item)" 
          @drag='draging($event,item)' 
          @dragend="imgEnd($event,item)"
          draggable="true"
          v-for="(item, $index) in InfoList"
          :key='$index' >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainCanvas'
  ,data:function(){
    return{
      tags:[
        1,2,3,4,5
      ]
      ,InfoList:[]
      ,imgOffsetX:0
      ,imgOffsetY:0
    }
  }
  ,methods:{
    //开始拖动
    dragstart (ev) {
      let info = { id: ev.target.id, isDrop: true }
      ev.dataTransfer.setData('Text', JSON.stringify(info))
      this.offsetX = ev.offsetX
      this.offsetY = ev.offsetY
    },
    //拖入选区
    drop (e) {
      let info = JSON.parse(e.dataTransfer.getData('Text'))
      /* 判断是否是第一次进入拖拽区域，如果是第一次需要新生成对象，否则不需要 */
      if (info.isDrop) {
          var x = e.offsetX + 300;
          var y = e.offsetY
          console.log(x,y)
          info.x = x
          info.y = y
        info.id = info.id + Date.parse(new Date())
        // this.$store.commit('addList',info);
        this.InfoList.push(info)
      }
    },
    //拖曳区 图片拖动开始
    imgStart (e,item) {
      let info = { isDrop: false }
      e.dataTransfer.setData('Text', JSON.stringify(info))
      this.imgOffsetX = e.offsetX
      this.imgOffsetY = e.offsetY
    },
    //拖曳区 拖动中
    draging (e, item) {
      item.x = e.clientX - this.imgOffsetX - 5
      item.y = e.clientY - this.imgOffsetY  -10
    },
    test(e){
      console.log('clientx,imgoffsetX,offsetx',e.clientX,this.imgOffsetX,e.offsetX);
      console.log('clienty,imgoffsety,offsety',e.clientY,this.imgOffsetY,e.offsetY);
    },
    //拖曳区 拖动结束
    imgEnd (e, item){
      // item.x = e.offsetX
      // item.y = e.offsetY
      event.dataTransfer.clearData()
    }
  }
  ,computed: {
    // InfoList () {
    //   console.log(this.$store.state.dragList);
    //   return this.$store.state.dragList
    // }
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
</style>
