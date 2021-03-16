<template>
    <div class="home_footer">
        <div class="footer_header">
            <h3>About</h3>
        </div>
        <div class="footer_content">
            <h4>关于 M Life</h4>
            <p>&nbsp;&nbsp;Music Life 是一款为音乐原创者、音乐爱好者打造的一个音乐博客平台，用音乐记录生活，让世界听到你的声音。</p>
            <h4>相关连接:</h4>
            <p>&nbsp;&nbsp; <el-link href="https://github.com/ChirisWu/mmt-vue">https://github.com/ChirisWu/mmt-vue</el-link></p>
            <p>&nbsp;&nbsp; <el-link href="https://github.com/ChirisWu/m_moment">https://github.com/ChirisWu/m_moment</el-link></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeFooter"
    }
</script>

<style lang="less" scoped>
    .home_footer{
        width: 100%;
        height: 350px;
        .footer_header{
            height: 60px;
            text-align: center;
        }
    }
</style>