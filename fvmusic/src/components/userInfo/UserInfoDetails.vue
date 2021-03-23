<template>
    <div class="main_wrapper">
        <div class="basic_info_wrapper" :style="{backgroundImage: 'url(' + userInfo.backgroundUrl + ')'}">
            <div style="height: 100px; width: 100%;">

                <div style="width: 400px; height: 80px;float: left; text-align: center; font-size: 22px;line-height: 80px; padding-top: 20px;"><el-avatar :size="70" :src="userInfo.avatarUrl"></el-avatar> {{userInfo.username}}
                </div>
                <div style="float: right; height: 100%; position:relative;">
                    <el-button plain round style="position:absolute; bottom: 12px; right: 120px;" @click="goEditPage" v-if="this.isSelfPage">编辑个人资料</el-button>
                </div>
            </div>
            <div style="height: 1px; background-color: #999999;width: 80% !important;%; margin: 0 auto!important;"/>
            <div style="width: 80%; margin: 10px auto 0; height: 120px; padding: 0 20px; ">
                <div class="info_card">
                    <div class="info_card_number">{{userInfo.articleCount}}</div>
                    <div>分享</div>
                </div>
                <div class="info_card">
                    <div class="info_card_number">{{userInfo.createPools}}</div>
                    <div>pools</div>
                </div>
                <div class="info_card">
                    <div class="info_card_number">{{userInfo.concernCount}}</div>
                    <div ><router-link to="/personal/concern">关注</router-link></div>
                </div>
                <div class="info_card">
                    <div class="info_card_number">{{userInfo.fansCount}}</div>
                    <div><router-link to="/personal/concern">粉丝</router-link></div>
                </div>
            </div>
            <el-row style="width: 80%; margin: 15px auto; height: 60px;">
                <el-tag>favourite: {{userInfo.favouriteMusicStyles != null ?  userInfo.favouriteMusicStyles : '待填写'}}</el-tag>
                <el-tag type="success">job in {{userInfo.profession != null ? userInfo.profession : '待填写'}}</el-tag>
                <el-tag type="info">good at {{userInfo.skill != null ? userInfo.skill : '待填写'}}</el-tag>
                <el-tag type="warning">{{userInfo.age != null ? userInfo.age + ' years old' : 'Ta的年龄深不可测'}}</el-tag>
                <el-tag >Q ta: {{userInfo.qq != null ?  userInfo.qq : '还没公开哦'}}</el-tag>
            </el-row>
            <el-row style="height: 70px; width: 80%; margin: 5px auto;">
                <span style="color: #333333; font-size: 19px; font-weight: bold">says to you</span>
                <div v-show="!editSignStatus">
                    <p style="line-height: 20px; text-overflow: ellipsis">{{userInfo.sign != null ? userInfo.sign : '这个人很懒什么都没留下~'}}
                        <el-button @click="editSign"
                                   size="small"
                                   style="margin-left: 10px;"
                                   icon="el-icon-edit" circle
                                   v-if="isSelfPage"
                        ></el-button>
                    </p>
                </div>

                <div class="edit_sign" v-show="editSignStatus">
                    <el-input style="width: 400px;"
                              v-model="userInfo.sign"
                              ></el-input>
                    <el-button type="info" plain @click="cancelEditSign">取消</el-button>
                    <el-button type="success" plain @click="submitSign">确认</el-button>
                </div>
            </el-row>

        </div>
        <div class="articles_wrapper">
            <el-row style="height: 70px; padding-left: 50px;"><h3 >My Shares</h3></el-row>
            <div style="height: 1px; background-color: #999999;width: 100% !important;%; margin: 0 auto!important;"/>
            <h3 style="text-align: center; font-size: 23px; padding-top: 30px;" v-if="this.userArticles.length === 0">0 shares</h3>

            <el-collapse accordion v-for="(item, index) in userArticles"
                         v-model="collActiveName" @change="handleCollChange">
                <el-collapse-item :name="item.articleId + ''">
                    <template slot="title">
                        <div style="padding: 0 40px;">
                            <div style="float: left; width: 600px; overflow: hidden; text-overflow: ellipsis">{{item.articleName}}</div>
                            <div style="width: 100px; float: right">
                                <svg style="transform: translateY(20%)" t="1601376748605" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7266" width="32" height="32"><path d="M298.155 403.601c-43.565 0.395-56.901 16.984-56.901 37.934 0 20.952 15.113 37.935 56.901 37.935 41.79 0 56.905-16.984 56.905-37.935s-13.338-38.331-56.905-37.934z m227.614 0c-43.567 0.395-56.905 16.984-56.905 37.934 0 20.952 15.115 37.935 56.905 37.935 41.788 0 56.901-16.984 56.901-37.935 0.001-20.951-13.336-38.331-56.901-37.934z m142.256-253.55H383.511c-172.849 0-312.967 140.12-312.967 312.967 0 112.509 59.367 211.151 148.483 266.31 38.117 23.594 22.226 179.433 22.226 179.433s186.946-132.776 199.159-132.776h227.613c172.849 0 312.967-140.12 312.967-312.967S840.874 150.051 668.025 150.051z m0.387 585.628H433.059c-10.721 0-153.872 97.21-153.872 97.21s-6.404-118.311-40.405-138.034c-71.3-41.359-129.705-145.439-130.304-233.022-0.967-141.385 132.829-272.858 274.645-273.846h285.29c137.871 0 274.647 136.418 274.647 273.846-0.001 144.334-135.791 275.821-274.648 273.846z m84.968-332.078c-43.565 0.395-56.901 16.984-56.901 37.934 0 20.952 15.113 37.935 56.901 37.935 41.79 0 56.903-16.984 56.903-37.935s-13.336-38.331-56.903-37.934z" p-id="7267"></path></svg>
                                {{item.commentsCount > 999 ? ' 999+' : ' ' + item.commentsCount}}
                            </div>
                            <div style=" width: 100px; float: right">
                                <svg style="transform: translateY(20%)" t="1601376848657" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8364" width="32" height="32"><path d="M499.432727 886.225455h-192.465454c-12.8 0-23.272727-10.472727-23.272728-23.272728s10.472727-23.272727 23.272728-23.272727h192.465454c12.8 0 23.272727 10.472727 23.272728 23.272727s-10.472727 23.272727-23.272728 23.272728z" fill="#040000" p-id="8365"></path><path d="M306.734545 886.225455H165.236364c-25.6 0-46.545455-20.945455-46.545455-46.545455V462.196364c0-25.6 20.945455-46.545455 46.545455-46.545455h141.498181c12.8 0 23.272727 10.472727 23.272728 23.272727v424.029091c0 12.8-10.24 23.272727-23.272728 23.272728zM165.236364 462.196364v377.483636h118.225454V462.196364H165.236364z" fill="#040000" p-id="8366"></path><path d="M737.978182 886.225455h-114.967273c-12.8 0-23.272727-10.472727-23.272727-23.272728s10.472727-23.272727 23.272727-23.272727h114.967273c11.636364 0 21.643636-8.378182 23.505454-20.014545l54.923637-329.774546c1.163636-6.981818-0.698182-13.963636-5.352728-19.316364-4.654545-5.352727-11.170909-8.378182-18.152727-8.378181h-224.116363c-21.643636 0-42.356364-11.403636-52.596364-28.858182-8.843636-14.894545-8.843636-32.116364-0.232727-47.243637 28.392727-50.269091 46.545455-171.054545 33.047272-190.138181-4.654545-4.421818-11.869091-10.472727-18.618181-10.472728-6.516364 0-13.963636 5.818182-18.85091 10.938182-3.258182 4.421818-11.869091 27.229091-18.850909 45.614546-30.952727 82.385455-83.083636 220.392727-186.181818 220.392727-12.8 0-23.272727-10.472727-23.272727-23.272727s10.472727-23.272727 23.272727-23.272728c70.981818 0 117.527273-123.810909 142.661818-190.138181 13.730909-36.305455 20.014545-52.829091 29.323637-62.138182 32.581818-32.581818 71.214545-32.349091 103.563636 0 40.029091 40.029091 1.629091 196.654545-25.832727 245.527272 0 2.094545 4.887273 6.749091 12.334545 6.749091h224.116364c20.712727 0 40.261818 9.076364 53.76 24.901819s19.083636 36.538182 15.592727 57.018181L807.563636 827.345455a70.283636 70.283636 0 0 1-69.585454 58.88z" fill="#040000" p-id="8367"></path></svg>
                                {{item.greatCount > 999 ? '99+' : ' ' + item.greatCount}}
                            </div>
                        </div>
                    </template>
                    <div class="user_article_content_wrapper">
                        <div style="width: 100%; height: 200px; border-bottom: #999999 solid 1px;">
                            <div class="photo_wrapper">
                                <img style="object-fit: contain; width: 100%; height: 99% " :src="articleContentComputed.photosUrl"/>
                            </div>
                            <div class="player_wrapper">
                                <div class="tips_wrapper" style="height: 60px;width: 300px; position: absolute; top: 50px;right: 0">
                                <el-tooltip class="item" effect="dark" content="由于歌曲需要会员权限，请登录网易云音乐欣赏" placement="top">
                                    <el-button style="margin: 0 30px;">无法播放?</el-button></el-tooltip>
                                    <el-link :underline="false" :href="'https://music.163.com/#/song?id=' + articleContentComputed.musicWYId">去网易云</el-link>
                                </div>
                                <iframe style="position:absolute; bottom: 0;"
                                        frameborder="no" border="0" marginwidth="0" marginheight="0" width=460 height=79
                                        :src="'https://music.163.com/outchain/player?type=2&id=' + articleContentComputed.musicWYId +'&auto=1&height=66'"></iframe>
                            </div>
                            <div style="height: 1px; background-color: #999999;width: 100% !important;%; margin: 0 auto!important;"/>
                        </div>
                        <p>{{articleContentComputed.content}}</p>
                        <div>when {{articleContentComputed.articleCreatDateTime}}</div>
                    </div>
                </el-collapse-item>
            </el-collapse>

        </div>
        <el-row style="height: 70px; padding-left: 50px;"><h3 >My Pools</h3></el-row>
        <div style="height: 1px; background-color: #999999;width: 100% !important;%; margin: 0 auto!important;"/>
        <h3 style="text-align: center; font-size: 23px; padding-top: 30px;" v-if="this.userPools.length === 0">0 Pool</h3>
        <div class="pools_wrapper">
            <div class="pools_container">
                <div class="pool_card_wrapper" v-for="(item, index) in userPools">
                    <el-card >
                        <img :src="item.coverUrl" style="object-fit: cover" @click="goPoolDetails(item.poolId, item.name)"/>
                        <div class="pool_info_wrapper" style="height: 100px;">
                            <h4 style="margin: 0;padding-left: 20px; padding-top: 10px">{{item.name}}</h4>
                            <div style="padding-left: 20px;">
                                <span>
                                    <svg style="transform: translateY(25%)" t="1601389652213" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7291" width="32" height="32"><path d="M481 511.4c49.4 0 89.5 32.1 89.5 71.6 0 39.5-40.2 71.6-89.5 71.6s-89.5-32.1-89.5-71.6c0-39.5 40.1-71.6 89.5-71.6m0-35.8c-69.2 0-125.3 48.1-125.3 107.4 0 59.3 56.1 107.4 125.3 107.4s125.3-48 125.3-107.4c0-59.3-56.1-107.4-125.3-107.4zM217.4 442.8c-0.8 0-1.5-0.1-2.3-0.3-4.8-1.2-7.6-6.1-6.4-10.9 1.4-5.2 2.9-10.3 4.5-15.4 1.5-4.7 6.5-7.3 11.2-5.8 4.7 1.5 7.3 6.5 5.8 11.2-1.5 4.8-2.9 9.6-4.2 14.5-1 4-4.6 6.7-8.6 6.7z m17.8-49.7c-1.3 0-2.5-0.3-3.7-0.8-4.5-2.1-6.5-7.4-4.4-11.9 30.4-65.9 83.1-119.6 148.5-151.2 4.5-2.2 9.8-0.3 12 4.2 2.2 4.5 0.3 9.8-4.2 12-61.6 29.8-111.4 80.5-140 142.6a9.16 9.16 0 0 1-8.2 5.1z" fill="#515151" p-id="7292"></path><path d="M511.8 959C265 959 64.2 758.2 64.2 511.4c0-232.7 174.5-424.3 406-445.7 13.7-1.3 27.7-1.9 41.6-1.9 9.9 0 17.9 8 17.9 17.9s-8 17.9-17.9 17.9c-12.8 0-25.7 0.6-38.3 1.7C260.6 121.1 100 297.3 100 511.4c0 227 184.7 411.8 411.8 411.8s411.8-184.7 411.8-411.8c0-63.6-14.1-124.5-41.9-181.2-8.9-18.2-19.3-35.9-30.9-52.6-5.6-8.1-3.6-19.3 4.6-24.9 8.1-5.6 19.3-3.6 24.9 4.6 12.5 18.1 23.8 37.4 33.5 57.2 30.2 61.6 45.6 127.9 45.6 196.9C959.3 758.2 758.6 959 511.8 959z m76.7-358.1c-9.9 0-17.9-8-17.9-17.9V128.4c0-27.9 14.6-47.9 38.1-52.2 0.3-0.1 6.8-1.5 13.1 0.1v-0.1c54.3 13 103.4 36.6 154.6 74.2 15.6 11.5 30.7 24.2 44.9 37.7 7.1 6.8 7.4 18.2 0.6 25.3s-18.2 7.4-25.3 0.6c-13-12.4-26.9-24.1-41.3-34.7-46.5-34.2-91-55.7-139.7-67.7h-1.1c-5.6 1.8-8.1 7.4-8.1 16.8V583c0 9.9-8.1 17.9-17.9 17.9z" fill="#515151" p-id="7293"></path></svg>
                                    {{item.articlesCount}} shares
                                    <el-divider direction="vertical"/>
                                    created:  {{strDate(item.createDateTime)}}
                                </span>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {dateFormat} from '../../utils/dateFormat'
    import http from "../../api/common-api";
    export default {
        name: "UserInfoDetails",
        data () {
            return {
                collActiveName: [],
                userInfo: {
                    username: '请登录',
                    level: 0,
                    backgroundUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                    articleCount: 0,
                    concernCount: 0,
                    fansCount: 0,
                    profession: '',
                    skill: '',
                    age: '',
                    favouriteMusicStyles: '',
                    qq: '该用户没有公开qq',
                    email: '',
                    sign: '这个人很懒，什么都没留下...',
                    createPools: 0,

                },
                // 挂载时只获取文章的名字，点赞数， 评论数，文章具体内容点击打开后加载
                userArticles: [
                    {
                        articleName: '',
                        greatCount: 0,
                        commentsCount: 0,
                        articleId: 0
                    },
                ],
                articleContent: {
                    content: '',
                    photosUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                    articleCreatDateTime: '',
                    musicWYId: '',

                },
                userPools: [
                    {
                        name: '秦时明月',
                        poolId: 12,
                        coverUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                        articlesCount: 100,
                        createDateTime: '2020年',
                    },
                ],
                isSelfPage: false,
                signStatus: false

            }
        },
        methods: {
            editSign(){
                this.signStatus = true
            },
            submitSign(){
                http.commonUrlEncodingPost('/userInfo/editSign', {userId: this.userInfo.id, sign: this.userInfo.sign})
                .then(res => {
                    if (res.status === 200){
                        this.$notify({
                            title: '成功',
                            message: '签名已修改！',
                            type: 'success',
                            offset: 100
                        });
                    }
                })
                .catch(e => {
                    this.$notify.error({
                        title: '发生错误了！',
                        message: e.message,
                        offset: 100
                    });
                })
                this.signStatus = false
            },
            cancelEditSign(){
                this.signStatus = false
            },
            handleCollChange(value){
                if (!value) return
                http.get('/article/' + value).then(res => {
                    if (res.data.code === 200){
                        this.articleContent = res.data.data
                        if(this.articleContent.photosUrl === ''){
                            this.articleContent.photosUrl = 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
                        }
                    }else{
                        this.$message.warning(res.data.code)
                    }
                }).catch(e => {
                    this.$message(e.message)
                })
            },
            goPoolDetails(poolId, poolName) {
               this.$router.push({path: '/poolDetails', query: {poolId: poolId, poolName: poolName }})
            },
            goEditPage(){
                this.$router.push('/personal/edit')
            },
            strDate(timeStamp){
                return dateFormat(timeStamp)
            },


        },
        computed: {
            articleContentComputed: {
                get (){
                    return this.articleContent
                }
            },
            editSignStatus: {
                get() {
                    return this.signStatus
                }
            }
        },
        mounted() {
            let uId = this.$route.query.userId
            let localId = this.$store.getters.userInfo.id
            if (localId !== null && uId == localId){
                this.isSelfPage = true
            }
            // 加载用户信息
            http.commonGet('/userInfo/' + uId).then(res =>{
                if (res.data.code === 200){
                    this.userInfo = res.data.data
                    if (this.isSelfPage){
                        this.$store.commit('setUserInfo', res.data.data)
                    }
                }else{
                    this.$message.info(res.data.message)
                }
            }).catch(e => {
                this.$message.error(e.message)

            })
            // 加载pools和Articles
            http.get('/userInfo/poolsAndArticles/' + uId)
            .then(res => {
                if(res.data.code === 200){
                    let data = res.data.data
                    this.userArticles = data.articles
                    this.userPools = data.pools
                }else{
                    this.$message.warning(res.data.message)
                }
            }).catch(e => {
                this.$message.error(e.message)
            })
        }
    }
