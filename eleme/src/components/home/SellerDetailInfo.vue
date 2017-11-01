<template>
<div id="sellerDetailInfo" class="slide">
	<div class="wrapper">
		<div class="activities-and-service" v-if="info.activities && info.activities.length>0">
			<h3>活动和服务</h3>
			<p class="act-container" v-for="item in info.activities">
				<i :style="{background:'#'+item.icon_color}">{{item.icon_name}}</i>
				<i>{{item.tips}}</i>
			</p>
			<p class="support-container" v-for="support in info.supports">
				<i>{{support.icon_name}}</i>
				<i>{{support.description}}</i>
			</p>
		</div>
		<div class="res-pic" v-if="info.albums && info.albums.length>0">
			<h3>商家实景</h3>
			<div v-for="pic in info.albums">
				<img :src="handleImg(pic.cover_image_hash)" alt="" />
				<span>{{pic.name}}({{pic.count}}张)</span>
			</div>
		</div>
		<div class="seller-info">
			<h3>商家信息</h3>
			<li><span>{{info.description}}</span></li>
			<li>
				<span>商家电话</span>
				<span>
					{{info.phone}}
					<i class="iconfont" style="font-size: 0.9em; color: #999;">&#xe665;</i>
				</span>
			</li>
			<li>
				<span>地址</span>
				<span>{{info.address}}</span>
			</li>
			<li v-if="info.opening_hours">
				<span>营业时间</span>
				<span>{{info.opening_hours[0]}}</span>
			</li>
		</div>
		<div class="qualifications">
			<h3>营业资质</h3>
			<span class="iconfont">&#xe665;</span>
		</div>
	</div>
</div>

</template>

<script>
import { getSellerGoodsHeader } from '../../services/homeService.js'
import { handleImg } from '../../common/common.js'
import { mapState } from 'vuex'
export default{
	props:['sellerID'],
	data(){
		return{
			info:[]
		}
	},
	created(){
		getSellerGoodsHeader(this.sellerID,this.latitude,this.longitude)
		.then((result)=>{
			this.info = result;
		})
	},
	mounted(){
		let sellerInfoScroll = new IScroll("#sellerDetailInfo",{
			click:true
		})
		sellerInfoScroll.on("scrollStart",()=>{
			sellerInfoScroll.refresh()
		})
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
#sellerDetailInfo.slide{
	background: #eee;
	overflow: hidden;
}
.activities-and-service{
	width: 100%;
	box-sizing: border-box;
	padding: 16px;
	background: #fff;
}
.activities-and-service h3{
	color: #333;
	margin-bottom: 16px;
}
.activities-and-service .act-container,.support-container{
	margin-top: 5px;
	line-height: 20px;
	font-size: 12px;
	color: #666;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.activities-and-service .act-container i:first-of-type{
	background: red;
	color: #fff;
	padding: 0 2px;
	border-radius: 2px;
}
.activities-and-service .act-container i:nth-of-type(2){
	font-size: 1em;
	color: #999;
}
.activities-and-service .support-container i:first-of-type{
	color: #999;
	border: 1px solid #999;
	padding: 0 2px;
	border-radius: 2px;
}
.activities-and-service .support-container i:nth-of-type(2){
	font-size: 1em;
	color: #999;
}
.res-pic,.seller-info,.qualifications{
	width: 100%;
	box-sizing: border-box;
	padding: 16px;
	margin-top: 10px;
	overflow: hidden;
	background: #fff;
}
.res-pic,.seller-info h3{
	margin-bottom: 10px;
	color: #333;
}
.res-pic>div img{
	display: block;
	width: 80px;
	height: 80px;
}
.res-pic div{
	width: 80px;
	height: 80px;
	float: left;
	margin:6px 6px 0 0;
	position: relative;
}
.res-pic div:nth-of-type(4n){
	margin:6px 0 0 0;
}
.res-pic div span{
	position: absolute;
	width: 100%;
	background: rgba(12,12,12,0.6);
	bottom: 0;
	left: 0;
	text-align: center;
	color: #fff;
	font-size: 0.9em;
}
.seller-info li{
	list-style: none;
	border-bottom: 1px solid #eee;
	padding: 10px 0;
	overflow: hidden;
	font-size: 0.9em;
}
.seller-info li span:first-of-type{
	float: left;
	color: #000;
}
.seller-info li span:nth-of-type(2){
	text-align: right;
	width: 70%;
	float: right;
}
.qualifications{
	position: relative;
}
.qualifications h3{
	color: #333;
}
.qualifications span{
	position: absolute;
	font-size: 18px;
	color: #999;
	right: 10px;
	top: 16px;
}
</style>