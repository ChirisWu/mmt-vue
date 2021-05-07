<template>
  <div class="mmt_register_wrapper">
    <el-form class="mmt_register_form" :model="registerParam" ref="registerParam" :rules="reRules">
      <el-form-item prop="email">
        <el-input placeholder="邮箱" v-model="registerParam.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="12">
            <el-input :blur="handleCodeBlur(registerParam.code)" style="font-size: 4px;"
                      placeholder="6位数字验证码" v-model="registerParam.code"
                      maxlength="6" minlength="6" autocomplete="off"
            ></el-input>
          </el-col>
          <el-col :span="12" class="mmt_register_verify_button">
            <el-button style="width: 112px;" type="primary" plain @click="getVerifyCode" :disabled="verifyDisable">{{ codeButton.text}}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <div class="mmt_register_info" v-if="isHasCode">
        <el-form-item prop="username">
          <el-input placeholder="用户名" v-model="registerParam.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="密码" v-model="registerParam.password"  prefix-icon="el-icon-lock" type="password" :show-password="true"></el-input>
        </el-form-item>
        <el-form-item prop="passwordRpt">
          <el-input placeholder="确认密码" v-model="registerParam.passwordRpt" prefix-icon="el-icon-lock" type="password" :show-password="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" round @click="doRegister">
            注册
          </el-button>
        </el-form-item>
      </div>

    </el-form>
  </div>
</template>

<script>
import accountService from "@/api/login";
import {validateEmail, stripscript, validatePass} from "@/util/validate";
import {validateSpecialChar} from "../../util/validate";

export default {
  name: "RegisterForm",
  data() {
    const emailValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('需要先输入邮箱'))
      } else if (validateEmail(value)) {
        callback(new Error('邮箱格式不对'))
      } else {
        callback()
      }
    }
    const validateUsername = (rule, value, callback) => {
      this.registerParam.username = this.registerParam.username.replace(' ', '')
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (validateSpecialChar(this.registerParam.username)) {
        callback(new Error('用户名不能包除\'_\'以外含特殊字符'))
      } else {
        callback(); //true
      }
    }
    const validatePassword = (rule, value, callback) => {
      this.registerParam.password = stripscript(value);
      value = this.registerParam.password;
      if (value === '') {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码必须为6至20位数字+字母"));
      } else {
        callback();
      }
    };
    const  validatePassRpt = (rule, value, callback) => {
      if (value === ''){
        callback(new Error('请确认密码输入无误'))
      } else if (value !== this.registerParam.password){
        callback(Error('两次密码输入不一致'))
      } else {
        callback();
      }
    }
    return {
      hasVerifyCode: false,
      registerParam: {
        email: '123@qq.com',
        username: 'chiris',
        password: '1234www',
        passwordRpt: '1234www',
        code: '123456'
      },
      timer: null,
      codeButton: {
        text: '获取验证码',
        status: false
      },
      registerButton: {
        text: '注册',
        disable: false
      },
      reRules: {
        email: [
          {validator: emailValidator, trigger: 'blur'}
        ],
        username: [
          {validator: validateUsername, trigger: 'blur'}
        ],
        password: [
          {validator: validatePassword, trigger: 'blur'},
          { min: 6, max: 20, message: '密码长度只能在6-20个字符', trigger: 'blur' }

        ],
        passwordRpt: [
          { validator: validatePassRpt, trigger: 'blur'}
        ]

      }
    }
  },
  computed: {
    isHasCode: {
      get() {
        return this.hasVerifyCode
      },
      set(val) {
        this.hasVerifyCode = val;
      }
    },
    verifyDisable: {
      get() {
        return this.registerParam.email === '' || this.codeButton.status
      }

    }
  },
  methods: {
    handleCodeBlur(code) {
      this.isHasCode = code.length === 6;
    },
    getVerifyCode() {
      if (this.registerParam.email === '' || validateEmail(this.registerParam.email)) {
        return
      }
      this.codeButton.status = true
      this.codeButton.text = '正在发送...'
      accountService.getVerifyCode(this.registerParam.email).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.$message.success('验证码已经发送到您的邮箱')
          this.countDown(60)
          this.codeButton.status = false
        }
      }).catch(err => {
        console.log(err)
        this.codeButton.text = '再次获取'
        this.codeButton.status = false
      })
    },
    doRegister() {

      this.$refs.registerParam.validate(valid => {
        if (valid){
          this.registerButton.text = '请稍后...'
          this.registerButton.disable = true
          accountService.register(this.registerParam)
          .then(res => {
            if (res.data.status.statusCode === 200){
              this.$message.success('注册成功！')
              this.$router.push('/login')
            }
            this.registerButton.text = '注册'
            this.registerButton.disable = true
          })
        }else {
          return false
        }
      })
    },
    countDown(num) {
      if (this.timer !== null) {
        clearInterval(this.timer)
      }
      let time = num
      this.timer = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(this.timer)
          this.codeButton.status = false
          this.codeButton.text = '再次获取'
        } else {
          this.codeButton.status = true
          this.codeButton.text = `${time}s后重试`   // es5 '倒计时' + time + '秒'
        }
      }, 1000)
    },
  }
}
</script>

<style lang="less" scoped>
.mmt_register_wrapper {
  padding: 40px;
  margin-top: 40px;

  .mmt_register_verify_button {
    .el-input {
      font-size: 9px;
    }

    position: relative;

    .el-button {
      position: absolute;
      right: 0;
    }
  }
}
</style>