/*
* 配置链接后端环境
* #PRODUCT 是切换本地开发的开发环境, true 是开发测试站, false 是客服测试站
* #BUILDPRODUCT 是切换打包文件上传到git的环境, 打包上线必须打开 会自动切换
* */
const PRODUCT = true; // 开发测试站为true 客服测试站为false
const platformId = 7;
let devtest = 'devtest.wsweb.me:9280';
let cstest = 'bbet8-fpms-web.neweb.me/websocket';
let currentDev = null; // 当前开发环境
if (process.env.NODE_ENV === 'production') {
    /* 正式站配置 */
    if (location.protocol === 'https:') {
        currentDev = 'wss://' + location.hostname + '/websocket'; // 因为正式站是HTTPS的配置 举个例子 wss://www.jin47.com/websocket
    } else if (location.protocol === 'http:') {
        currentDev = 'ws://' + location.hostname + '/websocket'; // 有些站点没有HTTP的配置
    }
} else {
    currentDev = PRODUCT ? 'ws://' + devtest : 'wss://' + cstest;
}
export let env = {
    currentDev,
    platformId
};
