<template>
  <div class="user_page">
    <div class="m_user_infos">
        <div class="m_avatar_wrapper">
          <el-image :src="userInfo.avatarUrl">
          </el-image>
        </div>
      <div class="m_user_basic_info_wrapper">
          <div class="m_user_name_wrapper">
            <h3>{{userInfo.username}}</h3>
            <div style="text-align:center; height: 100%; width: 100px; font-size: 42px;">
              <i style="text-align: center; padding-top: 30px"
                 :class="userInfo.userExtInfos.gender === 1 ? 'el-icon-male' : 'el-icon-female'" />
            </div>
            <el-button round size="small"
            style="position:absolute; top: 36%; right: 20%;"
            >edit my infos</el-button>
          </div>
          <div class="m_user_basic_info_list">
              <div class="m_user_info_item double_line_info">
                  <h4>follow</h4>
                  <div>{{userInfo.userStatistic.concernCount}}</div>
              </div>
            <div class="m_user_info_item double_line_info">
              <h4>followed</h4>
              <div>{{userInfo.userStatistic.fansCount}}</div>
            </div>
            <div class="m_user_info_item double_line_info">
              <h4>piece</h4>
              <div>{{userInfo.userStatistic.originalCount}}</div>
            </div>
            <div class="m_user_info_item double_line_info">
              <h4>guest</h4>
              <div>{{userInfo.userStatistic.personalPageViews}}</div>
            </div>
            <div class="m_user_info_item">
              <el-divider style="height: 100%" direction="vertical"></el-divider>
            </div>
            <div class="m_user_info_item">
              <div style="padding-top: 20px; overflow: hidden; text-overflow: ellipsis"><i class="el-icon-paperclip"></i> <el-link :href="userInfo.personalUrl">{{userInfo.personalUrl}}</el-link></div>
              <div style="padding-top: 10px;"><i class="el-icon-location-outline"></i> {{userInfo.userExtInfos.location}}
                <el-divider direction="vertical"></el-divider>
                <i class="el-icon-postcard">&nbsp;{{userInfo.userExtInfos.work}}</i>
                <el-divider direction="vertical"></el-divider>
                last active： {{userInfo.userStatistic.lastActiveDatetime}}
              </div>
            </div>
          </div>
      </div>
    </div>
    <div class="m_user_statistic_wrapper">
      <div class="m_user_piece_list">
        <el-row :gutter="20">
          <el-col :span="6"><div class="m_user_piece_card" @click="goVideList">
            <img src="../assets/home/video.jpg" >
            <div class="m_user_piece_tip"><h3>{{userInfo.userStatistic.videoCount}} videos</h3></div>
          </div></el-col>
          <el-col :span="6"><div class="m_user_piece_card" @click="goAudioList">
            <img src="../assets/home/音频封面.jpg">
            <div class="m_user_piece_tip"><h3>{{userInfo .userStatistic.radioCount}} audios</h3></div>
          </div></el-col>
          <el-col :span="6"><div class="m_user_piece_card">
            <img src="../assets/home/动态2.jpg">
            <div class="m_user_piece_tip"><h3>my planet</h3></div>
          </div></el-col>
          <el-col :span="6"><div class="m_user_piece_card">
            <img src="../assets/home/birds.png">
            <div class="m_user_piece_tip"><h3>{{userInfo.userStatistic.sharesCount}} whispers</h3></div>
          </div></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import userService from '@/api/user'
import StoreConst from "@/util/const";
import momentService from "@/api/moment";
export default {
  name: "UserPageHome",
  data(){
    return {
      userInfo: {
        userId: 0,
        username: '',
        avatarUrl: '',
        personalUrl: '',
        extId: 2,
        genderStr: '',
        userExtInfos:{
          birthday: '',
          location: '',
          work: '',
          gender: 0,

        },
        userStatistic: {
          concernCount: 0,
          fansCount: 0,
          id: 0,
          lastActiveDatetime: "",
          messageCount: 0,
          originalCount: 0,
          personalPageViews: 0,
          poolCount: 0,
          radioCount: 0,
          sharesCount: 0,
          userBaseId: 0,
          videoCount: 0

        }
      },
    }
  },
  methods: {
    goVideList(){
      let uname = this.userInfo.username
      let ud = this.userInfo.userId
      this.$router.push({
        name: 'Va',
        params: {
          type: 'video',
          username: uname,
          ud: ud

        },
      })
    },
    goAudioList(){
      this.$router.push({
        name: 'Va',
        params: {
          type: 'audio',
          username: this.userInfo.username,
          ud: this.userInfo.userId
        }
      })
    },
    getUserPageVo(){
      let currentUser = this.$route.params.uname
      if (currentUser){
        userService.get_user_page(currentUser).then(res => {
          if (res.data.status.statusCode === 200){
            this.userInfo = res.data.data
            this.$store.commit('setCUAvatar', res.data.data.avatarUrl)
          }
        }).catch( err => {
          console.log('get user page error' + err)
        })
      }
    }
  },
  mounted() {
    this.getUserPageVo()

  }
}
</script>

<style lang="less" scoped>

  .user_page{
    width:94.4%;
    padding: 30px 40px 40px 40px;
    margin: 0;
    position: relative;

  }
  .m_user_infos{
    margin: 0;
    width: 100%;
    height: 300px;
    .m_avatar_wrapper{
      width: 20%;
      height: 100%;
      float: left;
      img{
        width: 218px;
        height: 218px;
        padding: 3px;
        border: 1px solid rgb(213,213,213);
      }
      .el-image{
        width: 218px;
        height: 218px;
        padding: 3px;
        border: 1px solid rgb(213,213,213);
      }
    }
    .m_user_basic_info_wrapper{
      height: 100%;
      width: 70%;
      float: right;
      .m_user_name_wrapper{
        height: 100px;
        border-bottom: 1px solid rgb(213, 213, 213);
        position: relative;
        h3{
          width: 260px;
          padding-top: 20px;
          float: left;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        div{
          float: left;
        }
      }
      .m_user_basic_info_list{
        width: 100%;
        .m_user_info_item{
          float: left;
          height: 85px;

        }
        .double_line_info{
          width: 70px;
          text-align: center;
        }
      }
    }
  }

  .m_user_statistic_wrapper{
    width: 100%;
    /*height: 400px;*/
    padding-top: 30px;
    .m_user_piece_list{
      .m_user_piece_card{
        height: 300px;
        position: relative !important;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        img{
          height: 80%;
          width: 80%;
          margin: 0;
          padding: 10%;
          transition: all 0.3s;
        }
        .m_user_piece_tip{
          position: absolute;
          bottom: 17%;
          left: 15%;
          height: 70%;
          width: 70%;
          color: black;
          opacity: 0.5;
          border: 1px black solid;
          background: #fff;
          display: none;
          h3{
            margin-top: 50%;
            text-align: center;
          }
        }
      }
      .m_user_piece_card:hover{
          img{
            transform: scale(1.2);

          }
        .m_user_piece_tip{
          display: block;
        }
      }
    }
  }

</style>