import axios from 'axios'
import {auth_logout, get_access_token} from "@/util/auth";
import {ElMessageBox, ElMessage} from "element-plus";
import router from "@/router";

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

http.interceptors.response.use(function (response) {
    if (response.data === ""){
        return response
    }
    let code = response.data.status.statusCode
    if (code === 200){
        return response
    }
    switch (code){
        case 401:
            e401()
             break;
        case 404:
            e404()
            break;
        case 440:
            e440()
            break;
        default:
            ElMessage.info(response.data.status.msg)
            break;
    }
    return Promise.reject('error')
}, function (error) {
    ElMessage.error(error.message)
    return Promise.reject(error);
});
function e401() {
    console.log(401)
    ElMessageBox.alert('please sign in', 'UnAuthenticated', {
        confirmButtonText: 'sign in',
        showClose: false
    }).then(r => {
        router.push('/login')
    })

}
function e404(){
    router.push('/404')
}
function e440() {
    ElMessage.error('Request param invalid')
}
export default http


