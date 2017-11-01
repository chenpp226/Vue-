import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
	latitude: 22.54286,
	longitude: 114.059563
}
const mutations = {
	modifyAddress(st,param){
		st.latitude = param.latitude;
		st.longitude = param.longitude;
	}
}

export default new Vuex.Store({
	state,
	mutations
})
