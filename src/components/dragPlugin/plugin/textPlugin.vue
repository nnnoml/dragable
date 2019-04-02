<template>
    <div :id="dragCount"
      @dragstart="dragstart"
      @dragend="dragend"
      draggable="true"
      @click="clickHandle($event)"
      class="msg tool-footer-icon fl">
      <i class="windowr-icon icon-wenzi"></i> 文字公告
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
        ,dom:"<p>请双击编辑文字</p>"
      }
    }
  }
  ,methods:{
    //开始拖动
    dragstart (e) {
      let info_cache = JSON.parse(JSON.stringify(this.info));
      info_cache.isClick=false;
      e.dataTransfer.setData('Text', JSON.stringify(info_cache))
    }
    //拖动结束
    ,dragend (e){
      e.dataTransfer.clearData()
      //id递增
      this.$store.commit('dragCount');
    }
    ,clickHandle(){
      let info_cache = JSON.parse(JSON.stringify(this.info));
      //单击事件记录状态
      info_cache.isClick=true;
      info_cache.id = this.dragCount;

      this.$store.commit('drag_showbox_status',true);
      this.$store.commit('drag_item_cache',info_cache);
    }
  }
  ,computed: {
    dragCount () {
      let id = this.$store.state.draggable.dragCount;
      return 'text_'+id+'_'+ Date.parse(new Date())
    }
  }
  ,watch:{
    //自增id变化 联动zindex变化
    dragCount(){
      let id = this.$store.state.draggable.dragCount;
      this.info.zindex = id;
      this.info.id = id;
    }
  }
}
</script>

<style scoped>
.title{
  color:red;
}
</style>
