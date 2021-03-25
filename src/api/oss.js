import http from "@/util/http";



export const signature_api = '/pc/oss/signature'
export const ossUploadUrl = 'https://mmt-resource.oss-cn-hangzhou.aliyuncs.com'

/**
 * 服务器签名
 */
const ossService = {}
function signature() {
    return http({
        url: 'oss/signature',
        method:'get'
    })
}
ossService.OssUploadUrl = 'http://mmt-resource.oss-cn-hangzhou.aliyuncs.com'

ossService.signature = function () {
    return http({
        url: '/pc/oss/signature',
        method:'get'
    })
}

export default ossService

