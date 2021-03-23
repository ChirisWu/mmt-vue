/**
 * 上传文件时生成文件名:时间戳+userId
 * @param userId
 * @param fileType
 */
export function generateFileName(userId, typ, uuid) {
    const timestamp = uuid + userId
    return timestamp + userId + '.' + typ.substring(typ.indexOf('/') + 1)
}

export function generateFileUrl(filename) {
    const prefix = 'https://fv-music.oss-cn-shanghai.aliyuncs.com/fvmusic/images'
    const date  = dateFormat('YYYYmmdd', new Date())
    return prefix + date + '/' + filename
}

 export function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return fmt;
}
