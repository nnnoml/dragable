<template>
  <div class="fl">
    <div class="window-style fl">
      <i class="window-icon icon-win"></i>
    </div>
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
  ,data:function(){
    return{
    }
  }
}
</script>

<style scoped>
</style>
