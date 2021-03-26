import axios from 'axios'
import {get_access_token} from "@/util/auth";

const http =axios.create({
    baseURL: '/api',
    timeout: 200000
})
http.BASE_URL = '/api'
http.defaults.withCredentials = false
http.interceptors.request.use(config => {
    config.headers.Authorization = get_access_token()
    return config
},err => {
    console.log(err)
    Promise.reject(err)
})


export default http