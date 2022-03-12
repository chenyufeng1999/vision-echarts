<template>
  <div class="container-view">
      <div class="com-chart" ref="seller_ref"></div>
  </div>
</template>

<script>
import {getSellerInfo} from '@/api'
export default {
    name:'Seller',
    data(){
        return {
            echartInstance:'',  //图表实例化对象
            showData:[], //展示的数据
            allData:[], //获取到的所有数据
            currentPage:1,  //当前显示的页数
            totalPage:0, //总页数
            timer:null  //定时器
        }
    },
    destroyed(){
        //销毁时清除图表更新定时器
        clearInterval(this.timer)
        //销毁时停止监听游览器大小的变化
        window.removeEventListener('resize',this.screenAdapter)
    },
    mounted(){
        this.initChart()
        this.getData()
        //挂在时监听游览器大小变化
        window.addEventListener('resize',this.screenAdapter)
        //初始化时进行适配
        this.screenAdapter()
    },
    methods:{
        //初始化echartInstance对象
        initChart(){    //初始化时的操作
            //实例化图表对象，并使用dark主题
            this.echartInstance=this.$echarts.init(this.$refs.seller_ref)
            //对图表初始化配置
            const initOption={
                title:{
                    text:'▕  商家销售统计',
                    top:20,
                    left:30
                },
                grid:{  //坐标轴的位置
                    top:'20%',
                    left:'7%',
                    right:'8%',
                    bottom:'10%',
                    containLabel:true   //包含坐标轴上的数字
                },
                xAxis:{
                    type:'value',
                    splitLine:{
                        show:false
                    }
                },
                yAxis:{
                    type:'category',
                    splitLine:{
                        show:false
                    }
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
                toolbox:{
                    top:'3%',
                    right:'10%',
                    feature:{
                        saveAsImage:{},
                        restore:{},
                        dataView:{},
                        dataZoom:{},
                        magicType:{
                            type:['bar','line']
                        }
                    }
                },
                series:[
                    {
                        type:'bar',
                        label:{
                            show:true,
                            position:'right',  //展示的位置
                            textStyle:{
                                color:'red'
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
                        }
                    }
                ]
            }
            this.echartInstance.setOption(initOption)
            //对图表进行鼠标事件的移入事件绑定
            this.echartInstance.on('mouseover',()=>{
                clearInterval(this.timer)
            })
            //对图表进行鼠标事件的移除事件绑定
            this.echartInstance.on('mouseout',()=>{
                this.startInterval()
            })
        },
        //获取服务器的数据
        async getData(){
            const res=await getSellerInfo()
            this.allData=res
            //对数组进行排序
            this.allData.sort((a,b)=>{
                return  a.value - b.value   //从小到大排序
            })
            //计算总页数
            const len=this.allData.length
            this.totalPage=len%5===0?len/5:parseInt(len/5)+1
            //console.log(this.totalPage)   //打印总页数
            //进行图表更新
            this.updateChart()
            //启动定时器
            this.startInterval()
        },
        //更新图表
        updateChart(){  //对服务器数据进行加工并给图表赋值
            const start=(this.currentPage-1)*5
            const end=this.currentPage*5
            this.showData=this.allData.slice(start,end)
            const sellerNames=this.showData.map(item=>{
                return item.name
            })
            const sellerValues=this.showData.map(item=>{
                return item.value
            })
            const dataOption={
                yAxis:{
                    data:sellerNames
                },
                series:[
                    {
                        data:sellerValues,
                    }
                ]
            }
            this.echartInstance.setOption(dataOption)
        },
        //定时器
        startInterval(){
            //判断定时器是否存在
            if(this.timer){
                clearInterval(this.timer)
            }
            //设置定时器
            this.timer=setInterval(()=>{
                this.currentPage++
                if(this.currentPage>this.totalPage){//大于总页数回到第一页
                    this.currentPage=1
                }
                //更新图表
                this.updateChart()
            },3000)
        },
        //当前游览器大小发生变化时，调用该方法
        screenAdapter(){    //游览器大小发生变化时的适配
            const fontSize=this.$refs.seller_ref.offsetWidth/100*3.6
            const adapterOption={
                title:{
                    textStyle:{
                        fontSize:fontSize
                    }
                },
                tooltip:{
                    axisPointer:{
                        lineStyle:{
                            width:fontSize
                        }
                    }
                },
                series:[
                    {
                        barWidth:fontSize,
                        itemStyle:{
                            barBorderRadius:[0,fontSize/2,fontSize/2,0],
                        }
                    }
                ]
            }
            this.echartInstance.setOption(adapterOption)
            //手动调用图表对象的resize才能产生效果(图表更新)
            this.echartInstance.resize()
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