
import http from '@/util/http'


const momentService = {}
const BASE_URL = '/pc/moment/media'

momentService.VIDEO_TYPE = 1
momentService.AUDIO_TYPE = 2
momentService.WHISPER_TYPE = 0

momentService.createMediaMoment = (paramObj) => {
    return http({
        url: BASE_URL,
        method: 'post',
        data: paramObj
    })
}
momentService.getUserMedia = (type, userId) => {
    return http({
        url: BASE_URL + '/mediaOfUser?userId=' + userId + '&type=' + type,
        method: 'get'
    })
}

momentService.getMomentDetailsById = id => {
    return http({
        url: BASE_URL + '/mediaDetails?mId=' + id,
        method: 'get'
    })
}


export default momentService
