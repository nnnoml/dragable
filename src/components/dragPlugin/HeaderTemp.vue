<template>
  <div>
      分辨率{{info.width}}*{{info.height}}&nbsp;&nbsp;&nbsp;&nbsp;
      显示中轴线<input type="checkbox" v-model="reference_line" />&nbsp;&nbsp;&nbsp;&nbsp;
      预览&nbsp;&nbsp;&nbsp;&nbsp;
      保存&nbsp;&nbsp;&nbsp;&nbsp;
      退出
  </div>
</template>

<script>
export default {
  name: 'HeaderTemp'
	,props: {
		info: Object,
  }
  ,data:function(){
    return{
      reference_line:false
    }
  }
  ,watch:{
    reference_line:function(){
      console.log(this.reference_line);
    }
  }
}
</script>

<style scoped>

</style>
