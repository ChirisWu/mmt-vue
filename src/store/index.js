import { createStore } from 'vuex'
import {get_refresh_token} from "@/util/auth";

export default createStore({
  state: {
    // userInfo
    current_username: localStorage.getItem("username"),
    is_sign_in: get_refresh_token() !== undefined,
    current_u_avatar: localStorage.getItem("cu_avatar")
  },
  mutations: {
    setCurrentUsername: (state, uname) => {
      localStorage.setItem("username", uname)
    },
    setCUAvatar: (state, value) => {
      localStorage.setItem("cu_avatar", value)
    }
  },
  getters: {
    cu_avatar: state => {
      return state.current_u_avatar
    },
    is_sign: state => {
      return state.is_sign_in
    },
    cu_username: state => {
      return state.current_username
    }

  },
  actions: {
  },
  modules: {
  }
})
