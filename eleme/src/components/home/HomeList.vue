<template>
	<ul class="seller-list">
		<div>
			<li	class="seller-item one-bottom-px" v-for="(item,index) in list" @click="detailAction(item)">
				<img :src="handleImg(item.image_path)"/>
				<div class="item-content">
					<div class="one-bottom-dashed-px">
						<h3>{{item.name}}</h3>
						<span>评分:{{item.rating}}</span>&nbsp;&nbsp;
						<span>月售{{item.recent_order_num}}单</span><br/>
						<div style="float: left;">
							<span>￥{{item.qsPrice}}起送</span>
							<span>|</span>
							<span>{{item.description}}</span>
						</div>
						<div style="float: right;" >
							<span>{{item.distance>1000?(item.distance/1000).toFixed(2)+'km' : item.distance+'m'}}</span>
							<span>|</span>
							<span>{{item.order_lead_time}}分钟</span>
						</div>
						
					</div>
					<div class="activities" v-if="item.activities && item.activities.length>0">
						<span class="show-all" @click.stop="showActivity(item,index)">
							{{item.activities.length}}
							个活动
							<span class="downTrangle" v-if="item.activities.length>2"></span>
						</span>
						<p class="activity-item" v-for="(activity,index) in item.activities" v-if="index<2 || item.showActivity">
							<i :style="{background:'#'+activity.icon_color}">{{activity.icon_name}}</i>
							<i>{{activity.tips}}</i>
						</p>
					</div>
				</div>
			</li>
		</div>
	</ul>
</template>

<script>

import { handleImg } from '../../common/common.js'

export default{
	props:{
		list: Array
	},
	methods:{
		handleImg,
		showActivity(item,i){
			item.showActivity = !item.showActivity;
			this.$emit('update-scroll');
			if(item.showActivity){
				document.querySelectorAll(".downTrangle")[i].style.cssText="transform: rotate(180deg);";
			}else{
				document.querySelectorAll(".downTrangle")[i].style.cssText="transform: rotate(0deg);";
			}	
		},
		detailAction(item){
			//console.log(item);
			this.$router.push('/home/detail/'+item.id+'/home')
		}
	},
	updated(){
		this.$emit('refresh-scroll');
	}
	
}



</script>

<style>
.seller-list .seller-item{
	box-sizing: border-box;
	padding: 10px;
	display: flex;
	flex-shrink: 0;
}
.seller-list .seller-item>img{
	width: 60px;
	height: 60px;
}
.seller-list .seller-item .item-content{
	margin-left: 8px;
	flex: 1;
	overflow: hidden;
}
.seller-list .seller-item .item-content h3{
	height: 26px;
	width: 130px;
	font-size: 14px;
	font-weight: bold;
	color: #333;
	line-height: 26px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.seller-list .seller-item .item-content span{
	font-size: 0.8em;
	color: #999;
}
.seller-list .activity-item{
	margin-top: 5px;
	line-height: 20px;
	font-size: 12px;
	color: #666;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.seller-list .activity-item i:first-of-type{
	background: red;
	color: #fff;
	padding: 0 2px;
	border-radius: 2px;
}
.seller-list .activity-item i:nth-of-type(2){
	font-size: 1em;
	color: #999;
}
.seller-list .activities{
	position: relative;
}
.seller-list .activities .show-all{
	position: absolute;
	top: 4px;
	right: 4px;
	font-size: 12px;
	color: #999;
}
.downTrangle{
	display: inline-block;
	width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #999;
}
.upTrangle{
	display: inline-block;
	width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #999;
}
</style>