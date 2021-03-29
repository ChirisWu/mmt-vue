<template>
    <div class="mmt_video_card_4user">
      <img src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"/>
      <div class="mmt_video_card_footer">
        <span>20</span> | <span>100</span>
      </div>
    </div>
</template>

<script>
export default {
name: "VideoCard"
}
</script>

<style scoped lang="less">
  .mmt_video_card_4user{
    background-color: #409EFF;
    height: 100%;
    img{
      width: 100%;
      height: 170px;
      display: block;
      object-fit: cover;
    }
    .mmt_video_card_footer{
      height: 60px;
    }
  }
</style>