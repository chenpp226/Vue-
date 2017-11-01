<template>
	<div id="address" class="page">
		<div class="address-header">
			<span class="iconfont" @click="$router.back()">&#xe665;</span>
			选择收货地址
		</div>
		<div class="address-search-bar">
			<span class="iconfont">&#xe62a;</span>
			<input type="search" v-model="addressWord"/>
		</div>
		<div class="address-scroll-wrapper">
			<div class="wrapper">
				<ul class="address-list">
					<li v-for="item in addressData" class="one-bottom-px" @click="selectAddress(item)">
						<h4>{{item.name}}</h4>
						<p>{{item.address}}</p>
					</li>
				</ul>
			</div>
		</div>
		
	</div>
</template>

<script>
import { getAddressList } from '../../services/homeService.js'
import { mapState } from 'vuex'
let addressScroll;
let Timer = null;

export default{
	data(){
		return{
			addressWord:'',
			addressData:[]
		}
	},
	created(){
		this.$watch('addressWord',()=>{
			clearTimeout(Timer);
			Timer = setTimeout(()=>{
				this.searchAction();
			},1000)
		})
	},
	mounted(){
		addressScroll = new IScroll(".address-scroll-wrapper",{
			click:true
		})
		addressScroll.on("scrollStart",()=>{
			addressScroll.refresh();
		})
	},
	computed:{
		...mapState(["latitude","longitude"])
	},
	methods:{
		searchAction(){
			getAddressList(this.addressWord,this.latitude,this.longitude)
			.then((result)=>{
				this.addressData = result;
			})
		},
		selectAddress(newAddress){
			//更新首页头部地址显示
			this.$event.$emit('update-address',newAddress);
			//修改经纬度
			this.$store.commit('modifyAddress',{
				latitude: newAddress.latitude,
				longitude: newAddress.longitude
			})
			//刷新主页数据
			this.$event.$emit('update-data')
			//返回主页
			this.$router.back();
		}
	}
}

</script>

<style>
#address{
	background: #fff;
}
#address.page{
	bottom:0;
}
.address-header{
	width: 100%;
	height: 44px;
	background: #0085ff;
	color: #fff;
	text-align: center;
	font-size:18px;
	line-height: 44px;
}
.address-header span{
	position: absolute;
	transform: rotate(180deg);
	left: 16px;
	top: 0;
}
.address-search-bar{
	width: 100%;
	background: #fff;
	height: 50px;
	box-sizing: border-box;
	padding: 8px 16px;
	position: relative;
}
.address-search-bar input{
	box-sizing: border-box;
	padding: 0 12px 0 30px;
	width: 100%;
	height: 100%;
	background: #eee;
	border: none;
	outline: none;
}
.address-search-bar span{
	position: absolute;
	left: 24px;
	top: 16px;
	font-size: 18px;
}
.address-scroll-wrapper{
	width: 100%;
	position: absolute;
	top: 94px;
	left: 0;
	bottom: 0;
	overflow: hidden;
}
.address-list li{
	box-sizing: border-box;
	width: 100%;
	padding: 16px;
}
.address-list li p{
	font-size: 12px;
}
</style>