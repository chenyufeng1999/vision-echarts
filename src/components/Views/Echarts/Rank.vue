<template>
  <div class="container-view">
      <div class="com-chart" ref="rank_ref"></div>
  </div>
</template>

<script>
import {getRankInfo} from '@/api'
export default {
    name:'Rank',
    data(){
        return {
            echartInstance:null,
            allData:null,
            showData:null,
            currentPage:1,
            totalPage:0,
            timer:null
        }
    },
    mounted(){
        this.initChart()
        this.getData()
        this.screenAdapter()
        window.addEventListener('resize',this.screenAdapter)
        this.startInterval()
    },
    methods:{
        initChart(){
            this.echartInstance=this.$echarts.init(this.$refs.rank_ref)
            const initOption={
                title:{
                    text:'地区销量',
                    top:'5%',
                    left:'2%'
                },
                grid:{
                    top:'30%',
                    left:'10%',
                    bottom:'10%'
                },
                tooltip:{
                    trigger:'axis',
                    axisPointer:{
                        type:'line',
                        z:0,
                        lineStyle:{
                            color:'#2D3443'
                        }
                    }
                },
                xAxis:{
                    type:'category'
                },
                yAxis:{
                    type:'value',
                     splitLine:{
                        show:false
                    }
                },
                series:[
                    {
                        type:'bar',
                        label:{
                            show:true,
                            position:'right',  //展示的位置
                            textStyle:{
                                color:'#f47920'
                            }
                        },
                        itemStyle:{
                            //指明颜色渐变的方向
                            //指明不同百分比之下的颜色
                            color:{
                                type:'linear',
                                x:0,
                                y:0,
                                x2:1,
                                y2:0,
                                colorStops:[
                                    {offset:0,color:'#5052EE'},
                                    {offset:1,color:'#AB6EE5'}
                                ]
                            }
                        },
                        markPoint:{
                            data:[
                                {
                                    type:'max',
                                    name:'最大值'
                                },
                                {
                                    type:'min',
                                    name:'最小值'
                                }
                            ]
                        },
                        markLine:{
                            data:[
                                {
                                    type:'average',
                                    name:'平均值'
                                }
                            ]
                        }
                    }
                ]
            }
            this.echartInstance.setOption(initOption)
            //绑定鼠标事件
            this.echartInstance.on('mousemove',()=>{
                clearInterval(this.timer)
            })
            this.echartInstance.on('mouseout',()=>{
                this.startInterval()
            })
        },
        async getData(){
            const res=await getRankInfo()
            this.allData=res
            //console.log(this.allData)
            //对数据进行排序(大到小)
            this.allData.sort((a,b)=>{
                return b.value-a.value
            })
            //计算总页数(每页5条数据)
            const len=this.allData.length
            this.totalPage=len%6===0?len/6:parseInt(len/6)
            this.updateChart()
        },
        updateChart(){
            //截取数据
            const start=(this.currentPage-1)*6
            const end=this.currentPage*6
            this.showData=this.allData.slice(start,end)
            //取出数据中的地区名称
            const provinceArr=this.showData.map(item=>{
                return item.name
            })
            //取出数据中的销售量
            const sellerArr=this.showData.map(item=>{
                return item.value
            })
            const updateOption={
                xAxis:{
                    data:provinceArr
                },
                yAxis:{
                    type:'value'
                },
                series:[
                    {
                        data:sellerArr
                    }
                ]
            }
            this.echartInstance.setOption(updateOption)
            this.echartInstance.resize()
        },
        screenAdapter(){
            const fontSize=this.$refs.rank_ref.offsetWidth/100*3
            const adapterOption={
                title:{
                    textStyle:{
                        fontSize:fontSize/1.2
                    }
                },
                series:[
                    {
                        label:{
                            textStyle:{
                                fontSize:fontSize/2
                            }
                        },
                        barWidth:fontSize*2,
                        itemStyle:{
                            barBorderRadius:[fontSize,fontSize,0,0],
                        }
                    }
                ]
            }
            this.echartInstance.setOption(adapterOption)
            this.echartInstance.resize()
        },
        startInterval(){
            //防止定时器启动多个
            if(this.timer){
                clearInterval(this.timer)
            }
            //启动定时器
            this.timer=setInterval(() => {
                this.currentPage++
                if(this.currentPage>this.totalPage){
                    this.currentPage=1
                }
                //更新图表
                this.updateChart()
            }, 3000);
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