<template>
    <div class="message_list_wrapper">
        <h3>{{this.messageType}}消息</h3>
        <el-collapse v-for="(item, index) in this.messages" @change="handleChange(index)">
            <el-collapse-item>
                <template slot="title">
                    <div class="message_title">
                        <div class="left">
                            <span class="left" style="padding-left: 50px;"><router-link :to="{path: '/personal/infoDetails', query: {userId: item.userId}}"> {{item.username}} </router-link></span>
                            <span class="left">{{item.content ? '  评论了你的分享' : '赞了你的分享 '}}</span>
                            <span class="left">《 {{item.articleName}} 》</span>
                        </div>
                        <div class="right">{{item.date}}
                            <span><el-badge :value="item.read === false ? 'new' : '' "></el-badge></span></div>
                    </div>
                </template>
                <p style="padding: 4px 30px 0;">{{item.content}}</p>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    import http from "../../api/common-api";

    export default {
        name: "MessageList",

        data() {
            return {
                flag: false,
                messages: [
                ],


            }
        },
        computed: {
            messageType() {
                this.flag = !this.flag
                return this.$route.name
            },
            messageUrl() {
                return  '/message' + this.$route.path
            },
        },
        methods: {

            handleChange(index) {
                let type = this.messageType === '点赞' ? 0 : 1;
                if (this.messages[index].read){
                    return
                }
                http.commonUrlEncodingPost('/message/hasRead', {messageId: this.messages[index].id, greatOrComment: type})
                .then( res => {
                    if (res.status === 200){
                        this.messages[index].read = true
                        sessionStorage.setItem(this.messageUrl, JSON.stringify(this.messages))
                    }
                }).catch(e => {
                    this.$message.error(e.message)
                })
            },

        },
        watch: {
            flag(val){
                let msg = JSON.parse(sessionStorage.getItem(this.messageUrl))
                if (msg !== undefined && msg !== null){
                    this.messages = msg
                }else{
                    http.commonUrlEncodingPost(this.messageUrl, {userId: this.$store.getters.userInfo.id, limit: 40})
                        .then(res => {
                            console.log(res)
                            this.messages = res.data.data
                            sessionStorage.setItem(this.messageUrl, JSON.stringify(res.data.data))
                        }).catch(e => {
                        this.$message.error(e.message)
                    })
                }

            }
        },
        mounted() {
        },
    }
</script>

<style lang="less" scoped>
    .message_list_wrapper{
        width: 100%;
        .message_title{
            font-size: 15px;
            width: 100%;
            .el-collapse-item__header{
                padding: 20px 50px;
            }
            .left{
                width: 500px;
                display: inline;
            }
            .right{
                width: 200px;
                float: right !important;
            }
            a{
                color: #333333;
                text-decoration: none;
            }
            a:hover{
                color: rgba(0, 0, 255, 0.97);
            }
        }
    }

</style>