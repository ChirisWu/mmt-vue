<template>
  <div class="mmt_user_creation">
    <div class="mmt_user_creation_header">

    </div>
    <el-row :gutter="30" type="flex" class="mmt_user_creation_list" justify="center">
      <el-col :span="6"><el-card shadow="hover">
       <p> <i class="el-icon-video-camera-solid"/></p>
      </el-card></el-col>
      <el-col :span="6"><el-card shadow="hover">
        鼠标悬浮时显示
      </el-card></el-col>
      <el-col :span="6"><el-card shadow="hover">
        鼠标悬浮时显示
      </el-card></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
name: "Creation"
}
</script>

<style lang="less" scoped>

  .mmt_user_creation{
    width: 100%;
    height: 100%;
    .mmt_user_creation_header{
      height: 200px;
      width: 100%;
      background: darkseagreen;

    }
    .mmt_user_creation_item{
      background: #cecccc;
    }


  }

</style>