<template>
    <content-wrapper :options="options" class="lobby">
        <scroll-component>
            <div class="title">
                <span class="icon"></span>
                <p class="text">
                    <span>游戏大厅</span>
                    <span>GAME LOBBY</span>
                </p>
            </div>
            <div>
                <ul class="list">
                    <li v-for="(item, index) in lobbyList" :key="index">
                        <div class="item" @click="tagger(item.id)">
                            <div class="left">
                                <span class="iconfont icontitle" :class="[item.class,item.isOpen?'iconactive':'']"></span>
                                <span class="text" :class="item.isOpen?'textacitve':''">{{item.title}}</span>
                                <span class="smalltext" :class="item.isOpen?'smalltextacitve':''">{{item.smallTitle}}</span>
                            </div>
                            <div class="right" :class="item.isOpen?'rightactive':''"></div>
                        </div>
                        <div class="game">
                            <transition name="game">
                                <ul v-show="item.isOpen" >
                                    <li v-for="(items, index) in item.gameList" :key="index" :class="item.title === '真人'? 'gamelive' : ''">
                                        <div class="imgbox" @click="selectItem(items.gameId, items.title, items.hotId, items.allId, items.app)">
                                            <img :src="_cdnLink + items.imgUrl" alt="">
                                        </div>
                                        <p class="text">{{items.title}}</p>
                                        <p class="btn iconfont icon-phonedateicon29" :data-clipboard-text="items.shareContent" v-if="items.share" @click="shareOut(items.share)"></p>
                                    </li>
                                </ul>
                            </transition>
                        </div>
                    </li>
                </ul>
            </div>
        </scroll-component>
    </content-wrapper>
</template>

