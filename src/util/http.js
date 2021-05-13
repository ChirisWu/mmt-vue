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

    switch (code){
        case 200:
            break;
        case 401:
            e401()
             break;
        case 404:
            e404()
            break;
        default:
            ElMessage.info(response.data.status.msg)
            break;
    }
    return response
}, function (error) {
    ElMessage.error(error.message)
    return Promise.reject(error);
});
function e401() {
    console.log(401)
    ElMessageBox.alert('unAuthenticated', 'please sign in', {
        confirmButtonText: 'sign in',
        showClose: false
    }).then(r => {
        router.push('/login')
    })

}
function e404(){

}
export default http


