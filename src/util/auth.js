import Cookies from 'js-cookie'
import accountService from "@/api/login";
const access_token = 'access'
const refresh_token = 'refresh'
const refresh_token_expires = 7


export function set_access_token(accessToken, expiresIn){
    let inFifteenMinutes = new Date(new Date().getTime() + expiresIn * 1000);
    Cookies.set(access_token, accessToken, {expires: inFifteenMinutes})
}

/**
 *
 * @returns {Promise<null|*>}
 * 调用方式：
 *  async refreshToken() {
      console.log('loginForm mouted')
      let access = await get_access_token()
      console.log(access)

    }
 */
export function get_access_token() {
    let access = Cookies.get(access_token)
    if (access !== undefined && access !== null) {
        return access;
    }
    let refresh = get_refresh_token()
    if (refresh === undefined || refresh === null) {
        return undefined
    }
    let tokenObj = accountService.refresh_token(refresh)
    let token  = tokenObj.tokenHead + ' ' + tokenObj.token
    set_access_token(token, tokenObj.expiresIn)
    return token

}

export function set_refresh_token(refreshToken){
    Cookies.set(refresh_token, refreshToken, {expires: refresh_token_expires})
}

export function get_refresh_token(){
    return Cookies.get(refresh_token)
}

export function remove_token(){
    Cookies.remove(access_token)
    Cookies.remove(refresh_token)
}
export const LAST_LOGIN_UNAME = 'last_login_u'
export const LAST_LOGIN_AVATAR = 'last_avtar'
export function auth_logout() {
    let last_login_uname = localStorage.getItem('username')
    let last_login_avatar = localStorage.getItem('cu_avatar')

    localStorage.setItem(LAST_LOGIN_UNAME, last_login_uname)
    localStorage.setItem(LAST_LOGIN_AVATAR, last_login_avatar)
    localStorage.removeItem('username')
    localStorage.removeItem('cu_avatar')
    localStorage.removeItem("uid")
    remove_token()
}


