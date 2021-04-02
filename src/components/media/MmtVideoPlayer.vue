<template>
 <div class="mmt_video_player">
   <video :src="videoUrl" controls>

   </video>
   <div class="mmt_video_player_opt">
   </div>
 </div>
</template>

<script>
export default {
  name: "MmtVideoPlayer",
    props: {
      videoUrl: String
    },
  data(){
    return {

    }
  },
  methods: {

  },
  mounted() {

  }

}
</script>

<style lang="less" scoped>
  .mmt_video_player{
    width: 100%;
    height: 100%;
    video{
      height: 100%;
      width: 100%;
      padding: 0;
      margin: 0;
    }
  }

</style>