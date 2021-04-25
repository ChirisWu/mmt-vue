<template>
  <div class="mmt_error_wrapper">
    <h2>RESOURCE NOT FOUND</h2>
    <img src="../../assets/errors/404.jpg"/>
    <ErrorOpt/>
  </div>
</template>

<script>
import ErrorOpt from "@v/error/ErrorOpt";
export default {
name: "404",
  components: {
  ErrorOpt
  }
}
</script>

<style scoped lang="less">

  .mmt_error_wrapper{
    width: 70%;
    margin: 0 auto;
    h2{
      background-color: rgb(19,19,17);
      color: white;
      margin: 0;
      padding-top: 20px;
    }
    img{
      width: 100%;
    }
  }

</style>