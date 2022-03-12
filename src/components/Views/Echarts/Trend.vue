<template>
  <div class="container-view">
      <select name="sel" id="sel" v-model="selectValue" @change="updateChart()" :style="comStyle">
        <option :value="item.key" v-for="(item,index) in selectTypes" :key="index">{{'▕  '+item.text}}</option>
      </select>
      <div class="com-chart" ref="trend_ref"></div>
  </div>
</template>

<script>
import {getTrendInfo} from '@/api'
export default {
    name:'Trend',
    data(){
      return {
        chartInstance:null, //图表实例对象
        allData:null,  //服务器响应数据
        selectValue:'map',
        timer:null,
        num:0,
        fontSize:0  //指明字体大小
      }
    },
    mounted(){
        this.initChart()
        this.getData()
        this.screenAdapter()
        window.addEventListener('resize',this.screenAdapter)
        this.startSetInterval()
    },
    destroyed(){
      window.removeEventListener('resize',this.screenAdapter)
    },
    
    computed:{
      selectTypes(){
        if(!this.allData){
          return []
        }else{
          return this.allData.type
        }
      },
      comStyle(){
        return {
          fontSize:this.fontSize+'px'
        }
      }
    },
    methods:{
      initChart(){ //初始化图表配置
        this.chartInstance=this.$echarts.init(this.$refs.trend_ref)
        const initOption={
          xAxis:{
            type:'category',
            boundaryGap:false
          },
          yAxis:{
            type:'value',
            splitLine:{
                show:false
            }
          },
          grid:{
            bottom:'5%',
            top:'20%',
            show:false,
            containLabel:true
          },
          legend:{
            top:'13%',
            icon:'circle'
          },
          tooltip:{
            trigger:'axis'
          }
        }
        this.chartInstance.setOption(initOption)
        //对图表进行鼠标事件的移入事件绑定
        this.chartInstance.on('mouseover',()=>{
            clearInterval(this.timer)
        })
        //对图表进行鼠标事件的移除事件绑定
        this.chartInstance.on('mouseout',()=>{
            this.startSetInterval()
        })
      },
      async getData(){  //获取数据
        const res=await getTrendInfo()
        this.allData=res
        //调用图表数据更新
        this.updateChart()
      },
      updateChart(){  //图表数据更新
        //半透明颜色
        const colorArr1=[
          'rgba(11,168,44,0.5)',
          'rgba(44,110,255,0.5)',
          'rgba(22,242,217,0.5)',
          'rgba(254,33,30,0.5)',
          'rgba(250,105,0,0.5)'
        ]
        //全透明颜色
        const colorArr2=[
          'rgba(11,168,44,0)',
          'rgba(44,110,255,0)',
          'rgba(22,242,217,0)',
          'rgba(254,33,30,0)',
          'rgba(250,105,0,0)'
        ]
        //类目轴数据
        const timeArr=this.allData.common.month
        //series下的data数据
        const valueArr=this.allData[this.selectValue].data
        const seriesArr=valueArr.map((item,index)=>{
          return {  //返回的是series下的每一个对象
            type:'line',
            name:item.name,
            data:item.data,
            stack:this.selectValue,
            smooth:true,
            areaStyle:{
              color:{
                x:0,
                y:0,
                x2:0,
                y2:1,
                colorStops:[
                    {offset:0,color:colorArr1[index]},
                    {offset:1,color:colorArr2[index]}
                ]
              }
            }
          }
        })
        //处理数据
        const dataOption={
          xAxis:{
            data:timeArr
          },
          series:seriesArr
        }
        this.chartInstance.setOption(dataOption)
      },
      screenAdapter(){  //屏幕大小适配
        this.fontSize=this.$refs.trend_ref.offsetWidth/100*3
        const adapterOption={
          legend:{
            itemWidth:this.fontSize,
            itemHeight:this.fontSize,
            itemGap:this.fontSize,
            textStyle:{
              fontSize:this.fontSize/1.5
            }
          }
        }
        this.chartInstance.setOption(adapterOption)
        this.chartInstance.resize()
      },
      startSetInterval(){
        if(this.timer){ //防止定时器启动多个
          clearInterval(this.timer)
        }
        //绑定定时器
        this.timer=setInterval(()=>{
          this.num++
          if(this.num>=this.selectTypes.length){
            this.num=0
          }
          this.selectValue=this.selectTypes[this.num].key
          //更新图表
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
#sel{
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 10;
  color: aliceblue;
  background: gray;
  cursor: pointer;
  border: none;
  border-radius: 20px;
}
</style>