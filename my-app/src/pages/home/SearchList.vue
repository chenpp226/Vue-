<template>
	<div id="searchlist" class="page">
		<div class="search-header">
			<span class="iconfont" @click="backAction()">&#xe665;</span>
			<div class="header-search-bar">
				<span class="iconfont">&#xe62a;</span>
				<input type="search" v-model="keyword"/>	
			</div>
			<i>搜索</i>
		</div>
		<div class="listInfoWrapper">
			<home-list :list="listData"></home-list>
		</div>
		
	</div>
</template>

<script>
import { mapState } from 'vuex'
import HomeList from '../../components/home/HomeList.vue'
import { getSearchSeller } from '../../services/homeService.js'

export default{
	props:{
		"word":String
	},
	data(){
		return{
			keyword:"",
			listData:[]
		}
	},
	computed:{
		...mapState(['latitude','longitude'])
	},
	created(){
		if(this.$route.path=='/home/search'){
			this.keyword = this.word
		}else{
			this.keyword = this.$route.params.word
		}
		
		getSearchSeller(this.keyword,this.latitude,this.longitude)
		.then((result)=>{
			this.listData = result;
		})
	},
	mounted(){
		let listScroll = new IScroll(".listInfoWrapper",{
			click:true
		})
		listScroll.on("scrollStart",()=>{
			listScroll.refresh();
		})
	},
	methods:{
		backAction(){
			if(this.$route.path=='/home/search'){
				//搜索界面进入
				this.$emit('close');
			}else{
				//首页直接进入
				this.$router.back();
			}
		}
	},
	components:{
		'home-list' : HomeList
	}
}
</script>

<style>
#searchlist{
	background: #fff;
}
#searchlist.page{
	bottom: 0;
}
#searchlist .search-header{
	margin-bottom: 10;
}
.listInfoWrapper{
	position: absolute;
	top: 50px;
	left: 0;
	bottom: 0;
	overflow: hidden;
	width: 100%;
}
</style>