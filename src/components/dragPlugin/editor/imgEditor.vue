<template>
    <div>
        <div v-html="imgsrc"></div>
        单击事件<div><input v-model="url" /></div>
        开机延迟<div><input v-model="delay" /></div>

        <button v-on:click="save">保存</button>
        <button v-on:click="close">取消</button>
    </div>
</template>

<script>
    export default {
      name: 'imgEditor'
      ,data () {
        return {
          imgsrc:"<img src='https://tpc.googlesyndication.com/simgad/8593981413023260756?sqp=4sqPyQQ7QjkqNxABHQAAtEIgASgBMAk4A0DwkwlYAWBfcAKAAQGIAQGdAQAAgD-oAQGwAYCt4gS4AV_FAS2ynT4&rs=AOga4qmeC9TSiuEECfc0i2oHF7I4oNgplw' />"
          ,url:''
          ,delay:''
        }
      }
      ,methods:{
        save:function(){
          this.$store.state.draggable.drag_item_cache.dom = this.imgsrc;
          this.$store.state.draggable.drag_item_cache.url = this.url;
          this.$store.state.draggable.drag_item_cache.delay = this.delay;

          //保存时候检测 如果是点击进来的组件，做拷贝
          if(this.$store.state.draggable.drag_item_cache.isClick){
              //关闭属性,下次修改不需要增加组件
              this.$store.state.draggable.drag_item_cache.isClick=false;
              this.$store.commit('dragList',this.$store.state.draggable.drag_item_cache);
              //组件id递增
              this.$store.commit('dragCount');
          }

          this.close();
        }
        ,close:function(){
            this.$store.commit('drag_showbox_status',false);
            this.$store.commit('drag_item_cache','');
            this.editorContent = '';
        }
      }
      ,mounted() {
        this.imgsrc = this.$store.state.draggable.drag_item_cache.dom;
        this.url = this.$store.state.draggable.drag_item_cache.url;
        this.delay = this.$store.state.draggable.drag_item_cache.delay;
      }

    }

</script>

<style scoped>
</style>