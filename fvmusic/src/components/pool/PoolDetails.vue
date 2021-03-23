<template>
    <div class="pool_detail_container">
        <el-container>
            <el-header>
                <div class="pool_info">
                    <div class="cover_box">
                        <div class="img_container">
                            <img :src="poolInfo.coverUrl"/>
                        </div>
                        <div class="pool_details">
                            <h3>{{poolInfo.name}}</h3>
                            <div class="pool_statistic">
                            <span><svg t="1600950683252" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                       xmlns="http://www.w3.org/2000/svg" p-id="2619" width="24" height="24"><path
                                    d="M512 608a96 96 0 1 1 0-192 96 96 0 0 1 0 192m0-256c-88.224 0-160 71.776-160 160s71.776 160 160 160 160-71.776 160-160-71.776-160-160-160"
                                    fill="#000000" p-id="2620"></path><path
                                    d="M512 800c-212.064 0-384-256-384-288s171.936-288 384-288 384 256 384 288-171.936 288-384 288m0-640C265.248 160 64 443.008 64 512c0 68.992 201.248 352 448 352s448-283.008 448-352c0-68.992-201.248-352-448-352"
                                    fill="#000000" p-id="2621"></path></svg>
                            {{poolInfo.gustCount}}</span>
                            <span>
                                <svg t="1600951891311" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg" p-id="5537" width="24" height="24"><path
                                        d="M929.344 861.248c0 14.784-12.992 26.88-28.864 26.88L106.624 888.128c-15.872 0-28.8-12.032-28.8-26.88L77.824 250.176c0-14.848 12.928-26.88 28.8-26.88l186.496 0L293.12 182.272 106.624 182.272c-38.528 0-69.824 30.4-69.824 67.904l0 611.072c0 37.504 31.296 67.904 69.824 67.904L900.48 929.152c38.656 0 69.888-30.4 69.888-67.904L970.368 650.88l-41.024 0L929.344 861.248zM449.664 724.48c-1.28-6.912-25.536-171.776 82.56-326.592 85.824-122.944 232-202.88 434.304-237.696l7.616 44.096c-189.824 32.64-326.016 106.176-404.8 218.624-97.536 139.136-74.752 299.456-74.56 300.992L449.664 724.48zM848.32 432.832 810.496 408.896 955.52 179.584 705.6 44.352 726.912 4.992 1019.008 163.008Z"
                                        p-id="5538" fill="#515151"></path></svg>
                            {{poolInfo.articleCount}}</span>
                            <span>
                                <svg t="1600951722634" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg" p-id="3814" width="24" height="24"><path
                                        d="M735.444775 810.6672h-372.479069a79.359802 79.359802 0 0 1-78.76247-79.701134c0-43.946557 35.327912-79.743801 78.76247-79.743801h372.479069c43.434558 0 78.719803 35.797244 78.719803 79.743801S778.879333 810.6672 735.444775 810.6672M347.392412 343.596368c0-25.983935 7.93598-51.029206 22.954609-72.490486A137.556989 137.556989 0 0 1 483.328072 213.33536c28.885261 0 55.893194 9.514643 78.677136 25.17327-2.60266-0.128-5.162654-0.469332-7.80798-0.469332-59.306518 0-114.60238 28.415929-147.924964 75.989144a168.020913 168.020913 0 0 0-30.719923 96.938424c0 4.735988 1.109331 9.17331 1.49333 13.823965a126.421017 126.421017 0 0 1-29.653259-81.194463m388.052363 264.959337h-372.479069c-64.853171 0-117.503706 51.626538-120.789031 116.181043A80.042467 80.042467 0 0 1 213.33408 663.595568c0-43.989223 35.327912-79.701134 78.719803-79.701134h256.426026c0.682665 0 1.23733-0.341332 1.877328-0.383999 1.279997 0 2.517327 0.383999 3.839991 0.383999 73.045151 0 138.026322-42.325228 165.546253-107.818398a21.33328 21.33328 0 1 0-39.338569-16.511958c-20.821281 49.578543-70.399824 81.663796-126.207684 81.663796-74.922479 0-135.93566-58.453187-135.93566-130.261008 0-25.941268 7.93598-50.986539 22.954609-72.490486a137.556989 137.556989 0 0 1 112.981051-57.770522c45.39722 0 87.637114 21.589279 112.981051 57.727856 5.247987 7.466648 9.685309 15.530628 13.183967 23.893274a21.33328 21.33328 0 0 0 39.338568-16.597292 170.239574 170.239574 0 0 0-17.621289-31.786588 176.596892 176.596892 0 0 0-67.413165-57.17319 20.394616 20.394616 0 0 0-3.455991-10.197308A180.308883 180.308883 0 0 0 483.328072 170.6688c-59.306518 0-114.60238 28.415929-147.882297 75.946477a168.106246 168.106246 0 0 0-30.719923 96.981091c0 64.341172 36.437242 122.623693 95.103762 152.746284 10.111975 17.023957 22.954609 32.085253 38.186571 44.885222H292.053883C225.152717 541.227874 170.66752 596.09707 170.66752 663.595568c0 51.455871 32.298586 97.749089 80.298466 115.157045l0.298666 0.085333A121.599696 121.599696 0 0 0 362.965706 853.33376h372.479069c66.943833 0 121.386363-54.911863 121.386363-122.367694 0-67.498498-54.442531-122.410361-121.386363-122.410361"
                                        p-id="3815" fill="#515151"></path></svg>
                            {{poolInfo.recentUserCount}}
                            </span>
                        </div></div>
                        </div>
                    <div class="info_content_box">
                        <h3 style="margin-top: 0; width: 100%; height: 60px;"><span
                                style="display: block; float: left;">池子简介</span></h3>
                        <p style="width: 100%;">{{poolInfo.introduce}}</p>
                        <h3 style="text-align: left; margin-top: 0;margin-bottom: 0; padding-top:0">池主推荐</h3>
