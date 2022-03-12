<template>
    <ul class="menu-container" v-if="menuList">
        <li
        class="menu-item"
        v-for="item in menuList"
        :key="item.title">
            <router-link :to="{name:item.name}"
            @click="handleClick(item)">
                <Icon :type="item.icon" />
                <span>{{item.title}}</span>
            </router-link>
            <Menu @select="handleClick" :menuList="item.children" v-if="item.children" />
        </li>
    </ul>
</template>

<script>
import Icon from '@/components/Icon'
export default {
    components:{Icon},
    name:'Menu',
    props:{
        menuList:{
            type:Array,
            required:true
        }
    },
    methods:{
        handleClick(item){
            //修改激活状态
            this.$emit('select',item)
        }
    }
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
@import url('//at.alicdn.com/t/font_2164449_nalfgtq7il.css');
.menu-container{
    width: 100%;
    height: 100%;
    color: #fff;
    a{
        display: block;
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        margin-bottom: 10px;
        cursor: pointer;
        span{
            margin-left: 10px;
        }
        &.router-link-exact-active{
            background:rgba(255, 255, 255, 0.1);
            color:@success;
        }
    }
    .menu-container{
        margin-left: 20px;
    }
}
</style>