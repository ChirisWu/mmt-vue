<template>
    <div>
        <ul class="music_pools;">
            <li class="pool">
            </li>
            <li class="pool">
            </li>
            <li class="pool">
            </li>
            <li class="pool">
            </li>
            <li class="pool">
            </li>
            <li class="pool">
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "poolSet"
    }
</script>

<style scoped>
    .music_pools {
        background-color: yellow;
        padding: 0;
        margin: 0;
    }
    .pool{
        background-color: cornflowerblue;
        height: 300px;
        width: 42%;
        margin-top: 30px ;
    }
    .pool:nth-of-type(odd){
        float: left;
        margin-left: 60px;
    }
    .pool:nth-of-type(even){
        float: right;
        margin-right: 60px;
    }
</style>