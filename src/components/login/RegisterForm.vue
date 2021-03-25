<template>
  <div class="mmt_register_wrapper">
      <el-form class="mmt_register_form" :model="registerParam" ref="registerParam">
        <el-form-item>
          <el-input placeholder="邮箱" v-model="registerParam.email"></el-input>
        </el-form-item>
        <el-form-item v-if="false">
          <label>设置一个密码</label>
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="12">
              <el-input :blur="handleCodeBlur(registerParam.code)" style="font-size: 4px;" placeholder="6位数字验证码" v-model="registerParam.code"
              maxlength="6" minlength="6" autocomplete="off"
              ></el-input>
            </el-col>
            <el-col :span="12" class="mmt_register_verify_button">
              <el-button type="primary" plain >获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <div class="mmt_register_info" v-if="isHasCode">
          <el-form-item>
            <el-input placeholder="用户名" v-model="registerParam.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="密码" v-model="registerParam.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="确认密码" v-model="registerParam.passwordRpt"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" round>
              注册
            </el-button>
          </el-form-item>
        </div>

      </el-form>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      hasVerifyCode: false,
      registerParam: {
        email:'',
        username: '',
        password:'',
        passwordRpt: '',
        code: ''
      }
    }
  },
  computed: {
    isHasCode: {
      get() {
        return this.hasVerifyCode
      },
      set(val){
        this.hasVerifyCode = val;
      }
    }
  },
  methods: {
    handleCodeBlur(code) {
      if (code.length === 6){
        this.isHasCode = true
      }else{
        this.isHasCode = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .mmt_register_wrapper{
    padding: 40px;
    margin-top: 40px;
    .mmt_register_verify_button{
      .el-input{
        font-size: 9px;
      }
      position: relative;
      .el-button{
        position: absolute;
        right: 0;
      }
    }
  }
</style>