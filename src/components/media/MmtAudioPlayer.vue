<template>
  <div class="mmt_audio_player" :style="{backgroundImage: 'url(' + coverUrl + ')'}">
      <div class="mmt_audio_player_header">
        <img src="../../assets/logo/logo.png">
        <h3>&nbsp;&nbsp;Mmt Audio Player</h3>
      </div>
    <audio ref="audioPlayer"
           @play="doPlay"
           @pause="doPause"
           @timeupdate="onTimeupdate"
           @loadedmetadata="onLoadedmetadata"
           :src="sourceUrl"/>
    <div class="mmt_audio_player_box">
        <div class="slider_container">
          <p class="slider_start_time">{{ formatSeconds(currentTime)}}</p>
          <el-slider v-model="sliderTime" :format-tooltip="formatProcessToolTip" @change="changeCurrentTime" class="slider"></el-slider>
          <p class="slider_end_time">{{ formatSeconds(maxTime)}}</p>
        </div>
        <div class="audio_opt">
          <div style="flex: 1"></div>
          <div style="flex:1; text-align: center; font-size: 50px; color: #1296db" >
<!--            <el-button style="font-size: 40px;" circle icon="el-icon-video-play"></el-button>-->
            <i class="el-icon-video-pause" @click="doPause" v-if="isPlaying"/>
            <i class="el-icon-video-play" @click="doPlay" v-else/>
          </div>
          <div style="flex: 1"></div>
        </div>
    </div>
  </div>
</template>

<script>
  // 将整数转换成 时：分：秒的格式
  function realFormatSecond(second) {
    var secondType = typeof second

    if (secondType === 'number' || secondType === 'string') {
      second = parseInt(second)

      var hours = Math.floor(second / 3600)
      second = second - hours * 3600
      var mimute = Math.floor(second / 60)
      second = second - mimute * 60

      return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
    } else {
      return '0:00:00'
    }
  }
  export default {
    name: "MmtAudioPlayer",
    props: {
      sourceUrl: String,
      coverUrl: String
    },
    data() {
      return{
        isPlaying: false,
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0,
        // 已加载的时间 秒
        loadedTime: 0,
        sliderTime: 0,
        sliderLoadedTime: 0,
      }
    },
    methods: {
      doPlay(){
        this.$refs.audioPlayer.play()
        this.isPlaying = true
      },
      doPause(){
        this.$refs.audioPlayer.pause()
        this.isPlaying = false

      },
      onTimeupdate(res) {
        this.currentTime = res.target.currentTime
        // let timeRanges = res.target.buffered
        // this.loadedTime = timeRanges.end(timeRanges.length - 1)
        this.sliderTime = parseInt(this.currentTime / this.maxTime * 100)
        if (this.currentTime === this.maxTime){
          this.isPlaying = false
        }
      },
      // 当加载语音流元数据完成后，会触发该事件的回调函数
      // 语音元数据主要是语音的长度之类的数据
      onLoadedmetadata(res) {
        this.maxTime = parseInt(res.target.duration)

      },
      formatSeconds(sec){
        return realFormatSecond(sec)
      },
      // 更新进度条
      changeCurrentTime(index = 0) {
        this.$refs.audioPlayer.currentTime = parseInt(index / 100 * this.maxTime)
      },
      // 进度条格式化toolTip
      formatProcessToolTip(index = 0) {
        index = parseInt(this.maxTime / 100 * index)
        return '进度条: ' + realFormatSecond(index)
      },
    },
    filters: {
      // 使用组件过滤器来动态改变按钮的显示
      transPlayPause(value) {
        return value ? '暂停' : '播放'
      },
      // 将整数转化成时分秒
      formatSecond(second) {
        return realFormatSecond(second)
      }
    },
    mounted() {
      console.log(this.coverUrl)
    }
  }
</script>

<style scoped lang="less">
  .mmt_audio_player{
    width: 90%;
    height: 76%;
    padding: 5%;
    border: 1.5px solid silver;
    background-size: cover;
    position: relative;
    .mmt_audio_player_header{
      display: flex;
      height: 15%;
      img{
        height: 100%;
      }
      
    }
    .mmt_audio_player_box{
      width: inherit;
      height: 20%;
      position: absolute;
      bottom: 0;
      .slider_container{
        display: flex;
        width: 100%;
        height: 30%;
        .slider_end_time,.slider_start_time{
          flex: 1;
          font-size: 10px;
          color: #fff;
        }
        .slider{
          flex: 12
        }
      }
      .audio_opt{
        width: 100%;
        height: 60%;
        display: flex;
        .el-button{
          border: 1px rgb(213,213,213) solid;
        }
      }
    }
  }

</style>