<script>
import {lobbyList} from '@/common/file_source';
import {gameApiRequest} from '@/common/api/game';
import {mapMutations, mapState} from 'vuex';
import tool from '@/common/tool';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import Clipboard from 'clipboard';
export default {
    name: 'index',
    data () {
        return {
            lobbyList: lobbyList,
            classList: ['icon-poker-cards', 'icon-slot', 'icon-yu', 'icon-qipai', 'icon-h_caipiao', 'icon-zuqiu', 'icon-app1'],
            isWebView: false,
            options: {
                top: 1.7066,
                bottom: 1.7333
            },
            xindeliClip: null,
            ebetClip: null
        };
    },
    computed: {
        ...mapState(['userInfo'])
    },
    created () {
        this.init();
    },
    components: {
        ScrollComponent,
        ContentWrapper
    },
    mounted () {
        this.clipboard();
    },
    methods: {
        ...mapMutations(['MSGMODAL', 'MSGALERT']),
        init () {
            this.isWebView = tool.webViewEnvironment(); // checking is webview
            this.lobbyList.map((val, index, arr) => {
                val.class = this.classList[index];
                val.isOpen = false;
            });
            if (this.$route.params.id) {
                let navId = this.$route.params.id;
                this.lobbyList = this.lobbyList.filter((val, index, arr) => {
                    if (val.id === Number(navId)) {
                        val.isOpen = !val.isOpen;
                    }
                    return val;
                });
            }
        },
        tagger (id) {
            this.lobbyList = this.lobbyList.filter((val, index, arr) => {
                if (val.id === id) {
                    if (val.id === 5 && val.isOpen === false) {
                        this.MSGALERT({
                            text: '游戏制作中，敬请期待！',
                            status: 'success'
                        });
                    }
                    val.isOpen = !val.isOpen;
                }
                return val;
            });
        },
        downLoadApp (url) {
            let jugement = tool.useEnvironment();
            if (typeof url === 'object' && jugement === 'ios') {
                url = url.ios;
            } else if (typeof url === 'object' && jugement === 'android') {
                url = url.android;
            }
            if (this.isWebView) {
                location.href = url;
            } else {
                let ow = window.open('', '_blank');
                ow.location = url;
            }
        },
        openGame (gameId) {
            let checkGame = new Promise((resolve, reject) => {
                gameApiRequest('getLoginURL', {
                    service: 'game',
                    data: {
                        gameId: gameId,
                        clientDomainName: location.origin,
                        clientType: 2
                    }
                }).then((res) => {
                    resolve(res);
                }).catch((res) => {
                    reject(res);
                });
            });
            if (this.isWebView) {
                checkGame.then((res) => {
                    if (res.data.gameURL === '') {
                        this.MSGALERT({
                            text: '该游戏不支持手机端试玩',
                            status: 'error'
                        });
                        return false;
                    }
                    location.href = res.data.gameURL;
                }).catch((res) => {});
            } else {
                let ow = window.open('', '_blank');
                checkGame.then((res) => {
                    if (res.data.gameURL === '') {
                        this.MSGALERT({
                            text: '该游戏不支持手机端试玩',
                            status: 'error'
                        });
                        return false;
                    }
                    let url = res.data.gameURL;
                    this.$nextTick(() => {
                        ow.location = url;
                        if (ow == null || typeof (ow) === 'undefined') {
                            ow.close();
                        } else {}
                    });
                }).catch((res) => {
                });
            }
        },
        openSlotDetail (title, hotId, allId) {
            this.$router.push({name: 'elcontent', params: {title: title, hotId: hotId, allId: allId}});
        },
        changePTGamePassword (title, hotId, allId) {
            gameApiRequest('getGamePassword', {
                service: 'game',
                data: {
                    providerId: 45
                }
            }).then((res) => {
                console.log(res);
                this.MSGMODAL({
                    text: '以下是您的DT客户端账户及密码</br>账号：' + res.data.gameUsername + '</br>密码：' + res.data.password + '',
                    status: true,
                    cancelName: '修改密码',
                    confirmName: '开始游戏',
                    cancelFn: () => {
                        this.$router.push({name: 'dtgame'});
                    },
                    confirmFn: () => {
                        this.openSlotDetail(title, hotId, allId);
                    }
                });
            }).catch((res) => {});
        },
        selectItem (gameId, title, hotId, allId, app) {
            this._clickCount('游戏大厅', title);
            if (app) {
                this.downLoadApp(app);
                return false;
            }
            if (this.userInfo) {
                // if (title === 'DT电子') {
                //     this.changePTGamePassword(title, hotId, allId);
                //     return false;
                // }
                if (gameId) {
                    this.openGame(gameId);
                } else {
                    this.openSlotDetail(title, hotId, allId);
                }
            } else {
                this.MSGMODAL({
                    text: '请先登录账号',
                    status: true
                });
                this.$router.push({name: 'login'});
            }
        },
        shareOut (text) {
            // if (text === '新得利') {
            this.MSGMODAL({
                text: '点击链接即可下载APP开始游戏！免费体验，好玩又赚钱！快来参与吧！<br/>https://td99-ios.neweb.me/IOS/xindeli_ios/<br/>xindeli_official/download.html',
                status: true,
                cancelName: '下载APP',
                confirmName: '复制分享',
                cancelFn: () => {
                    if (this.isWebView) {
                        location.href = 'https://td99-ios.neweb.me/IOS/xindeli_ios/xindeli_official/download.html';
                    } else {
                        let ow = window.open('', '_blank');
                        ow.location = 'https://td99-ios.neweb.me/IOS/xindeli_ios/xindeli_official/download.html';
                    }
                    // let ow = window.open('');
                    // ow.location = 'http://td99.neweb.me/xindeli_telemarketing/m/xindeli128/xindeli128.apk';
                },
                confirmFn: () => {
                    this.MSGALERT({
                        text: '复制成功，赶紧跟朋友分享吧',
                        status: 'success'
                    });
                    // this.openSlotDetail(title, hotId, allId);
                }
            });
            // } else if (text === '易博厅') {
            //     this.MSGMODAL({
            //         text: '点击链接即可下载APP开始游戏！免费体验，好玩又赚钱！快来参与吧！<br/>https://www.ebetapp.com/xdl/',
            //         status: true,
            //         cancelName: '下载APP',
            //         confirmName: '复制分享',
            //         cancelFn: () => {
            //             if (this.isWebView) {
            //                 location.href = 'https://www.ebetapp.com/xdl/';
            //             } else {
            //                 let ow = window.open('', '_blank');
            //                 ow.location = 'https://www.ebetapp.com/xdl/';
            //             }
            //         },
            //         confirmFn: () => {
            //             this.MSGALERT({
            //                 text: '复制成功，赶紧跟朋友分享吧',
            //                 status: 'success'
            //             });
            //             // this.openSlotDetail(title, hotId, allId);
            //         }
            //     });
            // }
        },
        clipboard () {
            this.xindeliClip = new Clipboard('.btn');
            this.ebetClip = new Clipboard('.btn');
        }
    }
};
</script>

