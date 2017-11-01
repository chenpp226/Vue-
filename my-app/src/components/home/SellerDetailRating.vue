<template>
<div id="sellerDetailRating" class="slide">
	<div class="wrapper">
		<div class="s-rating"></div>
		<div class="s-comment">
			<ul>
				<li v-for="item in ratingArr" class="rating-item">
					<img src="/static/images/userHeadTumbPic.png" alt="" />
					<div class="client-info-etc">
						<i>{{item.username}}</i>
						<span>{{item.rated_at}}</span><br />
						<span>评分：{{item.rating_star}}星</span>&nbsp;&nbsp;
						<span>{{item.time_spent_desc}}</span>
					</div>
					<div class="client-order">
						<li v-for="goods in item.item_ratings">
							<span>{{goods.food_name}}</span>
						</li>
					</div>
				</li>
			</ul>
			
		</div>
	</div>
</div>
</template>

<script>
import { getSellerRating } from '../../services/homeService.js'

export default{
	props:['sellerID'],
	data(){
		return{
			offset: 0,
			limit: 10,
			ratingArr:[]
		}
	},
	created(){
		getSellerRating(this.sellerID,this.offset,this.limit)
		.then((result)=>{
			this.ratingArr = result;
		})
	},
	mounted(){
		let sellerDetailRatingScroll = new IScroll("#sellerDetailRating",{
			click:true
		})
		sellerDetailRatingScroll.on("scrollStart",()=>{
			sellerDetailRatingScroll.refresh();
		})
	}
}

</script>

<style>
#sellerDetailRating.slide{
	background: #eee;
	overflow: hidden;
}
.s-comment{
	background: #fff;
	box-sizing: border-box;
	width: 100%;
	padding: 0 10px;
	margin-top: 10px;
}
.s-comment .rating-item{
	padding: 10px 0;
	overflow: hidden;
	height: auto;
	border-bottom: 1px solid #eee;
}
.s-comment img{
	width: 30px;
	height: 30px;
	float: left;
}
.s-comment .client-info-etc{
	float: left;
	margin-left: 16px;
	width: 86%;
	font-size: 0.8em;
	color: #999;
}
.s-comment .client-info-etc i{
	font-size: 1.1em;
	color: #333;
}
.s-comment .client-order{
	float: left;
}
.s-comment .client-order>li{
	display: inline-block;
	padding: 2px 8px;
	font-size: 12px;
	border: 1px solid #eee;
	margin:10px 0 0 16px;
}
</style>