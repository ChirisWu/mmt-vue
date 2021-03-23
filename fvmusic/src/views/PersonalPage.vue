<template>
    <div>
        <el-container>
            <el-header>
                <div class="header_wrapper">
                    <div class="logo_wrapper">
                        <img src="./loog.png" @click="goHome">
                    </div>
                    <div class="nav_wrapper">
                        <el-menu  mode="horizontal" router
                                  active-text-color="#ffd04b">
                            <el-menu-item index="/">回到主页</el-menu-item>
                            <el-menu-item :disabled="true">音乐故事</el-menu-item>
                            <el-menu-item :index="'/personal/infoDetails?userId=' + this.$store.getters.userInfo.id">我的主页</el-menu-item>
                            <el-menu-item index="/personal/friends">朋友</el-menu-item>
                            <el-menu-item index="/personal/createPool">创建音乐池</el-menu-item>
                        </el-menu>
                    </div>
                    <div class="avatar_wrapper">
                        <avatar-dropdown :avatarUrl="avatarUrl"></avatar-dropdown>
                    </div>
                </div>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import AvatarDropdown from '../components/header/AvatarDropdown'
    export default {
        name: "PersonalPage",
        components: {
            AvatarDropdown
        },
        data() {
            return {
                avatarUrl: this.$store.getters.isLogin ? this.$store.getters.userInfo.avatarUrl :'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            }
        },
        methods: {
            goHome(){
                this.$router.push('/')
            }
        },
        mounted(){
            // 获取个人信息
        }
    }
</script>

<style lang="less" scoped>
    .main_wrapper{
        width: 1100px;
        margin: 0 auto;
        border: silver 1px solid;
        border-top: none;
    }
    .el-header {
        background-color: rgb(36,36,36);
        color: #cccccc;
        height: 70px!important;
        border-bottom: 6px solid rgb(194, 12 ,12);

        .header_wrapper{
            width: 1100px;
            height: 100%;
            margin: 0 auto;
            .logo_wrapper{
                width: 100px;
                height: 100%;
                float: left;
                img{
                    width: 100%;
                    height: 100%;
                }


            }
            .nav_wrapper{
                width: 700px;
                height: 100%;
                float: left;
                .el-menu{
                    background-color: rgba(0,0, 0,0);
                    height: 100%;
                    margin: 0;
                    border: none;
                    padding: 0;
                    .el-menu-item{
                        height: 100%;
                        margin: 0;
                        width: 110px;
                        text-align: center;
                        border: none;
                    }
                    .el-menu-item:hover{
                        background-color: rgba(161, 160, 159, 0.73);
                    }
                }
            }
            .avatar_wrapper{
                height: 100%;
                width: 100px;
                padding-left: 100px;
                float: left;
                text-align: center;
            }

        }
    }
    .el-main {
        background-color: #fcfafa;
        padding: 0;
        height: auto !important;


    }

</style>