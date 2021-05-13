<template>
  <div class="mmt_register_wrapper">
    <el-form class="mmt_register_form" :model="registerParam" ref="registerParam" :rules="reRules">
      <el-form-item prop="email">
        <el-input placeholder="email" v-model="registerParam.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="12">
            <el-input :blur="handleCodeBlur(registerParam.code)" style="font-size: 4px;"
                      placeholder="email verify code " v-model="registerParam.code"
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
          <el-input placeholder="name" v-model="registerParam.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="password" v-model="registerParam.password"  prefix-icon="el-icon-lock" type="password" :show-password="true"></el-input>
        </el-form-item>
        <el-form-item prop="passwordRpt">
          <el-input placeholder="conform password" v-model="registerParam.passwordRpt" prefix-icon="el-icon-lock" type="password" :show-password="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" round @click="doRegister">
            sign up
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
        callback(new Error('need emial'))
      } else if (validateEmail(value)) {
        callback(new Error('email format is invalid'))
      } else {
        callback()
      }
    }
    const validateUsername = (rule, value, callback) => {
      this.registerParam.username = this.registerParam.username.replace(' ', '')
      if (value === '') {
        callback(new Error('name is required'));
      } else if (validateSpecialChar(this.registerParam.username)) {
        callback(new Error('name can\'t contains special character except _ '))
      } else {
        callback(); //true
      }
    }
    const validatePassword = (rule, value, callback) => {
      this.registerParam.password = stripscript(value);
      value = this.registerParam.password;
      if (value === '') {
        callback(new Error("password is required"));
      } else if (validatePass(value)) {
        callback(new Error("for security, password should be 6-20 number-alphabet"));
      } else {
        callback();
      }
    };
    const  validatePassRpt = (rule, value, callback) => {
      if (value === ''){
        callback(new Error('repeat password to confirm'))
      } else if (value !== this.registerParam.password){
        callback(Error('twice password is not same'))
      } else {
        callback();
      }
    }
    return {
      hasVerifyCode: false,
      registerParam: {
        email: '',
        username: '',
        password: '',
        passwordRpt: '',
        code: ''
      },
      timer: null,
      codeButton: {
        text: 'send code',
        status: false
      },
      registerButton: {
        text: 'sign up',
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
      this.codeButton.text = 'sending...'
      accountService.getVerifyCode(this.registerParam.email).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.$message.success('code has send to your email')
          this.countDown(60)
          this.codeButton.status = false
        }
      }).catch(err => {
        console.log(err)
        this.codeButton.text = 'try again'
        this.codeButton.status = false
      })
    },
    doRegister() {

      this.$refs.registerParam.validate(valid => {
        if (valid){
          this.registerButton.text = 'wait seconds...'
          this.registerButton.disable = true
          accountService.register(this.registerParam)
          .then(res => {
            if (res.data.status.statusCode === 200){
              this.$message.success('register success！')
              this.$router.push('/login')
            }
            this.registerButton.text = 'sign up'
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
          this.codeButton.text = 'try again'
        } else {
          this.codeButton.status = true
          this.codeButton.text = `try again after ${time}s`   // es5 '倒计时' + time + '秒'
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