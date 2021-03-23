<template>
    <div class="main_wrapper">
        <div class="edit_wrapper">
            <div class="avatar_upload_wrapper">
                <el-tooltip class="item" effect="dark" content="点击上传新的头像吧" placement="top">
                    <div class="avatar_container">
                        <el-upload
                                class="avatar-uploader"
                                :action="ossUploadUrl"
                                :data="dataObj"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="userInfoComputed.avatarUrl" :src="userInfoComputed.avatarUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </el-tooltip>
            </div>
            <div class="edit_basic_info"
                 v-loading="loading"
                 element-loading-text="更新中...."
                 element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-form :model="userInfo" :rules="basicInfoRules" ref="userInfo">
                    <el-form-item prop="username">
                        <label for="username">用户名</label>
                        <el-input id="username" v-model="userInfoComputed.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="qq">
                        <label for="qq">公开我的qq</label>
                        <el-input id="qq" v-model.number="userInfoComputed.qq" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <label for="skill">一技之长，guitar?</label>
                        <el-input id="skill" v-model="userInfoComputed.skill" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <label for="profession">我从事于，enjoy coding ?</label>
                        <el-input id="profession" v-model="userInfoComputed.profession" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item
                            prop="age"
                            :rules="[
                      { type: 'number', message: '年龄必须为数字值'}
                    ]"
                    >   <label for="age">是否告诉别人自己的年龄？</label>
                        <el-input id="age" type="age" autocomplete="off" v-model.number="userInfoComputed.age"></el-input>
                    </el-form-item>
                    <div style="margin-top: 50px; text-align: center; height: 40px; width: 300px;">
                        <el-button type="primary" plain @click="submitUpdate">更新</el-button>
                    </div>
                </el-form>
                <div class="account_safe_setting">
                    <div class="button_wrapper" >
                        <el-button type="warning" plain  @click="dialogFormVisible = true" >修改密码</el-button>
                        <el-button type="primary" plain  @click="dialogFormVisible2 = true">上传主页背景</el-button>
                    </div>

                    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">

                        <div slot="footer" class="update_pass_dig">
                            <el-form :model="updatePassword" status-icon :rules="UpdatePasswordRules" ref="updatePassword" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="原密码" prop="oldPassword">
                                    <el-input type="password" v-model="updatePassword.oldPassword" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="新密码" prop="newPassword">
                                    <el-input type="password" v-model="updatePassword.newPassword" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码" prop="repeatPassword">
                                    <el-input type="password" v-model="updatePassword.repeatPassword" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitUpdatePassword">提交</el-button>
                                </el-form-item>
                            </el-form>
                            <div class="dig_op_btn">
                                <el-button type="primary" @click="dialogFormVisible = false">关 闭</el-button>
                            </div>
                        </div>
                    </el-dialog>
                    <el-dialog title="上传主页背景" :visible.sync="dialogFormVisible2">
                        <div class="upload_container">
                            <UploadPhoto @sendUrl="updateUrl($event)"/>
                        </div>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="dialogFormVisible2 = false">完 成</el-button>
                        </div>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {validatePass} from "../../utils/validate";
    import http from "../../api/common-api";
    import {generateFileName, generateFileUrl} from "../../utils/upload";
    import UploadPhoto from '../../components/upload/UploadPhoto'
    import {removeToken} from "../../utils/auth";
    export default {
        name: "EditUserInfo",
        components: {
            UploadPhoto,
        },
        data() {
            const validateNewPassword = (rule, value, callback) => {
                this.updatePassword.newPassword = this.updatePassword.newPassword.replace(' ', '')
                value = this.updatePassword.newPassword
                if (value === ''){
                    callback(new Error('不能为空'))
                }else if (validatePass(value)){
                    callback(new Error('密码只能是6-20位的字母加数字组合'))
                }else if(value === this.updatePassword.oldPassword){
                    callback(new Error('新密码与旧密码一致'))
                } else{
                    callback()
                }
            }
            const validateRepeatPassword = (rule, value, callback) => {
                this.updatePassword.repeatPassword = this.updatePassword.repeatPassword.replace(' ', '')
                value = this.updatePassword.repeatPassword
                if (value !== this.updatePassword.newPassword){
                    callback(new Error('两次密码输入不一致，请重新输入'))
                }else{
                    callback()
                }
            }
            return {
                loading: false,
                ossUploadUrl: 'http://fv-music.oss-cn-shanghai.aliyuncs.com',
                // oss 签名直传参数
                dataObj: {
                    policy: '',
                    signature: '',
                    key: '',
                    ossaccessKeyId: '',
                    dir: '',
                    host: '',
                },
                dialogFormVisible: false,
                dialogFormVisible2: false,

                /**
                 * 更新密码参数
                 */
                updatePassword: {
                    oldPassword: '',
                    newPassword: '',
                    repeatPassword: '',
                    username: '',
                },
                UpdatePasswordRules: {
                    oldPassword: [
                        { required: true, message: '不能为空', trigger: 'blur'}
                        ],
                    newPassword: [
                        { validator: validateNewPassword, trigger: 'blur'}
                    ],
                    repeatPassword: [
                        { validator: validateRepeatPassword, trigger: 'blur'}
                    ]
                },
                basicInfoRules: {
                  username: [
                      { required: true, message: '用户名不能为空', trigger: 'blur'},
                      { max: 15, message: '最长只能15个字哦',trigger: 'blur'}
                  ],
                    qq: [
                        {type: 'number', message: '年龄只能是数字', trigger: 'blur'}
                    ]
                },
                userInfo: {
                    id: '',
                    username:'',
                    qq: '',
                    skill: '',
                    profession: '',
                    age: '',
                    avatarUrl: '',
                    email: '',
                    backgroundUrl: '',
                },
                avatarFilename: '',
            };
        },
        methods: {
            handleAvatarSuccess(res, file) {
                let url = generateFileUrl(this.avatarFilename)
                http.commonUrlEncodingPost('/userInfo/updateAvatar', {uId: this.userInfo.id, avatarUrl: url, username: this.userInfo.username})
                    .then(res => {
                        console.log(res)
                        if (res.data.code === 200){
                            this.$message.success("头像上传成功")
                            this.userInfo.avatarUrl = url
                        }else{
                            this.$message.error(res.data.message)
                        }
                    })
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                this.avatarFilename = generateFileName(this.userInfo.id, file.type, file.uid)
                return new Promise((resolve, reject) => {

                    http.get('/aliyun/oss/policy').then(response => {
                        console.log(response)
                        this.dataObj.policy = response.data.data.policy;
                        this.dataObj.signature = response.data.data.signature;
                        this.dataObj.ossaccessKeyId = response.data.data.accessKeyId;
                        this.dataObj.key = response.data.data.dir + '/' + this.avatarFilename;
                        this.dataObj.dir = response.data.data.dir;
                        this.dataObj.host = response.data.data.host;
                        resolve(true)
                    }).catch(err => {
                        console.log(err)
                        reject(false)
                    })
                })
            },
            submitUpdate () {
                this.$refs.userInfo.validate(valid => {
                    if (valid){
                        this.loading = true
                        let updateData = {
                            id: this.userInfo.id,
                            username: this.userInfo.username,
                            email: this.userInfo.email,
                            skill: this.userInfo.skill,
                            profession: this.userInfo.profession,
                            age: this.userInfo.age,
                            qq: this.userInfo.qq
                        }
                        http.commonJsonPost('/userInfo/update', updateData)
                        .then(res => {
                            console.log(res)
                            if (res.data.code ===  200){
                                this.$message.success('更新成功')
                                this.userInfo = res.data.data
                                this.$store.commit('setUserInfo', res.data.data)
                                this.loading = false
                            }else{
                                this.$message.info('更新失败')
                            }
                        }).catch(e => {
                            console.log(e.message)
                        })
                    }else{
                        return false;
                    }
                })
            },
            /**
             * 修改密码提交
             */
            submitUpdatePassword (){
                this.$refs.updatePassword.validate(valid =>{
                    if (valid){
                        let updatePasswordParam = {
                            newPassword: this.updatePassword.newPassword,
                            oldPassword: this.updatePassword.oldPassword,
                            uid: this.userInfo.id
                        }
                        http.commonJsonPost('/updatePassword', updatePasswordParam)
                        .then(res => {
                            console.log(res)
                            if (res.data.code === 200){
                                this.$message.success('密码修改成功请重新登录')
                                this.$router.push('/login')
                                removeToken()
                                this.$message.commit('setIsLogin', false)
                            }else{
                                this.$message.warning(res.data.message)
                            }
                        }).catch(e => {
                            this.$message.error(e.message)
                        })
                    }else{
                        return false
                    }
                })
            },
            updateUrl(value){
                http.commonUrlEncodingPost('/userInfo/uploadBackground',{
                    url: value,
                    uid: this.userInfo.id,
                    username: this.userInfo.username,
                    email: this.userInfo.email
                }).then(res => {
                    if (res.data.code === 200){
                        this.$message.success('上传成功')
                    }else{
                        this.$message.warning('上传失败')
                    }
                }).catch(e => {
                    this.$message.error('连接不上服务器，请检查网络')
                })
            }
        },
        mounted(){
            if (this.$store.getters.userInfo){
                this.userInfo = this.$store.getters.userInfo
            }
        },
        computed: {
            userInfoComputed (){
                return this.userInfo
            }
        }
    }
