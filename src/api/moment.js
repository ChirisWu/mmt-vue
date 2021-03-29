
import http from '@/util/http'


const momentService = {}
const BASE_URL = '/pc/moment/media'


momentService.createMediaMoment = (paramObj) => {
    return http({
        url: BASE_URL,
        method: 'post',
        data: paramObj
    })
}

momentService.VIDEO_TYPE = 1
momentService.AUDIO_TYPE = 2
momentService.WHISPER_TYPE = 0


export default momentService
