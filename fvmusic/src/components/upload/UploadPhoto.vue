<template>
    <div class="upload_wrapper">
        <el-tooltip class="item" effect="dark" content="点击 '+' 自动上传图片" placement="top">
        <el-upload
                class="avatar-uploader"
                :action="this.ossUploadUrl"
                :data="dataObj"
                ref="upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-tooltip>
    </div>
</template>

<script>
    import http from "../../api/common-api";
    import {generateFileName, generateFileUrl} from "../../utils/upload";
    export default {
        name: "UploadPhoto",
        data() {
            return {
                imageUrl: '',
                // oss 签名直传参数
                dataObj: {
                    policy: '',
                    signature: '',
                    key: '',
                    ossaccessKeyId: '',
                    dir: '',
                    host: '',
                },
                ossUploadUrl: 'https://fv-music.oss-cn-shanghai.aliyuncs.com',
                fileName: '',
            };
        },
        methods: {
            handleAvatarSuccess(res, file) {
                console.log(res)
                console.log(file)
                this.imageUrl = generateFileUrl(this.fileName)

                // 将url传递给父组件
                this.$emit('sendUrl', this.imageUrl)
            },
            beforeAvatarUpload(file) {
                this.fileName = generateFileName(this.$store.getters.userInfo.id, file.type, file.uid)
                return new Promise((resolve, reject) => {

                    http.get('/aliyun/oss/policy').then(response => {
                        console.log(response)
                        this.dataObj.policy = response.data.data.policy;
                        this.dataObj.signature = response.data.data.signature;
                        this.dataObj.ossaccessKeyId = response.data.data.accessKeyId;
                        this.dataObj.key = response.data.data.dir + '/' + this.fileName;
                        this.dataObj.dir = response.data.data.dir;
                        this.dataObj.host = response.data.data.host;
                        resolve(true)
                    }).catch(err => {
                        console.log(err)
                        reject(false)
                    })
                })
            },
        },
        mounted() {
        }
    }
</script>

<style lang="less" scoped>
    .upload_wrapper{
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 300px;
            height: 200px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 300px;
            height: 200px;
            display: block;
        }
    }
</style>