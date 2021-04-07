<template>
  <div class="mmt_play_page">
    <div class="mmt_player_content">
      <div class="mmt_play_page_header">
        <h4 style="margin: 0 0 5px">【{{momentDetails.title}}】</h4>
        <p style="font-size: 10px; padding-left: 4%">{{momentDetails.createDate}}</p>
        <p>{{momentDetails.description}}</p>
      </div>
      <div class="mmt_player_wrapper">
        <mmt-video-player :video-url="momentDetails.sourceUrl"/>
        <div class="mmt_player_footer">
          <div class="mmt_moment_infos">
            <IconComment/> {{momentDetails.commentCount}}
          </div>
          <div class="mmt_moment_opt">
            <icon-heart/>
          </div>
        </div>
      </div>
      <div class="mmt_comment_wrapper">

      </div>

    </div>
    <div class="mmt_author">
      <div class="mmt_author_info">
        <div class="mmt_author_avatar">
          <el-avatar :size="58" :src="momentDetails.authorAvatar">author</el-avatar>
        </div>
        <div class="mmt_author_opt">
          <div style="padding-top:10px">{{ momentDetails.author }}</div>
          <div>
            <el-button plain size="small">关注Ta</el-button>
          </div>
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
import MmtVideoPlayer from "../components/media/MmtVideoPlayer";
import momentService from "@/api/moment";
import IconHeart from "@c/icons/IconHeart";
import IconComment from "@c/icons/IconComment";

export default {
  name: "VideoPlay",
  components: {
    MmtVideoPlayer,
    IconHeart,
    IconComment
  },
  data() {
    return {
      m_id: this.$route.query.m_id,
      url: 'http://mmt-resource.oss-cn-hangzhou.aliyuncs.com/test/callback/fffff.mp4',
      momentDetails: {
        momentId	:	9,
        views	:	0,
        commentCount	:	0,
        praiseCount	:	0,
        createDate	:	'',
        sourceUrl	:	'',
        title	:	'',
        description	:	'',
        relatedUrls	:	'',
        tags	:[],
        relateUrlsList:[],
        tagsList: [],
        authorId: '',
        author	:	'',
        authorAvatar	:	''

        }
    }
  },
  methods: {
    getMomentById(){
      momentService.getMomentDetailsById(this.m_id).then(res => {
        console.log(res)
        if (res.data.status.statusCode === 200){
          this.momentDetails = res.data.data
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    }
  },
  mounted() {
    this.getMomentById()
  }
}
</script>

<style scoped lang="less">

.mmt_play_page {
  width: 100%;
  display: flex;
  color: #212121;
  .mmt_player_content {
    flex: 5;
    padding: 0 20px;
    .mmt_play_page_header{
      padding: 30px 20px 0 30px;
      p{
        font-size: 13px;
        margin: 0 0 15px;
      }
    }

    .mmt_player_wrapper {
      height: 700px;
      .mmt_player_footer{
        display: flex;
        div{
          flex: 1;
          margin-top: 10px;
        }
      }
    }

    .mmt_comment_wrapper {
      height: 400px;
      background-color: #d2a4a4;
    }
  }

  .mmt_author {
    flex: 1;
    padding: 0 20px;

    .mmt_author_info {
      padding-bottom: 30px;
      display: flex;

      .mmt_author_avatar {
        flex: 1;
        position: relative;
        .el-avatar{
          position:absolute;
          bottom: 0;

        }
      }

      .mmt_author_opt {
        flex: 2;
        text-align: center;

        button {
          margin-top: 6px;
        }

      }

    }

    .mmt_author_other_moment {
      .mmt_other_moment_card {
        height: 180px;
        border: 1px solid silver;
      }
    }
  }

}


</style>