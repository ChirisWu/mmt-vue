<template>
  <div class="mmt_play_page">
    <div class="mmt_player_content">
      <div class="mmt_play_page_header">
        <h4 style="margin: 0 0 5px">【{{momentDetails.title}}】</h4>
        <p style="font-size: 10px; padding-left: 4%">{{momentDetails.createDate}}</p>
        <div class="mmt_moment_tags">
          <el-tag effect="plain" v-for="(item, index) in momentDetails.tagsList">{{item}}</el-tag>
        </div>
        <p>&nbsp;&nbsp;&nbsp;{{momentDetails.description}}</p>
      </div>
      <div class="mmt_player_wrapper">
<!--        音视频播放器-->
        <mmt-video-player :video-url="momentDetails.sourceUrl" v-if="type === 'video'"/>
        <mmt-audio-player
          :cover-url="momentDetails.coverUrl"
          :source-url="momentDetails.sourceUrl"
          v-else-if="type === 'audio'"
        />
<!--        播放器footer-->
        <div class="mmt_player_footer">
          <div class="mmt_moment_infos">
            <div class="info_items">
              <IconPlay/> <p>{{momentDetails.views}}</p>
            </div>
            <div class="info_items">
              <IconComment/> <p>{{momentDetails.commentCount}}</p>
            </div>
            <div class="info_items">
              <icon-heart :color="momentDetails.isPraised ? '#1296db' : '#bfbfbf' " @click="praiseMoment"/>
              <p>{{momentDetails.praiseCount}}</p>
            </div>
          </div>
          <div class="mmt_moment_opt">

          </div>

        </div>
      </div>
<!--      评论区-->
      <div class="mmt_comment_wrapper">
        <el-row :gutter="20">
          <el-col :span="21">
            <el-input v-model="commentParam.commentContent" placeholder="发表你的精彩评论"></el-input>
          </el-col>
          <el-col :span="3">
            <el-button @click="createLevel1Comment">提交</el-button>
          </el-col>
        </el-row>
          <mmt-message-box ref="msgbox" msg="添加了一条评论"/>
      </div>

    </div>
    <div class="mmt_author">
      <div class="mmt_author_info">
        <p class="mmt_author_avatar">
          <el-avatar :size="58" :src="momentDetails.authorAvatar">author</el-avatar>
        </p>
        <div class="mmt_author_opt">
          <div style="padding-top:10px">{{ momentDetails.author }}</div>
          <div>
            <el-button plain size="small">关注Ta</el-button>
          </div>
        </div>
      </div>

      <div class="mmt_author_other_moment">
        <h4>{{ momentDetails.author }}的其他{{typeZh}}</h4>
        <div class="mmt_other_moment_card" v-for="(item, index) in recommendMedias" :class="item.id === mId ? 'select' : ''">
          <video-card :video-vo="item" @click="publishRouteChangeEvent(item.id)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MmtVideoPlayer from "../components/media/MmtVideoPlayer";
import momentService from "@/api/moment";
import IconHeart from "@c/icons/IconHeart";
import IconComment from "@c/icons/IconComment";
import IconPlay from "../components/icons/IconPlay";
import VideoCard from "@c/media/VideoCard";
import commentService from "@/api/comment";
import StatisticService from "@/api/statistic";
import MmtMessageBox from "@c/common/MmtMessageBox";
import MmtAudioPlayer from "../components/media/MmtAudioPlayer";
import Constant from "../util/const";


export default {
  name: "VideoPlay",
  components: {
    MmtVideoPlayer,
    IconHeart,
    IconComment,
    IconPlay,
    VideoCard,
    MmtMessageBox,
    MmtAudioPlayer

  },
  data() {
    return {
      type: this.$route.params.type,
      m_id: this.$route.params.id,
      typeZh: Constant.mediaTypeZhMap.get(this.$route.params.type),
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
        authorAvatar	:	'',
        isPraised: true,
        coverUrl: '',
        },
      recommendMedias: [
        {
          createDateTime: '',
          id: -1,
          sourceUrl: '',
          title: '',
          userId: -1,
          views: 0
        }
      ],
      commentParam: {
        momentId: -99,
        commentContent: '',
        level: -11,
        momentUserId: -9,
        level1UserId: -1,
        parentCommentId: -1

      },
    }
  },
  computed: {
    mId: {
      get() {
        return this.m_id
      },
      set(value) {
        this.m_id = value
      }
    }
  },
  methods: {

    getMomentById(){
      momentService.getMomentDetailsById(this.m_id).then(res => {
        if (res.data.status.statusCode === 200){
          this.momentDetails = res.data.data
          this.hasPraised()
        }
        this.getRecommendOfPlayPage()
      }).catch(err => {
        this.$message.error(err.message)
      })
    },

    getRecommendOfPlayPage(){
      momentService.getRecommendOfPlayePage(Constant.mediaTypeIdMap.get(this.type), this.momentDetails.authorId)
      .then(res => {
        if (res.data.status.statusCode === 200){
          this.recommendMedias = res.data.data
        }else{
          console.log(res.data.status.msg)
        }
      })
    },
    publishRouteChangeEvent(id) {
      this.mId = id
    },
    hasPraised() {
      StatisticService.hasPraise(this.mId)
      .then(res => {
        this.momentDetails.isPraised = res.data.data === 1
      })
    },


    createLevel1Comment() {
      this.commentParam.commentContent = this.commentParam.commentContent.replaceAll(' ', '')
      if (this.commentParam.commentContent === ''){
        this.$alert('评论内容不能为空','', {
          confirmButtonText: '确定',
          iconClass: 'el-icon-close'
        })

        return
      }
      this.commentParam.level = 1
      this.commentParam.momentId = this.momentDetails.momentId
      this.commentParam.momentUserId = this.momentDetails.authorId
      commentService.create(this.commentParam).then(res => {
        if (res.data.status.statusCode === 200){
          this.$refs.msgbox.visible = true
          this.momentDetails.commentCount += 1
          this.commentParam.commentContent = ''
        }else{
          console.log(res.data.status)
        }
      }).catch(err => {
        this.$message.error({
          message: '网络错误'
        })
      })

    },

    praiseMoment() {
      if (this.momentDetails.isPraised){
        StatisticService.praiseCancel(this.mId, this.momentDetails.authorId)
        this.momentDetails.isPraised = false
        this.momentDetails.praiseCount -= 1
      } else {
        StatisticService.praise(this.mId, this.momentDetails.authorId)
        this.momentDetails.isPraised = true
        this.momentDetails.praiseCount += 1
      }
    }



  },
  watch: {
    mId() {
      this.getMomentById()
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
        margin: 0 0 12px;
      }
      .mmt_moment_tags{
        margin-bottom: 7px;
        .el-tag{
          margin-left: 10px;
        }
        .el-tag:first-child{
          margin-left: 0;
        }
      }
    }

    .mmt_player_wrapper {
      height: 600px;
      .mmt_player_footer{
        display: flex;
        border-bottom: 2px solid rgb(213,213,213);

        .mmt_moment_infos{
          display: flex;
          .info_items{
            display: flex;
            flex: 1;
            p{
              height: 18px;
              padding: 9px 0;
              margin: 0 0 0 7px;
            }

          }
        }
        div{
          flex: 1;
          margin-top: 10px;
        }
      }
    }

    .mmt_comment_wrapper {
      height: 400px;
      padding-top: 20px;
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
        .el-avatar{

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
        height: 160px;
        border: 1px solid silver;
        margin-top: 7px;
      }
      .select{
        border: #409EFF solid 1px;
      }
    }
  }

}


</style>