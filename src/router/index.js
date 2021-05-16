import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import {ElMessageBox} from "element-plus";
import {get_refresh_token} from "../util/auth";

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
        path: '/u/:uname',
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
      },
      {
        path:'/create/:type',
        name: 'Create',
        component: () => import('@/components/userPage/MediaCreation'),

      },
      {
        path: '/create_whisper',
        name: 'CreateMoment',
        component: () => import('@/components/userPage/MomentCreation')
      },
      {
        path: '/va/:type/:username/:ud',
        name: 'Va',
        component: () => import('@/views/UserMediaList')
      },
      {
        path: '/play/:type/:id',
        name: 'Play',
        component: () => import('@/views/VideoRadioPlayPage')
      },
      {
        path: '/settings',
        name: 'Setting',
        component: () => import('@c/userPage/UserSettings')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
    children: [
      {
        path: '',
        name: 'LoginForm',
        component: () => import('@/components/login/LoginForm')
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('@/components/login/RegisterForm')
      }
    ]
  },
  {
    path: '/drag_upload',
    name: "DragUpload",
    component: () => import('@/components/upload/DragUpload')
  },


  {
    path: '/404',
    name: '404',
    component: () => import('@v/error/404')
  },
  {
    path: '/audio',
    component: () => import('@c/media/MmtAudioPlayer')
  },









  // {
  //   path: '/:catchAll(.*)',
  //   redirect: '/404'
  // }



]

const whiteRouteList = [
  '/login',
  '/square',
  '/'
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  // let toPath = to.path
  // if (contains(whiteRouteList, toPath) || isAuthenticated()){
  //   next()
  // } else {
  //   next('/login')
  // }
  next()
})

function isAuthenticated() {
  let token = get_refresh_token()
  return token !== undefined && token !== null && token !== ''
}
function contains(array, element) {
  return array.indexOf(element) < 0;
}

export default router
