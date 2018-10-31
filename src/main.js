// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import '@/common/amfe-flexible'; // rem自动适配方案  移动端使用flex布局方式,搜索引擎解决 计算pad的方法(psd像素 / 75)余数3位 =>0.5666rem;
import FastClick from 'fastclick'; // fastclikck
import Socketvue from './config/socket_vue';
import {env} from './config/env'; // 开发环境配置
import './common/reset.css'; // 重置样式
import tool from '@/common/tool'; // 工具类函数
import {apiRequest} from '@/common/api/base';
import vueLazy from 'vue-lazyload'; // lazyload
// import fundebugJavascript from 'fundebug-javascript';
// fundebugJavascript.apikey = '682e3b0143bcac8721428e0752205fa4f4d1c0aa57d6cdad2e3fac3a9d54e205';
FastClick.attach(document.body);
Vue.config.productionTip = false;

Vue.prototype.$tool = tool
Vue.use(vueLazy, { // lazyload
    preLoad: 1.2,
    error: 'https://xdlftp.xindedom.life/images/mobile_image/preloadImg.jpg',
    loading: 'https://xdlftp.xindedom.life/images/mobile_image/preloadImg.jpg',
    attempt: 3,
    observer: true,
    lazyComponent: true,
    throttleWait: 0
});
Vue.prototype._isWebView = tool.webViewEnvironment();
/* eslint-disable no-new */
window.net = new Socketvue(env.platformId, env.currentDev, store);
// console.log(window.net);
/*
* if people orientationchange phone i will let tip popup;
* */
window.addEventListener('orientationchange', () => {}, false); // TODO 当屏幕旋转的时候发生的判断

apiRequest('addIpDomainLog', { // 传递未知玩家数据到后台报道
    service: 'platform',
    data: {
        domain: location.hostname.substring(4)
    }
});
/*
* 启动的时候获取本地缓存数据，确认是否要再次登录 //TODO 初步完成了提取用户信息做验证判断
* */

let transferOldData = () => { // This is for auto login using redirect link from old system
    let search = {};
    let address = (location.hash).split('?');
    if (address.length > 1) {
        address = address[1].split('&');
        for (let i = 0, len = address.length; i < len; i++) {
            let key = address[i].split('=');
            search[key[0]] = key[1];
        }
    }
    if (search.partnerId) {
        tool.setSessionStore('partnerId', search.partnerId);
    }
};

let autoLoading = new Promise((resolve, reject) => {
    transferOldData();
    let user = tool.getSessionStore('userInfo') ? tool.getSessionStore('userInfo') : null;
    if (user) {
        apiRequest('authenticate', {
            service: 'player',
            data: {
                playerId: user.playerId,
                token: user.token,
                _isModal: true
            }
        }).then((res) => {
            console.log(res);
            apiRequest('get', {
                service: 'player',
                data: {
                    playerId: user.playerId
                }
            }).then((res) => {
                store.commit('STATEMENT', {
                    name: 'userInfo',
                    data: {
                        data: res.data,
                        playerId: res.data.playerId,
                        token: user.token
                    }
                });
                resolve();
            });
        }).catch((res) => {
            tool.deleteSessionStore('userInfo');
            router.push({name: 'login'});
            reject(res);
        });
    } else {
        judgeRouter();
        startVue();
    }
});
autoLoading.then(() => {
    judgeRouter();
    startVue();
}).catch((res) => {
    judgeRouter();
    startVue();
});
/*
* 本地鉴权问题
* */
function judgeRouter () {
    let routerArr = ['deposit', 'account', 'accountcontent', 'accountinfo', 'accounttransfer', 'accountsearch', 'accountpassword', 'accountnotice', 'accountwash', 'accounteditcontact', 'accounteditbank', 'accountdeposit', 'pointsshop', 'earn', 'spend'];
    let routerHeader = ['home', 'lobby', 'deposit', 'account', 'cs'];
    // let routerAccount = [
    //     'accountinfo', 'accounttransfer', 'accountsearch', 'accountpassword', 'accountnotice', 'accountwash',
    //     'accounteditcontact', 'accounteditbank', 'accountdeposit'];
    // let routerHome = ['jewel', 'discount', 'club', 'eldiscount', 'discountfirst', 'discountsecond',
    //     'discountthird', 'discountfourth', 'discountfifth', 'discountsix', 'discountseven'];
    // let routerHeader = [];
    router.beforeEach((to, from, next) => {
        if (routerHeader.includes(to.name)) { // 是否需要展示一级头部
            store.commit('STATEMENT', {
                name: 'header',
                data: true
            });
        } else {
            store.commit('STATEMENT', {
                name: 'header',
                data: false
            });
        }
        if (routerArr.includes(to.name)) {
            if (store.state.userInfo) {
                next();
            } else {
                store.commit('MSGMODAL', {
                    text: '使用该功能需要登录哦',
                    status: true
                });
                store.commit('STATEMENT', {
                    name: 'header',
                    data: false
                });
                next({path: '/login'});
            }
        } else {
            next();
        }
        if (to.name !== 'home') {
            store.commit('STATEMENT', {
                name: 'isDownLoad',
                data: false
            });
        } else {
            if (tool.getSessionStore('downloadapp') === null) {
                store.commit('STATEMENT', {
                    name: 'isDownLoad',
                    data: true
                });
            } else {
                store.commit('STATEMENT', {
                    name: 'isDownLoad',
                    data: false
                });
            }
            console.log(true);
        }
    });
}
/*
* global record user click incident and upload to back end
* */
Vue.prototype._clickCount = (pageName, buttonName, isOpen) => {
    apiRequest('clickCount', {
        service: 'platform',
        data: {
            device: 'H5玩家',
            pageName: pageName,
            buttonName: buttonName,
            registerClickH5: isOpen,
            domain: location.hostname,
            _isLoading: true,
            _isModal: true
        }
    }).then((res) => {
        return res;
    });
};

// (function () {
//     let currentLink = window.location.hostname;
//     if (currentLink === 'www.xindeli128.com') {
//         clickCount({
//             device: 'APP玩家',
//             pageName: '安卓APP',
//             buttonName: '进入APP',
//             _isLoading: true,
//             _isModal: true
//         }).then((res) => {});
//     }
// })();
function startVue () {
    apiRequest('getConfig', {
        service: 'platform',
        data: {}
    }).then((res) => {
        // console.log(res);
        Vue.prototype._cdnLink = res.data.cdnOrFtpLink;
    }).catch((res) => {
    });
    new Vue({
        el: '#app',
        router,
        store,
        components: {App},
        template: '<App/>'
    });
}
