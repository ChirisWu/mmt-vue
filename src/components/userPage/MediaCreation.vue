<template>
  <div class="mmt_video_create_wrapper">
    <div class="mmt_video_creation_header">
      <h3>
        create m life {{ type }}
      </h3>
    </div>
    <div class="mmt_video_upload_wrapper" v-show="publishState === publishStateEnum.uploadMedia">
      <DragUpload @videoUrl="handleVideoUrl($event)" @videoTitle="handleVideoTitle($event)" :type="type"/>
    </div>
    <div class="mmt_cover_upload_wrapper" v-show="publishState === publishStateEnum.setCover">
      <div class="mmt_cover_select_box" v-show="selectButtonShow">
        <el-button @click="handelSelectCoverType(coverTypeEnum.upload)">upload cover</el-button>
        <el-button @click="handelSelectCoverType(coverTypeEnum.select)" :disabled="true">select cover</el-button>
      </div>
      <div class="upload_wrapper" v-if="coverType === coverTypeEnum.upload">
        <SingleImgUpload @imgUrl="handleCoverImg($event)"/>
      </div>
    </div>
    <div class="media_show_wrapper" v-if="publishState > publishStateEnum.setCover">
      <div class="file_show">
        <i class="el-icon-document"/> {{fileName}} <i class="el-icon-check" style="color: green"/>
      </div>
      <div class="cover_wrapper">
        <img :src="videoContent.coverUrl" alt="cover">
      </div>
    </div>
    <div class="mmt_video_text_wrapper" v-show="publishState === publishStateEnum.writeInfos">
      <h4></h4>
      <el-form label-height="100" :model="videoContent" ref="videoContent" class="mmt_video_form">
        <el-form-item>
          <label>{{typeZh}}title</label>
          <el-input id="mmt_video_title" v-model="videoContent.title"></el-input>
        </el-form-item>
        <el-form-item>
          <label>{{typeZh}}description</label>
          <el-input id="video_text" type="textarea"
                    :autosize="{ minRows: 4, maxRows: 10}"
                    v-model="videoContent.description"
                    maxlength="500"
                    show-word-limit
                    style="initial-letter: inherit"
                    placeholder="description text, less 500 words"></el-input>
        </el-form-item>
        <el-form-item>
          <label>relative links</label>
          <el-input v-model="videoContent.relativeUrl" placeholder="optional"></el-input>
        </el-form-item>
        <el-form-item class="mmt_video_tags">
          <el-tag
            :key="tag"
            type="success"
            v-for="tag in videoContent.tags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="createVideo"
                     v-loading.fullscreen.lock="uploading"
                      element-loading-text="发布中...">publish</el-button>
          <el-button type="info" plain @click="cancelCreate">cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import DragUpload from "../upload/DragUpload";
  import momentService from "../../api/moment";
  import ossService from "@/api/oss";
  import SingleImgUpload from "@c/upload/SingleImgUpload";
  import {ElMessageBox} from 'element-plus'

  let canLeave = true
  export default {
    data() {
      return {
        self: this,
        uploading: false,
        uploadingText: 'publishing...',
        type: this.$route.params.type,
        fileName: '',
        videoContent: {
          title: '',
          relativeUrl: '',
          tags: ['original',],
          sourceUrl: '',
          description: '',
          userId: 0,
          type: -1,
          relatedUrls: '',
          coverUrl: ''
        },
        inputVisible: false,
        inputValue: '',
        publishState: 0,
        publishStateEnum: {
          uploadMedia: 0,
          setCover: 1,
          writeInfos: 2
        },
        coverTypeEnum: {
          select: 0,
          upload: 1
        },
        coverType: -1,
        selectButtonShow: true

      }
    },
    name: "VideoCreation",
    components: {
      DragUpload,
      SingleImgUpload
    },
    methods: {
      handleVideoUrl(url) {
        this.videoContent.sourceUrl = url
        this.publishState = this.publishStateEnum.setCover
        canLeave = false
      },
      handleVideoTitle(title) {
        this.fileName = title
        this.videoContent.title = title.substring(0, title.indexOf("."))

      },
      handleClose(tag) {
        this.videoContent.tags.splice(this.videoContent.tags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.videoContent.tags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      handleCoverImg(url) {
        this.videoContent.coverUrl = url
        this.publishState = this.publishStateEnum.writeInfos
      },
      handelSelectCoverType(value) {
        this.coverType = value
        this.selectButtonShow = false
      },

      createVideo() {
        this.videoContent.type = this.type === 'video' ? momentService.VIDEO_TYPE : momentService.AUDIO_TYPE
        let re = /[,;、，。\s]/;
        this.videoContent.relatedUrls = this.videoContent.relativeUrl.split(re)
        this.videoContent.relatedUrls.filter(url => url === '')
        console.log(this.videoContent)
        this.uploading = true
        momentService.createMediaMoment(this.videoContent).then(res => {
          this.uploading = false
          if (res.data.status.statusCode === 200) {
            this.$notify.success({
              message: 'moment publish success！',
              position: 'top-left',
              offset: 100,
            })
          } else {
            this.$notify.error({
              title: 'failed',
              message: this.data.status.msg,
              position: 'top-left',
              offset: 100
            })
          }
          this.publishState = this.publishStateEnum.uploadMedia
          this.$router.go(0)
        }).catch(err => {
          this.uploading = false
          this.$notify.error({
            message: err.message,
            position: 'top-left',
            offset: 100
          })
          this.publishState = this.publishStateEnum.uploadMedia
          canLeave = true
        })
      },
      cancelCreate() {
        let url = this.videoContent.sourceUrl
        let filename = url.substring(url.lastIndexOf('/') + 1, url.length)
        ossService.deleteOss(filename)
        this.$notify.info(({
          message: `${this.filename} has canceled upload`,
          title: 'cancel',
          position: 'top-left',
          offset: 100
        }))
        this.$router.push('/creation')
      },
    },
    mounted() {
      let type = this.$route.params.type
      if (type !== 'video' && type !== 'audio'){
        this.$router.push('/creation')
      }
    },
    watch: {

    },
    beforeRouteLeave: (to, from, next) => {
      if (canLeave){
        next()
      }else{
        ElMessageBox.confirm('if you leave, what you have edited will not save,are you sure to leave？', 'warning',{
          confirmButtonText: 'leave',
          cancelButtonText: 'stay',
          type: 'warning'
        })
          .then(() => {
            next()
          })
          .catch(() => {
            next(false)
          })
      }
    }

  }
</script>

<style lang="less" scoped>
  .mmt_video_create_wrapper {
    padding: 4%;
    position: relative;
    height: 1024px;

    .mmt_cover_upload_wrapper {

      .upload_wrapper {

        padding: 0 40px 0;

      }

      .mmt_cover_select_box {
        padding: 40px 20px;
        width: 40%;

        .el-button {
          padding: 12px 10px;
          width: 120px;
          margin-right: 10%;
        }
      }
    }

    .media_show_wrapper {
      div {
        padding: 0 40px;
      }

      .cover_wrapper {
        img {
          width: 278px;
          height: 278px;
        }
      }
    }

    .mmt_video_text_wrapper {
      padding: 0 40px;
    }

    .mmt_video_form {
      width: 60%;
    }
  }

  .mmt_video_tags {
    .el-tag + .el-tag {
      margin-left: 10px;
    }

    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }

    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }

  }
</style>