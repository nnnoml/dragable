<template>
  <div class="title">
    <p 
      :id="dragCount"
      class='msg'
      @dragstart="dragstart"
      @dragend="dragend"
      draggable="true"
      @click="clickHandle($event)"
    >桌面插图</p>
  </div>
</template>

<script>
export default {
  name: 'imgPlugin'
	,props: {
		baseInfo: Object,
  }
  ,data:function(){
    return{
      info:{
        id:this.dragCount
        ,type:'img'
        ,activated:false
        ,isClick:true
        ,w:300
        ,h:250
        ,x:0
        ,y:0
        ,zindex:this.$store.state.draggable.dragCount
        ,dom:"<img src='https://tpc.googlesyndication.com/simgad/8593981413023260756?sqp=4sqPyQQ7QjkqNxABHQAAtEIgASgBMAk4A0DwkwlYAWBfcAKAAQGIAQGdAQAAgD-oAQGwAYCt4gS4AV_FAS2ynT4&rs=AOga4qmeC9TSiuEECfc0i2oHF7I4oNgplw' />"
      }
    }
  }
  ,methods:{
    //开始拖动
    dragstart (ev) {
      this.info.isClick=false;
      ev.dataTransfer.setData('Text', JSON.stringify(this.info))
    }
    //拖动结束
    ,dragend (e){
      e.dataTransfer.clearData()
      //id递增
      this.$store.commit('dragCount');
    }
    //单击图片
    ,clickHandle(){
      //单击事件记录状态
      this.info.isClick=true;
      this.info.id = this.info.id
      //深拷贝 防止组件相互绑定
      let infocache = JSON.parse(JSON.stringify(this.info))

      this.$store.commit('drag_showbox_status',true);
      this.$store.commit('drag_item_cache',infocache);
    }
  }
  ,computed: {
    dragCount () {
      return 'img_'+this.$store.state.draggable.dragCount
    }
  }
}
</script>

<style scoped>
.title{
  color:red;
}
</style>
