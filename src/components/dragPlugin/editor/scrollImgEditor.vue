<template>
<div>
    <div class=" box-middle" v-show="step==1">
			<div class="tool-box-cloud">
				<div class="layui-layer-title" style="cursor: move;">
                    <span class="layui-layer-setwin">
                        <a href="javascript:;" @click="close()"><img src="../../../assets/images/close-a.png"></a>
                    </span>
                    选择轮播图
                </div>
				<div class="layui-tab layui-tab-brief  mtb-0" lay-filter="docDemoTabBrief">
					<ul class="layui-tab-title  tool-box-tab mb-0">
                        <li :class="{ 'layui-this': navIndex==0 }" @click="this.navIndex = 0">全部</li>
                        <li :class="{ 'layui-this': navIndex==1 }" @click="this.navIndex = 1">我的上传</li>
                        <li :class="{ 'layui-this': navIndex==2 }" @click="this.navIndex = 2">节日素材</li>
                        <li :class="{ 'layui-this': navIndex==3 }" @click="this.navIndex = 3">宣传标语</li>
                        <p class="tool-upload fr mb-0">
                            <a href="#" ><i class="windowr-icon icon-yunshangchuan"></i><span>本地上传</span></a>
                        </p>
                    </ul>
					
                    <div class="layui-tab-content plrtb-0 upload-box clear posi-rela">
                    <div class="layui-tab-item layui-show upload-box-innerbox upload-read">
                        <div class="upload-list">
                        <ul>
                            <li @click="chooseImg(list.id)" v-for='list in lists' :key="list.id" :id="'list_img_'+list.id">
                            <!-- id="upload-li" -->
                            <img :src="list.url">
                            <span @click="deleteImg(list.id)" class="upload-delete-btn"><i class="icon-shanchu3"></i></span>
                            <div class="upload-list-box " :class="{ 'upload-list-boxa': id_in_array(list.id)}">
                                <!-- upload-list-boxa -->
                                <i class="icon-xuanzhong"></i>
                            </div>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>

				</div>
				<div class="upload-downline clear"></div>
				<div><input @click="nextStep()" type="button" class="pz-footer-button mt-15 mb-15" value="下一步" id="upload-down-btn01"></div>
			</div>

		</div>

		<div class=" box-middle" v-show="step==2">
			<div class="tool-box-cloud">
				<div class="layui-layer-title" style="cursor: move;">
                    <span class="layui-layer-setwin">
                        <a href="javascript:;" @click="close()"><img src="../../../assets/images/close-a.png"></a>
                    </span>
                    设置轮播图
                </div>
				<div class="set-cloud-all">
					<div class="plr-15 mb-10 overflowhide">
						<div class="set-cloud-boxL">
							<div class="layui-tab  layui-tab-brief  mtb-0" lay-filter="docDemoTabBrief">
                                <!-- 大图 -->
								<div class="layui-tab-content plrtb-0  set-cloud-up clear">
									<div class="layui-tab-item layui-show  set-cloud-read">
										<span class="set-cloud-img"><img :src="big_img_src" /></span>
									</div>
								</div>
                                <!-- 小图 -->
								<ul class="layui-tab-title  set-cloud-tab mb-20 clear">
                                    <draggable v-model="loop_img_list" @start="drag=true" @end="drag=false">
                                        <!-- <span class="spanhahaha" v-for="element in myArray" :key="element.id">{{element.name}}</span> -->
                                        <li v-for="element in loop_img_list" :key="element.id"
                                            class="set-cloud-this" 
                                            :class="{'set-cloud-mark':choose_img==element.id}"
                                            @click="choose_img_func(element.id,element.url)"
                                            :id="'list_img_'+element.id"
                                        >
                                            <img :src="element.url" />
                                            <span @click="step2Del(element.id)" class="upload-delete-btn"><i class="icon-shanchu3"></i></span>
                                        </li>
                                    </draggable>
								</ul>
							</div>
						</div>
						<div class="set-cloud-boxR posi-rela">
							<div class="content text-left mt-20">
								<span class="text-left ml-10">轮播速度：</span>
								<select class="set-select" v-model="loop">
									<option :value="item" v-for="item in loop_list" :key="item">{{item}}s</option>
								</select>
							</div>
							<div class="content mt-15 text-left">
								<span class="text-left ml-10">开机延迟：</span>
								<input v-model="delay" type="text" class="upload-down-inputRa" placeholder="0" />
								<span class="ml-5">秒加载</span>
							</div>
							<div class="set-cloud-notice">
								<p class="set-cloud-text ml-10 text-left">温馨提示</p>
								<p class="pl-10 set-cloud-text01">鼠标按住缩略图拖动位置，可以调整图片播放顺序；</p>
								<div @click="prevStep()" class="set-cloud-choicebtn ml-10"><span class="mt-20">重新</span><span>选择</span></div>
							</div>

						</div>
					</div>
					<div class="upload-down clear">
						<div class="plr-15 text-left">
							<span>单机事件：</span>
							<input v-model="url" type="text" class="upload-down-inputset" placeholder="请输入进程路径（支持路径参数）或网址" />
						</div>
					</div>
				</div>
				<div class="upload-downline clear"></div>
				<div><input @click="save()" type="button" class="pz-footer-button mt-15 mb-15" value="保存" id="upload-down-btn02" /> </div>
			</div>

		</div>
