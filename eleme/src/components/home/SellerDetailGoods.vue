<template>
<div id="sellerDetailGoods" class="slide">
	<!--左边导航栏-->
	<nav class="nav-bar">
		<ul class="wrapper">
			<li v-for="(item,index) in goodsMenu" class="one-bottom-px"
				:class="{active:index==selectNavIndex}"
				@click="navAction(index)">{{item.name}}</li>
		</ul>
	</nav>
	<!--右侧商品信息-->
	<div class="menu">
		<div class="menu-wrapper">
			<div class="wrapper" v-for="goods in goodsMenu">
				<div class="title">
					{{goods.name}}
					<span>{{goods.description}}</span>
				</div>
				<ul>
					<li v-for="item in goods.foods" class="food one-bottom-px">
						<img :src="handleImg(item.image_path)"/>
						<div>
							<h5>{{item.name}}</h5>{{item.description}}
							<div>
								<span>月售{{item.month_sales}}</span>&nbsp;&nbsp;
								<span>好评率{{item.satisfy_rate}}%</span><br />
								<span style="color: #FF4400;">￥</span><i class="price">{{item.specfoods[0].price}}</i>
								<i class="original-price" v-if="item.specfoods[0].original_price">￥{{item.specfoods[0].original_price}}</i>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import { handleImg } from '../../common/common.js'
import { getSellerGoods } from '../../services/homeService.js'
let menuScroll
export default{
	props:['sellerID'],
	data(){
		return{
			goodsMenu:[],
			selectNavIndex:0,
			menusHeightArr:[]
		}
	},
	created(){
		getSellerGoods(this.sellerID)
		.then((result)=>{
			this.goodsMenu = result;
		})
	},
	methods:{
		handleImg,
		navAction(index){
			//li选中
			this.selectNavIndex = index;
			//右边商品调到对应位置
			let height = 0;
			for(let i=0; i<index; i++){
				height -= this.menusHeightArr[i];
			}
			menuScroll.refresh();
			if(height>menuScroll.maxScrollY){
				menuScroll.scrollTo(0,height)
			}else{
				menuScroll.scrollTo(0,menuScroll.maxScrollY)
			}
		}
	},
	mounted(){
		//左边导航滑动
		let navScroll = new IScroll("#sellerDetailGoods .nav-bar",{
			click:true,
			tap:true,
			bounce:false
		});
		navScroll.on('scrollStart',()=>{
			navScroll.refresh();
		})
		
		//右边商品内容滑动
		menuScroll = new IScroll("#sellerDetailGoods .menu",{
			click:true,
			tap:true,
			bounce:false,
			probeType:3
		});
		menuScroll.on('scrollStart',()=>{
			menuScroll.refresh();
		})
		
		//商品信息滚动过程中
		menuScroll.on("scroll",()=>{
			//判断商品信息滚动位置对应导航栏的li
			let currentY = menuScroll.y;
			//console.log(currentY)
			for(let i=0; i<this.menusHeightArr.length; i++){
				let min = 0;
				for(let j=0; j<i; j++){
					min -= this.menusHeightArr[j];
				}
				
				//min下一个高度数据
				let nextHeight = min - this.menusHeightArr[i];
				//console.log(nextHeight)
				//判断
				if(currentY <= min && currentY >=nextHeight){
					this.selectNavIndex = i;
					break;
				}
			}
			//判断菜单按钮是否可见
			//菜单按钮滚动视图当前的位置
			
			//获取左边导航栏li的位置
			let btns = Array.from(document.querySelectorAll(".nav-bar li"));
			let height = 0;
			for(let i=0; i<this.selectNavIndex; i++){
				height -=btns[i].offsetHeight;
			}
			//console.log(height);
			//判断按钮是否可见
			//导航按钮在滚动视图上面
			//console.log(navScroll)
			if(height > navScroll.y){
				navScroll.scrollTo(0,height);
			}else if(height < navScroll.y - navScroll.wrapper.offsetHeight){
				//导航按钮在滚动试图下面
				//还需判断判断容器的最大滚动范围能不到这个按钮在顶部，如果不能，就到滚动的最大值
				if(height>navScroll.maxScrollY){
					navScroll.scrollTo(0,height)
				}else{
					navScroll.scrollTo(0,navScroll.maxScrollY)
				}
			}
			
		})
		
	},
	updated(){
		//获取每一项导航li对应信息的高度
		let wrapperArr = Array.from(document.querySelectorAll("#sellerDetailGoods .menu-wrapper .wrapper"));
		this.menusHeightArr = wrapperArr.map((wrapperDiv)=>{
			return wrapperDiv.offsetHeight;
		})
	}
}
</script>

<style>
#sellerDetailGoods{
	display: flex;
}
#sellerDetailGoods .nav-bar{
	width: 70px;
	height: 100%;
	overflow: hidden;
}
#sellerDetailGoods .nav-bar li.one-bottom-px:after{
	bottom: 0px;
}
#sellerDetailGoods .nav-bar li{
	box-sizing: border-box;
	padding: 20px 4px;
	background: #ededed;
	font-size: 12px;
	color: #666;
	line-height: 16px;
	border-left: 2px solid #ededed;
}
#sellerDetailGoods .nav-bar li.active{
	background: #fff;
	border-left: 2px solid #0085FF;
}
#sellerDetailGoods .menu{
	flex: 1;
	height: 100%;
	overflow: hidden;
	background: #fff;
}
#sellerDetailGoods .menu .title{
	height: 20px;
	font-size: 12px;
	font-weight: bold;
	color: #666;
	background: #fff;
	line-height: 20px;
}
#sellerDetailGoods .menu .title span{
	font-size: 0.8em;
	color: #999;
}
#sellerDetailGoods .menu .food{
	padding: 8px;
	display: flex;
}
#sellerDetailGoods .menu .food>img{
	width: 60px;
	height: 60px;
}
#sellerDetailGoods .menu .food>div{
	flex: 1;
	box-sizing: border-box;
	padding-left: 6px;
	font-size:0.8em;
	color: #999;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
#sellerDetailGoods .menu .food>div h5{
	white-space: normal;
	hyphens: auto;
	word-wrap: break-word; 
	font-size:16px;
	color: #333;
	font-weight: 900;
}
#sellerDetailGoods .menu .food>div span{
	color: #666;
}
#sellerDetailGoods .menu .food>div .original-price{
	font-size: 1em;
	text-decoration: line-through;
}
#sellerDetailGoods .menu .food>div .price{
	font-size: 16px;
	font-weight: 900;
	color: #FF4400;
}
</style>