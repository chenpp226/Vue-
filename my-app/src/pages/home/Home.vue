<template>
	<div>
		<div id="home" class="page">
			<!--滚动内容-->
			<div class="wrapper">
				<!--头部加载图片-->
				<div class="top" :class="imgClass">
					<img :src="refreshImg"/>
					<span>{{refreshInfo}}...</span>
				</div>
				<!--头部-->
				<home-header></home-header>
				<!--轮播图-->
				<home-banner></home-banner>
				<!--广告-->
				<home-ad></home-ad>
				<!--推荐商家列表-->
				<home-list :list="listData" @update-scroll="updateScroll" @refresh-scroll="refreshScroll()"></home-list>
				<div class="bottom" :class="imgDownClass" v-if="isLoadMore">
					<img :src="loadmoreImg"/>
					<span>{{loadmoreInfo}}...</span>
				</div>
			</div>
			<div class="back-to-top" v-show="showBackToTopBtn" @click="backToTop()">
				<i></i>
				<div class="back-arrow">
					<span></span>
					<span></span>
				</div>
			</div>
			<div class="search-bar" v-show="showSearch">
				<span class="search-box" @click="searchAction()">
					<i class="iconfont">&#xe62a;</i>
					搜索商家、商品名称
				</span>
			</div>
			
		</div>
		<router-view></router-view>
		
	</div>
	
</template>

<script>
import HomeHeader from '../../components/home/HomeHeader.vue'
import HomeBanner from '../../components/home/HomeBanner.vue'
import HomeAd from '../../components/home/HomeAd.vue'
import HomeList from '../../components/home/HomeList.vue'
import { mapState } from 'vuex'
import { getHomeList } from '../../services/homeService.js'
let homeScroll;

export default{
	data(){
		return{
			refreshImg:'static/images/arrow.png',
			refreshInfo:'下拉刷新',
			imgClass:'',
			loadmoreImg:'static/images/arrow.gif',
			loadmoreInfo:'加载更多',
			imgDownClass:'',
			showSearch: false,
			isLoadMore: false,
			listData:[],
			requestLimit:20,
			showBackToTopBtn:false
		}
	},
	created(){
		//请求商家列表初始数据
		this.requestListData();
		
		//监听刷新事件，刷新商家列表数据
		this.$event.$on('update-data',()=>{
			this.requestListData('refresh');
		})
	},
	computed:{
		...mapState(['latitude','longitude'])
	},
	components:{
		'home-header': HomeHeader,
		'home-banner': HomeBanner,
		'home-ad': HomeAd,
		'home-list': HomeList
	},
	methods:{
		searchAction(){
			this.$router.push('/home/search');
		},
		refreshScroll(){
			homeScroll.refresh();
		},
		updateScroll(){
			//解决滚动触底后数据展开再收起 无法回弹的bug
			homeScroll.refresh();
			setTimeout(()=>{//不写时间，则时间默认为浏览器最小时间
				//计算滚动视图当前最大范围
				var maxScrollY = homeScroll.wrapper.offsetHeight - homeScroll.scroller.offsetHeight;
				//所在未知大于最大范围，页面回弹至底部
				if(maxScrollY>homeScroll.y){
					homeScroll.scrollTo(0,maxScrollY);
				}
			})
		},
		requestListData(flag){
			//请求首页商家列表数据
			getHomeList(this.latitude,this.longitude,this.listData.length,this.requestLimit)
			.then((result)=>{
				if(flag==="refresh"){
					this.listData = [];
				}
				this.listData = this.listData.concat(result);
				
				//上拉加载更多商品--提示信息及图片
				this.loadmoreImg = 'static/images/arrow.png';
				this.loadmoreInfo = '加载更多';
			})
		},
		backToTop(){
			//返回顶部
			homeScroll.scrollTo(0,-40,200);
		}
	},
	mounted(){
		homeScroll = new IScroll("#home",{
			probeType:3,
			click:true,
			preventDefault:true
		})
		//滚动初始位置
		homeScroll.scrollTo(0,-40)
		//刷新滚动事件
		homeScroll.on("scrollStart",()=>{
			//显示底部'加载更多'提示信息
			if(homeScroll.maxScrollY<0){
				this.isLoadMore = true;
			}
			//刷新
			homeScroll.refresh();
		})
		
		//监听滚动进程
		homeScroll.on("scroll",()=>{
			//固定搜索栏
			if(homeScroll.y <= -80){
				this.showSearch = true;
			}else{
				this.showSearch = false;
			}
			
			//判断是否出现返回顶部按钮
			if(homeScroll.y<=-500){
				this.showBackToTopBtn = true;
			}else{
				this.showBackToTopBtn = false;
			}
			
			//判断是否达到下拉刷新的条件
			if(homeScroll.y>=10){//刷新
				this.imgClass = 'up';
				this.refreshInfo = '释放立即刷新';
			}else{
				this.imgClass = "";
				this.refreshInfo = '下拉刷新'
			}
			
			//判断是否达到上拉加载数据的条件
			if(homeScroll.y<=homeScroll.maxScrollY){
				this.imgDownClass = 'down';
			}else if(homeScroll.y>homeScroll.maxScrollY){
				this.imgDownClass = '';
			}
		})
		
		//监听滚动结束
		homeScroll.on("scrollEnd",()=>{
			//下拉未达到刷新条件
			if(homeScroll.y>-40 && homeScroll.y<0){
				homeScroll.scrollTo(0,-40,200);
			}
			//下拉达到触发条件，执行刷新
			if(homeScroll.y>=0){
				//更换头部图片
				this.refreshImg = '/static/images/ajax-loader.gif';
				this.refreshInfo = '正在刷新';
				
				//传递信息通知子组件刷新
				this.$event.$emit('update-data');
				
				//刷新结束，收起头部刷新div
				setTimeout(()=>{
					this.refreshImg = 'static/images/arrow.png';
					this.refreshInfo = '下拉刷新';
					homeScroll.scrollTo(0,-40,200);
				},1000)
			}
			
			//上拉未达到加载更多的条件
			let realY = homeScroll.maxScrollY + 40;
			if(homeScroll.y>homeScroll.maxScrollY && homeScroll.y<realY){
				homeScroll.scrollTo(0,realY,200);
			}
			//满足加载更多的条件
			if(homeScroll.y<=homeScroll.maxScrollY){
				this.loadmoreImg = 'static/images/ajax-loader.gif';
				this.loadmoreInfo = '正在加载';
				this.requestListData();
			}
			
		})
		
	}
}
</script>

