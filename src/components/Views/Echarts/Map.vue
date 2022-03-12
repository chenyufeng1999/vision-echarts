<template>
  <div class="container-view" @dblclick="revertMap">
      <div class="com-chart" ref="map_ref"></div>
  </div>
</template>

<script>
import {getMapInfo} from '@/api'
import {getProvinceMapInfo} from '@/utils/map_utils'
export default {
    name:'Map',
    data(){
        return {
            points:'',
            echartInstance:null,
            allData:null
        }
    },
    mounted(){
        this.initChart()
        this.getData()
        window.addEventListener('resize',this.screenAdapter)
        this.screenAdapter()
        this.echartInstance.on('click',async (arg)=>{
            //获取点击的信息（某个省份） name属性值为省份名
            //console.log(arg)
            //使用转换工具将中文转换为拼音
            const provinceInfo=getProvinceMapInfo(arg.name)
            //console.log(provinceInfo) //省份数据 path路径 key省份名
            if(provinceInfo.key===undefined){   //判断省份名是否存在，不存在则不发送请求
                return
            }
            const res=require('../../../../public'+provinceInfo.path)
            //注册地图
            this.$echarts.registerMap(provinceInfo.key,res)
            const provinceOption={
                geo:{
                    map:provinceInfo.key
                }
            }
            this.echartInstance.setOption(provinceOption)
        })
    },
    methods:{
        async initChart(){
            this.echartInstance=this.$echarts.init(this.$refs.map_ref)
            //获取地图的矢量数据
            const res=require('../../../../public/static/map/china.json')
            //注册地图
            this.$echarts.registerMap('china',res)
            const initOption={
                title:{
                    text:'用户信息',
                    top:'10%',
                    left:'5%'
                },
                legend:{
                    bottom:'5%',
                    left:'5%',
                    orient:'vertical'   //改变方向
                },
                geo:{
                    type:'map',
                    map:'china',
                    aspectScale:0.75, //scale地图的长宽比
                    zoom:1.1, //当前视角的缩放比
                    label:{ //配置各省的文字信息
                        normal:{
                        show: true, //默认不显示
                        color: "rgb(249, 249, 249)"
                        },
                        emphasis: {
                        show: true, //默认不显示
                        color: '#f75a00',
                        }
                    },
                    itemStyle:{ //配置各省的区域信息
                        normal:{
                        areaColor:{
                            type:'radial',  //径向渐变
                            x:0.5,
                            y:0.5,
                            r:0.8,
                            colorStops:[
                            {
                                offset:0,
                                color:'rgb(31,54,150)'    //0%处的颜色
                            },{
                                offset:1,
                                color:'rgb(46,229,206)' //100%处的颜色
                            }
                            ],
                            globalCoord:true
                        },
                        shadowColor:'rgb(58,115,192)',
                        shadowOffsetX:4,
                        shadowOffsetY:4
                        },
                        emphasis:{
                        areaColor:'rgb(46,229,206)',
                        borderWidth:0.1
                        }
                    }
                    // itemStyle:{
                    //     areaColor:'#2E72BF'
                    // }
                    // label:{ //配置各省的文字信息
                    //     normal:{
                    //     show: true, //默认不显示
                    //     color: "rgb(249, 249, 249)"
                    //     },
                    //     emphasis: {
                    //     show: true, //默认不显示
                    //     color: '#f75a00',
                    //     }
                    // }
                }
            }
            this.echartInstance.setOption(initOption)
        },
        async getData(){
           const res=await getMapInfo()
            this.allData=res
            this.updateChart()
        },
        updateChart(){
            const legendArr=this.allData.map(item=>{
                return item.name
            })
            const seriesArr=this.allData.map(item=>{
                return {
                    type:'effectScatter',
                    ripperEffect:{
                        scale:4,
                        brushType:'fill'
                    },
                    zlevel:1,
                    symbolSize:10,  //散点大小
                    showEffectOn:'emphasis',
                    name:item.name,
                    data:item.children,
                    coordinateSystem:'geo'
                }
            })
            const dataOtion={
                legend:{
                    data:legendArr
                },
                //关于地图中散点图的配置
                series:seriesArr     
            }
            this.echartInstance.setOption(dataOtion)
        },
        screenAdapter(){
            const fontSize=this.$refs.map_ref.offsetWidth/100*3
            const adapterOption={
                title:{
                    textStyle:{
                        fontSize:fontSize
                    }
                },
                legend:{
                    itemWidth:fontSize/2,
                    itemHeight:fontSize/2,
                    itemGap:fontSize/2,
                    textStyle:{
                        fontSize:fontSize/1.5
                    }
                }
            }
            this.echartInstance.setOption(adapterOption)
            this.echartInstance.resize()
        },
        //回到中国地图
        revertMap(){
            const revertOption={
                geo:{
                    map:'china'
                }
            }
            this.echartInstance.setOption(revertOption)
        }
    }
}
</script>

<style lang="less" scoped>
.container-view{
  width: 100%;
  height: 100%;
  .com-chart{
    width: 100%;
    height: 100%;
  }
}
</style>