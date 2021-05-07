<template>
  <div class="mmt_drag_upload">
    <el-upload
        ref="dragUpload"
        drag
        :before-upload="beforeUpload"
        :accept="accept"
        :action="uploadUrl"
        :on-success="handleSuccess"
        :on-error="handleError"
        :data="ossUploadParam"
        multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处自动上传，或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">
          只能上传{{type === 'video'? 'mp4' : 'mp3' }}文件，且不能超过400MB
        </div>
      </template>
    </el-upload>

  </div>
</template>

<script>
import OssService from '@/api/oss'
import ossService from "@/api/oss";

export default {

  name: "DragUpload",
  props: {
    type: {
      type: String
    }
  },
  data() {

    return {
      ossUploadParam: {
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        dir: '',
        host: '',

      },
      uploadUrl: OssService.OssUploadUrl,
      videoNotification: '请上传mp4文件',
      audioNotification:'请上传mp3文件',
      accept: 'video/mp4, audio/mp3'


    }
  },
  computed: {},
  methods: {
    beforeUpload(file) {
      if (!this.filterFileType(file)) {
        let msg = this.type === 'video' ? this.videoNotification : this.audioNotification
        this.notifyUploadError(msg)
        return false
      }
      let _self = this;
      this.$emit('videoTitle', file.name)
      return new Promise((resolve, reject) => {
        ossService.signature().then(response => {
          let data = response.data.data
          _self.ossUploadParam.policy = data.policy;
          _self.ossUploadParam.signature = data.signature;
          _self.ossUploadParam.ossaccessKeyId = data.accessid;
          _self.ossUploadParam.key = data.dir + '/${filename}';
          _self.ossUploadParam.dir = data.dir;
          _self.ossUploadParam.host = data.host;
          resolve(true)
        }).catch(err => {
          this.notifyUploadError("网络异常，上传到服务器失败！")
          reject(false)
        })
      })
    },
    filterFileType(file) {
      let reg = this.type === 'video' ? /.*?.mp4$/ : /.*?.mp3$/
      return reg.test(file.name)
    },
    handleSuccess(response, file) {
      this.$notify.success({
        title: '上传成功',
        message: file.name + "已经上传到服务器",
        position: 'top-left',
        offset: 200,
        duration: 900

      })
      let videoUrl = this.uploadUrl + '/' + this.ossUploadParam.dir + '/' + file.name
      this.$emit('videoUrl', videoUrl)
    },
    handleError(err, file) {
      console.log('上传失败')
      this.notifyUploadError("网络异常，上传到服务器失败!")

    },
    notifyUploadError(msg) {
      this.$notify.error({
        title: '文件上传异常',
        message: msg,
        position: 'top-left',
        offset: 200
      })
    },
    uploadFile() {
      this.$refs.dragUpload.submit()
    }

  },

  mounted() {
    // this.accept = this.type === 'video' ? 'vide/mp4' : 'audio/mp3'
  }
}
</script>

<style lang="less" scoped>
.mmt_drag_upload {
  padding: 40px;
}
</style>