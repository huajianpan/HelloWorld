// 1 安装
// # 使用 npm 安装
// npm install mockjs vite-plugin-mock cross-env -D
// # 使用 yarn 安装
// yarn add mockjs vite-plugin-mock cross-env -D

// 2 mockProdServer.js
// 3 vite.config.js
// 4 package.json
// 5 yarn dev:mock
// https://www.cnblogs.com/student007/p/15180190.html
import { Mock, Random } from 'mockjs';
export default [
    {
        url: '/user/login',
        method: 'post',
        timeout: 1000,
        // statusCode?:number;
        // rawResponse?: (req: IncomingMessage, res: ServerResponse) => void;
        response: e => {
            // {url,body,query,headers}
            if (e.body.userName == 'admin' && e.body.userPwd == 123456) {
                return {
                    code: 0,
                    message: 'ok',
                    data: { id: 1, ...e.body }, // pwd应该编码
                    myToken: Date.now()
                }
            } else {
                return {
                    code: -1,
                    message: '账号或密码错误',
                    data: null
                }
            }
        }
    },
    {
        url: '/userinfo/get',
        method: 'get',
        response: e => {
            if (!e.headers.authorization) return {}

            if (e.query.userId == 1)
                return {
                    userName: '花渐畔',
                    art_count: 10,
                    follow_count: 12,
                    fans_count: 13,
                    like_count: 40,
                    photo: '/head.jpg'
                }
        }
    },
    {
        url: '/user/channelset',
        method: 'get',
        response: e => {
            if (!e.headers.authorization)
                return [
                    {
                        id: 3,
                        name: 'React'
                    }
                ]

            return [
                {
                    id: 3,
                    name: 'React'
                },
                {
                    id: 0,
                    name: 'Vue'
                },
                {
                    id: 1,
                    name: 'Vue2'
                },
                {
                    id: 2,
                    name: 'Vue3'
                }
            ]
        }
    },
    {
        url: '/articles',
        method: 'get',
        timeout: 200,
        response: e => {
            if (e.query.refresh) {
                return {
                    list: [
                        {
                            id: 99,
                            text: `refresh`
                        }
                    ]
                }
            }
            return {
                p_num: e.query.pageNumber - 0 + 1,
                'list|6':
                    e.query.pageNumber - 0 > 15
                        ? []
                        : [
                              {
                                  id: -e.query.pageNumber * 1 + 1,
                                  aut_name: Random.cname(),
                                  comm_count: Random.cword(),
                                  pub_date: Random.datetime(),
                                  title: Random.ctitle(),
                                  'imgs|1-3': [Random.image()], // 重复1-3
                                  'type|1-3': 1 // 取 1-2
                              }
                          ]
            }
        }
    },
    {
        url: '/channels',
        method: 'get',
        timeout: 200,
        response: () => {
            return [
                {
                    id: 3,
                    name: 'React'
                },
                {
                    id: 0,
                    name: 'Vue'
                },
                {
                    id: 1,
                    name: 'Vue2'
                },
                {
                    id: 2,
                    name: 'Vue3'
                },
                {
                    id: '31',
                    name: Random.first()
                },
                {
                    id: '32',
                    name: Random.first()
                },
                {
                    id: '33',
                    name: Random.first()
                },
                {
                    id: '34',
                    name: Random.first()
                }
            ]
        }
    },
    {
        url: '/user/addChannels',
        method: 'POST',
        response: e => {
            // e.body => {
            //     userId,
            //     channel
            // }
            if (Math.random() > 0.5) {
                return {
                    code: -1,
                    message: '添加失败！',
                    data: null
                }
            }
            return {
                code: 0,
                message: 'ok',
                data: null
            }
        }
    },
    {
        url: '/user/removeChannels',
        method: 'DELETE',
        response: e => {
            // e.body => {
            //     userId,
            //     channel
            // }
            if (Math.random() > 0.5) {
                return {
                    code: -1,
                    message: '删除失败！',
                    data: null
                }
            }
            return {
                code: 0,
                message: 'ok',
                data: null
            }
        }
    }
]
