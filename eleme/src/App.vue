<template>
  <div id="app">
    <keep-alive>
    	<router-view></router-view>
    </keep-alive>
    
    <nav class="tabs">
    	<router-link to="/home">
    		<li class="tab">
    			<span class="iconfont">&#xe639;</span>
    			<i>外卖</i>
    		</li>
    	</router-link>
    	<router-link to="/discovery">
    		<li class="tab">
    			<span class="iconfont">&#xe660;</span>
    			<i>发现</i>
    		</li>
    	</router-link>
    	<router-link to="/order">
    		<li class="tab">
    			<span class="iconfont">&#xe603;</span>
    			<i>订单</i>
    		</li>
    	</router-link>
    	<router-link to="/mine">
    		<li class="tab">
    			<span class="iconfont">&#xe640;</span>
    			<i>我的</i>
    		</li>
    	</router-link>
    </nav>
  </div>
</template>

<script>

</script>

<style>
#app{
	width: 100%;
	height: 100%;
	background: #fff;
}
.tabs{
	width: 100%;
	height: 49px;
	position: absolute;
	bottom: 0;
	left: 0;
	background: #fff;
	z-index: 11;
	display: flex;
	justify-content: space-around;
}
.tabs:before{
	content: "";
	display: block;
	width: 100%;
	height: 1px;
	border-top: 1px solid #666;
	position: absolute;
	top: -1px;
	left: 0;
	transform: scaleY(0.5);
}
.tabs a{
	width: 25%;
}
.tabs .tab{
	text-align: center;
	display: flex;
	height: 48px;
	border-top: 1px solid transparent;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.tab span{
	font-size: 24px;
}
.tab i{
	font-size: 12px;
}
.router-link-active{
	color:#fff;
	background: #0089dc;
}

.page{
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 49px;
	z-index: 12;
	overflow: hidden;
}

</style>
