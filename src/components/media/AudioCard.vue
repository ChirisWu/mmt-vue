<template>
  <div class="mmt_audio_card_wrapper" >
    <el-image :src="audioVo.coverUrl" fit="fill" @click="goPlayerPage"/>
    <div class="mmt_audio_card_footer">
      <p>{{audioVo.title}}</p>
      <div class="mmt_audio_card_footer_opt">
        <div style="flex: 2;"><i class="el-icon-headset"/> {{showViews(audioVo.views)}}</div>
        <div style="flex: 1" class="audio_try_listen">
          <audio :src="audioVo.sourceUrl"
                 ref="maudio"
                @play="doPlay"
          />
          <el-tooltip effect="light" :content="isPlaying ? '停止播放' : '点击试听'" >
            <i class="el-icon-video-play"  @click="doPlay" v-if="!isPlaying"/>
            <i class="el-icon-video-pause" @click="doPause" v-else/>
          </el-tooltip>
        </div>
      </div>
      <p><i class="el-icon-time"/> {{audioVo.createDateTime.substring(0, 10)}}</p>
    </div>
  </div>
</template>

<script>
  import StatisticService from "../../api/statistic";

  export default {
    name: "AudioCard",
    props: {
      audioVo: {
        type: Object
      },
    },
    data() {
      return {
        isPlaying: false
      }
    },
    methods: {
      doPlay() {
        this.$refs.maudio.play()
        this.isPlaying = true
      },
      doPause() {
        this.$refs.maudio.pause()
        this.isPlaying = false
      },
      showViews(views) {
        if (views > 1000000) {
          return ' ' + views / 1000000 + '百万'
        }
        if (views > 10000) {
          return ' ' + views / 10000 + '万'
        }
        return ' ' + views
      },
      goPlayerPage() {
        StatisticService.viewsIncr(this.audioVo.id)
        this.$router.push({
          name: 'Play',
          params: {
            type: 'audio',
            id: this.audioVo.id
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .mmt_audio_card_wrapper{
    height: 100%;
    width: 100%;
    padding: 5%;
    .el-image{
      width: 90%;
      height: 60%;
    }
    .mmt_audio_card_footer{
      width: 100%;
      height: 37%;
      font-size: 12px;
      overflow: hidden;
      p {
        margin: 0;
        height: 16px;
        line-height: 16px;
        overflow: hidden;
      }
      p:not(:last-child){
        margin-bottom: 2px;

      }
      .mmt_audio{
        width: 100%;
        height: 40%;
      }
      .mmt_audio_card_footer_opt{
        display: flex;
        .audio_try_listen{
          i {
            font-size: 18px;
            z-index: 9999;
          }
        }

      }

    }
  }

</style>