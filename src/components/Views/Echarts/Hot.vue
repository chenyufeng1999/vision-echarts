<template>
  <div class="container-view">
      <div class="com-chart" ref="hot_ref"></div>
      <!-- element-ui分页 -->
      <el-pagination
        background
        :page-size="1"
        layout="prev, pager, next"
        @prev-click="currentClick"
        @next-click="currentClick"
        @current-change="currentClick"
        :total="totalPage">
      </el-pagination>
  </div>
</template>

<script>
import {getHotInfo} from '@/api'
export default {
    name:'Hot',
    data(){
      return {
        echartInstance:null,
        allData:null,
        currentPage:1, //记录当前所在页面
        totalPage:0 //记录总页数
      }
    },
    mounted(){
      this.initChart()
      this.getData()
      this.screenAdapter()
      window.addEventListener('resize',this.screenAdapter)
    },
    methods:{
      initChart(){
        this.echartInstance=this.$echarts.init(this.$refs.hot_ref,this.theme)
        const initOption={
          title:{
            top:'4%',
            left:'4%'
          },
          legend:{
            bottom:'5%',
            right:'2%',
            orient:'vertical'   //改变方向
          },
          toolbox:{
                top:'3%',
                right:'20%',
                feature:{
                    saveAsImage:{},
                    dataView:{},
                }
            },
          tooltip:{},
          series:[
            {
              type:'pie',
              top:'15%',
              right:'15%',
              bottom:'10%',
              radius:['50%','75%'],
              selectedMode:'multiple'   //选中效果(single/multiple)
            }
          ]
        }
        this.echartInstance.setOption(initOption)
      },
      async getData(){
        const res=await getHotInfo()
        this.allData=res
        this.totalPage=this.allData.length
        //更新图表
        this.updateChart(this.currentPage)
      },
      updateChart(index){
        //筛选数据(获取第一组数据)
        const dataTitle=this.allData[index-1].name
        const dataArr=this.allData[index-1].children
        //console.log(dataArr)
        const seriesArr=dataArr.map(item=>{
          return {
            name:item.name,
            value:item.value
          }
        })
        //console.log(seriesArr)
        const updateOption={
          title:{
            text:dataTitle
          },
          series:[
            {
              data:seriesArr
            }
          ]
        }
        this.echartInstance.setOption(updateOption)
        this.echartInstance.resize()
      },
      screenAdapter(){
        const fontSize=this.$refs.hot_ref.offsetWidth/100*3
        const adapterOption={
          title:{
            textStyle:{
              fontSize:fontSize*1.5
            }
          },
          legend:{
              itemWidth:fontSize,
              itemHeight:fontSize,
              itemGap:fontSize,
              textStyle:{
                  fontSize:fontSize/1.2
              }
          }
        }
        this.echartInstance.setOption(adapterOption)
        this.echartInstance.resize()
      },
      currentClick(value){  //分页页面数据更新函数
        //value为当前所在的第几页  
        this.updateChart(value)
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
  .el-pagination{
    position: absolute;
    bottom: 2%;
    left: 2%;
    z-index: 100;
  }
}
</style>