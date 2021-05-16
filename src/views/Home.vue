<template>
  <div class="home">
    <div class="home_header">
      <h2>Mulia, your music repository</h2>
      <p>maybe you know programmer's code hosted at github,  why can't we have a music repository?</p>
      <p>so, here is Mulia, your music piece repository, you can post your music video,audio, or thinking on it, and let
      more people see it, that's what M Life do. let's getting start...
      </p>
    </div>
      <div class="home_list_wrapper">
        <div class="item_list_wrapper" style="">
          <div class="item_card_wrapper">
            <div class="item_card">
              <img src="../assets/home/square2.jpg">
              <div class="img-tips" @click="handleHomeRoute(0)">
                <p>music pieces around you, just like a completely music market</p>
              </div>
              <div class="item_text"><p>square</p></div>
            </div>
          </div>

          <div class="item_card_wrapper">
            <div class="item_card">
              <img src="../assets/home/moment.jpg" >
              <div class="img-tips" @click="handleHomeRoute(1)">
                <p>see what pieces the people you follow or follow you have published recently </p>
              </div>
              <div class="item_text"><p>whisper</p></div>
            </div>
          </div>

          <div class="item_card_wrapper">
            <div class="item_card">
              <img src="../assets/home/personal2.jpg">
              <div class="img-tips" @click="handleHomeRoute(2)">
                <p>a music corner belong to me in this vast internet word</p>
              </div>
              <div class="item_text"><p>my page</p></div>
            </div>
          </div>
          <div class="footer_wrapper">
            <home-footer/>
          </div>
        </div>
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
    height: 520px;
    margin: 0 auto;

    .item_list_wrapper {
      display: flex; flex-flow: row wrap;
      margin-bottom: 20px;
      height: 460px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .item_card_wrapper {
      border-radius: 4px;
      padding: 0 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      width: 333px;
      height: 440px;
    }
    .item_card{
      flex: 1 1 auto;
      margin: 30px auto;
      position: relative;
      width: 88%;
      height: 84%;

      img{
        width: 100%;
        height: 100%;
        margin-top: 34px;
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
    width: 100%;
    margin-top: 100px;
    border-top: 1px rgb(213,213,213) solid;
    position: relative;
  }

</style>