<template>
<div id="sellerDetail" class="page">
	<!--头部-->
	<div class="sellerDetailHeader">
		<div class="seller-h-back-btn">
			<span class="iconfont" @click="$router.back()">&#xe665;</span>
		</div>
		<div class="seller-info-container">
			<div class="h-info-part">
				<img :src="handleImg(headerInfo.image_path)" alt="" />
				<div>
					<h4>{{headerInfo.name}}</h4>
					<p>
						<span v-if="headerInfo.delivery_mode">{{headerInfo.delivery_mode.text}} / </span>
						<span>{{headerInfo.order_lead_time}}分钟送达</span>
						<i>/</i>
						<span v-if="headerInfo.piecewise_agent_fee">{{headerInfo.piecewise_agent_fee.tips}}</span>
					</p>
					<div v-if="headerInfo.promotion_info" class="notice">公告：{{headerInfo.promotion_info}}</div>
				</div>
			</div>
			<div class="s-activities" v-if="headerInfo.activities && headerInfo.activities.length>0">
				<span @click="showShadowClick()">
					{{headerInfo.activities.length}}个活动&nbsp;
					<span class="s-rightTrangle"></span>
				</span>
				<p>
					<i :style="{background:'#'+headerInfo.activities[0].icon_color}">{{headerInfo.activities[0].icon_name}}</i>
					<i>{{headerInfo.activities[0].tips}}</i>
				</p>
			</div>
		</div>
	</div>
	<!--头部信息遮罩层-->
	<div class="shadowCover" v-show="showShadow">
		<em @click="closeShadowClick()" class="close-shadow">X</em>
		<h3>{{headerInfo.name}}</h3>
		<p class="seller-rating">评价：{{headerInfo.rating}}</p>
		<div class="s-discount">
			<span>优惠信息</span>
			<p v-for="item in headerInfo.activities">
				<i :style="{background:'#'+item.icon_color}">{{item.icon_name}}</i>
				<i>{{item.tips}}</i>
			</p>
		</div>
		<div v-if="headerInfo.promotion_info" class="notice">
			<span>商家公告</span>
			{{headerInfo.promotion_info}}
		</div>
		
	</div>
	<!--信息导航栏-->
	<ul class="detail-nav one-bottom-px">
		<li v-for="tab in tabList" :class="{active:selectTab==tab}" @click="selectTabClick(tab)">
			<span>{{tab}}</span>
		</li>
	</ul>
	<!--商品组件-->
	<detail-goods :sellerID='sellerID' v-show="selectTab=='商品'"></detail-goods>
	<!--评价组件-->
	<detail-rating :sellerID='sellerID' v-show="selectTab=='评价'"></detail-rating>
	<!--店铺信息组件-->
	<detail-info :sellerID='sellerID' v-show="selectTab=='店铺'"></detail-info>
</div>
</template>

<script>

import SellerDetailCart from '../../components/home/SellerDetailCart.vue'
import SellerDetailGoods from '../../components/home/SellerDetailGoods.vue'
import SellerDetailInfo from '../../components/home/SellerDetailInfo.vue'
import SellerDetailRating from '../../components/home/SellerDetailRating.vue'
import { getSellerGoodsHeader } from '../../services/homeService.js'
import { mapState } from 'vuex'
import { handleImg } from '../../common/common.js'

export default{
	data(){
		return{
			sellerID:this.$route.params.id,
			selectTab:'商品',
			tabList:['商品','评价','店铺'],
			headerInfo:"",
			showShadow:false
		}
	},
	created(){
		getSellerGoodsHeader(this.sellerID,this.latitude,this.longitude)
		.then((result)=>{
			this.headerInfo = result;
		})
	},
	mounted(){
		
	},
	computed:{
		...mapState(['latitude','longitude'])
	},
	methods:{
		handleImg,
		getHeaderInfo(){
			console.log(this.sellerID)
			getSellerGoodsHeader(this.sellerID,this.latitude,this.longitude)
			.then((result)=>{
				
			})
		},
		showShadowClick(){
			this.showShadow = true;
		},
		closeShadowClick(){
			this.showShadow = false;
		},
		selectTabClick(tab){
			this.selectTab = tab;
		}
	},
	components:{
		"detail-cart":SellerDetailCart,
		"detail-goods":SellerDetailGoods,
		"detail-info":SellerDetailInfo,
		"detail-rating":SellerDetailRating
	}
}
</script>

