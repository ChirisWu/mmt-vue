<template>
  <div class="home">
    <div class="home_header">
        <img src="../assets/home/header.png">
    </div>
      <div class="home_list_wrapper">
        <el-row>
          <el-col :span="8">
            <div class="item_card">
                <img src="../assets/home/square2.jpg">
                <div class="img-tips" @click="handleHomeRoute(0)">
                  <p>我们都在寻找一个地方，寻找一种声音。或许漂泊，四海为家，江边饮酒，月前奏琴...</p>
                </div>
                <div class="item_text"><p>音乐广场</p></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item_card">
              <img src="../assets/home/moment.jpg" >
              <div class="img-tips" @click="handleHomeRoute(1)">
                <p>一个人听着耳机？闲散无聊的午后还是失眠的夜晚？也许这里你能发现有趣的故事，好听的歌，认识有趣的人...</p>
              </div>
              <div class="item_text"><p>音乐动态</p></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item_card">
              <img src="../assets/home/personal2.jpg">
              <div class="img-tips" @click="handleHomeRoute(2)">
                <p>漂泊的身需要有一张床来安放，同时孤独的心也需要有它自己的家...</p>
              </div>
              <div class="item_text"><p>我的主页</p></div>
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
          'mhome/square',
          'mhome/moment',
          'mhome/user'
      ]
    }
  },
  methods: {
    handleHomeRoute(i){
      console.log("route change")
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
  }
  .home_header{
    background-color: azure;
    width: 70%;
    margin: 0 auto;
    height: 270px;
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
      background-color: aliceblue;

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
    margin: 130px auto 0 auto;
    border-top: 1px rgb(213,213,213) solid;
  }

</style>