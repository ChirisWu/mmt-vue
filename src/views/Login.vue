<template>
    <div class="mmt_login_wrapper">
        <div class="mmt_login_form_container">
            <el-row class="mmt_login_header">
                <el-col :span="7">
                    <img src="../assets/logo/logo.png">
                </el-col>
                <el-col :span="16"><h2>登录MLife</h2></el-col>
            </el-row>
            <el-form class="mmt_login_form">
                <el-form-item style="text-align: center">
                    <el-avatar :size="80" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="用户名或邮箱"></el-input>
                </el-form-item>
                <el-input placeholder="密码"></el-input>
                <el-form-item>
                    <el-button type="primary" plain>登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style lang="less" scoped>
    .mmt_login_wrapper{
        width: 100%;
        height: 100%;
        background: url('../assets/login/loginbg.jpg');
        background-size: cover;
        .mmt_login_form_container{
            width: 400px;
            height: 600px;
            margin: 0 auto;
            padding: 30px;
            border: 1px solid rgb(213, 213, 213);
            box-shadow: 0 2px 12px 0 rgba(64, 128, 255, 0.4);
            border-top: none;
            border-radius: 6px;
            .mmt_login_header{
                width: 100%;
                height: 100px;
                border-bottom:rgb(213,213,213) 1px solid;
                .el-col{
                    padding: 0;
                    margin: 0;
                    height: 100%;
                    h2{
                        height: 50%;
                        position: absolute;
                        bottom: 0;
                        margin: 0;
                    }
                }
                img{
                    height: 80%;
                    width: 80px;
                    padding: 10px;
                }
            }
        }
        .mmt_login_form{
            padding: 40px;
            margin-top: 40px;
            .el-input{
                margin: 10px 0;
            }
        }

    }

</style>