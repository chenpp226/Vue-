import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import Home from '../pages/home/Home.vue'
import Address from '../pages/home/Address.vue'
import Search from '../pages/home/Search.vue'
import SearchList from '../pages/home/SearchList.vue'
import SellerDetail from '../pages/home/SellerDetail.vue'

import Discovery from '../pages/discovery/Discovery.vue'
import Order from '../pages/order/Order.vue'
import Mine from '../pages/mine/Mine.vue'

export default new Router({
  routes: [
    {
    	path:'/home',
    	component: Home,
    	children: [
    		{
    			path:'address',
    			component: Address
    		},
    		{
    			path:'search',
    			component: Search
    		},
    		{
    			path:'searchlist/:word',
    			component: SearchList
    		},
    		{
    			path:'detail/:id/:src',
    			component: SellerDetail
    		}
    	]
    },
    {
    	path:'/discovery',
    	component: Discovery
    },
    {
    	path:'/order',
    	component: Order
    },
    {
    	path:'/mine',
    	component: Mine
    },
    {//重定向
    	path:'/',
    	redirect:'/home'
    },
    {//匹配其他没有配置的路径
    	path:'*',
    	redirect:'/home'
    }
  ]
})
