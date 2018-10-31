// /*eslint-disable*/

/* // TODO 该心跳包貌似是有问题的 在重连机制方面产生了一些bug
*websocket处理插件，
*heartBeat   websocket心机包组件保证链接不失活
_heartBeat 心机包识别码
* @example
*  var ws = new  Socket(platformId,url,store);
* ws.send 返回一个 Promise对象 向服务端发送请求
1：_silence参数控制是否不显示加载动画默认false显示
1：_closeCONFIRM参数控制是否关闭错误提示框默认false不关闭
open 心机包开关设置，开发环境可以关闭，上线必须开启
* ws.from 提供一个服务端推送接口处理方案
*hank 2017.11.9
*/
import {authenticate} from '@/common/api';
// import {login} from "../common/api";
// import tool from '@/common/tool';
// import {MSGMODAL, STATEMENT} from '../store/Mutation-types';

// const errMsg = {
//     '该手机号码已被注册，请更换或联系客服。': '联系电话号码已存在，请联系客服人员核实',
//     '无可用短信验证码，请重新获取': '验证码已失效，请重新获取',
//     '没有可分配银行卡或更换金额从新申请': '银行卡被占用，请更换金额或方式重新申请',
//     '未达到周期内存款笔数条件': '本次申请不符合要求，请联系客服核实'
// };

// 用户未登录处理
function login (store) {
    store.dispatch('setMsgModal', {
        text: '请先登录',
        status: true,
        cancelName: '取消',
        confirmName: '确定',
        confirmFn: () => {
            window.location.hash = '/login';
        }
    });
}

class Socket {
    constructor (platformId, url, store) {
        this.platformId = platformId;
        this.url = url;
        this.store = store;
        this.webSocket = new WebSocket(this.url);
        this.connectCount = 0;
        this.timer = null;
        this.resultArr = {};
        this.init();
    }
    init () {
        this.openService();
        this.closeErrorService().then(() => {
            this.reconnection();
            this.init();
        }).catch((res) => {
            console.log(res);
            if (this.connectCount >= 5) {
                this.store && this.store.commit('MSGMODAL',
                    {
                        title: '提示',
                        text: '网络链接超时,请确认网络通畅后重试',
                        status: true,
                        confirmName: '重试',
                        confirmFn: () => {
                            this.reloadWindow();
                        },
                        cancelFn: () => {}
                    });
                return false;
            } else {
                this.reconnection();
                this.init();
            }
        });
    }
    reloadWindow () {
        window.location.reload();
    }
    openService () {
        this.webSocket.onopen = () => {
            console.log(`服务器启动中${new Date()}`);
            this.heartBeat()
                .then((res) => {})
                .catch((res) => {});
            this.receivePushMessage();
        };
    }
    promiseFun (resolve, reject) {
        this.reject = reject;
        this.resolve = resolve;
    }
    createPromise () {
        let promise = new Promise(this.promiseFun.bind(this)); // 创建promise异步回调方案
        promise.reject = this.reject;
        promise.resolve = this.resolve;
        return promise;
    }
    send (dataObj) {
        // let promise = this.createPromise();
        // let user = this.store.state.userInfo;
        dataObj.data.platformId = this.platformId;
        dataObj.requestId = (Math.random() * 1000 + 10);
        if (this.webSocket.readyState === 1) {
            this.interceptor(dataObj);
            this.webSocket.send(JSON.stringify(dataObj));
            this.resultArr[dataObj.requestId] = {};
            this.resultArr[dataObj.requestId]['promise'] = this.createPromise();
            this.resultArr[dataObj.requestId]['data'] = dataObj;
            this.receiveSendMessage(dataObj.requestId);
            return this.resultArr[dataObj.requestId]['promise'];
        }
    }
    receiveSendMessage (requestId) {
        this.webSocket.onmessage = (event) => {
            let res = JSON.parse(event.data);
            this.interceptor(res);
            switch (res.data.status) {
            case 200:
                this.resultArr[res.requestId]['promise'].resolve(res.data);
                break;
            case 420:
                login(this.store);
                break;
            default:
                this.resultArr[res.requestId]['promise'].reject(res.data);
                break;
            }
            delete this.resultArr[res.requestId];
        };
    }
    receivePushMessage () {
        this.webSocket.onmessage = (event) => {
            let res = JSON.parse(event.data);
            let notice = res.requestId || null;
            if (!notice) {
                if (res) {
                    this.store.dispatch('setUser');
                }
                this.store.commit('MSGMODAL', {
                    text: res.data.data.content,
                    title: res.data.data.title,
                    status: true
                });
                return false;
            }
        };
    }
    closeErrorService () {
        return new Promise((resolve, reject) => {
            this.webSocket.onclose = (event) => {
                if (this.connectCount >= 3) {
                    let error = '服务器关闭';
                    reject(error);
                } else {
                    resolve();
                }
            };
            this.webSocket.onerror = (event) => {
                if (this.connectCount >= 3) {
                    let error = '服务器错误';
                    reject(error);
                } else {
                    resolve();
                }
            };
        });
    }
    reconnection () {
        this.webSocket = new WebSocket(this.url);
        this.connectCount++;
    }
    heartBeat () {
        let user = this.store.state.userInfo;
        return new Promise((resolve, reject) => {
            this.timer = setInterval(() => {
                authenticate('player', // 用于验证玩家webSocket链接是否有效
                    {
                        _isLoading: true,
                        token: user ? user.token : null,
                        playerId: user ? user.playerId : null,
                        _heartBeat: true,
                        _isModal: true
                    }).then((res) => {
                    resolve(res);
                }).catch(res => {
                    this.connectCount++;
                    // reject(res);
                });
            }, 20000);
        });
    }
    interceptor (data) { // 拦截器
        console.log(data);
        // console.log(data);
    }
}
export default Socket;
