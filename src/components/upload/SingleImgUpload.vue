<template>
    <el-upload class="mmt_img_upload"
               :action="uploadUrl"
               :data="ossUploadParam"
               ref="img_upload"
               accept="image/jpg, image/png, image/webp, image/jpeg"
               :show-file-list="false"
               :multiple="false"
               :before-upload="beforeUpload"
               :on-success="handleImgSuccess"
    >
        <img v-if="imageUrl" :src="imageUrl" class="mmt_image">
        <i v-else class="el-icon-plus img-uploader-icon"></i>
        <div v-if="!imageUrl" style="font-size: 14px; color: #606266">点击上传封面</div>
    </el-upload>

</template>

<script>
  import OssService from "@/api/oss";
  import ossService from "@/api/oss";

  export default {
    name: "SingleImgUpload",
    data() {
      return {
        imageUrl: '',
        ossUploadParam: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: '',

        },
        uploadUrl: OssService.OssUploadUrl,

      }
    },
    methods: {
      beforeUpload(file) {
        let _self = this;
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
      handleImgSuccess(response, file) {
        let imgUrl = this.uploadUrl + '/' + this.ossUploadParam.dir + '/' + file.name
        this.imageUrl = imgUrl
        this.$emit('imgUrl', imgUrl)
      }
    },

  }
</script>

<style scoped lang="less">
    .mmt_img_upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        width: 280px;
        height: 190px;
        cursor: pointer;
        overflow: hidden;

        .img-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 280px;
            height: 140px;
            line-height: 178px;
            text-align: center;
            margin: 0 auto;
            display: block;
        }

        img {
            width: 280px;
            height: 190px;
            object-fit: cover;
        }
    }
</style>