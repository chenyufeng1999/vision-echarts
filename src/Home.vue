<template>
  <div class="home-container">
      <div class="menu">
          <Aside />
      </div>
      <div class="main">
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
import Aside from '@/components/Aside'
export default {
    components:{Aside},
    name:'Home',
}
</script>

<style lang="less" scoped>
.home-container{
    width: 100%;
    height: 100vh;
    display: flex;
    .menu{
        width: 250px;
        height: 100%;
    }
    .main{
        width: 100%;
        height: 100%;
        flex: 1 1 auto;
        position: relative;
    }
}
</style>