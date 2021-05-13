<template>
  <div class="mmt_login_form_wrapper">
    <el-form class="mmt_login_form" :model="loginParam" ref="loginParam" :rules="rules"
             v-loading="loading"
             element-loading-text="signing in"
             element-loading-background="rgba(0,0,0,0.4)"
             element-loading-spinner="el-icon-loading"
    >
      <el-form-item style="text-align: center">
        <el-avatar :size="80" :src="avatar">Login</el-avatar>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
            v-model="loginParam.username"
            placeholder="username/email" prefix-icon="el-icon-user"
            :blur="handleUnameBlur(loginParam.username)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
            v-model="loginParam.password"
            placeholder="password" prefix-icon="el-icon-lock" type="password" :show-password="true"
          @keyup.enter="doLogin">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain round @click="doLogin">sign in</el-button>
      </el-form-item>
      <el-row class="mmt_link_footer">
        <el-col :span="12">
          <router-link to="register">sign up</router-link>
        </el-col>
        <el-col :span="12">
          <el-link>forget password?</el-link>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {validatePass, stripscript} from "@/util/validate";
import accountService from '@/api/login'
import {get_access_token, set_access_token, set_refresh_token} from "@/util/auth";
import {LAST_LOGIN_AVATAR, LAST_LOGIN_UNAME} from "../../util/auth";
import Constant from "../../util/const";

export default {
  name: "LoginForm",
  data() {

    const validateUsername = (rule, value, callback)=> {
      this.loginParam.username = this.loginParam.username.replace(' ', '')
      if (value === '') {
        callback(new Error('username required'));
      } else {
        callback(); //true
      }
    }
    const validatePassword =  (rule, value, callback) => {
      this.loginParam.password = stripscript(value);
      value = this.loginParam.password;
      if (value === '') {
        callback(new Error("password required"));
      } else if (validatePass(value)) {
        callback(new Error("password length is 6-20 and should be number-alphabet"));
      } else {
        callback();
      }
    };

    return {
      loginParam: {
        username: '',
        password: '',
      },
      last_login_u: localStorage.getItem(LAST_LOGIN_UNAME),
      login_avatar: '',
      rules: {
        username: [
          {validator: validateUsername, trigger: 'blur'}
        ],
        password: [
          {validator: validatePassword, trigger: 'blur'}
        ]
      },
      loading: false,

    }
  },
  computed: {
    avatar:{
      get() {
        return this.login_avatar
      },
      set(value){
        this.login_avatar = value
      }
    }
  },
  methods: {
    doLogin() {
      this.$refs.loginParam.validate(valid => {
        if (valid){
          this.loading = true
          accountService.access_token(this.loginParam.username, this.loginParam.password).then(res => {
            if (res.data.status.statusCode === 200){
              let data = res.data.data
              set_access_token(data.tokenHead + ' ' + data.token, data.expiresIn)
              set_refresh_token(data.refreshToken)
              // localStorage.setItem(Constant.localStoreUsernameKey, this.loginParam.username)
              this.$store.commit('setCurrentUsername', this.loginParam.username)
              this.loading = false
              this.$router.push({
                name: 'User',
                params:{
                  uname: this.loginParam.username
                }
              })

            }else{
              this.$message.info(res.data.status.msg)
            }
            this.loading = false
          }).catch(e =>{
            this.$message.error(e.message)
            console.log(e)
            this.loading = false
            this.$message.error(e.message)
            console.log(e.message)

          })
        }else{
          return false
        }
      })
    },
    handleUnameBlur(val){
      if (val === this.last_login_u){
        this.avatar = localStorage.getItem(LAST_LOGIN_AVATAR)
      }else{
        this.avatar = ''
      }
    }


  },
  mounted() {


  }
}
</script>

<style lang="less" scoped>
.mmt_login_form {
  padding: 40px 40px 0;
  padding: 40px;
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