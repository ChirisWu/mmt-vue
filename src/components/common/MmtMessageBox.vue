<template>
  <div>
    <el-dialog class="mmt_message_success"
        v-model="visible"
        width="30%"
        :show-close="false">
      <div class="icon_wrapper"><icon-success :height="80" :width="80"/>
        <div style="margin-top:10px;">{{ msg }}</div>
      </div>
      <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="visible = false">确 定</el-button>
    </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import IconSuccess from "@c/icons/IconSuccess";
export default {
  components: {
    IconSuccess
  },
  props: {
    msg: {
      type: String,
      default: 'OK'
    }

  },
  name: "MmtMessageBox",
  data() {
    return {
      visible: false
    };
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .icon_wrapper{
    width: 60%;
    margin: 0 auto;
    text-align: center;
  }
  .mmt_message_success .el-dialog__body{
    padding: 0 20px !important;
  }

</style>