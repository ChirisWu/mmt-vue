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
export async function get_access_token() {
    let access = Cookies.get(access_token)
    if (access !== undefined && access !== null) {
        return access;
    }
    let refresh = get_refresh_token()
    if (refresh === undefined || refresh === null) {
        return null
    }
    access = await accountService.refresh_token(refresh)
    set_access_token(access.access_token, access.expiresIn)
    return access.access_token

}

export function set_refresh_token(refreshToken){
    Cookies.set(refresh_token, refreshToken, {expires: refresh_token_expires})
}

export function get_refresh_token(){
    return Cookies.get(refresh_token)
}

export function remove_token(){
    sessionStorage.removeItem(access_token)
    Cookies.remove(refresh_token)
}
