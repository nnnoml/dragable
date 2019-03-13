<template>
  <div id="app">
    <DragPlugin />
  </div>
</template>

<script>
import DragPlugin from './components/dragPlugin/DragPlugin.vue'

export default {
  name: 'app'
  ,components: {
    DragPlugin
  }
  ,data:function(){
    return{
    }
  }
  ,methods:{
    checkAuth:function(){
      return true;
    }
  }
  ,mounted:function(){
    //todo 验证所属权限 登录状态
    let res = this.checkAuth();
    if(res){
    }
    else{
      alert('登录失败');
      window.location.href="http://www.baidu.com";
    }
  }
}
</script>

<style scoped>
#app{
  overflow: hidden;
}
</style>
