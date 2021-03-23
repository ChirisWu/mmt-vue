import Axios from "axios";
import querystring from 'querystring'
const baseURL = '/api'
import {getToken, removeToken} from "../utils/auth";
import store from '../store/index'
import {Message, MessageBox} from 'element-ui'
import router from '../router/index'
const http =  Axios.create({
    timeout: 9000,
    timeoutErrorMessage: '网络连接不太好'
})
// json参数请求
http.commonJsonPost = (uri, param) =>{
    return http({
        method: 'post',
        data: param,
        url: `${baseURL}${uri}`,
    })
}
http.commonUrlEncodingPost = (uri, param) =>{
    return http({
        method: 'post',
        url: `${baseURL}${uri}`,
        data: querystring.stringify(param),
    })
}
http.commonGet = (uri, param) =>{
    return http({
        method: 'get',
        url: `${baseURL}${uri}`,
        data: param
    })
}
http.get = (uri) =>{
    return http({
        method: 'get',
        url: `${baseURL}${uri}`
    })
}
http.uploadImages = ( param) =>{
    return Axios({
        method: 'post',
        url: 'http://fv-music.oss-cn-shanghai.aliyuncs.com',
        data:param,
        headers: {
            'Content-Type':'multipart/form-data'
        }

    })
}
http.interceptors.request.use(config => {
    if (store.getters.token !== undefined) {
        config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})
http.interceptors.response.use(
    response => {
        /**
         * code为非200是抛错 可结合自己业务进行修改
         */
        const res = response.data
            // 401:未登录;
            if (res.code === 502) {
                MessageBox.confirm('您的登录已经过期，请重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    router.push('/login')
                    localStorage.removeItem('user_login_info')
                    localStorage.removeItem("userInfo")
                    removeToken()
                })
                return response

            }else {
                return response
            }
    }, error => {
        return Promise.reject(error)
    })
export default http