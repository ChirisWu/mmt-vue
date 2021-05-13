<template>
  <div class="mmt_moment_card">
      <div class="moment_card_image_wrapper">
          <img :src="momentVo.coverUrl"
               style="height: 60%;
                      width: 100%;
                      object-fit: cover">
        <div class="moment_card_statistic">
          <p><router-link :to="userRoute">
            <i class="el-icon-user"/> {{momentVo.authorName}}
          </router-link></p>
        </div>
        <div class="moment_card_footer">
          {{momentVo.views}} play
        </div>
      </div>
      <div class="moment_card_content">
        <div class="moment_card_author">
          <div style="flex: 0.9 0.9"></div>
          <div class="author_wrapper">
            <el-avatar @click="goUserPage" :src="momentVo.authorAvatar">author</el-avatar>
          </div>
        </div>
        <p class="moment_card_title_wrapper"><router-link :to="playRoute">{{ momentVo.title }}</router-link></p>
        <p class="moment_card_desc">
          {{ momentVo.description === '' ? momentVo.authorName + ' \' s music ' + momentVo.type : momentVo.description }}
        </p>
        <div class="moment_card_opt">
          <div class="link_wrapper">
            <router-link :to="playRoute">more<i class="el-icon-arrow-right"/> </router-link>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

  export default {
    name: "MomentCard",
    props: {
      momentVo: Object
    },
    data() {
      return {
        userRoute: `/u/${this.momentVo.authorName}`,
        playRoute: `/play/${this.momentVo.type}/${this.momentVo.mid}`
      }
    },
    components: {

    },
    methods: {
      goUserPage(){
        this.$router.push(this.userRoute)
      }

    }
  }
</script>

<style scoped lang="less">
  .mmt_moment_card{
    width: 100%;
    height: 220px;
    display: flex;
    .moment_card_image_wrapper{
      flex: 46% 1;
      height: 100%;
      .moment_card_statistic{
        font-size: 13px;
      }
    }
    .moment_card_content{
      flex: 62% 1;
      height: 100%;
      padding-left: 2%;
      .moment_card_title_wrapper{
        overflow: hidden;
        text-overflow: ellipsis;
        display:-webkit-box; //作为弹性伸缩盒子模型显示。
        -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
        -webkit-line-clamp:2;
      }
      .moment_card_desc{
        overflow: hidden;
        text-overflow: ellipsis;
        display:-webkit-box; //作为弹性伸缩盒子模型显示。
        -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
        -webkit-line-clamp:4;
      }
      .moment_card_author{
        display: flex;
        .author_wrapper{
          flex: 0.1 0.1;
        }
      }
      .moment_card_opt{
        font-size: 9px;
        width: 100%;
        position: relative;
        .link_wrapper{
          position: absolute;
          right: 0;
          width: 50px;
        }
      }
    }

  }

</style>