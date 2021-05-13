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
      <div class="el-upload__text">drag file to here, or <em>click to upload</em></div>
      <template #tip>
        <div class="el-upload__tip">
          support {{type === 'video'? 'mp4' : 'mp3' }} file，and less than 400MB
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
      fileKey: '',
      uploadUrl: OssService.OssUploadUrl,
      videoNotification: 'please select mp4 file',
      audioNotification:'please select mp3 file',
      accept: 'video/mp4, audio/mp3',


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
      let filename = file.name
      this.$emit('videoTitle', filename)
      this.fileKey = ossService.handleFilename(file.uid)
      console.log(this.fileKey)
      return new Promise((resolve, reject) => {
        ossService.signature().then(response => {
          let data = response.data.data
          _self.ossUploadParam.policy = data.policy;
          _self.ossUploadParam.signature = data.signature;
          _self.ossUploadParam.ossaccessKeyId = data.accessid;
          _self.ossUploadParam.key = data.dir + '/' + this.fileKey;
          _self.ossUploadParam.dir = data.dir;
          _self.ossUploadParam.host = data.host;
          resolve(true)
        }).catch(err => {
          this.notifyUploadError("network error！")
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
        title: 'success',
        message: file.name + "has upload success",
        position: 'top-left',
        offset: 200,
        duration: 900

      })
      let videoUrl = this.uploadUrl + '/' + this.ossUploadParam.dir + '/' + this.fileKey
      this.$emit('videoUrl', videoUrl)
    },
    handleError(err, file) {
      console.log('failed!')
      this.notifyUploadError("network error!")

    },
    notifyUploadError(msg) {
      this.$notify.error({
        title: 'upload error',
        message: msg,
        position: 'top-left',
        offset: 200
      })
    },



  },

  mounted() {
    // this.accept = this.type === 'video' ? 'vide/mp4' : 'audio/mp3'
    let filename = ossService.handleFilename('sssss')
    console.log(filename)
  }
}
</script>

<style lang="less" scoped>
.mmt_drag_upload {
  padding: 40px;
}
</style>