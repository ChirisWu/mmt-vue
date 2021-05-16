import qs from 'qs'

import http from "@/util/http";
const USER_BASE_API = '/pc/userPage/'
const BASE_URL = '/pc/users'
const userService = {}

userService.get_user_page = (uname) => {
    return http({
        url: USER_BASE_API + '?username=' + uname,
        method: 'get',
    })
}

userService.getSettingPageVO = () => {
    return http({
        url: USER_BASE_API + 'settings',
        method: 'get'
    })
}
userService.updateUsername = (name) => {
    return http({
        url: BASE_URL + '/updateUsername',
        method: 'post',
        data: qs.stringify({
            username: name
        })
    })
}

userService.uploadAvatar = (url) => {
    return http({
        url: BASE_URL + '/upload_avatar',
        method: 'post',
        data: qs.stringify({
            avatar: url
        })
    })
}

userService.updateUserInfos = (param) => {
    return http({
        url: BASE_URL + '/update_infos',
        method: 'post',
        data: param
    })
}


export default userService