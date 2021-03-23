<template>
    <div >
        <div v-show="false">{{currentMusicStyle}}</div>
        <div style="height: 670px" v-loading="loading"
             element-loading-text="服务器宽带有点低，F小v努力加载中...">
            <ul class="music_pools" v-for="(item, index) in poolsInfo">
                <transition  name="el-fade-in-linear">
                    <li class="pool" :style="{backgroundImage: 'url(' + item.musicPool.coverUrl + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}">
                    <div class="title" style="font-family: STXingkai; font-size: 1.5em; color:rgba(222,222,222,1.5)">
                        <h3>{{item.musicPool.name}}</h3>
                        <el-link @click="goPoolDetails(item.musicPool.id, item.musicPool.name)"
                                style="position: absolute; top: 20px; right: 50px;
                                 font-family: 'Microsoft YaHei'; color: rgba(255,255,255,0.7)"
                        >进入pool</el-link>
                    </div>
                    <div class="info_container" >
                    <div class="introduce">描述: {{item.musicPool.introduce}}</div>
                    <div class="music_type">风格: {{item.musicTypeName}}</div>
                    </div>
                    <div class="pool_info">
                        <span><i class="el-icon-share"></i> {{item.musicPool.articleCount}} shares</span>
                        <span><i class="el-icon-user-solid"></i> {{item.musicPool.gustCount}} views</span>
                        <span>  by: {{item.createUsername}}</span>
                    </div>
                </li>
                </transition>
            </ul>
        </div>
        <div class="pagination_container">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    style="display: block"
                    :page-size="4"
                    @current-change="handleCurrentChange"
                    :hide-on-single-page="false">
            </el-pagination>
        </div>
        <el-footer>
            <div class="site_about">
                <h3 >
                    Developer says:
                </h3>
                <p >&nbsp;&nbsp;因为孤独，所以音乐。或许正是因为孤独，耳朵里才能听见一幅幅精彩的风景。当生活狂奔的马蹄暂歇在夜晚温暖的台灯下，有那么一首歌一扫奔波的喧嚣
                带来片刻的宁静，或许你正想找人分享自己听到的景；或许有一首歌勾起你往日的回忆，感动沉浸在了寂静的夜晚；或许你无意邂逅了一首歌，却苦于无人分享感动......</p>
                <h3 >
                    网站源动力：
                </h3>
                <p style="line-height: 27px; font-size: 0.9em; text-align: left">
                   人生须臾，难得片刻宁静，分享感动，传递温暖。
                </p>
            </div>
            <div class="author_info">
                <h3 style="text-align: left; line-height: 34px;">
                    本站公告：
                </h3>
                <p>
                   本站是音乐故事分享评论的一个平台。请勿传播非法低俗内容，法律责任后果自负。
                    <br>网站处于初期，部分功能还未发布，作者将会继续开发，丰富网站内容。<br>
                    注意: <br>
                    请不要无故不停刷新页面，系统检测到将会以为是恶意破坏，将会阻止部分资源的请求，为了不影响体验感，请不要不停刷新页面！
                </p>
                <p style="text-align: right">developed in 2020.9</p>
                <h3>
                    My WangyiMusic Account:
                </h3>
                <img src="../../assets/wycode.jpg" style="height: 130px; float: left"/>
            </div>

        </el-footer>

    </div>
</template>

