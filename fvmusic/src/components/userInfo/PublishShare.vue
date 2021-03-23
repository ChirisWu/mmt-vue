<template>
    <div class="main_wrapper">
        <div class="publish_wrapper">
            <el-form :model="articleParam" ref="articleParam" :rules="rules">
                <el-form-item prop="name">
                    <label for="title" style="font-size: 23px; font-weight: 800" class="label">标题(或音乐名）</label>
                    <el-input id="title" v-model="articleParam.name"></el-input>
                </el-form-item>
                <el-form-item prop="content">
                    <label class="label" for="content" style="font-size: 22px; font-weight: 800">分享你听到的景</label>
                    <el-input v-model="articleParam.content" id="content" type="textarea"  :autosize="{ minRows: 10, maxRows: 20}"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="articleParam.poolId" style="display: none"></el-input>
                </el-form-item>
                <el-form-item>
                    <label for="pool" style="font-size: 22px; font-weight: 800">发布到</label>
                    <el-input v-model="articleParam.poolName" disabled id="pool"></el-input>
                </el-form-item>
                <el-form-item style="display: none">
                    <el-input disabled v-model="articleParam.userId"></el-input>
                </el-form-item>
                <el-form-item prop="wangYiMusicUrl">
                    <label for="wyUrl">请输入网易云音乐链接</label>
                    <el-input v-model="articleParam.wangYiMusicUrl" id="wyUrl"></el-input>
                </el-form-item>
                <el-form-item style="display: none">
                    <el-input v-model="articleParam.wangYiMusicId"></el-input>
                </el-form-item>
            </el-form>
            <h4 style="font-size: 23px; font-weight: 800">上传配图</h4>
            <div class="upload_wrapper">
                <upload-photo @sendUrl="receiveUrl($event)"></upload-photo>
            </div>
            <el-button type="primary" plain style="margin: 30px 0 50px 900px; " @click="submitArticle" >发布</el-button>

        </div>
    </div>
</template>

<script>
    import UploadPhoto from "../upload/UploadPhoto";
    import http from "../../api/common-api";
    export default {

        name: "PublishShare",
        components: {UploadPhoto},
        data() {
            const validateWangYiUrl = (rule, value, callback) =>{
                this.articleParam.wangYiMusicUrl = this.articleParam.wangYiMusicUrl.replace(' ', '')
                value = this.articleParam.wangYiMusicUrl
                if (value === ''){
                    callback(new Error('网易云音乐链接不能为空'))
                }else if (!value.startsWith('https://music.163.com')){
                    callback(new Error('输入的链接不合法，请到该音乐主页查看链接'))
                }else{
                    callback()
                }
            }
            return {
                articleParam: {
                    name: '',
                    content: '',
                    photosUrl: '',
                    poolId:'',
                    poolName:'',
                    wangYiMusicUrl:'',
                    wangYiMusicId: '',
                    userId: this.$store.getters.userInfo.id,
                },
                rules: {
                    name: [
                        { required: true, message: '标题不能为空', trigger: 'blur'},
                        { max: 15, message: '最长不能超过15个字', trigger: 'blur'}
                    ],
                    content: [
                        { required: true, message: '内容不能为空', trigger: 'blur'}
                    ],
                    wangYiMusicUrl: [
                        { validator: validateWangYiUrl, trigger: 'blur'},

                    ]
                }

            }
        },
        methods: {
            receiveUrl(value) {
                console.log(value)
                this.articleParam.photosUrl=value
            },
            submitArticle(){
                this.$refs.articleParam.validate(valid => {
                    if (valid){
                        this.articleParam.wangYiMusicId = this.articleParam.wangYiMusicUrl.substring(this.articleParam.wangYiMusicUrl.indexOf('=') + 1)

                        if (this.articleParam.photosUrl === ''){
                            this.articleParam.photosUrl = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                        }
                        http.commonJsonPost('/article/create', this.articleParam)
                        .then( res => {
                            if (res.data.code === 200){
                                this.$message.success('发布成功')
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
            }
        },
        mounted(){
            this.articleParam.poolName = this.$route.query.poolName
            this.articleParam.poolId = this.$route.query.poolId
        }
    }
</script>

<style lang="less" scoped>
    .publish_wrapper{
        /*height: 900px;*/
        padding: 20px 50px;
        .title_wrapper{
            width: 100%;
            height: 120px;
            h3{
                font-size: 22px;
            }
            .el-input__inner{
                height: 50px!important;
            }


        }
        .upload_wrapper{
            width: 320px;
            height: 240px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            text-align: center;
        }
    }

</style>