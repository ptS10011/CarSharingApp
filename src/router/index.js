import Vue from 'vue'
import Router from 'vue-router'
import MapPage from '@/components/MapPage'
import CustomPage from '@/components/CustomPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MapPage',
      component: MapPage
    },
    {
      path: '/custom-page',
      name: 'CustomPage',
      component: CustomPage
    }
  ]
})
