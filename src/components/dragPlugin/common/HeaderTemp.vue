<template>
  <div>
      分辨率{{info.width}}*{{info.height}}&nbsp;&nbsp;&nbsp;&nbsp;
      显示中轴线<input type="checkbox" v-model="reference_line" />&nbsp;&nbsp;&nbsp;&nbsp;
      预览&nbsp;&nbsp;&nbsp;&nbsp;
      <p @click="save">保存</p>&nbsp;&nbsp;&nbsp;&nbsp;
      退出
  </div>
</template>

<script>
import html2canvas from 'html2canvas';

export default {
  name: 'HeaderTemp'
	,props: {
		info: Object,
  }
  ,data:function(){
    return{
      reference_line:false
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
  }
  ,watch:{
    reference_line:function(){
      console.log(this.reference_line);
    }
  }
}
</script>

<style scoped>

</style>
