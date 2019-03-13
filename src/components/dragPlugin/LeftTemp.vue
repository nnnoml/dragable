<template>
  <div class="leftTemp" :style="hideLeft">
      暂<br/>
      时<br/>
      不<br/>
      做<br/>
      <transition name="fade">
      <p @click="hideLeftOperation()">收起</p>
      </transition>
  </div>
</template>

<script>
export default {
  name: 'LeftTemp'
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
    hideLeftOperation:function(){
        if(this.is_hide){
          this.is_hide_pos= '0px';
        }
        else{
          this.is_hide_pos= '-100px';
        }
        this.is_hide = !this.is_hide;
    }
  }
  ,computed: {
    hideLeft: function () {
      return {
        'marginLeft':this.is_hide_pos
      }
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
.leftTemp{
   width:100px; background: #000;
   color:#fff;
   position: relative;
}
.leftTemp p{
  position: absolute;
  right:-34px;top:50px;
  color:#000;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
