<template>
  <div class="mmt_login_form_wrapper">
    <el-form class="mmt_login_form" :model="loginParam" ref="loginParam" :rules="rules">
      <el-form-item style="text-align: center">
        <el-avatar :size="80" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
            v-model="loginParam.username"
            placeholder="用户名或邮箱" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
            v-model="loginParam.password"
            placeholder="密码" prefix-icon="el-icon-lock" type="password" :show-password="true">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain round @click="doLogin">登录</el-button>
      </el-form-item>
      <el-row class="mmt_link_footer">
        <el-col :span="12">
          <router-link to="register">点击注册</router-link>
        </el-col>
        <el-col :span="12">
          <el-link>忘记密码?</el-link>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {validatePass, stripscript} from "@/util/validate";
import accountService from '@/api/login'
import {get_access_token, set_access_token, set_refresh_token} from "@/util/auth";

export default {
  name: "LoginForm",
  data() {

    const validateUsername = (rule, value, callback)=> {
      this.loginParam.username = this.loginParam.username.replace(' ', '')
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback(); //true
      }
    }
    const validatePassword =  (rule, value, callback) => {
      this.loginParam.password = stripscript(value);
      value = this.loginParam.password;
      if (value === '') {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6至20位数字+字母"));
      } else {
        callback();
      }
    };

    return {
      loginParam: {
        username: 'chiris',
        password: '196980wwx'
      },
      rules: {
        username: [
          {validator: validateUsername, trigger: 'blur'}
        ],
        password: [
          {validator: validatePassword, trigger: 'blur'}
        ]
      },

    }
  },
  methods: {
    doLogin() {
      this.$refs.loginParam.validate(valid => {
        if (valid){
          accountService.access_token(this.loginParam.username, this.loginParam.password).then(res => {
            console.log(res)
            if (res.data.status.statusCode === 200){
              // 登录成功
                // store token
              let data = res.data.data
              set_access_token(data.token, data.expiresIn)
              set_refresh_token(data.refreshToken)
              this.$router.push('/user')
            }else{
              this.$message.info(res.data.status.msg)
            }

          }).catch(e =>{
            this.$message.error(e)
            console.log(e)
          })
        }else{
          return false
        }
      })
    },


  },
  mounted() {
    // this.refreshToken()



  }
}
</script>

<style lang="less" scoped>
.mmt_login_form {
  padding: 40px 40px 0;
  margin-top: 40px;

  .el-input {
    margin: 7px 0;
  }

  .el-button {
    width: 100%;
    }

  .mmt_link_footer {
    text-align: center;

    a {
      color: #606266;
      text-decoration: none;
      font-size: 14px;
    }

    a:hover {
      color: #409EFF;
    }
  }
}

</style>