<template>
  <div class="title" @click="add">
    文字公告{{count}}
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
      reference_line:false
      ,is_hide:false
      ,is_hide_pos:0
    }
  }
  ,methods:{
    add:function(){
      this.$store.commit('increment')
    }
  }
  ,computed: {
    count () {
      return this.$store.state.count
    }
  }
}
</script>

<style scoped>
.title{
  color:red;
}
</style>
