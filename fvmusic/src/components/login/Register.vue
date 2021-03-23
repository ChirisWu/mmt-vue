<template>
    <div class="container">
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item prop="username">
                <label for="username">用户名</label>
                <el-input id="username" v-model="form.username" auto-complete="off" maxlength="12"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <label for="password">密码(6-20位的数字加字母)</label>
                <el-input id="password" v-model="form.password" auto-complete="off" maxlength="20" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="repeatPassword">
                <label for="repeatPassword">重复输入密码</label>
                <el-input id="repeatPassword" v-model="form.repeatPassword" maxlength="20" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="email">
                <label for="email">绑定的邮箱</label>
                <el-input id="email" v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <label for="code">验证码(6位的数字或字母)</label>
                <el-input id="code" v-model="form.code" auto-complete="off" maxlength="6"></el-input>
            </el-form-item>
        </el-form>
        <div class="button_container">
            <el-button type="success" :disabled="codeButton.status" @click="getEmailCode">{{codeButton.text}}</el-button>
            <el-button type="success" @click="handleRegister">注册</el-button>
        </div>
    </div>
</template>

<script>
    import http from "../../api/common-api";
    import {validatePass, validateEmail, validateCode, stripscript} from "../../utils/validate";
    export default {
        name: "Register",
        data() {
            const validateUsername = (rule, value, callback) => {
                this.form.username = this.form.username.replace(' ', '')
                value = this.form.username
                if (value === '') {
                    callback(new Error('请输入要注测的用户名'))
                } else {
                    callback()
                }
            }
            const validateEmails = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入邮箱'))
                } else if (validateEmail(value)) {
                    callback(new Error('邮箱格式有误'))
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                this.form.password = stripscript(value);
                value = this.form.password;
                if (value === '') {
                    callback(new Error("请输入密码"));
                } else if (validatePass(value)) {
                    callback(new Error("密码为6至20位数字+字母"));
                } else {
                    callback();
                }
            }
            const validateRepeatPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请重复密码，避免输入错误'))
                } else if (value !== this.form.password) {
                    callback(new Error('两次密码输入不一致,请重新输入！'))
                } else {
                    callback()
                }
            }
            const validateCodes = (rule, value, callback) => {
                this.form.code = this.form.code.replace(' ', '')
                value = this.form.code
                if (value === '') {
                    callback(new Error('验证码不能为空'))
                } else if (validateCode(value)) {
                    callback(new Error('验证码只能是六位的数字或字母'))
                } else {
                    callback()
                }
            }
            return {
                form: {
                    username: '',
                    password: '',
                    repeatPassword: '',
                    email: '',
                    code: ''
                },
                rules: {
                    username: [
                        {validator: validateUsername, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePassword, trigger: 'blur'}
                    ],
                    repeatPassword: [
                        {validator: validateRepeatPassword, trigger: 'blur'}
                    ],
                    email: [
                        {validator: validateEmails, trigger: 'blur'}
                    ],
                    code: [
                        {validator: validateCodes, trigger: 'blur'}
                    ]
                },
                timer: null,
                codeButton: {
                    text: '获取验证码',
                    status: false
                }
            }
        },
        methods: {
            getEmailCode() {
                this.form.email = this.form.email.replace(' ', '')
                if (this.form.email === ''){
                    this.$message({
                        message: '邮箱不能为空',
                        type: 'waring'
                    })
                }else if (validateEmail(this.form.email)){
                    this.$message({
                        message: '邮箱格式错误',
                        type: 'waring'
                    })
                }else {

                    this.codeButton.status = true
                    this.codeButton.text = '发送中'
                    // 获取验证码
                    http.commonUrlEncodingPost('/code', {email: this.form.email})
                        .then((response) => {
                            if (response.status === 200) {
                                this.$message({
                                    message: '验证码已成功发送至您的邮箱',
                                    type: 'success'
                                })
                                this.countDown(60)
                                this.codeButton.text = '再次获取'
                                this.codeButton.status = false
                            } else {
                                this.$message({
                                    message: response.data,
                                    type: 'error'
                                })
                            }
                        }).catch(error => {
                        this.$message({
                            message: error,
                            type: 'error'
                        })
                        this.codeButton.text = '再次获取'
                        this.codeButton.status = false
                    })
                }
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
                    this.codeButton.text = `${time}秒后重新获取`   // es5 '倒计时' + time + '秒'
                }
            }, 1000)
        },
        handleRegister() {
            this.$refs.form.validate( valid =>{
                if (valid){
                    this.codeButton.text = '获取验证码'
                    http.commonJsonPost('/register', this.form)
                    .then( response =>{
                        console.log(response)
                        if (response.data.code === 200){
                            this.$message({
                                message: '欢饮加入FvMusic',
                                type: 'success'
                            })
                            this.$router.push('/usernameLogin')
                        }else{
                            this.$message({
                                message: response.message,
                                type: 'waring'
                            })
                        }
                    }).catch(e => {
                        this.$message.error(e.message)
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
    .container {
        width: 100%;
        height: 100%;
    }

    .el-form-item {
        height: 70px;
        width: 275px;
        margin: 0 auto;
    }

    .button_container {
        width: 70%;
        height: auto;
        margin: 20px auto;

        .el-button {
            width: 120px;
            text-align: center !important;

            span {
                display: block;
                margin: auto;
            }
        }
    }

    .button_container :nth-of-type(odd) {
        float: left;

    }

    .button_container :nth-of-type(even) {
        float: right;
        width: 80px;
        margin-left: 0;

    }

    .el-form {
        height: 450px;
    }

</style>