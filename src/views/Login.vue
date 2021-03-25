<template>
    <div class="mmt_login_wrapper">
        <div class="mmt_login_form_container">
            <el-row class="mmt_login_header">
                <el-col :span="7">
                    <img src="../assets/logo/logo.png">
                </el-col>
                <el-col :span="16"><h2>登录MLife</h2></el-col>
            </el-row>
          <router-view/>

        </div>

    </div>
</template>

<script>
import LoginForm from "@/components/login/LoginForm";
    export default {
        name: "Login",
      components: {
          LoginForm
      }
    }
</script>

<style lang="less" scoped>
    .mmt_login_wrapper{
        width: 100%;
        height: 100%;
        background: url('../assets/login/loginbg.jpg');
        background-size: cover;
        position: relative;
        padding-top: 5%;
        .mmt_login_form_container{
            width: 340px;
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

          .mmt_link_footer {
            padding: 0 40px;
            text-align: center;

            a {
              color: #606266;
              text-decoration: none;
              font-size: 14px;
            }
          }
        }
    }

</style>