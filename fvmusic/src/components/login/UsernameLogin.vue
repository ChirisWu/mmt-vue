<template>
    <div class="form_box"
         v-loading="loading"
         element-loading-text="登陆中.....">
        <el-form :model="form" :rules="rules" ref="form" label-height="100">
            <el-form-item prop="username">
                <label for="usernameInput">用户名</label>
                <el-input id="usernameInput" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <label for="passwordInput">密码</label>
                <el-input id="passwordInput" v-model="form.password" type="password" autocomplete="false" @keyup.enter.native="handleLogin"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="success" round style="width: 275px; margin: 0 auto;" @click="handleLogin"> 登 录</el-button>
    </div>
</template>

<script>
    import http from "../../api/common-api";
    import {validatePass, stripscript} from '../../utils/validate'
    export default {
        name: "UsernameLogin",
        data() {
            const validatePassword =  (rule, value, callback) => {
                this.form.password = stripscript(value);
                value = this.form.password;
                if (value === '') {
                    callback(new Error("请输入密码"));
                } else if (validatePass(value)) {
                    callback(new Error("密码为6至20位数字+字母"));
                } else {
                    callback();
                }
            };
            const validateUsername = (rule, value, callback)=>{
                this.form.username = this.form.username.replace(' ', '')
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    callback(); //true
                }
            }
            return {
                loading: false,
                form: {
                    username: '',
                    password: ''
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
            handleLogin(){
                this.$refs.form.validate(valid =>{
                    if (valid){
                        this.loading = true
                        http.commonUrlEncodingPost('/login', this.form)
                        .then(response =>{
                            if (response.status === 200 && response.data.code === 200){
                                console.log(response.data)
                                this.$message({
                                    message: '登录成功',
                                    type: 'success'
                                });
                                this.$store.commit('setToken',response.data.data.token)
                                this.$store.commit('setUserLoginInfo', {
                                    username: this.form.username,
                                    userId: response.data.data.userInfo.id
                                })
                                this.$store.commit('setUserInfo', response.data.data.userInfo)
                                this.$store.commit('setIsLogin', true)
                                setTimeout(this.$router.push('/'),1500)

                            }else{
                                this.$message({
                                    message: response.data.message,
                                    type: 'waring'
                                });
                            }
                            this.loading = false
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
        /*transform: translateX(-9%);*/
        margin: 0 auto;
        height: 100px;
        input{
            padding: 0;
        }
    }
</style>