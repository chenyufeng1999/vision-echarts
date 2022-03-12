<template>
    <div class="test">
        <span class="icon-item" v-for="(item,i) in IconType" :key="i">
            <Icon :type="item" />
            <i>{{item}}</i>
        </span>
    </div>
</template>

<script>
import Icon,{IconType} from '@/components/Icon'
export default {
    components:{Icon},
    data(){
        return {
            IconType:IconType
        }
    },
    mounted(){
        console.log(this.IconType)
    }
}
</script>

<style lang="less" scoped>
.test{
    width: 500px;
    display: grid;
    grid-template-columns: repeat(5,1fr);
    row-gap: 20px;
    .icon-item{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>