import request from '../utils/request'
// 获取所有频道
export const getAllChannels = () => {
    return request({
        method: 'get',
        url: '/channels'
    })
}
// 添加用户频道
export const addUserChannels = ({ userId, channel }) => {
    return request({
        method: 'POST',
        url: '/user/addChannels',
        data: {
            userId,
            channel
        }
    })
}
// 删除用户频道
export const removeUserChannels = ({ userId, channel }) => {
    return request({
        method: 'DELETE',
        url: '/user/removeChannels',
        data: {
            userId,
            channel
        }
    })
}

