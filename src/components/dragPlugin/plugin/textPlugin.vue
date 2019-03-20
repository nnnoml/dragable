<template>
  <div class="title">
    <p 
      :id="dragCount"
      class='msg'
      @dragstart="dragstart"
      @dragend="dragend"
      draggable="true"
      @click="clickHandle($event)"
    >文字公告</p>
  </div>
</template>

<script>
export default {
  name: 'textPlugin'
	,props: {
		baseInfo: Object,
  }
  ,data:function(){
    return{
      //设置属性
      info:{
        id:0
        ,type:'text'
        ,activated:false
        ,isClick:true
        ,w:145
        ,h:30
        ,x:0
        ,y:0
        ,zindex:0
        ,dom:"请双击编辑文字"
      }
    }
  }
  ,methods:{
    //开始拖动
    dragstart (e) {
      this.info.isClick=false;
      e.dataTransfer.setData('Text', JSON.stringify(this.info))
    }
    //拖动结束
    ,dragend (e){
      e.dataTransfer.clearData()
      //id递增
      this.$store.commit('dragCount');
    }
    ,clickHandle(){
      //单击事件记录状态
      this.info.isClick=true;
      this.info.id = this.info.id 
      // + Date.parse(new Date())
      //深拷贝 防止组件相互绑定
      let infocache = JSON.parse(JSON.stringify(this.info))

      this.$store.commit('drag_showbox_status',true);
      this.$store.commit('drag_showbox_item',infocache);
    }
  }
  ,computed: {
    dragCount () {
      let id = this.$store.state.drag.dragCount;

      this.info.zindex = id
      this.info.id = 'text_'+id;

      return 'text_'+id
    }
  }
}
</script>

<style scoped>
.title{
  color:red;
}
</style>
