<template>
  <div class="showbox" v-show="status" @click.self="close">
      <div class="showbox_inner" v-if="type == 'text'">
          <textEditor />
      </div>
      <div class="showbox_inner" v-else-if="type == 'img'">
          <imgEditor />
      </div>
      <div class="showbox_inner" v-else-if="type == 'scrollimg'">
          <scrollImgEditor />
      </div>
      <div class="showbox_inner" v-else>
          类型异常
      </div>
  </div>
</template>

<script> 
import textEditor from '../editor/textEditor'
import imgEditor from '../editor/imgEditor'
import scrollImgEditor from '../editor/scrollImgEditor'

export default {
  name: 'ShowBox'
  ,components: {
      textEditor
      ,imgEditor
      ,scrollImgEditor
  }
  ,data:function(){
    return{
        domcache:''
    }
  }
  ,methods:{
      save:function(){
          this.$store.state.drag.drag_showbox_item.dom=this.domcache;
          //保存时候检测 如果是点击进来的组件，做拷贝
          if(this.$store.state.drag.drag_showbox_item.isClick){
              //关闭属性,下次修改不需要增加组件
              this.$store.state.drag.drag_showbox_item.isClick=false;
              this.$store.commit('dragList',this.$store.state.drag.drag_showbox_item);
              //组件id递增
              this.$store.commit('dragCount');
          }

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
      return this.$store.state.drag.drag_showbox_status
    }
    ,type(){
      this.domcache = this.$store.state.drag.drag_showbox_item.dom;
      return this.$store.state.drag.drag_showbox_item.type
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
    width:500px;
    height:356px;
    margin:0px auto;
    margin-top:20%;
}
</style>
