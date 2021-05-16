<template>
    <div class="home_footer">
        <div class="footer_header">
            <h3>About</h3>
        </div>
        <div class="footer_content">
            <h4>About Mulia</h4>
            <p>&nbsp;&nbsp;Mulia your music piece repository, let world see your artistic talent.</p>
            <h4>develop:</h4>
            <p>&nbsp;&nbsp; <el-link href="https://github.com/ChirisWu/">https://github.com/ChirisWu/</el-link></p>
<!--            <p>&nbsp;&nbsp; <el-link href="https://github.com/ChirisWu/m_moment">https://github.com/ChirisWu/m_moment</el-link></p>-->
            <h4>copyright</h4>
            @copyright Chiriswu
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