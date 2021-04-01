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
      },
      {
        path:'/create_video',
        name: 'CreateVideo',
        component: () => import('@/components/userPage/VideoCreation')
      },
      {
        path: '/create_radio',
        name: 'CreateRadio',
        component: () => import('@/components/userPage/RadioCreation')
      },
      {
        path: '/create_moment',
        name: 'CreateMoment',
        component: () => import('@/components/userPage/MomentCreation')
      },
      {
        path: '/va',
        name: 'Va',
        component: () => import('@/views/UserMediaList')
      },
      {
        path: '/play',
        name: 'Play',
        component: () => import('@/views/VideoRadioPlayPage')
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
    path: '/upload',
    name: 'Upload',
    component: () => import('@/components/upload/singleUpload')
  },
  {
    path: '/drag_upload',
    name: "DragUpload",
    component: () => import('@/components/upload/DragUpload')
  },

  {
    path: '/player',
    name: 'Player',
    component: () => import('@c/media/MmtVideoPlayer')
  }



]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
