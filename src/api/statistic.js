
import http from "@/util/http";

const StatisticService = {}

const BASE_URL = '/pc/statistic'


StatisticService.viewsIncr = (mId) => {
    return http({
        url: BASE_URL + '/views?m_id=' + mId,
        method: 'get',
    })
}

StatisticService.hasPraise = (mId) => {
    return http({
        url: BASE_URL + '/praise/hasPraised?m_id=' + mId,
        method: 'get'
    })
}
StatisticService.praise = (mId, authorId) => {
    return http({
        url: BASE_URL + '/praise?m_id=' + mId + '&author_id=' + authorId,
        method: 'get'
    })
}

StatisticService.praiseCancel = (mId, authorId) => {
    return http({
        url: BASE_URL + '/praise/cancel?m_id=' + mId + '&author_id=' + authorId,
        method: 'get'
    })
}

export default StatisticService