<template>
    <div class="main_wrapper">
        <div class="message_wrapper">
            <el-menu default-active="/great" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
                <el-menu-item index="/great">点赞消息</el-menu-item>
                <el-menu-item index="/comment">评论消息</el-menu-item>
            </el-menu>
            <router-view/>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Message",

        data () {
            return {
            }
        },
        methods: {
          handleSelect(key, keyPath){
          }
        },

        created() {
            // this.loadData()


        },
        mounted() {


        },
        destroyed () {

        }

    }
</script>

<style lang="less" scoped>
    .message_wrapper{
        width: 100%;
    }
</style>