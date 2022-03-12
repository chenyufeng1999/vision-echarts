<template>
  <div class="container-view">
      <div class="com-chart" ref="stock_ref"></div>
  </div>
</template>

<script>
import {getStockInfo} from '@/api'
export default {
    name:'Stock',
    data(){
        return {
            echartInstance:null,
            allData:null,
            showData:[],
            currentPage:1,
            totalPage:0,
            fontSize:0,
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
    destroyed(){
        window.removeEventListener('resize',this.screenAdapter)
        clearInterval(this.timer)
    },
    methods:{
        initChart(){
            this.echartInstance=this.$echarts.init(this.$refs.stock_ref)
            const initOption={
                title:{
                    text:'销售库存占比',
                    top:'5%',
                    left:'40%',
                },
                tooltip:{}
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
            const res=await getStockInfo()
            this.allData=res
            //获取总条数
            const len=this.allData.length
            //获取总页数(每页五条数据)
            this.totalPage=len%5===0?len/5:parseInt(len/5)+1
            this.updateChart()
        },
        updateChart(){
            //对数据进行处理
            //展示五条数据
            const start=(this.currentPage-1)*5
            const end=this.currentPage*5
            this.showData=this.allData.slice(start,end)
            //配置饼图的坐标
            const centerArr=[
                ['18%','40%'],
                ['50%','40%'],
                ['82%','40%'],
                ['34%','75%'],
                ['66%','75%']
            ]
            const colorArr=[
                ['#e66465', '#9198e5'],
                ['#5052EE','#AB6EE5'],
                ['#FFECB3','#4A1B9A'],
                ['#FEEB45','#4D342F'],
                ['#DCEDC8','#1A237E']
            ]
            //获取series配置项的数据
            const seriesArr=this.showData.map((item,index)=>{
                const arr=colorArr[index]
                return {
                    type:'pie',
                    name:item.name,
                    data:[
                        {
                            value:item.stock,
                            itemStyle:{
                                color:'grey'
                            }
                        },
                        {
                            name:item.name+'\n\n'+item.sales,
                            value:item.sales,
                            itemStyle:{
                                color:{
                                    type:'linear',
                                    x:0,
                                    y:0,
                                    x2:1,
                                    y2:0,
                                    colorStops:[
                                        {offset:0,color:arr[0]},
                                        {offset:1,color:arr[1]}
                                    ]
                                }
                            }
                        }
                    ],
                    center:centerArr[index],
                    radius:['38%','45%'],
                    hoverAnimation:false,   //关闭鼠标移入饼图的动画效果
                    labelLine:{ //去除文字的指示线
                        show:false
                    },
                    label:{ //文字显示
                        show:true,
                        position:'center',
                        fontSize:this.fontSize/1.2
                    },
                    selectedMode:'multiple'
                }
            })
            const updateOption={
                series:seriesArr
            }
            this.echartInstance.setOption(updateOption)
            this.echartInstance.resize()
        },
        screenAdapter(){
            this.fontSize=this.$refs.stock_ref.offsetWidth/100*3
            const adapterOption={
                title:{
                    textStyle:{
                        fontSize:this.fontSize
                    }
                }
            }
            this.echartInstance.setOption(adapterOption)
            this.echartInstance.resize()
        },
        startInterval(){
            if(this.timer){
                clearInterval(this.timer)
            }
            this.timer=setInterval(()=>{
                this.currentPage++
                if(this.currentPage>this.totalPage){
                    this.currentPage=1
                }
                this.updateChart()
            },3000)
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