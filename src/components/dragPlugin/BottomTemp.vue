<template>
  <div class="BottomTemp">
      底部导航{{count}}
      <textPlugin />
      桌面插图
      轮播图片
  </div>
</template>

<script>
import textPlugin from './plugin/textPlugin.vue'

export default {
  name: 'BottomTemp'
  ,components: {
    textPlugin
  }
	,props: {
		baseInfo: Object,
  }
  ,data:function(){
    return{
      reference_line:false
      ,is_hide:false
      ,is_hide_pos:0
    }
  }
  ,methods:{
  }
  ,computed: {
    count () {
      return this.$store.state.count
    }
  }
}
</script>

<style scoped>
.BottomTemp{
  position: fixed;
  bottom:0px;
  left:0px;
}
</style>
