import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import OneTab from '../views/OneTab.vue'
import AllTab from '../views/AllTab.vue'
import SearchTab from '../views/SearchTab.vue'
import CreateTab from '../views/CreateTab.vue'
import UpdateTab from '../views/UpdateTab.vue'
import DeleteTab from '../views/DeleteTab.vue'
import DemoAlpha from '../views/DemoAlpha.vue'
import DemoBeta from '../views/DemoBeta.vue'
import DemoTheta from '../views/DemoTheta.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: OneTab
  },
  /*
  {
    // default route '/' please show OneTab component
    path: '/employee',
    component: OneTab,
    children: [
      {
        // path '/employee' without id please show OneTab component
        path: '',
        name: 'one',
        component: OneTab  
      },
      {
        path: ':emp_id',
        name: 'oneID',
        component: OneTab
      }
    ]
  },
  */
  {
    path: '/employee/create',
    name: 'create',
    component: CreateTab
  },
  {
    path: '/employee/update/:id',
    name: 'updateID',
    component: UpdateTab
  },
  {
    path: '/employee/update',
    name: 'update',
    component: UpdateTab
  },
  {
    path: '/employee/delete/:id',
    name: 'deleteID',
    component: DeleteTab
  },
  {
    path: '/employee/delete',
    name: 'delete',
    component: DeleteTab
  },
  {
    path: '/employee/:id',
    name: 'oneID',
    component: OneTab
  },
  {
    path: '/employee',
    name: 'one',
    component: OneTab
  },
   // i wanna write these below as nested routes syntax but it is not working so ...
  {
    path: '/employees/search',
    name: 'search',
    component: SearchTab
  },
  {
    path: '/employees',
    name: 'all',
    component: AllTab
  },
  {
    path: '/alpha',
    name: 'alpha',
    component: DemoAlpha
  },
  {
    path: '/beta',
    name: 'beta',
    component: DemoBeta
  },
  {
    path: '/theta',
    name: 'theta',
    component: DemoTheta
  },
  {
    // catch all 404 - define at the very end
    path: "*",
    name: 'not_found',
    component: NotFound
    }

  //{
  //  path: '/about',
  //  name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //  component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
