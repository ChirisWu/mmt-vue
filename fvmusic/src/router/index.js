import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home";
import Login from "../views/Login";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home',
    redirect: {path: 'pool', query: {musicStyleId: 0}},
    children: [
      {
        path: '/pool',
        component: () => import('../components/pool/MusicPool'),
        name: 'musicPool'
      },
      {
        path: '/poolDetails',
        name: 'poolDetails',
        component: () => import('../components/pool/PoolDetails')
      }

    ]

  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    redirect: '/usernameLogin',
    children: [
      {
        path: '/usernameLogin',
        component: () => import('../components/login/UsernameLogin'),
        name: 'usernameLogin'
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../components/login/Register')
      },
      {
        path: '/emailLogin',
        name: 'emailLogin',
        component: () => import('../components/login/EmailLogin')
      }

    ]
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('../views/PersonalPage'),
    redirect: '/personal/infoDetails',
    children: [
      {
        path: 'infoDetails',
        component: () => import('../components/userInfo/UserInfoDetails'),
        name: 'infoDetails'
      },
      {
        path: 'edit',
        name: 'edit',
        component: () => import('../components/userInfo/EditUserInfo')
      },
      {
        path: 'publish',
        name: 'publish',
        component: () => import('../components/userInfo/PublishShare')
      },
      {
        path: 'createPool',
        name: 'createPool',
        component: () => import('../components/userInfo/CreatePool')
      },
      {
        path: 'message' ,
        name: 'message',
        redirect: '/great',
        component: () => import ('../components/userInfo/Message'),
        children: [
          {
            path: '/comment',
            name: '评论',
            component: () => import('../components/userInfo/MessageList')
          },
          {
            path: '/great',
            name: '点赞',
            component: () => import('../components/userInfo/MessageList')
          }
        ]
      },
      {
        path: 'friends',
        name: 'friends',
        component: () => import('../components/userInfo/Friends')
      },
      {
        name: 'fans',
        path: 'fans',
        component: () => import('../components/userInfo/UserFansOrConcern')
      },
      {
        name: 'concerns',
        path: 'concern',
        component: () => import('../components/userInfo/UserFansOrConcern')
      }

    ]
  },
]

const router = new VueRouter({
  routes,
})
import Store from "../store/index";
import Message from "element-ui/packages/message/src/main";
import MessageBox from "element-ui/packages/message-box/src/main";
router.beforeEach((to, from, next) => {
  if (to.path.toString().startsWith('/personal')){
       if(Store.getters.isLogin){
         next()
       }else{
         MessageBox.confirm('您需要先登录，才能访问该页面?', '登录提醒', {
           confirmButtonText: '立即登录',
           cancelButtonText: '稍后登录',
           type: 'info'
         }).then(() => {
           this.$router.push('/login')
         })
       }
  }else{
    next()
  }
})
export default router
