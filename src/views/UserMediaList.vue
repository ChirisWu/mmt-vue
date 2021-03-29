<template>
  <div class="mmt_user_media_list">
      <div class="mmt_user_media_list_header">
        <h3>{{username}}的<span>{{type === '1' ? '视屏' : '音频'}}(11)</span></h3>
      </div>
      <div class="mmt_video_list_wrapper">

      </div>
  </div>
</template>

<script>
import VideoCard from "@/components/media/VideoCard";
export default {
  name: "UserMediaList",
  components: {
    VideoCard

  },
  data() {
    return {
      type: this.$route.query.type,
      username: this.$route.query.username,
      userVideos: [
        {

        }
      ]
    }
  }

}
</script>

<style scoped lang="less">

  .mmt_user_media_list{
    padding: 30px;
    .mmt_video_card_wrapper{
      height: 200px;
      margin-top: 10px;
      //.el-card__body{
      //  height: 200px!important;
      //  width: 100%;
      //}


    }
  }

</style>