<!--                        网易云音乐外链播放器-->
                        <div class="main_music_info">
                            <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=466 height=82
                                    :src="'https://music.163.com/outchain/player?type=2&id=' + mainMusicWangyiId +'&auto=1&height=66'"></iframe>
                        </div>
                    </div>

                </div>
                <div class="operator_box">
                    <div class="about_create">
<!--                        <el-input style="width: 84%; margin: 20px auto 0; padding: 0;" v-model="searchContent"/>-->
<!--                        <el-button type="primary" style="width: 40%; height: 35px; margin:0 auto;">-->
<!--                            <svg t="1601034886909" class="icon" viewBox="0 0 1029 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7250" width="16" height="16"><path d="M439.778338 844.735516C197.319899 844.735516 0 656.443325 0 424.302267S197.319899 3.869018 439.778338 3.869018s439.778338 188.292191 439.778337 420.433249c0 119.939547-54.166247 234.720403-147.02267 314.680101-10.31738 9.027708-27.083123 7.738035-36.110831-2.579345-9.027708-10.31738-7.738035-27.083123 2.579345-36.110832 82.539043-69.642317 128.967254-170.236776 128.967254-274.700251 0-203.768262-174.105793-368.846348-388.191435-368.846348S51.586902 220.534005 51.586902 424.302267s174.105793 368.846348 388.191436 368.846348c29.662469 0 59.324937-2.579345 87.697733-9.027708 14.186398-2.579345 27.083123 5.15869 30.952141 19.345088 2.579345 14.186398-5.15869 27.083123-19.345089 30.952141-33.531486 6.448363-67.062972 10.31738-99.304785 10.31738z" fill="#515151" p-id="7251"></path><path d="M1004.654912 1022.710327c-6.448363 0-12.896725-2.579345-18.055416-7.738035L696.423174 737.692695c-10.31738-10.31738-10.31738-25.793451-1.289673-36.110831s25.793451-10.31738 36.110831-1.289673l290.176323 277.279597c10.31738 10.31738 10.31738 25.793451 1.289672 36.110832-3.869018 6.448363-10.31738 9.027708-18.055415 9.027707z" fill="#515151" p-id="7252"></path></svg>-->
<!--                            搜 索</el-button>-->
<!--                        <h4 style="height: 35px;margin: 0; width: 100%; text-align: left">sorted by:</h4>-->
<!--                        <el-row>-->
<!--                            <el-button plain>时间</el-button>-->
<!--                            <el-button plain>按热</el-button>-->
<!--                            <el-button plain>关注</el-button>-->
<!--                        </el-row>-->
<!--                        <el-row style="margin: 0">-->
<!--                            <el-button plain>作者人气</el-button>-->
<!--                            <el-button plain>恢复默认</el-button>-->
<!--                        </el-row>-->
                    </div>
                    <div class="pool_operator">
                        <h4 style="height: 40px; margin: 0;width: 100%;
                        text-align: left; background-color: rgb(36, 36, 36);
                            color: rgb(222,222,222);
                             box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
                            About Pool Master</h4>
                        <el-row style="margin-top: 20px; height: 60px;">
                            <div class="avatar_container" style="text-align: left;">
                                <img :src="createUser.avatarUrl"  style="width: 60px; height: 60px;border-radius: 50%">
                            </div>
                        </el-row>
                        <el-row style="margin: 0 0 0 15px;padding: 0; text-align: left;width: 100%; height: 40px; text-overflow: ellipsis" >
                            {{createUser.username}}
                        </el-row>
                        <el-row>
                            <el-tag> profession: {{createUser.profession}}</el-tag>
                            <el-divider direction="vertical" style="color: #f5f1f1"></el-divider>
                            <el-tag>{{createUser.articleCount}} shares</el-tag>
                        </el-row>
                        <el-row style="height: 40px;">
                            <el-link type="primary" :underline="false" :href="createUser.wangYiMusicUrl">去TA的网易云音乐</el-link>
                            <el-divider direction="vertical" style="color: #f5f1f1"></el-divider>
                            <el-link type="primary" :underline="false">关注TA</el-link>
                            <el-divider direction="vertical" style="color: #f5f1f1"></el-divider>
                            <el-link type="primary" :underline="false" @click="goUserPage(createUser.id)">去TA的主页</el-link>
                        </el-row>
                    </div>
                </div>
            </el-header>
            <div style="height: 10px;width: 100%; background-color: rgb(194, 22, 22)"></div>
            <el-main>
                <div class="content_wrapper">
                    <div class="recent_user">
                        <h4>池子活跃用户</h4>
                        <ul v-for="(item, index) in this.poolRecentUsers">
                            <li> <el-avatar :size="30" :src="item.avatarUrl"></el-avatar> <router-link
                                    :to="{path: '/personal/infoDetails', query: {userId: item.id}}">{{item.username}}
                            </router-link></li>

                        </ul>
                        <div v-if="this.poolRecentUsers.length === 0">空空如也，留下你的故事吧！</div>

                    </div>
                    <div class="articles_container">
                        <div style="height: 70px; position:relative; width: 100%">
                            <el-button style="position: absolute; right: 30px; bottom: 0" type="primary" plain @click="goPublishPage">分享我的音乐</el-button>
                        </div>
                        <div v-if="articlesComputed.length === 0" style="height: 400px;"> 空空如也</div>
                        <ul v-for="(item, index) in articlesComputed">
                            <el-row>
                                <li>
                                    <el-card :body-style="{ padding: '0px' }">
                                        <el-col :span="7" style=" position:relative;">
                                            <img :src="item.photosUrl" class="image">
                                        </el-col>
                                        <div style="padding: 0; width: 700px;height: 200px; position: relative; float: left">
                                            <div class="article_info" style="">
                                                <!--                                           <h4 style="position: absolute; top: 0; text-align: left; height: 40px;">{{item.name}}</h4>-->
                                            </div>
                                            <div>

                                                <iframe style="position: absolute; bottom: -19px; left: 0; z-index: 9999"
                                                        frameborder="no" border="0" marginwidth="0" marginheight="0" width=466 height=100
                                                        :src="'https://music.163.com/outchain/player?type=2&id=' + item.musicWYId +'&auto=1&height=66'"></iframe>

                                                <el-tooltip class="item" effect="dark" content="需要网易云会员权限，请到网易云音乐欣赏！" placement="right"
                                                            style="position: absolute; bottom: 0; right: 120px; z-index: 999">
                                                    <el-button>无法播放？</el-button>
                                                </el-tooltip>
                                                <el-link :underline="false" :href=" 'https://music.163.com/#/song?id=' + item.musicWYId" style="position:absolute; bottom: 0; right: 0; z-index: 999; height: 39.6px;">去网易云音乐</el-link>
                                            </div>
                                        </div>
                                        <div style="position: absolute; top: 0; right: 0; height: 120px; width: 700px;">
                                            <h4 style="margin: 0; height: 30px;text-align: left; ">{{item.name}}</h4>
                                            <span>——By </span>
                                            <el-avatar :src="item.userAvatarUrl"/>
                                            <span>{{item.username}}</span>
                                            <el-divider direction="vertical" style="color: #333333"></el-divider>
                                            <el-link :underline="false" @click="goUserPage(item.userId)">去T的主页</el-link>
                                        </div>
                                    </el-card>
                                    <div class="article_content_box">
                                        <p>
                                            {{item.content}}
                                        </p>
                                        <div style="height: 60px; width: 100%; border-top: #999999 solid 1px;">
                                            <div  class="comment_bar">
                                                <el-button size="small">评论</el-button>
                                                <span>{{item.commentCount > 999 ? '999+' : item.commentCount + ''}}</span>
                                                <el-button size="small" @click="handleGreat(index)" :style="{backgroundColor: item.hasGreated ? 'rgb(219,238,246)' : ''}">点赞</el-button>
                                                <span>{{item.greatCount > 999 ? '999+' : item.greatCount+ ''}}
                                                    </span><el-button size="small" >views</el-button>
                                                <span>{{item.views > 999 ? '999+' : item.views}}</span>
                                            </div>
                                        </div>

                                        <!--                                    评论区-->

                                        <el-collapse>
                                            <el-collapse-item name="0">
                                                <template slot="title">
                                                    <div> <el-link :underline="false" @click="getComments(index)"> 查看评论</el-link></div>
                                                </template>
                                                <div>
                                                    <div class="comment_input">
                                                        <el-input
                                                                v-model="item.makeCommentContent" placeholder="请输入评论内容"></el-input>
                                                        <el-button @click="cancelComment(index)">取消</el-button>
                                                        <el-button @click="submitComment(index)">提交</el-button>
                                                    </div>
                                                    <ul v-for="(comment, index) in item.comments">
                                                        <li>
                                                            <el-collapse-item :name="index">
                                                                <template slot="title">
                                                                    <div style="margin-top: 6px;" class="comment_slot">
                                                                        <div class="commenter_info" style="height: 100%;
                                                                         width: 100%;margin: 0; text-align: left;text-overflow: ellipsis">
                                                                            <el-avatar :src="comment.userAvatarUrl" size="small"></el-avatar>
                                                                            <span style="margin-left: 10px;">{{comment.username}} says:</span>
                                                                            <span style="margin-left: 200px;">{{comment.createDatetime + ''}}</span>
                                                                        </div>
                                                                    </div>
                                                                </template>
                                                                <P>{{comment.content}}</P>
                                                                <el-collapse-item v-if="comment.childrenComment != null" title=" replies">
                                                                    <template slot="title">
                                                                        <div><span style="margin-left: 10px;">replies:</span></div>
                                                                    </template>
                                                                    <ul v-for="child in comment.childrenComment">
                                                                        <div style="text-align: left">
                                                                            <span><el-avatar :src="child.userAvatarUrl" size="small"/> </span>
                                                                            <span style="margin-left: 10px;">{{child.username}}: </span>
                                                                        </div>
                                                                        <p>{{child.content}}</p>
                                                                    </ul>
                                                                </el-collapse-item>
                                                            </el-collapse-item>

                                                        </li>
                                                    </ul>
                                                </div>
                                            </el-collapse-item>
                                        </el-collapse>
                                    </div>
                                </li>
                            </el-row>
                        </ul>
                    </div>
                </div>
                <div class="pagination_container">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="this.total"
                            :page-size="this.pageSize"
                            @change="handlePageChange"
                            style="display: block;"
                            :hide-on-single-page="false"
                            >
                    </el-pagination>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import http from "../../api/common-api";
    export default {
        name: "PoolDetails",
        data() {
            return {
                poolRecentUsers: [

                ],
                poolInfo: {
                    id: '',
                    name: '',     // 20个字以内
                    introduce: '',
                    articleCount: '',
                    recentUserCount: '',
                    coverUrl: '',
                    musicType: '',
                    gustCount: '',
                },
                searchContent: '',
                createUser: {
                    username: '小庄',
                    id: 1,
                    avatarUrl: '',
                    wangYiMusicUrl: '',
                    profession: '',
                    articleCount: '',
                },
                mainMusicWangyiId: '',

                articles: [
                    {
                        id: '',
                        name: '',
                        content: '',
                        createDateTim: new Date(),
                        photosUrl: '',
                        username: 'ME!',
                        outMusicLinkUrl: '',
                        userId: 12,
                        userAvatarUrl: '',
                        musicUrl: '',
                        commentCount: '', // 评论数
                        greatCount:'',   //点赞数
                        views:'',
                        musicWYId: '',
                        makeCommentContent: '',
                        comments: [
                            {
                                username: '',
                                userId: '',
                                userAvatarUrl: '3',
                                content: '',
                                createDatetime: '',
                                childrenComment: [
                                    {
                                        username: '',
                                        userId: '',
                                        userAvatarUrl: '',
                                        content: '',
                                    }
                                ]
                            },
                        ]
                    },
                ],
                makeComment: '',
                hiddenCommentInput: true,
                pageNum: 0,
                total:0,
                pageSize: 11,
            }
        },
        methods : {
            loadRecentUsers(){
              http.get('/pools/recentUsers?poolId=' + this.poolInfo.id)
              .then(res => {
                  if (res.status === 200 && res.data.code === 200){
                      this.poolRecentUsers = res.data.data
                  }
              }).catch(e => {
                  console.log(e.message)
              })
            },
            goUserPage (id) {
                this.$router.push({path: '/personal', query: {userId: id}})
            },
            submitComment(index){
                this.articles[index].makeCommentContent = this.articles[index].makeCommentContent.replace(' ', '')
                if  (this.articles[index].makeCommentContent === ''){
                    this.$message.info('评论内容不能为空哦！')
                    return
                }
                let param = {
                    articleId: this.articles[index].id,
                    userId: this.$store.state.userLoginInfo.userId,
                    articleUserId: this.articles[index].userId,
                    content: this.articles[index].makeCommentContent,
                    articleName: this.articles[index].name,
                    username: this.$store.getters.userInfo.username,
                    message: '评论了您的分享',
                }
                http.commonJsonPost('/article/makeComment', param)
                    .then(res => {
                        if (res.data.code === 200){
                            this.$message.success('评论已提交！')
                        }
                    }).catch(e =>{
                    this.$message.warning(e.message)
                })
                this.makeComment = ''
            },
            cancelComment(index){
                this.articles[index].makeCommentContent = ''
            },
            goPublishPage(){
                this.$router.push({path: '/personal/publish', query: {poolId: this.poolInfo.id, poolName: this.poolInfo.name}})
            },
            handlePageChange(val){
                http.commonUrlEncodingPost('/article/poolArticles', {poolId: this.$route.query.poolId, current: val})
                .then(res => {
                    if (res.data.code === 200){
                        let data = res.data.data
                        this.articles = data.list
                    }else{
                        this.$message.warning(res.data.message)
                    }
                }).catch(e => {
                    this.$message(e.message)
                })
            },
            handleGreat(index){
                if (!this.$store.getters.isLogin){
                    this.$message.info('请先登录哦！')
                    return
                }
                let param = {
                    articleId: this.articles[index].id,
                    userId: this.$store.state.userLoginInfo.userId,
                    articleUserId: this.articles[index].userId,
                    articleName: this.articles[index].name,
                    username: this.$store.getters.userInfo.username
                    }
                    console.log(this.articles[index].hasGreated)
                if (!this.articles[index].hasGreated){
                    this.articles[index].greatCount++
                    this.articles[index].hasGreated = true
                }else if(this.articles[index] && this.articles[index].greatCount > 0){
                    console.log('--')
                    this.articles[index].greatCount--
                    this.articles[index].hasGreated = false
                }else{
                    return;
                }
                sessionStorage.setItem('pools_articles_ofId_' + this.poolInfo.id, JSON.stringify(this.articles))
                //    x向后台发送点赞的请求
                http.commonJsonPost('/article/doGreat', param)
                .then(res => {
                    console.log(res)
                }).catch(e => {
                    this.$message.error(e.message)
                })
            },
            getComments(index){
               http.commonUrlEncodingPost('/comments/limit', {ArticleId: this.articles[index].id})
                .then( res => {
                    console.log(res)
                    if (res.data.code === 200 && res.data.data !== null){
                        this.articles[index].comments = res.data.data
                    }
                })
                .catch(e => {
                    this.$message.error(e.message)
                })
            },
            notify(){
                this.$notify ({
                    title: '暂时还没有分享',
                    message: '这个pool里干干净净，干净留下你的音乐吧！！~',
                    offset: 500,
                    position: 'top-left',
                })
            }
        },
        computed: {
            isShowCommentInput(index){
                console.log('hidden computed')
                if(this.articles[index] !== undefined){
                    console.log(this.articles[index].hiddenCommentInput)
                }
                return this.articles[index] === undefined ? false : !this.articles[index].hiddenCommentInput
            },
            articlesComputed: {
                get() {
                    return this.articles
                }
            }
        },
        mounted(){
            this.poolInfo.id = this.$route.query.poolId
            this.poolInfo.name = this.$route.query.poolName
            // 请求Pool的详细信息
            http.get('/pools/poolDetails/'+ this.poolInfo.id)
            .then(res => {
                if (res.data.code === 200){
                    let data = res.data.data
                    this.poolInfo = data.musicPool
                    this.createUser = data.createUser
                    this.mainMusicWangyiId = data.mainMusicWangyiId
                    this.loadRecentUsers()
                }
            }).catch(e => {
                this.$message.error(e.message)
            })
            // 请求articles
            let cacheArticles = JSON.parse(sessionStorage.getItem('pools_articles_ofId_' + this.poolInfo.id))
            if (cacheArticles !== null){
                this.articles = cacheArticles
            }else{
                http.commonUrlEncodingPost('/article/poolArticles', {poolId: this.$route.query.poolId})
                    .then(res => {
                        if(res.data.code === 200){
                            let data = res.data.data
                            this.articles = data.list
                            this.pageNum = data.pageNum
                            this.pageSize = data.pageSize
                            if (this.articles.length === 0){
                                this.notify()
                            }
                            this.articles.forEach(article => {
                                article.hasGreated = false
                                article.hiddenCommentInput = true
                            })
                            sessionStorage.setItem('pools_articles_ofId_' + this.poolInfo.id, JSON.stringify(this.articles))
                        }
                    }).catch(e => {
                    this.$message.error(e.message)
                })
            }

        },
        deactivated() {
            sessionStorage.removeItem('pools_articles_ofId_' + this.poolInfo.id)
        }
    }
