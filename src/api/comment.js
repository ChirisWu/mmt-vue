
import http from "@/util/http"



const commentService = {}
const BASE_URL = '/pc/comment/'

commentService.create = (commentParam) => {
    return http({
        url: BASE_URL,
        method: 'post',
        data: commentParam
    })
}


export default commentService