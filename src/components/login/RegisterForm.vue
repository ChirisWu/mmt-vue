<template>
    <div class="mmt_register_wrapper">
        <el-form class="mmt_register_form" :model="registerParam" ref="registerParam" :rules="reRules">
            <el-form-item prop="email">
                <el-input placeholder="邮箱" v-model="registerParam.email"></el-input>
            </el-form-item>
            <el-form-item v-if="false">
                <label>设置一个密码</label>
                <el-input></el-input>
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
                        <el-button type="primary" plain @click="getVerifyCode" :disabled="verifyDisable">获取验证码
                        </el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <div class="mmt_register_info" v-if="isHasCode">
                <el-form-item prop="username">
                    <el-input placeholder="用户名" v-model="registerParam.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="密码" v-model="registerParam.password"></el-input>
                </el-form-item>
                <el-form-item prop="passwordRpt">
                    <el-input placeholder="确认密码" v-model="registerParam.passwordRpt"></el-input>
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
            return {
                hasVerifyCode: false,
                registerParam: {
                    email: '123@qq.com',
                    username: 'chiris',
                    password: '1234www',
                    passwordRpt: '1234www',
                    code: '123456'
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
                        {min: 6, max: 20, message: '密码长度只能在6-20个字符', trigger: 'blur'}

                    ],
                    passwordRpt: [
                        {
                            validator: () => this.registerParam.password.equals(this.registerParam.passwordRpt),
                            trigger: 'blur',
                            message: '两次输入的密码不一致'
                        },
                        { required: true, message: '再次输出密码，确保密码无输入错误', trigger: 'blur'}
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
                    return this.registerParam.email === ''
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
                accountService.getVerifyCode(this.registerParam.email).then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        this.$message.success('验证码已经发送到您的邮箱')
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            doRegister() {
                console.log('click')

                this.$refs.registerParam.validate(valid => {
                    if (valid){
                        console.log('valid')
                    }else{
                        return false
                    }
                })
            }
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