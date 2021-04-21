<template>
    <div class="mmt_video_card_4user" @click="goVideoPlayPage">
      <img :src="snapshotOfVideo(videoVo.sourceUrl)"/>
      <div class="mmt_video_card_footer">
        <p>{{videoVo.title}}</p>
        <div>
          <span><i class="el-icon-video-play"></i>{{showViews(videoVo.views)}}</span>
          <span style="margin-left: 20%"><i class="el-icon-time"></i> {{videoVo.createDateTime.substring(0, 10)}}</span>
        </div>
      </div>

    </div>
</template>

<script>
import StatisticService from "@/api/statistic";

export default {
 name: "VideoCard",
  data() {
   return {

   }
  },
  props: {
   videoVo: Object
  },
  methods: {
   showViews(views){
     if (views > 1000000){
       return ' ' + views / 1000000 + '百万'
     }
     if (views > 10000){
       return ' ' +  views / 10000 + '万'
     }
     return ' ' + views
   },
   snapshotOfVideo(videoUrl){
     return videoUrl + '?x-oss-process=video/snapshot,t_100,f_png,w_192,h_126'
   },
    goVideoPlayPage(){
      let id = this.videoVo.id
      StatisticService.viewsIncr(id)
      this.$router.push({
        name: 'Play',
        params: {
          id: id
        }
      })

    }
  }

}
</script>

<style scoped lang="less">
  .mmt_video_card_4user{
    height: 100%;
    padding: 10px;
    img{
      width: 100%;
      height: 60%;
      display: block;
      object-fit: cover;
    }
    video:hover{
    }
    .mmt_video_card_footer{
      height: 38%;
      width: 100%;
      font-size: 12px;
      p{
        height: 32px;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 6px 0;
      }
      i {
        font-size: 14px;
      }
    }
  }
</style>