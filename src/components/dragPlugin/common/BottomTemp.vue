<template>
  <div class="BottomTemp">
      底部导航{{count}}
      <textPlugin />
      <imgPlugin />
      <scrollImgPlugin />
  </div>
</template>

<script>
import textPlugin from '../plugin/textPlugin.vue'
import imgPlugin from '../plugin/imgPlugin.vue'
import scrollImgPlugin from '../plugin/scrollImgPlugin.vue'

export default {
  name: 'BottomTemp'
  ,components: {
    textPlugin
    ,imgPlugin
    ,scrollImgPlugin
  }
	,props: {
		baseInfo: Object,
  }
  ,data:function(){
    return{
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
