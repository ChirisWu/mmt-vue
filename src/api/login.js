import http from "@/util/http";

import qs from 'qs'
import {set_access_token} from "@/util/auth";
const LOGIN_API = '/auth/oauth/token'
const CLIENT_ID = 'mmt-web'
const CLIENT_SECRET = 'mmt-chiris'
const GRANT_TYPE = 'password'

const accountService = {}

accountService.access_token = (username, password) => {
    let requestParam = qs.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: GRANT_TYPE,
        username: username,
        password: password
    })
    return http({
        url: LOGIN_API,
        data: requestParam,
        method: 'post'
    })
}


accountService.refresh_token =  (refreshToken) =>{
    let requestParam = qs.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: refreshToken
    })
    return new Promise(resolve => {
       return http({
           url: LOGIN_API,
           data: requestParam,
           method: 'post'
       }).then(res => {
           if (res.data.status.statusCode === 200){
               resolve({
                   access_token: res.data.data.token,
                   expiresIn: res.data.data.expiresIn
               })
           }else{
               resolve(undefined)
           }
       }).catch(e => {
           console.log(e)
       })
    })
}

export default accountService