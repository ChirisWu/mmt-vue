<template>
  <div class="m_home">
    <div class="m_home_header">
      <div class="header_menu_wrapper">
        <el-menu mode="horizontal" class="m_header_menu" router>
          <el-menu-item class="m_header_menu_item_logo" index="/"><img src="../assets/logo/logo_transparent.png"/>
          </el-menu-item>
          <el-menu-item index="/square" class="m_header_menu_item">音乐广场</el-menu-item>
          <el-menu-item index="/moment" class="m_header_menu_item">音乐动态</el-menu-item>
          <el-menu-item index="/user" class="m_header_menu_item">我的主页</el-menu-item>
          <el-menu-item index="4" class="m_header_menu_item">投稿建议</el-menu-item>
        </el-menu>
        <div class="m_header_user_opt">
            <span class="m_header_user_search">
              <el-input size="small"  placeholder="搜索用戶/视频/音频">
              <template #suffix>
                <i class="el-input__icon el-icon-search"></i>
              </template>
              </el-input>
            </span>
          <span class="m_header_button_wrapper">
            <el-button  round size="small">创作中心</el-button>
          </span>

          <div class="m_header_avatar_wrapper">
              <el-dropdown>
                <span >
                 <el-avatar size="46" style="margin-top: 50%" >user</el-avatar>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item icon="el-icon-plus">创作</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-setting">设置</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-chat-dot-round">消息</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-help">关于</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-circle-check">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            <span style="margin-left: 40px;"> <router-link to="/">登 录</router-link></span> | <span><router-link to="/">注 册</router-link></span>
          </div>
        </div>
      </div>
    </div>

    <div class="m_home_content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConcretHomeWrapper",
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style scoped lang="less">

.m_home {
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;

  .m_home_header {
    width: 100%;
    height: 70px;
    background-color: rgb(36, 41, 46);
    color: rgb(255, 255, 255);

    .header_menu_wrapper {
      width: 80%;
      height: 100%;
      margin: 0 auto;

      .m_header_user_opt {
        width: 40%;
        height: 100%;
        float: right;
        position: relative;
        top: 0;
        .m_header_user_search{
          width: 200px;
          height: 100%;
          .el-input{
            width: 170px;
            margin-top: 20px;
          }
        }
        .m_header_button_wrapper{
          margin-left: 46px;
          .el-button{
            background: none;
            color: rgb(255,255,255);
            border: solid 1px slategrey;
          }
          .el-button:hover{
            border: solid 1px rgb(255, 255, 255);
          }
        }
        .m_header_avatar_wrapper{
          padding: 0;
          height: 100%;
          position: absolute;
          bottom: 0;
          right: 0;
          text-align: center;
          a{
            color: #cecccc;
            text-decoration: none;
            font-size: 13px;
          }
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
    height: 900px;
    margin: 0 auto;
    border: solid 1px rgb(213, 213, 213);
    border-top: none;
  }
}
</style>