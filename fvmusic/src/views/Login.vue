<template>
    <div class="container">
        <div class="login_box">
            <div class="title">
                <h3 style="font-family: 'Mongolian Baiti';font-weight: inherit">登录 FvMusic</h3>
                <div class="menu">
                    <el-menu  mode="horizontal"
                              active-text-color="#ffd04b"
                              router
                                >
                        <el-menu-item index="/usernameLogin" >账号登录</el-menu-item>
                        <el-menu-item index="/emailLogin" >邮箱登录</el-menu-item>
                        <el-menu-item index="/register">注册</el-menu-item>
                    </el-menu>
                </div>
            </div>
            <div class="form_container">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data () {
            return {
                currentModel: 1
            }
        },
    }
</script>

<style lang="less" scoped>
    .login_box {
        width: 400px;
        height: 700px;
        margin: 0 auto;

    }
    .container,.form_box{
        background-image: url("backp.jpg");
        background-size: cover;
    }
    .container{
        position: relative;
        width: 100%;
        height: 100%;

        .ph{
            width: 700px;
            height: 576px;
            position: relative;
            left: 80px;
            top: 85px;
            padding-top: 100px;
            img{
                width: 600px;
                height: 340px;
            }

        }
    }

    .title{
        height: 10%;
        width: 100%;
        padding: 0;
        margin: 4px 0;
        color:  rbg(222,222,222);
        position: relative;
        border: 1.5px solid rgb(220, 223, 222);
        background-color: white;
        border-left: none;
        border-right: none;
        h3{
            float: left;
            width: 30%;
            position: absolute;
            bottom: 0;
        }
        .menu{
            float: right;
            width: 70%;
            height: 100%;
            position: relative;

        }
        .el-menu-item{
            width: 33%;
            text-align: center;
        }
        .el-menu{
            position: absolute;
            bottom: 0;
            width: 100%;
            color: #333333 !important;
        }


    }
    .form_container{
        width: 100%;
        height: 80%;
    }
</style>