import { createStore } from 'vuex'
import {get_refresh_token} from "@/util/auth";
import StoreConst from "@/util/const";

export default createStore({
  state: {
    // userInfo
    current_username: localStorage.getItem(StoreConst.localStoreUsernameKey),
    is_sign_in: get_refresh_token() !== undefined,
    current_u_avatar: localStorage.getItem(StoreConst.localStoreUseravatarKey)
  },
  mutations: {
    setCurrentUsername: (state, uname) => {
      localStorage.setItem(StoreConst.localStoreUsernameKey, uname)
    },
    setCUAvatar: (state, value) => {
      localStorage.setItem(StoreConst.localStoreUseravatarKey, value)
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
