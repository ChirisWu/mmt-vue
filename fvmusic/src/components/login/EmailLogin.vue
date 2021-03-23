<template>
    <div class="form_box"
         v-loading="loading"
        element-loading-text="登陆中....">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-height="110" label-width="100">
            <el-form-item prop="email" class="email_input">
                <label for="email">邮箱</label>
                <el-input id="email" v-model="loginForm.email" auto-complete="off" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <label for="code">验证码</label>
                <el-input id="code" v-model="loginForm.code" auto-complete="off" maxlength="6"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="success" round style="width: 275px; margin: 10px auto;"
            :disabled="codeButton.status" @click="getEmailCode">{{codeButton.text}}</el-button>

        <el-button type="success" round style="width: 275px; margin: 10px auto;" @click="handleLogin"> 登 录</el-button>
    </div>
</template>

<script>
    import {validateEmail, validateCode} from "../../utils/validate";
    import http from "../../api/common-api";

    export default {
        name: "EmailLogin",

        data () {
            let validateAccount = (rule, value, callback) =>{
                    if (value === '') {
                        callback(new Error("请输入邮箱"))
                    }else if (validateEmail(value)){
                        callback(new Error("邮箱格式有误"))
                    }else{
                        callback()
                    }
                }
            let validateCodes = (rule, value, callback) =>{
                this.loginForm.code = this.loginForm.code.replace(' ', '')
                if (value === '') {
                    callback(new Error('验证码不能为空'))
                }else if (validateCode(value)){
                    callback(new Error('验证码只能是六位的数字或字母'))
                }else{
                    callback()
                }
            }
            return {
                loading: false,
                loginForm: {
                    email: '',
                    code: ''
                },
                rules: {
                    email: [
                        {validator: validateAccount, trigger: 'blur'}
                    ],
                    code: [
                        {validator: validateCodes, trigger: 'blur'}
                    ]
                },
                codeButton: {
                    text: '获取验证码',
                    status: false
                },
                timer: null
            }
        },
        methods: {
            getEmailCode (){
                    if(this.loginForm.email === ''){
                        this.$message({
                            message: '邮箱不能为空',
                            type: 'warning'
                        })
                        return
                    }else if (validateEmail(this.loginForm.email)){
                        this.$message({
                            message: '邮箱格式有误请重新输入',
                            type: 'warning'
                        })
                        return
                    }
                   this.codeButton.text = '发送中'
                   this.codeButton.status = true
                   // 获取验证码
                   http.commonUrlEncodingPost('/code', {email: this.loginForm.email})
                   .then((response) =>{
                       if (response.status === 200){
                           this.$message({
                               message: '验证码已成功发送至您的邮箱',
                               type: 'success'
                           })
                           this.countDown(60)
                           this.codeButton.text = '再次获取'
                       }else{
                            this.$message({
                                message: response.data,
                                type: 'error'
                            })
                       }
                   }).catch( error =>{
                        this.$message({
                            message: error,
                            type: 'error'
                        })
                        this.codeButton.text = '再次获取'
                        this.codeButton.status = false
                        })
            },
            countDown(num){
                if (this.timer !== null){
                    clearInterval(this.timer)
                }
                let time = num
                this.timer = setInterval(()=>{
                    time--;
                    if(time === 0) {
                        clearInterval(this.timer)
                        this.codeButton.status = false
                        this.codeButton.text = '再次获取'
                    }else{
                        this.codeButton.text = `${time}秒后重新获取`   // es5 '倒计时' + time + '秒'
                    }
                }, 1000)

            },
            handleLogin(){
                this.loading = true
                this.codeButton.status = false
                this.codeButton.text = '获取验证码'
                this.$refs.loginForm.validate(valid =>{
                    if (valid){
                        http.commonUrlEncodingPost('/loginByEmail',this.loginForm)
                        .then(response =>{
                            if (response.status === 200 && response.data.code === 200){
                                console.log(response)
                                this.$store.commit('setToken', response.data.data.token)
                                let userLoginInfo= {
                                    email: this.loginForm.email,
                                    userId: response.data.data.userInfo.id
                                }
                                this.$store.commit('setUserLoginInfo', userLoginInfo)
                                this.$store.commit('setUserInfo', response.data.data.userInfo)
                                this.$store.commit('setIsLogin', true)
                                this.$router.push('/')
                            }else{
                                this.$message({
                                    message: response.data.message,
                                    type: 'waring'
                                })
                            }
                            this.loading = false
                        }).catch(e =>{
                            this.$message({
                                message: e,
                                type: 'error'
                            })
                        })
                    }else{
                        return false
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .form_box{
        width: 100%;
        height: 100%;
        .el-button{
            transform: translateX(22%);
            position: relative;
            top: 30px;
        }
    }
    .el-form-item{
        width: 275px;
        margin: 4px auto;
    }

</style>