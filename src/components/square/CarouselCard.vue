<template>
  <div class="mmt_carousel_card" :style="{backgroundImage: 'url(' + coverUrl + ')' }">
      <div class="mmt_carousel_card_context">
          <h2 style="height: 28px; margin: 0; line-height: 28px; width: 100%">独眠在山谷的你</h2>
          <div class="card_opt_container">
            <div class="card_author_avatar_container">
              <el-avatar size="large">Author</el-avatar>
            </div>
            <div style="flex: 3"></div>
            <div class="card_link_container">
              <p><router-link to="/">details ></router-link></p>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: "CarouselCard",
    props: {
      carouselCardVo: Object
    },
    data() {
      return {
        coverUrl: 'http://mmt-resource.oss-cn-hangzhou.aliyuncs.com/mmt_user_3/sea.jpg'
      }
    }
  }
</script>

<style scoped lang="less">
  .mmt_carousel_card{
    width: 100%;
    height: 100%;
    background-size: cover;
    .mmt_carousel_card_context{
      width: 90%;
      height: 90%;
      padding: 5% 5% 0;
      position: relative;
      .card_opt_container{
        height: 17%;
        width: 90%;
        position: absolute;
        bottom: 0;
        display: flex;
        .card_author_avatar_container{
          flex: 2;
        }
        .card_link_container{
          flex: 1;
          font-size: 15px;
          a{
            text-decoration: none;
            color: #ffffff;
          }
          a:hover{
            color: #409EFF;
          }
        }
      }
    }
  }

</style>