import qs from 'qs'

import http from "@/util/http";
const USER_BASE_API = '/pc/userPage/'
const userService = {}

userService.get_user_page = (uname) => {
    return http({
        url: USER_BASE_API + '?username=' + uname,
        method: 'get',
    })
}



export default userService