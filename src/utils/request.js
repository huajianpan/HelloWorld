import axios from 'axios';
import store from '../store';

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
    // 请求拦截器
    // 响应拦截器
})
request.interceptors.request.use(
    // 请求的前进行配置
    function (config) {
        const user = store.state.user
        if (user && user.myToken) {
            config.headers.Authorization = `Bearer ${user.myToken}`
        }
        return config
    },
    // 请求出错了会被执行
    // function (err) {},
    console.log
)
export default request; 
