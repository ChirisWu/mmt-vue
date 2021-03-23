<template>
    <div class="avatar_dropdown" >
        <el-dropdown @command="handleCommand">
        <el-avatar :src="avatarUrl" fit="cover"></el-avatar>
            <el-dropdown-menu slot="dropdown" class="drop_items"  >
                <el-dropdown-item :command="{path: '/personal/infoDetails', query: {userId: this.$store.state.userLoginInfo.userId}}">我的主页</el-dropdown-item>
                <el-dropdown-item command="/personal/message">我的消息</el-dropdown-item>
                <el-dropdown-item>个人设置</el-dropdown-item>
                <el-dropdown-item command="/">去主页</el-dropdown-item>
                <el-dropdown-item command="logout" >退出登录</el-dropdown-item>

            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import {removeToken} from "../../utils/auth";

    export default {
        name: "AvatarDropdown",
        props: {
            avatarUrl: String
        },
        methods: {
            goMyPage(){
                if (!this.$store.getters.isLogin){
                    this.$message.info('请先登录')
                    return
                }
                this.$router.push({path: '/personal/infoDetails', query: {userId: this.$store.getters.userInfo.id}})
            },
            logout(){
                this.$router.push('/')
                removeToken()
                localStorage.removeItem('user_login_info')
                localStorage.removeItem("userInfo")
            },
            goHome(){
                this.$router.push('/')
            },
            goMessagePage(){
                console.log('go message')
                this.$router.push('/personal/message')
            },
            handleCommand(command){
                if (command === 'logout'){
                    this.logout()
                    this.$router.push("/")
                    return;
                }
               this.$router.push(command)
            }

        }
    }
</script>

<style lang="less">

    .avatar_dropdown{
        width: 100%;
        height: 100%;
        .el-avatar{
            height: 50px;
            width: 50px;
            margin-top: 10px;
        }
    }
    .el-dropdown-menu{
        width: 140px!important;
        text-align: center;
        transform: translateX(33%);
        margin-top: 1px;
        border: none;
    }
    .drop_items{
        text-align: center;
        .el-button{
            width: 100%;
            height: 42px;
            padding: 0;
            margin: 0;
            display: block;
            border-radius: 0;
            border-bottom: none;
        }

    }

    .el-popper /deep/ .popper__arrow {
        border-bottom-color: #1EBEF4 !important;
        left: 50% !important;
        visibility: hidden;
    }

</style>