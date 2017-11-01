import axios from 'axios'
import URL from '../common/urlApi.js'


//请求地址
export function getAddress(lat,lon){
	return new Promise((resolve,reject)=>{		
		axios.get(`${URL.addressApi}?latitude=${lat}&longitude=${lon}`)
		.then((response)=>{
			const address = response.data.address;
			resolve(address);
		})
	})
}


//请求天气
export function getWeather(lat,lon){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL.weatherApi}?latitude=${lat}&longitude=${lon}`)
		.then((response)=>{
			const weatherInfo = response.data;
			resolve(weatherInfo);
		})
	})
}

//请求热搜词汇
export function getHotWords(lat,lon){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL.hotwordsApi}?latitude=${lat}&longitude=${lon}`)
		.then((response)=>{
			var list = response.data.map((item)=>{
				return item.word;
			})
			resolve(list);
		});
	})
}

//请求轮播区商家信息
export function getBannerList(lat,lon){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL.entriesApi}?latitude=${lat}&longitude=${lon}&templates[]=main_template`)
		.then((response)=>{
			//console.log(response.data[0].entries);
			let arr = response.data[0].entries.map((item)=>{
				let newItem = {};
				newItem.name = item.name;
				newItem.image_hash = item.image_hash;
				newItem.link = item.link;
				newItem.description = item.description;
				return newItem;
			})
			resolve(arr);
		})
	})
}



//请求主页商家列表信息
export function getHomeList(lat,lon,offset,limit){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL.listApi}?latitude=${lat}&longitude=${lon}&offset=${offset}&limit=${limit}&extras[]=activities&terminal=h5`)
		.then((response)=>{
			//console.log(response.data);
			let arr = response.data.map((item)=>{
				let newItem = {};
				newItem.id = item.id;
				newItem.image_path = item.image_path;
				newItem.name = item.name;
				newItem.rating = item.rating;
				newItem.recent_order_num = item.recent_order_num;
				newItem.qsPrice = item.piecewise_agent_fee.rules[0].price;
				newItem.description = item.piecewise_agent_fee.description;
				newItem.distance = item.distance;
				newItem.order_lead_time = item.order_lead_time;
				newItem.activities = item.activities;
				newItem.showActivity = false;
				
				return newItem;
			})
			resolve(arr);
		})
	})
}


//请求地址列表
export function getAddressList(keyword,lat,lon){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL.addressListApi}?keyword=${keyword}&offset=0&limit=20&longitude=${lon}&latitude=${lat}`)
		.then((response)=>{
			//console.log(response.data);
			let arr = response.data.map((item)=>{
				let newItem = {};
				newItem.latitude = item.latitude;
				newItem.longitude = item.longitude;
				newItem.name = item.name;
				newItem.address = item.address;
				return newItem;
			})
			resolve(arr);
		})
	})
	
}

//请求商家详情页面头部信息
export function getSellerGoodsHeader(id,lat,lon){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL.sellerGoogsHeaderApi}/${id}?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal=h5&latitude=${lat}&longitude=${lon}`)
		.then((response)=>{
			//console.log(response.data);
			const detailHeaderInfo = response.data;
			resolve(detailHeaderInfo);
		})
	})
	
}


//请求商家详情页面内容板块各类信息
export function getSellerGoods(id){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL.sellerGoodsApi}?restaurant_id=${id}`)
		.then((response)=>{
			//console.log(response.data)
			let arr = response.data.map((item)=>{
				let newItem = {};
				newItem.foods = item.foods;
				newItem.name = item.name;
				newItem.month_sales = item.month_sales;
				newItem.satisfy_rate = item.satisfy_rate;
				newItem.description = item.description;
				return newItem;
			})
			resolve(arr);
		})
	})
}

//请求商家详情页面评价板块内容
///1983838/ratings?has_content=true&offset=0&limit=10
export function getSellerRating(id,offset,limit){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL.sellerRatingApi}/${id}/ratings?has_content=true&offset=${offset}&limit=${limit}`)
		.then((response)=>{
			//console.log(response.data);
			let arr = response.data.map((item)=>{
				let newItem = item;
				return newItem;
			})
			resolve(arr);
		})
	})
}


//请求搜索商家板块内容
export function getSearchSeller(word,lat,lon){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL.searchWordApi}?offset=0&limit=20&keyword=${word}&latitude=${lat}&longitude=${lon}&search_item_type=2&extra[]=activities`)
		.then((response)=>{
			console.log(response)
			let data0 = response.data['0'] || {};
			let arr0 = data0.restaurant_with_foods || [];
			let data1 = response.data['1'] || {};
			let arr1 = data1.restaurant_with_foods || [];
			
			let data = [...arr0, ...arr1];
			
			let arr = data.map((item)=>{
				let newItem = {};
				newItem.id = item.restaurant.id;
				newItem.image_path = item.restaurant.image_path;
				newItem.name = item.restaurant.name;
				newItem.rating = item.restaurant.rating;
				newItem.orderNum = item.restaurant.recent_order_num;
				newItem.showActivity = false;
				newItem.distance = item.restaurant.distance;
				newItem.order_lead_time = item.restaurant.order_lead_time;
				newItem.recent_order_num = item.restaurant.recent_order_num;
				newItem.qsPrice = item.restaurant.piecewise_agent_fee.rules[0].price;
				newItem.description = item.restaurant.piecewise_agent_fee.description;
				
				return newItem;
			})
			resolve(arr);
		})
	})
}
