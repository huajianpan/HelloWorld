import request from '../utils/request';
import store from '../store';
// 获取文章列表数据
export const getArticles = (params) => {
    return request({
        method: 'GET',
        url: '/articles',
        params,
    })
};
