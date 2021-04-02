<template>
  <div class="mmt_user_media_list">
      <div class="mmt_user_media_list_header">
        <h3>{{username}}的视频({{userVideos.length}})</h3>
        <div class="mmt_user_media_opt">
          <el-button plain size="small" round type="primary" @click="enableDelete">管 理</el-button>
          <el-button plain size="small" round type="success" @click="disableDelete">完 成</el-button>
        </div>
      </div>
      <div class="mmt_user_videos_wrapper" >
        <div class="mmt_user_video_card_wrapper" v-for="(item, index) in userVideos">
            <video-card :video-vo="item"/>
          <div class="mmt_video_delete" v-if="deleteEnabled" @click="deleteMedia(item.id, item.title)">
            <br>
            <i class="el-icon-circle-close"></i>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import VideoCard from "@/components/media/VideoCard";
import MmtVideoPlayer from "@/components/media/MmtVideoPlayer";
import momentService from "@/api/moment";
export default {
  name: "UserMediaList",

  components: {
    VideoCard,
    MmtVideoPlayer

  },
  data() {
    return {
      username: this.$route.query.username,
      userVideos: [
        {
          id: 1,
          userId: 0,
          views: 0,
          createDateTime: "",
          sourceUrl: "",
          title: ""
        },
      ],
      deleteEnable: false
    }
  },
 computed: {
    deleteEnabled: {
      get() {
        return this.deleteEnable
      },
      set(value) {
        this.deleteEnable = value
      }
    }
 },
  methods: {
    getUserVideos() {
      momentService.getUserMedia(momentService.VIDEO_TYPE, this.$route.query.ud)
      .then(res => {
        if (res.data.status.statusCode === 200){
          this.userVideos = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    enableDelete(){
      this.deleteEnabled = true
    },

    deleteMedia(id, title){
      this.$confirm('确定要删除' + title + '吗？删除后不能恢复！',{
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        iconClass: 'el-icon-delete'
      }).then(() => {
        this.$alert('已删除', {
          type: 'success',
          confirmButtonText: '关闭'
        })
      })
    },
    disableDelete(){
      this.deleteEnabled = false
    }
  },
  mounted() {
    this.getUserVideos()
  }


}
</script>

<style scoped lang="less">

  .mmt_user_media_list{
    padding: 30px;
    .mmt_user_media_list_header{
      display: flex;
      height: 70px;
      h3{
        flex: 1;
      }
      .mmt_user_media_opt{
        flex: 2;
        .el-button{
          margin-top: 15px;
        }
      }

    }
    .mmt_user_video_card_wrapper{
      height: 180px;
      width: 16.667%;
      float: left;
      position: relative;
      .mmt_video_delete{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(179, 23, 23, 0.2);
        display: none;
        text-align: center;
        font-size: 44px;
        color: #6d6c6c;

      }
    }
    .mmt_user_videos_wrapper{
      width: 100%;
      height: 1200px;
    }
    .mmt_user_video_card_wrapper:hover{
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .mmt_video_delete{
        display: block;
      }
    }

  }

</style>