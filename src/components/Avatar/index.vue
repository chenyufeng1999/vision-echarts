<template>
    <img
    class="avatar-container"
    :style="{width:`${size}px`,height:`${size}px`}"
    :src="src" 
    alt="">
</template>

<script>
export default {
    name:'Avatar',
    props:{
        src:{
            type:String,
            required:true
        },
        size:{
            type:Number,
            required:false,
            default:120
        }
    }
}
</script>

<style lang="less" scoped>
.avatar-container{
    border-radius: 50%;
}
</style>