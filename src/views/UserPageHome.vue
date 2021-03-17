<template>
  <div class="user_page">
    <div class="m_user_infos">
        <div class="m_avatar_wrapper">
            <img src="https://p1.music.126.net/sEYSA9mcPF9UgP7szzgtdQ==/109951164314671311.jpg?param=180y180">
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
            >编辑个人资料</el-button>
          </div>
          <div class="m_user_basic_info_list">
              <div class="m_user_info_item double_line_info">
                  <h4>关注</h4>
                  <div>{{userInfo.userStatistic.concernCount}}</div>
              </div>
            <div class="m_user_info_item double_line_info">
              <h4>粉丝</h4>
              <div>{{userInfo.userStatistic.fansCount}}</div>
            </div>
            <div class="m_user_info_item double_line_info">
              <h4>原创</h4>
              <div>{{userInfo.userStatistic.originalCount}}</div>
            </div>
            <div class="m_user_info_item double_line_info">
              <h4>被访问</h4>
              <div>{{userInfo.userStatistic.personalPageViews}}</div>
            </div>
            <div class="m_user_info_item">
              <el-divider style="height: 100%" direction="vertical"></el-divider>
            </div>
            <div class="m_user_info_item">
              <div style="padding-top: 20px;"><i class="el-icon-paperclip"></i> <el-link :href="userInfo.personalUrl">{{userInfo.personalUrl}}</el-link></div>
              <div style="padding-top: 10px;"><i class="el-icon-location-outline"></i> {{userInfo.userExtInfos.location}}
                <el-divider direction="vertical"></el-divider>
                <i class="el-icon-postcard">&nbsp;{{userInfo.userExtInfos.work}}</i>
                <el-divider direction="vertical"></el-divider>
                上次活跃时间： {{userInfo.userStatistic.lastActiveDatetime}}
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPageHome",
  data(){
    return {
      userInfo: {
        userId: 0,
        username: 'Chiris_wuuuuuuuu',
        avatarUrl: '',
        personalUrl: 'https:github.com',
        extId: 2,
        genderStr: '女',
        userExtInfos:{
          birthday: '2020-3-16',
          location: '深圳',
          work: 'coder',
          gender: 0,

        },
        userStatistic: {
          concernCount: 0,
          fansCount: 0,
          id: 0,
          lastActiveDatetime: "2021-03-17 11:42:15",
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
      gender: 1
    }
  }
}
</script>

<style lang="less" scoped>

  .user_page{
    width:90%;
    height: 100%;
    padding: 30px 40px 40px 40px;
    margin: 0;

  }
  .m_user_infos{
    margin: 0;
    width: 100%;
    height: 270px;
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

</style>