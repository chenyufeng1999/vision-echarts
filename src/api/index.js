import request from '@/api/request'

export async function getHotInfo(){
    return await request.get('/api/hot')
}

export async function getMapInfo(){
    return await request.get('/api/map')
}

export async function getRankInfo(){
    return await request.get('/api/rank')
}

export async function getSellerInfo(){
    return await request.get('/api/seller')
}

export async function getStockInfo(){
    return await request.get('/api/stock')
}

export async function getTrendInfo(){
    return await request.get('/api/trend')
}