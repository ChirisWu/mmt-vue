<template>
    <div class="mmt_video_create_wrapper">
        <div class="mmt_video_creation_header">
            <h3>
                发布 MLife 视频
            </h3>
        </div>
       <div class="mmt_video_upload_wrapper">
           <DragUpload @videoUrl="handleVideoUrl($event)" @videoTitle="handleVideoTitle($event)"/>
       </div>
        <div class="mmt_video_text_wrapper">
            <el-form label-height="100" :model="videoContent" ref="videoContent" class="mmt_video_form">
                <el-form-item>
                    <label>MLife视屏标题</label>
                    <el-input id="mmt_video_title" v-model="videoContent.title"></el-input>
                </el-form-item>
                <el-form-item>
                    <label >MLife视屏语</label>
                    <el-input id="video_text"  type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"
                              v-model="videoContent.text"
                              maxlength="500"
                              show-word-limit
                    style="initial-letter: inherit"></el-input>
                </el-form-item>
                <el-form-item>
                    <label>相关链接</label>
                    <el-input v-model="videoContent.relativeUrl"></el-input>
                </el-form-item>
              <el-form-item class="mmt_video_tags">
                <el-tag
                    :key="tag"
                    type="success"
                    v-for="tag in videoContent.tags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                  {{tag}}
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
                  <el-button type="primary" plain>发布</el-button>
                  <el-button type="info" plain>取消</el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import DragUpload from "../upload/DragUpload";
    export default {
        data(){
          return {
              videoContent: {
                  title: '',
                  text: '',
                  relativeUrl: '',
                  tags: ['原创','视频'],
              },
            inputVisible: false,
            inputValue: ''
          }
        },
        name: "VideoCreation",
        components: {
            DragUpload
        },
      methods: {
        handleVideoUrl(url) {
          this.videoContent.text = url
        },
        handleVideoTitle(title){
          this.videoContent.title = title
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
        }

      }
    }
</script>

<style lang="less" scoped>
    .mmt_video_create_wrapper{
        padding: 40px;
        .mmt_video_text_wrapper{
            padding: 0 40px;
        }
      .mmt_video_form{
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