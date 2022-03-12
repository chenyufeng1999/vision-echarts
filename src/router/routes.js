import ScreenView from '@/components/Views/ScreenView'
import Hot from '@/components/Views/Echarts/Hot'
import Map from '@/components/Views/Echarts/Map'
import Rank from '@/components/Views/Echarts/Rank'
import Seller from '@/components/Views/Echarts/Seller'
import Stock from '@/components/Views/Echarts/Stock'
import Trend from '@/components/Views/Echarts/Trend'
export default [
    {
        name:'Views',
        path:'/',
        component:ScreenView,
        icon:'arrowUp',
        title:'监控系统'
    },
    {
        name:'Hot',
        path:'/chart/hot',
        icon:'arrowUp',
        title:'热门销售',
        component:Hot,
    },
    {
        name:'Map',
        path:'/chart/map',
        title:'地图数据',
        icon:'arrowUp',
        component:Map,
    },
    {
        name:'Rank',
        path:'/chart/rank',
        title:'地区销量',
        icon:'arrowUp',
        component:Rank,
    },
    {
        name:'Seller',
        path:'/chart/seller',
        title:'销售统计',
        icon:'arrowUp',
        component:Seller,
    },
    {
        name:'Stock',
        path:'/chart/stock',
        title:'库销占比',
        icon:'arrowUp',
        component:Stock,
    },
    {
        name:'Trend',
        path:'/chart/trend',
        title:'销售趋势',
        icon:'arrowUp',
        component:Trend,
    },
]