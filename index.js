import App from './pages/index.vue'
import common from './pages/common.vue'
import home from './pages/home.vue'
import home1 from './pages/home1.vue'

var routes = [
  { path: '/', component: home1 },
  { path: '/comp', component: common }
]

// console.log('VueRouter', VueRouter)

var router = new VueRouter({
  // history: VueRouter.createWebHashHistory(),
  routes, 
})
var app = new Vue({
  // components: {
  //   App,
  // },
  el: '#app',
  router,
  render: h => h(App),
})
