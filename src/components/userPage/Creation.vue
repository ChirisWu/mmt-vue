<template>
  <div class="mmt_user_creation">
    <div class="mmt_user_creation_header">
      <h2>create center</h2>
    </div>
    <el-row :gutter="30" type="flex" class="mmt_user_creation_list" justify="center">
      <el-col :span="6">
        <el-card shadow="hover" class="mmt_user_creation_item" @click="handleCreateRoute(0)">
          <p><i class="el-icon-video-camera-solid"/></p>
          <h3>video</h3>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="mmt_user_creation_item" @click="handleCreateRoute(1)">
          <p><i class="el-icon-mic"/></p>
          <h3>audio</h3>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="mmt_user_creation_item" @click="handleCreateRoute(2)">
          <p><i class="el-icon-s-help"/></p>
          <h3>whisper</h3>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {goCreationTypes} from "@/router/userHomePage/userPageRoutes";

export default {
  name: "Creation",
  methods: {
    handleCreateRoute(index) {
      goCreationTypes(this.$router, index)
    }
  }
}
</script>

<style lang="less" scoped>

.mmt_user_creation {
  width: 100%;
  height: 1024px;
  position: relative;

  .mmt_user_creation_header {
    height: 200px;
    width: 100%;

    h2 {
      padding: 40PX;
    }

    border-bottom: solid 1px rgb(213, 213, 213);

    h2 {
      margin: 0;
    }

  }

  .mmt_user_creation_list {
    padding-top: 56px;
  }

  .mmt_user_creation_item {
    background: #cecccc;

    p {
      font-size: 70px;
      text-align: center;
      padding: 0;
      margin: 0;
    }

    h3 {
      text-align: center;
    }
  }
}

</style>