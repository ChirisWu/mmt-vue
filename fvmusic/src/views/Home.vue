<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="header_info site_info">
          <div class="logo_container">
            <img src="./loog.png" style="height: 100px;width: 130px; position: absolute; left: 0; opacity: 1"/>
          </div>
          <div class="title">
            <h3 style="font-family: STXingkai; font-size: 2em; color: rgb(222,222,222)">分享你听到的景，on FvMusic。</h3>
          </div>
        </div>
        <div class="header_info user_info">
          <div class="avatar_container">
            <img :src="userInfoCmpt.avatarUrl " @click="goPersonalPage"
                 style="width: 100%; height: 100%; border-radius: 50%">
          </div>
          <div class="user_info_container">
              <ul>
                <li v-if="this.isLogin" class="uinfo_details"><span>{{userInfoCmpt.username}} &nbsp</span></li>
                <li  class="uinfo_details " v-if="!this.isLogin">
                  <el-link :underline="false"  style="font-size: 0.9em;" @click="goToLogin">登录</el-link> |
                  <el-link :underline="false"  style="font-size: 0.9em;" @click="goRegister">注册</el-link></li>
                <li class="uinfo_details" v-if="this.isLogin"><span>{{userInfoCmpt.sign === null ? '说点什么吧！' : userInfoCmpt.sign}}</span></li>
              </ul>
          </div>
          <div class="operator" >
<!--              <span style="margin-top: 30px; display: block" ><el-link   :underline="false"-->
<!--                                v-if="this.isLogin"-->
<!--                                @click="logout">退出登录</el-link></span>-->

            <el-dropdown :hide-on-click="false" @command="handleCommand">
              <span class="el-dropdown-link" style="color:rgb(222,222,222)">
                Look at me<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown" router>
                <el-dropdown-item  command="/login">登 录</el-dropdown-item>
                <el-dropdown-item command="/personal">我的主页</el-dropdown-item>
                <el-dropdown-item command="/register">注册新账号</el-dropdown-item>
                <el-dropdown-item command="/logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="nav_container">
          <el-menu unique-opened style="height: 71px; width: 100%; overflow: paged-x-controls; text-align: center;padding: 0;margin: 0;"
                   mode="horizontal" >
            <el-menu-item @click="changeMusicStyle(0)" style="height: 100%"><span>全部</span></el-menu-item>
            <span v-for="(item, index) in this.music_type" :key="index" style="text-align: center">
              <el-menu-item :index="item.id + ''" slot="pool" style="height: 100%" @click="changeMusicStyle(item.id)">
                <span>{{item.name}}</span>
              </el-menu-item>
            </span>
          </el-menu>
        </div>
        <router-view/>
      </el-main>
      <div class="ipc">
        <div class="ipc_infos">
            <div style="font-size: 14px;">@2020 fvmusic.cn 分享你听到的景 版权所有 互联网IPC备案：  <el-link :underline="false" href="http://beian.miit.gov.cn">陇ICP备2020003923号</el-link> </div>
            <div style="font-size: 14px;">推荐使用Chrome浏览器。下载链接： <el-link :underline="false" href="https://www.google.cn/chrome/">https://www.google.cn/chrome/    </el-link></div>
            <div style="font-size: 14px;">联系我：邮箱：forgetxue@163.com 或者 Fvmusic@163.com qq: 1969808957</div>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import MusicPool from "../components/pool/MusicPool";
import http from "../api/common-api";
import {removeToken} from "../utils/auth";

