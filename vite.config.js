import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from "vite-plugin-mock";
// https://vitejs.dev/config/
const localEnabled = process.env.USE_MOCK || false;
const prodEnabled = process.env.USE_CHUNK_MOCK || false;

export default defineConfig({
    plugins: [
        vue(), 
        viteMockServe({
            mockPath: "./src/mock", //mock文件地址
            localEnabled: localEnabled, // 开发打包开关
            prodEnabled: prodEnabled, // 生产打包开关
            // 这样可以控制关闭mock的时候不让mock打包到最终代码内
            injectCode: `
              import { setupProdMockServer } from '../mockProdServer';
              setupProdMockServer();
            `,
            logger: false, //是否在控制台显示请求日志
            supportTs: false //打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
        })
    ]
})
