<template>
  <div 
      :id="dragCount"
      @dragstart="dragstart"
      @dragend="dragend"
      draggable="false"
      @click="clickHandle($event)"
      class="tool-footer-icon fl">
    <i class="windowr-icon icon-lunbotu"></i> 轮播图片
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
        ,type:'scrollimg'
        ,activated:false
        ,isClick:true
        ,w:75
        ,h:75
        ,x:0
        ,y:0
        ,zindex:this.$store.state.draggable.dragCount
        ,dom:""
        ,img_id_list:[]
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
    //单击插件按钮
    ,clickHandle(){
      //单击事件记录状态
      this.info.isClick=true;
      this.info.id = this.dragCount
      //深拷贝 防止组件相互绑定
      let infocache = JSON.parse(JSON.stringify(this.info))

      this.$store.commit('drag_showbox_status',true);
      this.$store.commit('drag_item_cache',infocache);
    }
  }
  ,computed: {
    dragCount () {
      return 'scrollimg_'+this.$store.state.draggable.dragCount
    }
  }
}
</script>

<style scoped>
</style>
