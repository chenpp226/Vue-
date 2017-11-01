<template>
	<div id="search" class="page">
		<div class="search-header">
			<span class="iconfont" @click="$router.back()">&#xe665;</span>
			<div class="header-search-bar">
				<span class="iconfont">&#xe62a;</span>
				<input type="search" placeholder="请输入商品名称" v-model="word"/>	
			</div>
			<i @click="searchAction()">搜索</i>
		</div>
		<div class="search-content">
			<div class="search-history">
				<span></span>
			</div>
			<div class="hot-search">
				<h3>热门搜索</h3>
				<span class="hot-words" v-for="item in hotwords">
					{{item}}
				</span>
			</div>
		</div>
		<search-list v-if="showList" @close="closeSearchList()" :word="word"></search-list>
	</div>
</template>

<script>
import { getHotWords } from '../../services/homeService.js'
import { mapState } from 'vuex'
import SearchList from './SearchList.vue'

export default{
	data(){
		return{
			hotwords:[],
			word:"",
			showList:false
		}
	},
	computed:{
		...mapState(['latitude','longitude'])
	},
	created(){
		getHotWords(this.latitude,this.longitude)
		.then((result)=>{
			this.hotwords = result;
		})
	},
	methods:{
		searchAction(){
			this.showList = true
		},
		closeSearchList(){
			this.showList = false	
		}
	},
	components:{
		'search-list' : SearchList
	}
}



</script>

<style>
#search{
	background: #fff;
}
#search.page{
	bottom: 0;
}
.search-header{
	width: 100%;
	height: 40px;
	background: #fff;
	box-sizing: border-box;
	padding:4px 50px;
	line-height: 40px;
	color: #666;
}
.search-header span{
	position: absolute;
	top: 4px;
	left:12px;
	font-size: 26px;
	transform: rotate(180deg);
}
.search-header i{
	position: absolute;
	top: 4px;
	right: 12px;
	font-size: 16px;
	color: #333;
	font-weight: 900;
}
.header-search-bar{
	display: inline-block;
	width: 100%;
}
.search-header .header-search-bar input{
	background: #eee;
	width: 100%;
	height: 28px;
	border: none;
	padding-left: 20px;
	line-height: 28px;
}
.search-header .header-search-bar span{
	top: 4px;
	left: 50px;
	font-size: 16px;
	transform: rotate(0deg);
}
.search-content{
	width: 100%;
	padding: 10px;
	box-sizing: border-box;
}
.hot-search{
	width:100%;
	height: auto;
}
.hot-search h3{
	color: #666;
}
.hot-search .hot-words{
	
}
#search .hot-words{
	display: inline-block;
	width: auto;
	color: #666;
	height: 26px;
	line-height: 5px;
	padding: 10px;
	background: #EDEDED;
	margin: 6px;
	font-size: 14px;
	border-radius: 5px;
}
</style>