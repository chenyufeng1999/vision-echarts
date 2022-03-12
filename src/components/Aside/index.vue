<template>
  <div class="aside-container">
      <div class="img">
          <Avatar :src="src" />
      </div>
      <div class="menu">
          <Menu @select="handleSelect" :menuList="menuList" />
      </div>
      <Contact />
  </div>
</template>

<script>
import Contact from '@/components/Contact'
import Avatar from '@/components/Avatar'
import Menu from '@/components/Menu'
export default {
    components:{Menu,Avatar,Contact},
    data(){
        return {
            src:'https://img2.baidu.com/it/u=1790834130,1952230725&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
        }  
    },
    computed:{
        menuList(){
            return this.$router.options.routes
        }
    },
    methods:{
        handleSelect(item){
            console.log(item)
        }
    }
}
</script>

<style lang="less" scoped>
.aside-container{
    width: 100%;
    height: 100%;
    background: #000;
    overflow-y: auto;
    .img{
        height: 180px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>