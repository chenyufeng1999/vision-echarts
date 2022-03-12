<template>
  <div class="container">
      <div class="title">
          <span>电商平台实时监控系统</span>  
      </div>
      <div class="container-view screen">
        <div class="left-view">
            <!-- 销售趋势图表trend -->
            <div :class="['left-top',fullScreenStatus.trend?'fullScreen':'']">
                <Trend ref="trend"></Trend>
                <div class="resize" @click="fullScreenChange('trend')">
                    <i :class="[fullScreenStatus.trend?'el-icon-zoom-out':'el-icon-zoom-in']"></i>
                </div>
            </div>
            <!-- 商家销售图表seller -->
            <div :class="['left-bottom',fullScreenStatus.seller?'fullScreen':'']">
                <Seller ref="seller"></Seller>
                <div class="resize" @click="fullScreenChange('seller')">
                    <i :class="[fullScreenStatus.seller?'el-icon-zoom-out':'el-icon-zoom-in']"></i>
                </div>
            </div>
        </div>
        <div class="middle-view">
            <!-- 商家分布图表map -->
            <div :class="['middle-top',fullScreenStatus.map?'fullScreen':'']">
                <Map ref="map"></Map>
                <div class="resize" @click="fullScreenChange('map')">
                    <i :class="[fullScreenStatus.map?'el-icon-zoom-out':'el-icon-zoom-in']"></i>
                </div>
            </div>
            <!-- 地区销售排行图表rank -->
            <div :class="['middle-bottom',fullScreenStatus.rank?'fullScreen':'']">
                <Rank ref="rank"></Rank>
                <div class="resize" @click="fullScreenChange('rank')">
                    <i :class="[fullScreenStatus.rank?'el-icon-zoom-out':'el-icon-zoom-in']"></i>
                </div>
            </div>
        </div>
        <div class="right-view">
            <!-- 热门销售图表hot -->
            <div :class="['right-top',fullScreenStatus.hot?'fullScreen':'']">
                <Hot ref="hot"></Hot>
                <div class="resize" @click="fullScreenChange('hot')">
                    <i :class="[fullScreenStatus.hot?'el-icon-zoom-out':'el-icon-zoom-in']"></i>
                </div>
            </div>
            <!-- 库存销售占比图表stock -->
            <div :class="['right-bottom',fullScreenStatus.stock?'fullScreen':'']">
                <Stock ref="stock"></Stock>
                <div class="resize" @click="fullScreenChange('stock')">
                    <i :class="[fullScreenStatus.stock?'el-icon-zoom-out':'el-icon-zoom-in']"></i>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import Hot from '@/components/Views/Echarts/Hot'
import Map from '@/components/Views/Echarts/Map'
import Rank from '@/components/Views/Echarts/Rank'
import Seller from '@/components/Views/Echarts/Seller'
import Stock from '@/components/Views/Echarts/Stock'
import Trend from '@/components/Views/Echarts/Trend'
export default {
    name:'ScreenView',
    components:{
        Hot,
        Map,
        Rank,
        Seller,
        Stock,
        Trend
    },
    data(){
        return {
            fullScreenStatus:{  //是否全屏的状态
                hot:false,
                map:false,
                rank:false,
                seller:false,
                stock:false,
                trend:false
            }
        }
    },
    methods:{
        fullScreenChange(chartName){    //是否全屏事件
            this.fullScreenStatus[chartName]=!this.fullScreenStatus[chartName]
            this.$nextTick(()=>{    //当数据发生变化时调用
                //调用图表组件的图表大小适配方法
                this.$refs[chartName].screenAdapter()
            })
        },
    }
}
</script>

<style lang="less" scoped>
.container{
    width: 100%;
    height: 100%;
    .container-view{
       width: 100%;
    }
}
.fullScreen{
    position: fixed!important;
    left: 0!important;
    top: 0!important;
    width: 100%!important;
    height: 100%!important;
    z-index: 101;
    background-color: #fff;
}
.resize{
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 100;
    font-size: 20px;
    i{
        color: pink;
        font-size: 26px;
    }
}
.title{
    margin: 0;
    padding: 10px;
    text-align: center;
    width: 100%;
    position: relative;
    font-family: '华文彩云';
    font-size: 26px;
    background-repeat: no-repeat;
    background-position: center 0;
    background-size: 100% auto;
}
.screen{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 90%;
    .left-view,.middle-view,.right-view{
        position: relative;
    }
    .left-view{
        width: 30%;
        height: 100%;
        .left-top{
            width: 100%;
            height: 50%;
            margin-bottom: 20px;
            position: relative;
        }
        .left-bottom{
            width: 100%;
            height: 45%;
            position: relative;
        }
    }
    .middle-view{
        width: 38%;
        height: 100%;
        .middle-top{
            width: 100%;
            height: 55%;
            margin-bottom: 20px;
            position: relative;
        }
        .middle-bottom{
            width: 100%;
            height: 40%;
            position: relative;
        }
    }
    .right-view{
        width: 30%;
        height: 100%;
        .right-top{
            width: 100%;
            height: 45%;
            margin-bottom: 20px;
            position: relative;
        }
        .right-bottom{
            width: 100%;
            height: 50%;
            position: relative;
        }
    }
}
</style>