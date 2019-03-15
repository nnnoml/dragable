<template>
  <div class="showbox" v-show="status" @click.self="close">
      <div class="showbox_inner" v-if="type == 'text'">
          <textarea v-model="dom"></textarea>
          <button @click="save">保存</button>
          <button @click="close">取消</button>
      </div>
      <div class="showbox_inner" v-else-if="type == 'img'">
          <input type='file' />
          上传
      </div>
      <div class="showbox_inner" v-else-if="type == 'scrollimg'">
          this is else
      </div>
  </div>
</template>

<script>
export default {
  name: 'ShowBox'
  ,data:function(){
    return{
         domcache:''
    }
  }
  ,methods:{
      save:function(){
          this.$store.state.drag_showbox_item.dom=this.domcache;
          this.close();
      }
      ,close:function(){
          this.$store.commit('drag_showbox_status',false);
          this.$store.commit('drag_showbox_item','');
          this.domcache = '';
      }

  }
  ,computed:{
    status(){
      return this.$store.state.drag_showbox_status
    }
    ,type(){
      return this.$store.state.drag_showbox_item.type
    }
    ,dom:{
        get:function(){
            return this.$store.state.drag_showbox_item.dom
        }
        ,set:function(value){
            this.domcache=value;
        }
    }
  }
}

</script>

<style scoped>
.showbox{
    position: fixed;
    left:0px;
    top:0px;
    width:100%;
    height:100%;
    background:rgba(0,0,0,.8);
    z-index: 999;
}
.showbox_inner{
    background:#fff;
    width:100px;
    height:100px;
    margin:0px auto;
    margin-top:20%;
}
</style>
