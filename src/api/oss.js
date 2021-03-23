import http from "@/util/http";
const signature_api = '/oss/signature'

/**
 * 服务器签名
 */
export function signature() {
    return http({
        url: 'oss/signature',
        method:'get'
    })
}