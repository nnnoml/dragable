<template>
<!-- <div> -->
    <div class=" box-middle">
			<div class="tool-box-cloud">
				<div class="layui-layer-title" style="cursor: move;">
                    <span class="layui-layer-setwin">
                        <a href="javascript:;" @click="close()"><img src="../../../assets/images/close-a.png"></a>
                    </span>
                    选择轮播图
                </div>
				<div class="layui-tab layui-tab-brief  mtb-0" lay-filter="docDemoTabBrief">
					<ul class="layui-tab-title  tool-box-tab mb-0">
                        <li :class="{ 'layui-this': navIndex==0 }" @click="changeNav(0)">全部</li>
                        <li :class="{ 'layui-this': navIndex==1 }" @click="changeNav(1)">我的上传</li>
                        <li :class="{ 'layui-this': navIndex==2 }" @click="changeNav(2)">节日素材</li>
                        <li :class="{ 'layui-this': navIndex==3 }" @click="changeNav(3)">宣传标语</li>
                        <p class="tool-upload fr mb-0">
                            <a href="#" ><i class="windowr-icon icon-yunshangchuan"></i><span>本地上传</span></a>
                        </p>
                    </ul>
					
                    <div class="layui-tab-content plrtb-0 upload-box clear posi-rela">
                    <div class="layui-tab-item layui-show upload-box-innerbox upload-read">
                        <div class="upload-list">
                        <ul>
                            <li v-for='list in lists' :key="list.id" :id="'list_img_'+list.id">
                            <!-- id="upload-li" -->
                            <img @click="chooseImg(list.id,list.url)" :src="list.url">
                            <span @click="deleteImg(list.id)" class="upload-delete-btn"><i class="icon-shanchu3"></i></span>
                            <div class="upload-list-box " :class="{ 'upload-list-boxa': select_img_id==list.id }">
                                <!-- upload-list-boxa -->
                                <i class="icon-xuanzhong"></i>
                            </div>
                            </li>
                        </ul>
                        </div>
                        <div class="upload-down-all" id="down-up">
                        <div class="upload-down clear">
                            <div class="plr-15 text-left">
                            <span>单机事件：</span>
                            <input type="text" v-model="url" class="upload-down-input" placeholder="请输入进程路径（支持路径参数）或网址">
                            <span class="ml-10">开机延迟：</span>
                            <input type="text" class="upload-down-inputR" v-model="delay" placeholder="0">
                            <span class="ml-5">秒加载</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

				</div>
				<div class="upload-downline clear"></div>
				<div><input type="button" class="pz-footer-button mt-15 mb-15" value="下一步" id="upload-down-btn01"></div>
			</div>

		</div>
        <!-- <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
        <span class="spanhahaha" v-for="element in myArray" :key="element.id">{{element.name}}</span>
        </draggable> -->
<!-- </div> -->
   
</template>

<script>
    import draggable from 'vuedraggable'

    export default {
      name: 'scrollImgEditor'
      ,components: {
        draggable,
      }
      ,data () {
        return {
          myArray:[
              {
                  'name':'a'
                  ,'order':'1'
                  ,'fixed':true
              }
              ,{
                  'name':'b'
                  ,'order':'2'
                  ,'fixed':true
              }
              ,{
                  'name':'c'
                  ,'order':'3'
                  ,'fixed':true
              }
              ,{
                  'name':'d'
                  ,'order':'4'
                  ,'fixed':true
              }
              ,{
                  'name':'e'
                  ,'order':'5'
                  ,'fixed':true
              }
          ]
          ,imgsrc:''
          ,url:''
          ,delay:0
          ,navIndex:0 //nav 切换索引
          ,lists:[] //图片数据
        }
      }
      ,methods:{
        close:function(){
            this.$store.commit('drag_showbox_status',false);
            this.$store.commit('drag_item_cache','');
            this.editorContent = '';
        }
      }
      ,mounted() {
        this.imgsrc = this.$store.state.draggable.drag_item_cache.img_src;
        this.url = this.$store.state.draggable.drag_item_cache.url;
        this.delay = this.$store.state.draggable.drag_item_cache.delay;
        this.select_img_id = this.$store.state.draggable.drag_item_cache.img_id;
        this.ajax('http://192.168.1.155/dragable.php',{"type":"getImgLists"},'get',this.getListCallback);
      }
      ,watch:{
        //切换菜单再刷新list
        navIndex(){
          this.ajax('http://192.168.1.155/dragable.php',{"type":"getImgLists"},'get',this.getListCallback);
        }
      }
    }

</script>

<style scoped>
.spanhahaha{
    width:100px;height:100px; float:left;
    margin:5px;
    background:#000;
    color:#fff;
    text-align: center;
    line-height: 100px;
}

.layui-tab-title{
  text-align: left;
}
</style>