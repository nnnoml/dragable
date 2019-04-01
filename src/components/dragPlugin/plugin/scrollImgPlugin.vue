<template>
  <div 
      :id="dragCount"
      @dragstart="dragstart"
      @dragend="dragend"
      draggable="true"
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

    }
  }
  ,methods:{
    //开始拖动
    dragstart (ev) {
      //设置属性
      let info = {
        id:this.dragCount
        ,type:'scrollimg'
        ,activated:false
        ,w:75
        ,h:75
        ,x:0
        ,y:0
        ,zindex:this.$store.state.draggable.dragCount
        ,dom:"<img class='imgs' src='https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2913204781,3741500611&fm=58' />"
      };
      ev.dataTransfer.setData('Text', JSON.stringify(info))
    }
    //拖动结束
    ,dragend (e){
      e.dataTransfer.clearData()
      //id递增
      this.$store.commit('dragCount');
    }
  }
  ,computed: {
    dragCount () {
      return 'text_'+this.$store.state.draggable.dragCount
    }
  }
}
</script>

<style scoped>
.title{
  color:red;
}
</style>