<style>
#sellerDetail{
	background: #eee;
	width: 100%;
	height: 100%;
}
#sellerDetail.page{
	bottom: 0;
}
.sellerDetailHeader{
	overflow: hidden;
	background: #999;
	width: 100%;
	height: auto;
	box-sizing: border-box;
	padding: 4px 10px;
}
.seller-h-back-btn{
	overflow: hidden;
}
.seller-h-back-btn span{
	float: left;
	font-size: 26px;
	transform: rotate(180deg);
	color: #fff;
}
.seller-info-container{
	margin-top: 10px;
	width: 100%;
	height: 100px;
}
#sellerDetail .detail-nav{
	display: flex;
	height: 34px;
	background: #fff;
	margin-bottom: 10px;
}
#sellerDetail .detail-nav li{
	flex: 1;
	text-align: center;
	line-height: 34px;
}
#sellerDetail .detail-nav li.active{
	color: #0085FF;
	font-weight: 900;
}
#sellerDetail .detail-nav li.active span{
	padding: 6px 0;
	border-bottom: 2px solid #0085FF;
}
#sellerDetail .slide{
	position: absolute;
	top: 181px;
	bottom: 0;
	left: 0;
	width: 100%;
	height: auto;
	background:#fff;
}
.seller-info-container{
	width: 100%;
}
.seller-info-container .h-info-part{
	box-sizing: border-box;
	padding-left: 6px;
	overflow: hidden;
	width: 100%;
}
.seller-info-container img{
	float: left;
	width: 70px;
	height: 70px;
	border-radius: 2px;
}
.seller-info-container .h-info-part>div{
	width: 76%;
	margin-left: 8px;
	float: left;
}
.seller-info-container .h-info-part>div h4{
	font-size: 18px;
	color: #fff;
	font-weight: 900;	
}
.seller-info-container .h-info-part .notice{
	font-size: 0.8em;
	color: #fff;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.seller-info-container p{
	font-size: 0.8em;
	color: #fff;
	margin:5px 0;
}
.s-rightTrangle{
	display: inline-block;
	width: 0;
    height: 0;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 4px solid #fff;
}
.s-activities{
	margin-top: 10px;
	box-sizing: border-box;
	padding-left: 6px;
	line-height: 14px;
}
.s-activities>span{
	float: right;
	font-size: 0.8em;
	color: #fff;
}
.s-activities>p i:first-of-type{
	padding: 0 2px;
	border-radius: 2px;
}
.shadowCover{
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	z-index: 13;
	width: 100%;
	box-sizing: border-box;
	padding:0 20px;
	height: auto;
	background: #262626;
	color: #fff;
	font-size: 0.8em;
}
.close-shadow{
	position: absolute;
	width: 40px;
	height: 40px;
	border: 1px solid #eee;
	border-radius: 50%;
	font-size: 20px;
	text-align: center;
	line-height: 40px;
	bottom: 30px;
	left: 50%;
	margin-left: -20px;
}
.shadowCover h3{
	text-align: center;
	font-size: 18px;
	margin-top: 40px;
}

.shadowCover>div span{
	font-size: 1.1em;
	width: 50px;
	display: block;
	text-align: center;
	padding: 4px 10px;
	border: 1px solid #fff;
	border-radius: 12px;
	margin: 18px auto;
}
.shadowCover .s-discount p{
	margin: 6px 0;
}
.shadowCover .s-discount i:first-of-type{
	padding: 0 2px;
	border-radius: 2px;
}
.seller-rating{
	font-size: 14px;
	text-align: center;
}
</style>