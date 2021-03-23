<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  }
}
</script>

<style lang="less">
    body, html, #app{
        width: 100%;
        height: 100%;
        padding: 0 !important;
        margin: 0;
    }
    ul,li{
        padding:0;
        margin:0;
        list-style:none
    }
    ::-webkit-scrollbar {

        width: 5px;
        height: 3px;
        background-color: rgba(240, 240, 240, 1);
    }
    ::-webkit-scrollbar-track{

        box-shadow:inset000pxrgba(240,240,240,.5);

        border-radius:10px;

        background-color:rgba(240,240,240,.5);
    }

    　　/*定义滑块内阴影+圆角*/

    　　::-webkit-scrollbar-thumb{

        border-radius:20px;
        box-shadow:inset000pxrgba(240,200,240,.5);
        background-color: rgba(123, 120, 120, 0.5);
    }

</style>