<style scoped lang="scss">
$images: '../../assets';
.lobby {
    /*height: calc(100% - 1.7066rem - 1.7333rem);*/
    /*margin-top: 1.7066rem;*/
    /*margin-bottom: 1.7333rem;*/
    .title {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.04rem;
        background:linear-gradient(to bottom, #272727, #111111);
        .icon {
            background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/gameIcon.png') no-repeat;
            background-size: 100% 100%;
            width: 0.84rem;
            height: 0.6133rem;
        }
        .text{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: #fff;
            padding-left: 0.2rem;
            span:nth-child(1) {
                font-size: 0.4rem;
                font-weight: 600;
            }
            span:nth-child(2) {
                font-size: 0.16rem;
                padding-top: 0.1rem;
            }
        }
    }
    .list {
        li{
            .item {
                height:1.0666rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #000;
                background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/lobby-bg.png') repeat;
                background-size: 0.5866rem 1.066rem;
                .left {
                    display: flex;
                    align-items: center;
                    padding-left: 0.2rem;
                    .icontitle {
                        font-size: 0.466rem;
                        color: #ffffff;

                    }
                    .iconactive {
                        color: #ffa200;
                    }
                    .text {
                        /*width: 1rem;*/
                        padding-left: 0.1rem;
                        text-align: center;
                        font-size: 0.4rem;
                        color: #fff;
                    }
                    .textacitve {
                        color: #ffa200;
                    }
                    .smalltext {
                        font-size: 0.24rem;
                        color: #fff;
                        padding-left: 0.2rem;
                    }
                    .smalltextacitve {
                        color: #ffa200;
                    }
                }
                .right {
                    background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/lobby-arrow.png') no-repeat;
                    background-size: 0.48rem 0.666rem;
                    width: 0.48rem;
                    height: 0.3066rem;
                    background-position: 0 0;
                    margin-right: 0.2rem;
                    transition: 0.5s all;
                }
                .rightactive{
                    background-position: 0 -0.3066rem;
                }
            }
            .game {
                background: #191919;
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    padding-top:0.4rem;
                    padding-left: 0.1rem;
                    padding-right: 0.1rem;
                    li{
                        width: 33%;
                        .imgbox {
                            width: 2.96rem;
                            height: 2.96rem;
                            margin: 0 auto;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .text {
                            font-size:0.3733rem;
                            color: #fff;
                            text-align: center;
                            padding-top: 0.333rem;
                            padding-bottom: 0.333rem;
                            font-weight: 600;
                        }
                        .btn{
                            font-size: 0.7rem;
                            color: #fff;
                            text-align: center;
                            width: 1rem;
                            height: 1rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background-color: #db7b1c;
                            border-radius: 50%;
                            margin: 0 auto 5px;
                        }

                    }
                    .gamelive {
                        width: 35%;
                    }
                }
            }
        }
    }
    .game-enter {
        opacity: 0;
    }
    .game-enter-to {
        opacity: 1;
    }
    .game-enter-active{
        transition: 0.5s all;
    }
}
</style>
