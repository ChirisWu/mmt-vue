import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mhome',
    name: 'Mhome',
    component: () => import('@/views/ConcretHomeWrapper'),
    children: [
      {
        path: '/user',
        name: 'User',
        component: ()=> import('@/views/UserPageHome')
      },
      {
        path: '/square',
        name: 'Square',
        component: ()=> import('@/views/SquareHome')
      },
      {
        path: '/moment',
        name: 'Moment',
        component: ()=> import('@/views/MomentHome')
      },
      {
        path: '/creation',
        name: 'Creation',
        component: () => import('@/components/userPage/Creation')
      }
    ]
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('@/components/upload/singleUpload')
  }


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
