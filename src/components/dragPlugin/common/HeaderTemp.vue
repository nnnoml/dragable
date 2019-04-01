<template>
    <header class="tool-set-top">
      <div class="tool-set-top-box tool-set-top-fixed" id="fixed">
        <div class="tool-set-top-fluid">
          <div class="fl liheight-50 height-50">
            <span class="font-size16 tool-set-top-text fl">开心果网咖桌面</span>
            <span class="tool-set-top-text01 ml-30 fl">分辨率：{{guiSize}}</span>
            <span class="tool-set-top-text01 ml-30 fl">
              <input type="checkbox" class="mt-20 fl" id="check-box" v-model="reference_line"/><i class="ml-5">显示中轴线</i>
            </span>
          </div>
          <div class="fr height-50">
            <div class="height-24 mt-12 fl">
              <div class="tool-set-topL">
                <div class="tool-set-topL-box fl">
                  <i class="fl">宽：</i>
                  <input type="text" v-model="item_width" class="tool-set-topL-input fl" />
                </div>
                <div class="tool-set-topL-box fl">
                  <i class="fl">高：</i>
                  <input type="text" v-model="item_height" class="tool-set-topL-input fl" />
                </div>
                <div class="tool-set-topL-box fl">
                  <i class="fl">横向：</i>
                  <input type="text" v-model="item_x" class="tool-set-topL-input fl" />
                </div>
                <div class="tool-set-topL-box fl">
                  <i class="fl">纵向：</i>
                  <input type="text" v-model="item_y" class="tool-set-topL-input fl" />
                </div>
              </div>
            </div>
            <div class="tool-set-topR fr">
              <a href="#" title="" target="" class="fl tool-set-topR-bg01">预览</a>
              <a href="#" title="" target="" class="fl tool-set-topR-bg02" @click="save">保存</a>
              <a href="云桌面-桌面工具管理.html" title="" target="" class="fl tool-set-topR-bg03">退出</a>
            </div>
          </div>
        </div>
      </div>
    </header>
</template>

<script>
import html2canvas from 'html2canvas';

export default {
  name: 'HeaderTemp'
  ,data:function(){
    return{
    }
  }
  ,methods:{
    save:function(){
      html2canvas(document.getElementById('text_0'),{
          // onrendered: function(canvas) {
          //  var url =canvas.toDataURL("image/png");
          // },
          // background:"#fafafa"
      }).then(function(canvas) {
        var imgUri = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); // 获取生成的图片的url
        window.location.href= imgUri+'.png'; // 下载图片
          // document.body.appendChild(canvas);
      });
    }
    ,updateItemInfo:function(item_type,src_type,val){
      val = parseInt(val);
      let item_id = this.item_id;

      let item = {};
      item[''+item_type+''] = val;
      //更新当前组件信息
      this.$store.commit('dragInfo',item);
      //更新组件源信息
      
      let src_item = {};
      src_item[''+src_type+''] = val;
      this.$store.commit('updateItemPos',src_item);
      this.$store.commit('updateItemSize',src_item);
    }
  }
  ,computed:{
    reference_line:{
      get(){
        return this.$store.state.draggable.reference_line;
      }
      ,set(){
        this.$store.commit('reference_line',!this.reference_line);
      }
    }
    ,guiSize: function () {
      return this.$store.state.draggable.dragInfo.width +' * ' +this.$store.state.draggable.dragInfo.height
    }
    ,item_width:{
      get(){
        return this.$store.state.draggable.dragInfo.item_width;
      }
      ,set(newVal){
        this.updateItemInfo('item_width','width',newVal);
      }
    }
    ,item_height:{
      get(){
        return this.$store.state.draggable.dragInfo.item_height;
      }
      ,set(newVal){
        this.updateItemInfo('item_height','height',newVal);
      }
    }
    ,item_x:{
      get(){
        return this.$store.state.draggable.dragInfo.item_x;
      }
      ,set(newVal){
        this.updateItemInfo('item_x','left',newVal);
      }
    }
    ,item_y:{
      get(){
        return this.$store.state.draggable.dragInfo.item_y;
      }
      ,set(newVal){
        this.updateItemInfo('item_y','top',newVal);
      }
    }
    ,item_id(){
      return this.$store.state.draggable.dragId;
    }
  }
}
</script>

<style scoped>

</style>
