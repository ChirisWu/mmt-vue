import http from "@/util/http";


/**
 * 服务器签名
 */
const ossService = {}
ossService.OssUploadUrl = 'http://mmt-resource.oss-cn-hangzhou.aliyuncs.com'

ossService.signature = function () {
    return http({
        url: '/pc/oss/signature',
        method:'get'
    })
}
ossService.deleteOss = (filename) => {
    return http({
        url: `/pc/oss/delete?filename=${filename}`,
        method: 'get'
    })
}

export default ossService

