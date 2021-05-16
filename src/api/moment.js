
import http from '@/util/http'


const momentService = {}
const BASE_URL = '/pc/moment/media'

momentService.VIDEO_TYPE = 1
momentService.AUDIO_TYPE = 2
momentService.WHISPER_TYPE = 0

momentService.ORDER_BY_VIEWS = 'views'
momentService.ORDER_BY_DATE = 'date'

momentService.typeIdMap = {
    VIDEO_TYPE: 'video',
    AUDIO_TYPE: 'audio',
    WHISPER_TYPE: 'whisper',
    3: 'all'
}

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

momentService.delete = id => {
    return http({
        url: BASE_URL + '/delete/' + id,
        method: 'get'
    })
}
momentService.getRecommendOfPlayePage = (type, userId) => {
    return http({
        url: BASE_URL + '/recommendOfPlayPage?type=' + type + '&userId=' + userId,
        method: 'get'
    })
}

momentService.getSquareMoments = (current, size, typeId, order) => {
    return http({
        url: BASE_URL + `/square/moments?current=${current}&size=${size}&type=${typeId}&order=${order}`,
        method: 'get'
    })
}

momentService.getSquareCarouselVo = () => {
    return http({
        url: BASE_URL + '/square/carousel',
        method: 'get'
    })
}

export default momentService
