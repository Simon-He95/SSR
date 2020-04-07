import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export function createStore() {
  let store = new Vuex.Store({
    state:{
      homeInfo:""
    },
    mutations:{
      setHomeInfo(state,res){
        state.homeInfo = res;
      }
    },
    actions:{
      getHomeInfo({commit}){
        return axios.get('http://localhost:8881/api/getHomeInfo').then((res)=>{
          commit('setHomeInfo',res.data);
        })
      }
    },
  })
  return store
}
