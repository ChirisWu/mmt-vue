import http from "@/util/http";
import store from '@/store'

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
// 文件名中包含特殊符时 oss 将获取不到资源，所以做统一处理
ossService.handleFilename = (uid) => {
    return uid + store.getters.cu_username
}

export default ossService

