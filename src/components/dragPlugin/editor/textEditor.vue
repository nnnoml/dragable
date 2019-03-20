<template>
    <div>
        <div ref="editor" style="text-align:left"></div>
        <button v-on:click="save">保存</button>
        <button v-on:click="close">取消</button>
    </div>
</template>

<script>
    import E from 'wangeditor'

    export default {
      name: 'editor',
      data () {
        return {
          editorContent: ''
          ,editor_el:''
        }
      }
      ,methods: {
        save:function(){
          this.$store.state.drag_showbox_item.dom=this.editorContent;
          //保存时候检测 如果是点击进来的组件，做拷贝
          if(this.$store.state.drag_showbox_item.isClick){
              //关闭属性,下次修改不需要增加组件
              this.$store.state.drag_showbox_item.isClick=false;
              this.$store.commit('dragList',this.$store.state.drag_showbox_item);
              //组件id递增
              this.$store.commit('dragCount');
          }

          this.close();
        }
        ,close:function(){
            this.$store.commit('drag_showbox_status',false);
            this.$store.commit('drag_showbox_item','');
            this.editorContent = '';
        }
      }
      ,mounted() {
        this.editor_el = new E(this.$refs.editor)
        this.editor_el.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        this.editor_el.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'shadow', // 阴影 自加功能
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'justify',  // 对齐方式
          'table',  // 表格
          //----------------------
          // 'quote',  // 引用
          // 'link',  // 插入链接
          // 'list',  // 列表
          // 'emoticon',  // 表情
          // 'image',  // 插入图片
          // 'video',  // 插入视频
          // 'code',  // 插入代码
          // 'undo',  // 撤销
          // 'redo'  // 重复
        ]
        this.editor_el.create()
        let dom = this.$store.state.drag_showbox_item.dom;
        this.editor_el.txt.html(dom);
        this.editorContent = dom
      }
    }
</script>

<style scoped>
</style>
