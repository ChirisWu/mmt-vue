<template>
  <div class="mmt_play_page">
      <div class="mmt_player_content">
        <h2>title</h2>
        <div class="mmt_player_wrapper">
          播放器

        </div>
        <div class="mmt_comment_wrapper">
            评论区
        </div>

      </div>
      <div class="mmt_author">
          <div class="mmt_author_info">
            <div class="mmt_author_avatar">
                <el-avatar :size="58">author</el-avatar>
            </div>
            <div class="mmt_author_opt">
             <div style="padding-top:10px">Author</div>
              <div><el-button plain size="small">关注Ta</el-button></div>
            </div>
          </div>

        <div class="mmt_author_other_moment">
            <div class="mmt_other_moment_card"></div>
            <div class="mmt_other_moment_card"></div>
            <div class="mmt_other_moment_card"></div>
            <div class="mmt_other_moment_card"></div>
            <div class="mmt_other_moment_card"></div>
            <div class="mmt_other_moment_card"></div>
            <div class="mmt_other_moment_card"></div>
            <div class="mmt_other_moment_card"></div>
            <div class="mmt_other_moment_card"></div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "VideoPlay",
  data() {
    return {
      m_id: this.$route.query.m_id
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="less">

  .mmt_play_page{
    width: 100%;
    display: flex;
    .mmt_player_content{
      flex: 5;
      padding: 0 20px;
      .mmt_player_wrapper{
        height: 700px;
        background-color: rgb(213,213,213);
      }
      .mmt_comment_wrapper{
        height: 400px;
        background-color: #d2a4a4;
      }
    }
    .mmt_author{
      flex: 1;
      padding: 0 20px;
      .mmt_author_info{
        padding-bottom: 30px;
        display: flex;
        .mmt_author_avatar{
          flex: 1;
        }
        .mmt_author_opt{
          flex: 2;
          text-align: center;
          button{
            margin-top: 6px;
          }

        }

      }
      .mmt_author_other_moment{
        .mmt_other_moment_card{
          height: 200px;
          border: 1px solid silver;
        }
      }
    }

  }


</style>