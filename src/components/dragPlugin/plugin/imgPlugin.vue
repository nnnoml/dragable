<template>
  <div class="title">
    <p 
      :id="dragCount"
      class='msg'
      @dragstart="dragstart"
      @dragend="dragend"
      draggable="true"
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

    }
  }
  ,methods:{
    //开始拖动
    dragstart (ev) {
      //设置属性
      let info = {
        id:this.dragCount
        ,type:'img'
        ,activated:false
        ,w:300
        ,h:250
        ,x:0
        ,y:0
        ,zindex:this.$store.state.drag.dragCount
        ,dom:"<img src='https://tpc.googlesyndication.com/simgad/8593981413023260756?sqp=4sqPyQQ7QjkqNxABHQAAtEIgASgBMAk4A0DwkwlYAWBfcAKAAQGIAQGdAQAAgD-oAQGwAYCt4gS4AV_FAS2ynT4&rs=AOga4qmeC9TSiuEECfc0i2oHF7I4oNgplw' />"
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
      return 'text_'+this.$store.state.drag.dragCount
    }
  }
}
</script>

<style scoped>
.title{
  color:red;
}
</style>
