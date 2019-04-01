<template>
    <div>
      <div class="tool-box-cloud">
				<div class="layui-layer-title" style="cursor: move;"><span class="layui-layer-setwin"><a href="#"><img src="../../../assets/images/close-a.png"></a></span>编辑文字</div>
        <div ref="editor" style="text-align:left"></div>
				<div>
          <input type="button" @click="save" class="pz-footer-button mt-15 mb-15" value="保存" id="upload-down-btn">
          <input type="button" @click="close" class="pz-footer-button mt-15 mb-15" value="取消" id="upload-down-btn">
        </div>
			</div>
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
          this.$store.state.draggable.drag_item_cache.dom=this.editorContent;
          //保存时候检测 如果是点击进来的组件，做拷贝
          if(this.$store.state.draggable.drag_item_cache.isClick){
              //关闭属性,下次修改不需要增加组件
              this.$store.state.draggable.drag_item_cache.isClick=false;
              //移动位置
              this.$store.state.draggable.drag_item_cache.x = this.$store.state.draggable.dragCount*10;
              this.$store.state.draggable.drag_item_cache.y = this.$store.state.draggable.dragCount*10;

              this.$store.commit('dragList',this.$store.state.draggable.drag_item_cache);
              //组件id递增
              this.$store.commit('dragCount');
          }

          this.$store.state.draggable.dragCount

          this.close();
        }
        ,close:function(){
            this.$store.commit('drag_showbox_status',false);
            this.$store.commit('drag_item_cache','');
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
        let dom = this.$store.state.draggable.drag_item_cache.dom;
        this.editor_el.txt.html(dom);
        this.editorContent = dom
      }
    }
</script>

<style scoped>
</style>
