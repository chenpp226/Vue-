<template>
	<div class="home-banner">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="list in bannerList">
					<div class="banner-item" v-for="item in list">
						<img :src="handleImg(item.image_hash)" alt="item.description" />
						<p>{{item.name}}</p>
					</div>
				</div>
			</div>
			<div class="swiper-pagination"></div>
		</div>
	</div>
</template>

<script>
import { getBannerList } from '../../services/homeService.js'
import { handleImg } from '../../common/common.js'
import { mapState } from 'vuex'
var bannerSwiper;

export default{
	data(){
		return{
			bannerList:[]
		}
	},
	created(){
		getBannerList(this.latitude,this.longitude)
		.then((result)=>{
			//判断result当中是否有值，有则进行循环
			while(result.length>0){
				//对result进行切割  8个一组
				let list = result.splice(0,8);
				this.bannerList.push(list);
			}
		})
	},
	mounted(){
		bannerSwiper = new Swiper('.swiper-container',{
			pagination: '.swiper-pagination'
		})
	},
	updated(){
		bannerSwiper.update();
	},
	methods:{
		handleImg
	},
	computed:{
		...mapState(['latitude','longitude'])
	}
}
	
	
</script>

<style>
.home-banner .banner-item{
	width: 25%;
	float: left;
	margin-top: 10px;
}
.home-banner .banner-item img{
	display: block;
	width: 50%;
	margin: 0 auto;
}
.home-banner .banner-item p{
	text-align: center;
	font-size: 12px;
	color: #666;
}
.home-banner .swiper-wrapper{
	padding-bottom: 16px;
}
.home-banner .swiper-pagination{
	bottom:-4px;
}
.home-banner .swiper-pagination-bullet{
	width: 4px;
	height: 4px;
}
.home-banner .swiper-pagination-bullet.swiper-pagination-bullet-active{
	color: #000;
	opacity: 0.6;
	background: #000;
}
	


</style>