</div>
   
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
          img_id_list:[] //第一步选择图片的id 数组
          ,loop_img_list:[] //第二步待排序图片
          ,choose_img:0 //第二步单击选择的图片
          ,big_img_src:''
          ,url:''
          ,delay:0 //延迟
          ,loop:1 //循环
          ,loop_list:[1,2,3,4,5] //延迟
          ,navIndex:0 //nav 切换索引
          ,lists:[] //图片数据
          ,step:1 //下一步页面
        }
      }
      ,methods:{
        //关闭编辑器
        close:function(){
            this.$store.commit('drag_showbox_status',false);
            this.$store.commit('drag_item_cache','');
            this.big_img_src = '';
            this.choose_img = 0;
        }
        //选择图片,如果二次点击到 会清除
        //会在deleteImg方法之前执行
        ,chooseImg:function(id){
            let is_has_id = true;
            this.img_id_list.forEach((vo,key)=>{
                if(vo == id){
                    is_has_id = false;
                    this.img_id_list.splice(key,1);
                }
            })
            if(is_has_id){
                this.img_id_list.push(id);
            }
        }
        //图片是否在备选数组中
        ,id_in_array:function(id){
            let res = false;
            this.img_id_list.forEach((vo,key)=>{
                if(vo == id){
                    res = true;
                }
            })
            return res;
        }
        //ajax获取图片后的回调
        ,getListCallback:function(lists){
            //图片源列表
            this.lists = lists;
            //从vuex中取数据 初始化一切
            let cache = this.$store.state.draggable.drag_item_cache;
            this.img_id_list = cache.img_id_list;
            //如果取出数据有值  表示编辑 直接跳倒第二页 初始化一切
            if(cache.img_id_list.length>0){
                this.choose_img = cache.img_id;
                this.big_img_src = cache.img_src;
                this.url = cache.url;
                this.delay = cache.delay;
                this.loop = cache.loop;
                this.nextStep();
            }
        }
        //删除图片,再次更新回调
        ,deleteImg:function(id){
            this.ajax('http://192.168.1.155/dragable.php',{"type":"deleteImg"},'get',this.deleteCallback);
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
        ,prevStep:function(){
            this.step=1
        }
        //下一步
        ,nextStep:function(){
            if(this.img_id_list.length<=0){
                alert('您未选择任何图片');
            }
            else{
                this.step = 2;
                //根据第一步选择的图片 生成第二步的图片数组
                this.loop_img_list = [];
                this.lists.forEach((vo)=>{
                    if(this.id_in_array(vo.id)){
                        this.loop_img_list.push(vo);
                    }
                });
                //第一次进来 默认给第一张选中
                if(this.big_img_src == '' || this.choose_img == 0){
                    this.big_img_src = this.loop_img_list[0].url;
                    this.choose_img = this.loop_img_list[0].id;
                }
            }
        }
        //第二步选择图片
        ,choose_img_func:function(id,url){
            this.choose_img = id;
            this.big_img_src = url;
        }

        //todo 第二步删除
        ,step2Del:function(id){
            if(this.img_id_list.length<=1){
                alert('至少要保留一张图片');
            }
            else{
                // img_id_list
                // id索引删除
                this.img_id_list.forEach((vo,key)=>{
                    if(vo == id){
                        this.img_id_list.splice(key,1);
                    }
                });
                // loop_img_list
                // 第二页图片列表删除
                this.loop_img_list.forEach((vo,key)=>{
                    if(vo.id == id){
                        this.loop_img_list.splice(key,1);
                    }
                });
                //TODO 有瑕疵
                this.big_img_src = this.loop_img_list[0].url;
                this.choose_img = this.loop_img_list[0].id;
            }
        }
        //保存
        ,save(){
          
          this.$store.state.draggable.drag_item_cache.img_id = this.choose_img;

          //图片选择后 获取原图尺寸 修改源
          let natural_img = document.getElementById('list_img_'+this.choose_img).getElementsByTagName("img")[0];
          this.$store.state.draggable.drag_item_cache.w = natural_img.naturalWidth;
          this.$store.state.draggable.drag_item_cache.h = natural_img.naturalHeight;

          //写dom 额外写尺寸
          this.$store.state.draggable.drag_item_cache.img_src = this.big_img_src;
          this.$store.state.draggable.drag_item_cache.dom = "<img style='width:"+natural_img.naturalWidth+"px;height:"+natural_img.naturalHeight+"px' class='imgs' src='"+this.big_img_src+"' />";
          //写其他数据
          this.$store.state.draggable.drag_item_cache.url = this.url;
          this.$store.state.draggable.drag_item_cache.delay = this.delay;
          this.$store.state.draggable.drag_item_cache.loop = this.loop;
          //写图片id列表
          this.$store.state.draggable.drag_item_cache.img_id_list = this.img_id_list;


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

          this.close();
        }
      }
      ,mounted() {
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