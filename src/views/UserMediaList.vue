<template>
  <div class="mmt_user_media_list">
      <div class="mmt_user_media_list_header">
        <h3>{{username}}的视频({{userVideos.length}})</h3>
      </div>
      <div class="mmt_user_videos_wrapper" >
        <div class="mmt_user_video_card_wrapper" v-for="(item, index) in userVideos">
            <video-card :video-vo="item"/>
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
      ]
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
    .mmt_user_video_card_wrapper{
      height: 180px;
      width: 16.667%;
      float: left;
    }
    .mmt_user_videos_wrapper{
      width: 100%;
      height: 1200px;
    }
    .mmt_user_video_card_wrapper:hover{
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }


  }

</style>