</script>

<style lang="less" scoped>
    .edit_wrapper {
        height: 660px;
        padding-top: 50px;
        /*background-color: darkslateblue;*/

        .avatar_upload_wrapper {
            width: 300px;
            height: 300px;
            float: left;
            padding: 30px 0 0 30px;

            .avatar_container {
                width: 178px;
                height: 178px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

            }

            /*background-color: cadetblue;*/

            .avatar-uploader .el-upload {
                border: 1px solid #636161;
                border-radius: 6px;
                cursor: pointer;
                /*position: relative;*/
                overflow: hidden;
            }

            .avatar-uploader .el-upload:hover {
                border-color: #409EFF;
            }

            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 178px;
                height: 178px;
                line-height: 178px;
                text-align: center;
            }

            .avatar {
                width: 178px;
                height: 178px;
                display: block;
                border: 1px solid silver !important;
            }
        }

        .edit_basic_info {
            width: 700px;
            height: 400px;
            float: left;
            padding-left: 30px;

            .el-form {
                width: 400px;
                height: 460px;
                float: left;
            }

            .el-form-item {
                width: 300px;
                height: 60px;
            }

            .account_safe_setting {
                width: 240px;
                height: 360px;
                float: left;
                .button_wrapper{
                    width: 130px;
                    float: right;
                    height: 100%;
                    position: relative;
                    padding-top: 100px;
                    button{
                        display: block;
                        margin: 30px 0 0 0;
                        width: 120px ;
                    }
                }
            }
        }
        .update_pass_dig{
            height: 400px!important;
            .dig_op_btn{
                width: 100px;
                height: 50px;
                position: absolute;
                bottom: 0;
                right: 0;
                button{
                    float: left;
                    margin-right: 20px;
                }
            }

        }
    }
    .upload_container{
        width: 300px;
        height: 200px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)

    }
</style>