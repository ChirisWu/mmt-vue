<template>
    <div class="main_wrapper">
        <div class="create_pool_wrapper">
            <h2>创建一个新的MusicPool</h2>
            <el-form style="width: 100%" :model="poolParam" ref="poolParam" :rules="rules">
                <el-form-item prop="name">
                    <label for="name">Pool 的名字</label>
                    <el-input v-model="poolParam.name" id="name"></el-input>
                </el-form-item>
                <el-form-item prop="introduce">
                    <label for="introduce">简介</label>
                    <el-input  v-model="poolParam.introduce" type="textarea" id="introduce"
                              :autosize="{ minRows: 2, maxRows: 5}"
                            placeholder="留下pool的简介，更容易让别人注意到哦~"></el-input>
                </el-form-item>
                <el-form-item prop="mainMusicUrl">
                    <label for="wyUrl">Pool 的代表音乐</label>
                    <el-input v-model="poolParam.mainMusicUrl" id="wyUrl" placeholder="请输入网易云音乐链接"></el-input>
                </el-form-item>
                <el-form-item>
                    <div>Pool 的音乐类型</div>
                    <el-autocomplete id="style"
                            class="inline-input"
                            v-model="state2"
                            :fetch-suggestions="querySearch"
                            placeholder="选择音乐类型"
                            @select="handleSelect"
                    ></el-autocomplete>
                </el-form-item>
            </el-form>
            <div style="margin: 30px 0;">上传封面</div>
            <div class="upload_wrapper">
                <upload-photo @sendUrl="receiveUrl($event)"/>
            </div>
            <div class="button_wrapper">
                <el-button type="success" plain @click="handleSubmit">创 建</el-button>
                <el-button type="info" plain @click="handleCancel('poolParam')">取 消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import UploadPhoto from '../upload/UploadPhoto'
    import http from "../../api/common-api";
    export default {
        name: "CreatePool",
        components: {UploadPhoto},
        data() {
            const validateWangYiUrl = (rule, value, callback) =>{
                this.poolParam.mainMusicUrl = this.poolParam.mainMusicUrl.replace(' ', '')
                value = this.poolParam.mainMusicUrl
                if (value === ''){
                    callback(new Error('网易云音乐链接不能为空'))
                }else if (!value.startsWith('https://music.163.com')){
                    callback(new Error('输入的链接不合法，请到该音乐主页查看链接'))
                }else{
                    callback()
                }
            }
            return {
                poolParam: {
                    name: '',
                    introduce: '',
                    createUserId: this.$store.getters.userInfo.id,
                    mainMusicUrl: '',
                    musicTypeId: '',
                    coverUrl: ''
                },
                state2: '',
                styles: [],
                rules: {
                    name: [
                        { required: true, message: '名字不能为空', trigger: 'blur'}
                    ],
                    mainMusicUrl: [
                        { validator: validateWangYiUrl, trigger: 'blur' }
                    ],
                    introduce: [
                        {}
                    ],

                }
            }
        },
        methods: {
            querySearch(queryString, cb) {
                let styles = this.styles;
                let results = queryString ? styles.filter(this.createFilter(queryString)) : styles;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (styles) => {
                    return (styles.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item.id)
                this.poolParam.musicTypeId = item.id
            },
            receiveUrl(value) {
                this.poolParam.coverUrl = value
            },
            handleCancel(ref){
                this.$refs[ref].resetFields()
            },
            handleSubmit() {
                this.$refs.poolParam.validate(valid => {
                    if (valid){
                        // 如果没上传封面，替换为默认
                        sessionStorage.setItem('creatPool', JSON.stringify(this.poolParam))
                        if (this.poolParam.coverUrl === '') {
                            this.poolParam.coverUrl = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                        }
                        if (this.poolParam.musicTypeId === '') {
                            this.poolParam.musicTypeId = 10
                        }
                            http.commonJsonPost('/pools/create', this.poolParam).then( res => {
                                console.log(res)
                                if (res.data.code === 200){
                                    this.$message.success('创建成功')
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
        mounted() {
            let param = JSON.parse(sessionStorage.getItem('creatPool'))
            if (param !== null){
                this.poolParam = param
            }
            this.$store.getters.musicStyles.forEach(
                style => {
                    this.styles.push({
                        "id": style.id,
                        "value": style.name
                    })
                }
            )
        }
    }
</script>

<style lang="less" scoped>
    .create_pool_wrapper{
        padding: 30px 50px;
        .el-form-item{
            width: 70%;
        }
        .upload_wrapper{
            width: 340px;
            height: 260px;
            .upload_wrapper{
                width: 320px;
                height: 240px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
                text-align: center;
            }
        }
        .button_wrapper{
            height: 80px;
            width: 100%;

            button{
                float: right;
                margin: 30px 20px 0 0;
            }
        }
    }
</style>