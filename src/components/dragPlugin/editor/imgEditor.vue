<template>
    <div>
        <!-- <div v-html="imgsrc"></div>
        单击事件<div><input v-model="url" /></div>
        开机延迟<div><input v-model="delay" /></div>

        <button v-on:click="save">保存</button>
        <button v-on:click="close">取消</button> -->

<div class=" box-middle">
			<div class="tool-box-cloud">
				<div class="layui-layer-title" style="cursor: move;">
          <span class="layui-layer-setwin">
            <a href="javascript:;" @click="close()"><img src="../../../assets/images/close-a.png"></a>
          </span>
          选择插图
        </div>
				<div class="layui-tab layui-tab-brief  mtb-0" lay-filter="docDemoTabBrief">
					<ul class="layui-tab-title  tool-box-tab mb-0">
						<li :class="{ 'layui-this': navIndex==0 }" @click="changeNav(0)">全部</li>
						<li :class="{ 'layui-this': navIndex==1 }" @click="changeNav(1)">我的上传</li>
						<li :class="{ 'layui-this': navIndex==2 }" @click="changeNav(2)">节日素材</li>
						<li :class="{ 'layui-this': navIndex==3 }" @click="changeNav(3)">宣传标语</li>
						<p class="tool-upload fr mb-0">
							<a href="#" target="" title=""><i class="windowr-icon icon-yunshangchuan"></i><span>本地上传</span></a>
						</p>
					</ul>
					<div class="layui-tab-content plrtb-0 upload-box clear posi-rela">
						<div class="layui-tab-item layui-show upload-box-innerbox upload-read">
							<div class="upload-list">
								<ul>
									<li v-for='list in lists' :key="list.id">
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
				<div><input type="button" @click="save" class="pz-footer-button mt-15 mb-15" value="确定" id="upload-down-btn"></div>
			</div>

		</div>

    </div>
</template>

<script>
    export default {
      name: 'imgEditor'
      ,data () {
        return {
          imgsrc:''
          ,url:''
          ,delay:''
          ,navIndex:0 //nav 切换索引
          ,lists:[] //图片数据
          ,select_img_id:0 //当前选择图片的id
        }
      }
      ,methods:{
        save:function(){
          this.$store.state.draggable.drag_item_cache.img_id = this.select_img_id;
          this.$store.state.draggable.drag_item_cache.dom = "<img class='imgs' src='"+this.imgsrc+"' />";
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
        ,changeNav:function(index){
            this.navIndex = index;
        }
        ,getListCallback:function(lists){
            this.lists = lists;
        }
        ,chooseImg:function(id,imgsrc){
            this.select_img_id=id;
            this.imgsrc = imgsrc;
        }
        ,deleteImg:function(id){
            this.ajax('http://t.c/dragable.php',{"type":"deleteImg"},'get',this.deleteCallback);
        }
        ,deleteCallback:function(data){
            if(data.status=='true'){
              for(let item in this.lists){
                if(this.lists[item].id == data.id){
                    this.lists.splice(item,1)
                }
              }
            }
        }
      }
      ,mounted() {
        this.imgsrc = this.$store.state.draggable.drag_item_cache.dom;
        this.url = this.$store.state.draggable.drag_item_cache.url;
        this.delay = this.$store.state.draggable.drag_item_cache.delay;

        this.ajax('http://t.c/dragable.php',{"type":"getImgLists"},'get',this.getListCallback);
      }
      ,watch:{
        //切换菜单再刷新list
        navIndex(){
          this.ajax('http://t.c/dragable.php',{"type":"getImgLists"},'get',this.getListCallback);
        }
      }

    }

</script>

<style scoped>
.layui-tab-title{
  text-align: left;
}
</style>