</script>

<style lang="less" scoped>

    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-main {
        color: #333;
        text-align: center;
        line-height: 160px;
        position: relative;
        padding-top: 0;
    }

    .pool_info {
        height: 300px;
        width: 55%;
        position: relative;
    }

    .el-header {
        height: 300px !important;
        position: relative;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)


    }

    .operator_box {
        height: 300px;
        width: 38%;
        position: absolute;
        right: 20px;
        top: 0;
        border-left: 5px rgb(194,22,22) solid;
        padding-left: 30px;
        .about_create{
            width: 48%;
            height: 100%;
            float: left;
        }
        .pool_operator{
            height: 100%;
            width: 48%;
            float: right;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            background-color: #eeebeb;
        }
    }

    .cover_box {
        width: 38%;
        height: 100%;
        overflow: hidden;
        text-overflow-ellipsis: true;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .img_container{
            width: 100%;
            height: 70%;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .pool_details{
            width: 100%;
            height: 85px;
            padding: 0;
            margin: 0;
            border: 1.8px solid #949999;
            background-color: #f5f1f1;
            border-radius: 4px;
        }
        h3 {
            width: 100%;
            margin: 0;
            text-align: left;
            height: 38px;
        }

    }
    a{
        text-decoration: none;
        color: #333;
    }
    a:hover{
        color: cornflowerblue;
    }

    .pool_statistic {
        width: 100%;
        height: 20px;
        padding: 0;
        span {
            margin: 30px 14px;
        }

        text-align: left;
    }

    .info_content_box {
        width: 57%;
        height: 100%;
        position: absolute;
        padding-left: 15px;
        padding-right: 15px;
        top: 0;
        right: 0;
        p {
            line-height: 27px;
            font-size: 0.9em;
            text-align: left;
            height: 80px !important;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-top: 0 !important;
            margin-bottom: 0;
        }
        p:hover{
            overflow: scroll;
        }


    }
    .main_music_info {
        height: 80px;
        width: 100%;
        position: relative;
        z-index: 999;
        text-align: left;
        img:hover{
            transform:scale(1.005);
        }

    }

    .mname_container {
        float: right;
        text-align: left;
        height: 80%;
        width: 76%;
        position: absolute;
        bottom: 0;
        right: 0;

        div {
            line-height: 30px;
        }
        div div button i{
            width: 100%;
            height: 100%;
        }
    }

    .content_wrapper{
        width: 1400px;
        height: 2px;
        margin: 0 auto;

    }
    .recent_user{
        border: solid 1.5px #8e8c8c;

        width: 240px;
        height: 740px;
        overflow-y: scroll;
            /*解决ios上滑动不流畅*/
        margin-top: 90px;
        float: left;
        h4{
            text-align: left;
            padding: 0 0 0 20px;
            margin: 0;
            height: 60px;
            line-height: 60px;
        }
        ul{
            margin: 30px 0 0 0;
            padding: 0 0 0 10px;
            position: relative;

            li{
                a {
                    text-decoraction: none!important;
                }
                .router-link-active {
                    text-decoration: none;
                }
                text-align: left;
                height: 40px;
                border: none;
                padding: 0;
                margin: 0;
                width: 100%;
                line-height: 38px;
                overflow: hidden;
                text-overflow-ellipsis: '...';
            }
        }

    }
    .articles_container{
        width: 1024px;
        margin: 0 0 0 30px;
        float: left;
        p {
            line-height: 27px;
            font-size: 0.9em;
            text-align: left;
            height: 100%;
            width: 98%;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-top: 0 !important;
            margin-bottom: 0;
            padding: 10px;
        }
        .time {
            font-size: 13px;
            color: #999;
        }

        .bottom {
            margin-top: 13px;
            line-height: 12px;
        }

        .button {
            padding: 0;
            float: right;
        }

        .image {
            width: 280px;
            height: 200px;
            display: block;
            object-fit: fill;
            z-index: 9999;
        }
        .el-row{
            width: 1000px;
            margin-top: 20px;
            /*margin-left: 250px;*/
            img:hover {
                opacity: 0.6;
                transform: scale(0.9, 0.9);
            }
        }
        .el-row:nth-of-type(odd){
            float: left;
        }
        .el-row:nth-of-type(even){
            float: right;
        }
        .article_content_box{
            background-color: white;
        }
        .comment_input{
            text-align: left;
            margin: 20px 0;
            .el-input{
                width: 500px;
            }
            .el-button{
                margin: 0 10px;
            }
        }
    }
    .comment_bar{
        transform: translateY(-50%);
        height: 80px;

        button{
            margin: 0 14px;
            z-index: 999;
        }
    }
    .pagination_container {
        width:600px;
        height: 80px;
        margin: 30px 25% 0;
        text-align: center;
        position: absolute;
        bottom: -100px;
    }

</style>