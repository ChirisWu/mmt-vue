<template>
  <div class="m_home">
    <div class="m_home_header">
      <div class="header_menu_wrapper">
        <el-menu mode="horizontal" class="m_header_menu" router>
          <el-menu-item class="m_header_menu_item_logo" index="/"><img src="../assets/logo/logo_transparent.png"/>
          </el-menu-item>
          <el-menu-item index="/square" class="m_header_menu_item">square</el-menu-item>
          <el-menu-item index="/moment" class="m_header_menu_item">moment</el-menu-item>
          <el-menu-item :index="userPageRoute" class="m_header_menu_item">my page</el-menu-item>
          <el-menu-item index="4" class="m_header_menu_item">suggestion</el-menu-item>
        </el-menu>
        <div class="m_header_user_opt">
          <el-row class="mmt_header_opt" :gutter="40">
            <el-col :span="8" style="margin: auto 0">
              <el-input size="small"  placeholder="search user/video/radio">
                <template #suffix>
                  <i class="el-input__icon el-icon-search"></i>
                </template>
              </el-input>
            </el-col>
            <el-col :span="9" style="margin: auto 0">
              <el-button   round size="small" @click="handleGoCreation">creation</el-button>
            </el-col>
            <el-col :span="3">
              <div>
                <el-dropdown>
                <span >
                 <el-avatar :size="46" style="margin-top: 44%" :src="user_avatar">user</el-avatar>
                </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item icon="el-icon-plus">creation</el-dropdown-item>
                      <el-dropdown-item icon="el-icon-setting">settings</el-dropdown-item>
                      <el-dropdown-item icon="el-icon-chat-dot-round">message</el-dropdown-item>
                      <el-dropdown-item icon="el-icon-help">about</el-dropdown-item>
                      <el-dropdown-item icon="el-icon-circle-check" @click="logout">logout</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </el-col>
            <el-col :span="4" style="position: relative">
                <div v-if="!is_sign_in" style="position: absolute; bottom: 7px"> <span> <router-link to="/login">sign in/up</router-link></span></div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <div class="m_home_content">
      <router-view/>
    </div>
    <div class="m_home_footer_container">
      <home-footer/>
    </div>
  </div>
</template>

<script>
import { goCreation } from '@/router/userHomePage/userPageRoutes'
import { auth_logout } from "../util/auth";
import HomeFooter from "../components/common/HomeFooter";
export default {
  name: "ConcretHomeWrapper",
  components: {HomeFooter},
  data() {
    return {
      user_avatar: this.$store.getters.cu_avatar,
      is_sign_in: this.$store.getters.is_sign,
      userPageRoute: '/u/' + this.$store.getters.cu_username
    }
  },
  computed: {},
  methods: {
    handleGoCreation() {
      goCreation(this.$router)
    },
    logout(){
      this.$confirm('confirm to logout？', '', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        iconClass: 'el-icon-close'
      }).then(() => {
        if (!this.$store.is_sign_in){
          auth_logout()
        }
        this.$router.push('/login')
      }).catch(() => {
      });
    }

  },
  mounted() {
  }
}
</script>

<style scoped lang="less">

.m_home {
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  position: relative;

  .m_home_header {
    width: 100%;
    height: 70px;
    background-color: rgb(36, 41, 46);
    color: rgb(255, 255, 255);

    .header_menu_wrapper {
      width: 80%;
      height: 100%;
      margin: 0 auto;
      .mmt_header_opt{
        text-align: right;
        a{
          color: #ffffff;
          text-decoration: none;
          font-size: 13px;
        }
      }


      .m_header_menu {
        background: none;
        height: 100%;
        width: 50%;
        float: left;
        border-bottom: none;

        .m_header_menu_item_logo img {
          height: 100%;
        }

        .m_header_menu_item_logo:hover {
          background: none;
        }

        .el-menu-item {
          height: 100%;
          color: rgb(255, 255, 255);
        }

        .m_header_menu_item:hover {
          background-color: rgb(0, 0, 0);
        }

        .m_header_menu_item.is-active {
          background-color: rgb(0, 0, 0);
          border-bottom: none;
        }
      }
    }
  }

  .m_home_content {
    width: 70%;
    margin: 0 auto;
    border: solid 1px rgb(213, 213, 213);
    border-top: none;
  }
  .m_home_footer_container{
    width: 70%;
    margin: 0 auto 0 auto;
  }
}
</style>