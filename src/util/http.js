import axios from 'axios'
import {auth_logout, get_access_token} from "@/util/auth";
import {ElMessageBox} from "element-plus";

const http =axios.create({
    baseURL: '/api',
    timeout: 200000
})
http.BASE_URL = '/api'
http.defaults.withCredentials = false
http.interceptors.request.use(config => {
    let token = get_access_token()
    if (token !== undefined){
        config.headers.Authorization = token
    }
    return config
},err => {
    console.log(err)
    Promise.reject(err)
})


export default http