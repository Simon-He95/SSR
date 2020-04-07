//编写客户端入口
import {createApp} from "./main";

const {app} =createApp();
const router = app.$router;

//同步服务端信息
if (window.__INITIAL_STATE__){
  app.$store.replaceState(window.__INITIAL_STATE__); //状态中对象，替换全部组件
}

window.onload = function () {
  app.$mount('#app');
}
