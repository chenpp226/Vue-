<template>
	<div class="home-header">
		<div class="info">
			<span class="location" @click="addressAction()">
				<i class="iconfont">&#xe649;</i>
				{{address}}
				<em id="triangle-down"></em>
			</span>
			<div class="weather">
				<span>{{weather.temperature}}°</span>
				<span>{{weather.description}}</span>
				<img :src="handleImg(weather.image_hash)" v-if="weather.image_hash"/>
			</div>
		</div>
		<div class="search-bar">
			<span class="search-box" @click="searchAction()">
				<i class="iconfont">&#xe62a;</i>
				搜索商家、商品名称
			</span>
		</div>
		<div class="hot-words">
			<span class="word" v-for="word in hotwords" @click="hotWordsAction(word)">{{word}}</span>
		</div>
	</div>
</template>

<script>
import { getHotWords, getWeather, getAddress } from '../../services/homeService.js'
import { handleImg } from '../../common/common.js'

import Vuex from 'vuex'

export default{
	data(){
		return{
			address:'',
			weather:{},
			hotwords:[]
		}
	},
	created(){
		//初始化数据
		this.requestData();
		
		//下拉刷新数据
		this.$event.$on('update-data',()=>{
			this.requestData();
		})
		
		//监听地址变化
		this.$event.$on('update-address',(result)=>{
			this.address = result;
		})
		
	},
	computed:{
		...Vuex.mapState(['latitude','longitude'])
	},
	methods:{
		handleImg,
		addressAction(){
			this.$router.push('/home/address');
		},
		searchAction(){
			this.$router.push('/home/search');
		},
		hotWordsAction(word){
			this.$router.push('/home/searchlist/'+word);
		},
		requestData(){
			//请求地址
			getAddress(this.latitude,this.longitude).then((result)=>{
				this.address = result;
			})
			
			//请求天气
			getWeather(this.latitude,this.longitude).then((result)=>{
				this.weather = result;
			})
			
			//请求热门词汇
			getHotWords(this.latitude,this.longitude).then((result)=>{
				this.hotwords = result;
			})
		
		}
	}
}

	
	
</script>

<style>
.home-header{
	width: 100%;
	height: 110px;
	background: #0085ff;
}
.info{
	width: 100%;
	height: 40px;
	position: relative;
}
.info .location{
	position: absolute;
	height: 30px;
	font-weight: 900;
	width: 180px;
	color: #fff;
	font-size:18px;
	line-height: 30px;
	top: 5px;
	left: 10px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
#triangle-down {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #fff;
   	position: absolute;
    top: 10px;
    right: -15px;
}
.info .weather{
	position: absolute;
	top: 0;
	right: 10px;
	height: 30;
	line-height: 30px;
	color: #fff;
}
.info .weather span{
	position: absolute;
	right: 30px;
	top: 0;
	font-size: 12px;
	width: 40px;
	text-align: center;
}
.info .weather span:last-of-type{
	top: 15px;
}
.info .weather img{
	position: absolute;
	width: 30px;
	top: 5px;
	right: 0;
}
.search-bar{
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
.hot-words{
	width: 100%;
	height: 30px;
	box-sizing: border-box;
	padding: 4px 14px;
	color:#fff;
	font-size: 12px;
	white-space: nowrap;
	overflow-x: auto;
}
.hot-words .word{
	font-size:12px;
	margin-right:20px;
}



</style>