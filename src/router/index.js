import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/Home";
import About from "../components/About";
import Test from "../components/Test";

Vue.use(Router)

// export default new Router({
//   mode:'history',
//   routes: [
//     {
//       path: '/',
//       name: 'Home',
//       component: Home
//     },
//     {
//       path: '/about',
//       name: 'About',
//       component: About
//     },
//     {
//       path: '/test',
//       name: 'Test',
//       component: Test
//     },
//   ]
// })

//每次创建一个新的路由
export function createRouter() {
  return new Router({
    mode:'history',
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        component: About
      },
      {
        path: '/test',
        name: 'Test',
        component: Test
      },
    ]
  })
}
