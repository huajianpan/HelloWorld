import request from '../utils/request';
import store from '../store';
// 封装用户请求的模块
export const login = (data) => {
    return request({
        method: 'POST',
        url: '/user/login',
        data,
    })
};
// 获取用户信息
export const getUserInfo = (id) => {
    return request({
        method: 'GET',
        url: '/userinfo/get',
        params: { userId: id },
    })
};
// 获取用户频道列表信息
export const getUserChannels = (id) => {
    return request({
        method: 'GET',
        url: '/user/channelset',
    })
};