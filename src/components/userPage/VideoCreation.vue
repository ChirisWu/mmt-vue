<template>
    <div class="mmt_video_create_wrapper">
        <div class="mmt_video_creation_header">
            <h3>
                发布 MLife 视频
            </h3>
        </div>
       <div class="mmt_video_upload_wrapper">
           <DragUpload/>
       </div>
        <div class="mmt_video_text_wrapper">
            <el-form label-height="100" :model="videoContent" ref="videoContent">
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
                  text: ''
              }
          }
        },
        name: "VideoCreation",
        components: {
            DragUpload
        }
    }
</script>

<style lang="less" scoped>
    .mmt_video_create_wrapper{
        padding: 40px;
        .mmt_video_text_wrapper{
            padding: 0 40px;
        }
    }
</style>