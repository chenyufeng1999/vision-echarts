import axios from "axios";

const ins=axios.create()
//设置响应拦截
ins.interceptors.response.use(function(res){
    //code不为0则表示有请求失败
    if(res.data.code!==0){
        return null
    }
    return  res.data.data
})

export default ins