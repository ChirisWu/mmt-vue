import Vue from 'vue'
import Vuex from 'vuex'
import {getToken, setToken} from "../utils/auth";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem("userInfo")),
    token: getToken(),
    isLogin: getToken() !== null,
    musicStyles: JSON.parse(localStorage.getItem('music_styles')),
    userLoginInfo: JSON.parse(localStorage.getItem("user_login_info")),
    socketMessage: localStorage.getItem('message') ? JSON.parse(localStorage.getItem('message')) : [],
    messages: JSON.parse(sessionStorage.getItem('messages'))
  },
  mutations: {
    setUserInfo: (state, uInfo) =>{
      state.userInfo = uInfo
      localStorage.setItem("userInfo", JSON.stringify(uInfo))
    },
    setToken: (state, value) =>{
      setToken(value)
    },
    setMusicStyles: (state, value) =>{
      state.musicStyles = value
      localStorage.setItem("music_styles", JSON.stringify(value))
    },
    setUserLoginInfo: (state, value) => {
      state.userLoginInfo = value
      localStorage.setItem("user_login_info", JSON.stringify(value))
    },
    setMessage: (state, value) => {
      if(state.socketMessage){
          value = value.concat(state.socketMessage)
      }
      localStorage.setItem('message', JSON.stringify(value))
    },
    setIsLogin :(state, value) =>{
      state.isLogin = value
    },
    setMessages: (state, value) => {
      state.messages = value;
      sessionStorage.setItem(JSON.stringify(value))
    }

  },
  getters: {
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo,
    musicStyles: state => state.musicStyles,
    socketMessage: state => state.socketMessage,
    token: state => state.token,
    messages: state => state.messages
  },
  actions: {
  },
  modules: {
  }
})
