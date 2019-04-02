<template>
  <div id="tool-set-all" :style="guiSize">
        <div class="varmid-Line" v-if="reference_line">
          <div id="vertLine"></div>
          <div id="midLine"></div>
        </div>
        <HeaderTemp/>
        <!-- <LeftTemp /> -->
        <section class="tool-set-content">
          <MainCanvas />
        </section>
        <footer class="tool-set-footer" id="fixed-down">
          <bottomTemp />
          <div class="fr text-center pr-15 mt-4 tool-footer-right" v-html="now_date"></div>
        </footer>
         <ShowBox />
      </div>
</template>

<script>
import HeaderTemp from './common/HeaderTemp.vue'
// import LeftTemp from './common/LeftTemp.vue'
import MainCanvas from './common/MainCanvas.vue'
import BottomTemp from './common/BottomTemp.vue'
import ShowBox from './common/ShowBox.vue'

// import bootstrap from '../../assets/css/bootstrap.css'
import iconfont_new from '../../assets/css/iconfont_new.css'
import iconfont from '../../assets/css/iconfont.css'
// import layui from '../../assets/css/layui.css'
import main_style from '../../assets/css/main_style.css'
import public_css from '../../assets/css/public.css'


export default {
  name: 'DragPlugin'
  ,components: {
    HeaderTemp
    // ,LeftTemp
    ,MainCanvas
    ,BottomTemp
    ,ShowBox
  }
	,style:{
		// bootstrap
    iconfont_new
    ,iconfont
    ,main_style
    ,public_css
	}
  ,data:function(){
    return{
      now_date:''
    }
  }
  ,methods:{
    ajaxCallback(data){
      let str = data.resolution;
      let arr=str.split('*');
      let info = {};
      info.width = arr[0];
      info.height = arr[1];

      info.text_plugin = data.text_plugin;
      info.img_plugin = data.img_plugin;
      info.scroll_img_plugin = data.scroll_img_plugin;

      this.$store.commit('dragInfo',info);
    }
    //右下角倒计时时间
    ,nowDate(){
      var today=new Date();
      var h=today.getHours();
      var i=today.getMinutes();
      if(i<10){
        i ='0'+i;
      }

      var y=today.getFullYear();
      var m=today.getMonth()+1;
      var d=today.getDate();
      this.now_date = h+':'+i+'<br/>'+y+'/'+m+'/'+d;
      setTimeout(this.nowDate,1000);
    }
    
  }
  ,computed: {
    //屏幕尺寸
    guiSize: function () {
      return {
        'width':this.$store.state.draggable.dragInfo.width+'px'
        ,'height':this.$store.state.draggable.dragInfo.height+'px'
        ,'transform': 'scale3d(1, 1, 1)' //用于头部fixed宽度铺满问题
      }
    }
    //中轴线
    ,reference_line(){
      return this.$store.state.draggable.reference_line;
    }
  }
  ,mounted:function(){
      this.ajax('http://t.c/dragable.php',{"type":"getDesktopInfo"},'get',this.ajaxCallback);
      this.nowDate();
  }
}
</script>

<style scoped>
.tool-set-content{
  z-index: 990;
}
.tool-set-footer{
  z-index: 991;
}
#vertLine{
  z-index: 995;
}
#midLine{
  z-index: 995;
}
</style>