<style>
#home .wrapper .top, #home .wrapper .bottom{
	box-sizing: border-box;
	width: 100%;
	height: 40px;
	padding-top: 8px;
	overflow: hidden;
	line-height: 32px;
	text-align: center;
	color: #999;
	font-size: 14px;
}
#home .wrapper .top img, #home .wrapper .bottom img{
	width: 24px;
	height: 24px;
	display: inline-block;
	transform: rotate(180deg);
	transition: 300ms transform;
}
#home .wrapper .top.up img{
	transform: rotate(0deg);
}
#home .wrapper .bottom img{
	transform: rotate(0);
}
#home .wrapper .bottom.down img{
	transform: rotate(180deg);
}
#home>.search-bar{
	position: absolute;
	top: 0;
	left: 0;
	background: #0085ff;
	box-sizing: border-box;
	width: 100%;
	height: 36px;
	padding: 4px 14px;
}
.search-bar .search-box{
	display: block;
	width: 100%;
	height: 100%;
	text-align: center;
	line-height: 28px;
	font-size: 12px;
	background: #fff;
}
.back-to-top{
	position: absolute;
	z-index: 13;
	right: 14px;
	bottom: 20px;
	width: 44px;
	height: 44px;
	background: #fff;
	border: 1px solid #999;
	border-radius: 50%;
	text-align: center;
}
.back-to-top i{
	display: block;
	width: 18px;
	height: 2px;
	background: #999;
	margin: 12px auto 2px;
}
.back-arrow{
	width: 16px;
	margin: 0 auto;
}
.back-to-top .back-arrow span:first-of-type{
	display: block;
	width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #999;
}
.back-to-top .back-arrow span:nth-of-type(2){
	display: block;
	width: 8px;
    height: 6px;
    background: #999;
    margin: 0 auto;
}	
</style>