<template>
  <div class="mmt_error_opt">
    <el-tooltip content="返回"  :visible-arrow="false" placement="bottom-start" :offset="8">
      <el-button icon="el-icon-caret-left" style="font-size: 18px;" @click="goback"></el-button>
    </el-tooltip>
    <el-tooltip content="回到主页"  :visible-arrow="false" placement="bottom-start" :offset="8">
    <el-button icon="el-icon-s-home" @click="goHome"></el-button>
    </el-tooltip>

    <el-tooltip content="回到我的主页"  :visible-arrow="false" placement="bottom-start" :offset="8">
    <el-button icon="el-icon-user-solid" @click="goUser"></el-button>
    </el-tooltip>

  </div>
</template>

<script>
export default {
name: "ErrorOpt",
  methods: {
    goback() {
      this.$router.go(-1)
    },
    goHome(){
      this.$router.push('/')
    },
    goUser(){
      this.$router.push('/user')
    }

  }
}
</script>

<style scoped lang="less">
  .mmt_error_opt{
    margin-top: 20px;
    .el-button{
      margin-right: 20px;
      width: 70px;
      height: 45px;
    }
  }

</style>