</script>

<style lang="less" scoped>
    a{
        text-decoration: none;
        color: rgba(222,222,222);
    }
    a:hover{
        color: cornflowerblue;
    }

    .basic_info_wrapper{
        width: 100%;
        height: 450px;
        background-repeat: no-repeat;
        background-size: cover;
        color: rgba(222,222,222);
        .info_card{
            float: left;
            width: 80px;
            text-align: center;
            .info_card_number{
                font-size: 24px;
                height: 40px;
            }
        }
        .el-row{
            .el-tag{
                margin: 0 15px;
            }
        }
        .edit_sign{
            margin-top: 30px;
            .el-button{
                margin-left: 10px;
            }
        }
    }
    .articles_wrapper{
        width: 100%;
        .articles_list_wrapper{
            width: 80%;
            margin: 0 auto;
        }
        .el-collapse{
            width: 100% !important;
            margin: 0 auto !important;
        }
        .user_article_content_wrapper{
            width: 900px;
            margin: 0 auto;
            .photo_wrapper{
                width: 330px;
                height: 100%;
                float: left;
            }
            .player_wrapper{
                width: 560px;
                height: 100%;
                float: right;
                position: relative;
            }
        }
    }
    .pools_wrapper{
        width: 100%;
        .pools_container{
            width: 100%;
            height: 1200px;
        }
        .pool_card_wrapper{
            width: 400px;
            height: 340px;
            float: left;
            margin: 14px 70px;
            .el-card{
                width: 100%;
                height: 100%;
                img{
                    width: 100%;
                    height: 200px;
                }
            }
            .el-card:hover{
                transform:scale(1.02);
            }
        }

    }
</style>