export default {
  name: 'Home',
  components: {
    MusicPool,

  },
  data () {
    return {

      nav_activeIndex: "1",
      music_type: this.$store.getters.musicStyles,
      currentMusicType: '',
      userInfo: {
        username: '',
        sign: '',
        avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        level: '',
      }
    }
  },
  computed: {
    userInfoCmpt :{
      get(){
        if (this.isLogin){
          return this.$store.getters.userInfo
        }else{
          return this.userInfo
        }
      }
    },
    isLogin: {
      get() {
        return this.$store.getters.isLogin
      }
    }
  },
  methods: {
    handleCommand(command){
      if (command === '/personal'){
        if (this.isLogin){
          this.$router.push({path: 'personal/infoDetails', query: {userId: this.userInfoCmpt.id}})
        }else{
          this.$confirm('您还未登录，是否立即登录?', '未登录', {
            confirmButtonText: '立即登录',
            cancelButtonText: '过会儿登录',
            type: 'info'
          }).then(() => {
            this.$router.push('/login')
          })
        }
      }else if (command === '/logout'){
        this.logout()
      }else{
        this.$router.push(command)
      }
    },
    goRegister() {
      this.$router.push('/register')
    },
    changeMusicStyle (id) {
        this.$router.push({path: '/pool/', query: {musicStyleId: id}})
        // location.reload()
        this.currentMusicType = id

      },
    goToLogin() {
      this.$router.push('/login')
    },
    goPersonalPage(){
      if (!this.isLogin){
        this.$message.error('请先登录')
        return;
      }
      let user = this.$store.getters.userInfo
      this.$router.push({path: '/personal', query: {userId: user.id}})
    },
    logout() {
      localStorage.removeItem('user_login_info')
      localStorage.removeItem("userInfo")
      removeToken()
      this.$store.commit('setIsLogin', false)
      // this.$router.go(0)
    }
  },
  mounted() {
    // 加载所有的音乐分类
    if(this.$store.getters.musicStyles === null){
      http.get('/pools/styles').then(res => {
        if(res.data.code === 200){
          this.$store.commit('setMusicStyles', res.data.data)
        }else{
          this.$message({
            message: '音乐分类获取失败',
            type: 'info'
          })
        }
      }).catch(e => {
        this.$message.error(e.message)
      })
    }

  }
}
</script>

<style lang="less" scoped>
  .ipc{
    width: 100%;
    height: 130px;
    background-color: #E9EEF3;
    .ipc_infos{
        width: 700px;
        height: 50px;
        margin: 20px auto;
        text-align: center;
        font-size: 14px;
    }
  }

  .el-header, .el-footer {
    /*color: #333;*/
    text-align: center;
    line-height: 60px;

  }
  .el-header{
    height: 100px !important;
    background-color: rgb(36,36,36);

  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding: 0;
    margin: 0;
    /*line-height: 160px;*/
  }
  .header_info{
    float: left;
  }
  .site_info{
    /*background-color: #B3C0D1;*/
    height: 100%;
    width: 65%;
  }
  .user_info{
    /*background-color: cornflowerblue;*/
    height: 100%;
    width: 35%;
    color: ghostwhite;
  }
  .avatar_container {
    /*background-color: ghostwhite;*/
    height: 60px;
    width: 60px;
    /*border-radius: 50%;*/
    position: relative;
    top: 20px;

  }
  .user_info_container{
    height: 100%;
    width: 55%;
    /*background-color: brown;*/
    float: left;
    position: relative;
    transform: translateX(40%);
    top: -60px;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    font-family: STKaiti;
    font-size: 1.2em;
    a{
      text-decoraction: none !important;
    }
  }
  .uinfo_details{
    height: 20px;
    margin: 20px 0 0 20px;

  }
  .operator{
    /*background-color: ghostwhite;*/
    height: 40%;
    width: 120px;
    float: right;
    z-index: 1000;
    margin-right: 30px;
    position: relative;
    bottom: 20px;
    text-align: center;
    .el-dropdown{
      height: 100%;
      .el-dropdown-menu__item{
        text-align: center !important;
      }
    }
  }
  .el-popper /deep/ .popper__arrow {
    border-bottom-color: #1EBEF4 !important;
    left: 50% !important;
    visibility: hidden;
  }
  .operator img:hover{
    box-shadow: 2px 4px 6px #000;
  }
  .el-menu-item{
    float: left !important;
    width: 100px !important;
  }
  .el-avatar{
    height: 100%;
    width: 100%;
  }
  .el-menu-item.is-active{
    border-bottom: none!important;
  }



</style>