<script>
    import http from '../../api/common-api'

    export default {
        name: "MusicPool",
        data () {
            return {
                poolsInfo: [
                    {
                        createUserId: '',
                        createUsername: '',
                        musicTypeName: '',
                        musicStyleId: '',
                        wangyiMusicId: '',
                        musicPool: {
                            id: '',
                            name: '',
                            introduce: '',
                            articleCount: '',
                            recentUserCount: '',
                            coverUrl: '',
                            gustCount: '',
                        }
                    },
                ],
                onpagehide: true,
                pageNum: 1,
                total : 1,
                musicStyleId: this.$route.query.musicStyleId,
                loading: false,
                flag: false
            }
        },
        methods: {
            reloadAll() {
                this.isRouterAlive = false
                this.$nextTick(() => {
                    this.isRouterAlive = true
                })
            },
          goPoolDetails( id, name ){
              this.$router.push({path: '/poolDetails', query: {poolId: id}})
          },
            handleCurrentChange(val){
              if (this.musicStyleId == 0){
                    http.commonUrlEncodingPost('/pools/recommend', {page: val, size: 4})
                    .then(res => {
                        if (res.data.code === 200){
                            this.poolsInfo = res.data.data.list
                            this.pageNum = res.data.data.pageNum
                            console.log(this.poolsInfo)
                        }
                    }).catch(e => {
                        this.$message(e.message)
                    })
              }else{
                  http.commonUrlEncodingPost('/pools/style', {style: this.musicStyleId, current: val, size: 5})
                      .then(res => {
                          if (res.data.status === 200){
                              let data = res.data.data
                              this.poolsInfo = data.list
                              this.pageNum = data.pageNum
                              console.log(this.poolsInfo)
                          }
                      }).catch(e => {
                        this.$message.error(e.message)

                  })

              }
            },
            notify(){
                this.$notify ({
                    title: '没有pools',
                    message: '该分类暂时还没有pools,赶快登陆去创建一个吧！~',
                    offset: 200,
                    position: 'top-left'
                })
            }
        },
        computed: {
            currentMusicStyle(){
                this.flag = !this.flag
                return this.$route.query.musicStyleId
            }
        },
        watch: {
            flag(val){
                this.loading = true
                if (this.currentMusicStyle == 0){
                    http.commonUrlEncodingPost('/pools/recommend', {page: this.pageNum, size: 4 })
                        .then(res => {
                            let data = res.data.data
                            this.poolsInfo = data.list
                            this.pageNum = data.pageNum
                            this.total = data.total
                            this.loading = false

                        }).catch(e => {
                        this.loading = false
                        this.$message.error(e.message)

                    })
                }else{
                    http.commonUrlEncodingPost('/pools/style', {style: this.currentMusicStyle, current: 1, size: 4})
                        .then(res => {
                            if (res.data.code === 200){
                                let data = res.data.data
                                this.poolsInfo = data.list
                                this.pageNum = data.pageNum
                                this.total = data.total
                                this.loading = false
                                if (this.poolsInfo.length === 0){
                                    this.notify()
                                }
                            }
                        }).catch(e => {
                        this.loading = false
                        this.$message.error(e.message)

                    })
                }
                this.reloadAll()
            }
        },
        mounted() {

        }
    }
</script>

<style lang="less" scoped>
    .music_pools {
        /*background-color: yellow;*/
        padding: 0;
        margin: 0;
        width: 100%;
    }
    .introduce{
        width: 95%;
        height: 41px;
        margin-left: 14px;
        margin-top: 9px;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
    }
    .pool{
        /*background-color: cornflowerblue;*/
        height: 300px;
        border: silver 1.4px solid;
        width: 42%;
        margin-top: 30px ;
        position: relative;
    }
    .pool:nth-of-type(odd){
        float: left;
        margin-left: 75px;
    }
    .pool:nth-of-type(even){
        float: right;
        margin-right: 40px;
    }
    .pool_info{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 35px;

        span{
            margin-left: 30px;
            color: rgb(255, 255, 255);
            font-weight: 300;
        }
    }
    .music_type{
        position: relative;
        top: 50px;
        margin-left: 12px;
    }
    .main_music_Info{
        position: relative;
        top: 70px;
        margin-left: 12px;
    }
    .info_container{
        border: solid 1.6px crimson;
        border-left: 0;
        border-radius: 0 3% 3% 0;
        width: 85%;
        height: 58%;
        color: rgb(255, 255, 255);
        font-weight: 300;
    }
    .pool:hover{
        transform: translateY(-0.9%);
        box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.7)
    }
    .pagination_container {
        width: 100%;
        height: 80px;
        margin-top: 30px;
        text-align: center;
    }
    .el-footer{
        height: 500px !important;
        display: block;
        background-color: #B3C0D1;

        h3{
            text-align: left; line-height: 34px;
        }
        p{
            line-height: 27px; font-size: 0.9em; text-align: left
        }
    }
    .site_about{
        width: 44%;
        height: 100%;
        float: left;
        margin-left: 5%;

    }
    .author_info{
        width: 44%;
        height: 100%;
        float: right;
        margin-right: 5%;
    }

</style>