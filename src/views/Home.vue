<template>
  <div class="home">
    <div class="home_header">
      <h2>M Life, your music repository</h2>
      <p>maybe you know programmer's code hosted at github,  why can't we have a music repository?</p>
      <p>so, here is m life, your music piece repository, you can post your music video,audio, or thinking on it, and let
      more people see it, that's what M Life do. let's getting start...
      </p>
    </div>
      <div class="home_list_wrapper">
        <el-row>
          <el-col :span="8">
            <div class="item_card">
                <img src="../assets/home/square2.jpg">
                <div class="img-tips" @click="handleHomeRoute(0)">
                  <p>music pieces around you, just like a completely music market</p>
                </div>
                <div class="item_text"><p>square</p></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item_card">
              <img src="../assets/home/moment.jpg" >
              <div class="img-tips" @click="handleHomeRoute(1)">
                <p>see what pieces the people you follow or follow you have published recently </p>
              </div>
              <div class="item_text"><p>moment</p></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item_card">
              <img src="../assets/home/personal2.jpg">
              <div class="img-tips" @click="handleHomeRoute(2)">
                <p>a music corner belong to me in this vast internet word</p>
              </div>
              <div class="item_text"><p>my page</p></div>
            </div>
          </el-col>
        </el-row>
      </div>
    <div class="footer_wrapper">
      <home-footer/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import HomeFooter from "@/components/common/HomeFooter";

export default {
  name: 'Home',
  components: {
    HomeFooter
  },
  data() {
    return {
      home_routes:[
          '/square',
          '/moment',
          '/u/' + this.$store.getters.cu_username
      ]
    }
  },
  methods: {
    handleHomeRoute(i){
      this.$router.push(this.home_routes[i])
    }
  },
  mounted() {
  }

}
</script>

<style lang="less" scoped>
  .home{
    width: 100%;
    height: 100%;
    padding-top: 100px;

  }
  .home_header{
    width: 70%;
    margin: 0 auto;
    height: 170px;
    img{
      height: 100%;
      width: 100%;
    }
  }
  .home_list_wrapper{
    width: 70%;
    height: 600px;
    margin: 0 auto;

    .el-row {
      margin-bottom: 20px;
      height: 460px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
      padding: 0 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }
    .item_card{
      height: 80%;
      width: 80%;
      margin: 30px auto;
      position: relative;

      img{
        width: 100%;
        height: 100%;
        margin-top: 40px;
        display: block;
        transition: all 0.4s;
      }
      .img-tips{
        text-align: center;
        font-size: 19px;
        color: rgb(255,255,255);
        background-color: #d95151;
        opacity: 0.4;
        width: 100%;
        height: 80%;
        border: 2px solid white;
        position: absolute;
        top: 0;
        p{
          margin-top: 50%;
        }
        display: none;
      }
      .item_text{
        text-align: center;
        font-size: 23px;
        color: white;
        position: absolute;
        width: 100%;
        height: 20%;
        bottom: 0;
      }
    }
    .item_card:hover img{
      transform: scale(1.15);
    }
    .item_card:hover .img-tips{
        display: block;
    }
  }
  .footer_wrapper{
    width: 70%;
    margin: 0 auto 0 auto;
    border-top: 1px rgb(213,213,213) solid;
  }

</style>