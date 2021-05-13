
const Constant = {}

Constant.localStoreUIdKey = 'uid'
Constant.localStoreUsernameKey = 'username'
Constant.localStoreUseravatarKey = 'cu_avatar'

Constant.mediaTypeZhMap = new Map()
Constant.mediaTypeZhMap.set('audio', '音频')
Constant.mediaTypeZhMap.set('video', '视频')

Constant.mediaTypeIdMap = new Map()
Constant.mediaTypeIdMap.set('audio', 2)
Constant.mediaTypeIdMap.set('video',1)

// id ===> type en
Constant.mediaIdTypeMap = new Map()
let mediaIdType = Constant.mediaIdTypeMap
mediaIdType.set(1, 'video')
mediaIdType.set(2, 'audio')
mediaIdType.set(3, 'all')
export default Constant