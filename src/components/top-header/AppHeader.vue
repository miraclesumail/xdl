<template>
    <div class="header">
        <div class="container">
            <div class="logo"></div>
            <div class="account">
                <div class="info account-icon" @click="info" v-if="isLogin && !isGetFreeMoney">
                    <div class="circle">
                        <span class="icon"></span>
                        <span class="dot" v-if="isDot"></span>
                    </div>
                    <span class="text"></span>
                </div>
                <!-- 可领取免费体验金 -->
                <div class="free account-icon" @click="getFreeMoney" v-if="isLogin && isGetFreeMoney">
                    <div class="free-img">
                        <img src="../../assets/redpack/red-pack-icon.gif" alt="">
                    </div>
                </div>
                <div class="trial account-icon" @click="trial" v-if="!isLogin">
                    <div class="circle">
                        <span class="icon"></span>
                        <span class="dot" v-if="isDot"></span>
                    </div>
                    <span class="text"></span>
                </div>
                <!-- 普通开户 -->
                <div class="open account-icon" @click="register" v-if="!isLogin && !isFreeMoney">
                    <div class="circle">
                        <span class="icon"></span>
                    </div>
                    <span class="text"></span>
                </div>
                <!-- 开户红包 -->
                <div class="free account-icon bounce" @click="register" v-if="!isLogin && isFreeMoney">
                    <div class="free-img">
                        <img src="https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/home/red-pack-icon-get.gif" alt="">
                    </div>
                </div>
                <!-- 积分商城 -->
                <div class="pointshop account-icon" @click="pointsshop" v-if="isLogin">
                    <div class="circle"></div>
                    <span class="text"></span>
                </div>
                <div class="login account-icon" @click="login">
                    <div class="circle">
                        <span class="icon"></span>
                    </div>
                    <span class="text" :class="isLogin? 'logouttext' : 'logintext'"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import tool from '@/common/tool';
// import {logout, getMailList} from '@/common/api';
import {apiRequest} from '@/common/api/base';
export default {
    name: 'the-header',
    data () {
        return {
            isLogin: false,
            isDot: false,
            isFreeMoney: false,
            isGetFreeMoney: false
        };
    },
    methods: {
        ...mapMutations(['STATEMENT', 'MSGALERT', 'MSGMODAL']),
        login () {
            this._clickCount('首页', '登录');
            if (this.isLogin) {
                apiRequest('logout', {
                    service: 'player',
                    data: {
                        playerId: this.userInfo.playerId
                    }
                }).then((res) => {
                    this.isLogin = false;
                    tool.deleteSessionStore('userInfo');
                    this.STATEMENT({
                        name: 'userInfo',
                        data: null
                    });
                    this.MSGALERT({
                        text: '注销成功',
                        status: 'success'
                    });
                    this.$router.push({name: 'home'});
                });
            } else {
                this.$router.push({name: 'login'});
            }
        },
        info () {
            this._clickCount('首页', '信息');
            this.$router.push({name: 'info'});
        },
        register () {
            this._clickCount('首页', '开户', true);
            this.$router.push({name: 'register'});
        },
        pointsshop () {
            this._clickCount('首页', '积分商城');
            if (!this.userInfo.data.isRealPlayer) {
                this.MSGMODAL({
                    text: '试玩账号不支持积分商城使用，请先注册成为正式玩家。',
                    status: true,
                    confirmName: '注册去',
                    confirmFn: () => {
                        this.$router.push({name: 'register'});
                    }
                });
                return false;
            }
            this.$router.push({name: 'pointsshop'});
        },
        trial () {
            this._clickCount('首页', '试玩');
            this.$router.push({name: 'trialplay'});
        },
        init () {
            // let userInfo = tool.getSessionStore('userInfo') ? tool.getSessionStore('userInfo') : null;
            if (this.userInfo) {
                this.isLogin = true;
                apiRequest('getMailList', {
                    service: 'player',
                    data: {
                        _isLoading: true
                    }
                }).then((res) => {
                    res.data.forEach((val, index, arr) => {
                        if (!val.hasBeenRead) {
                            this.isDot = true;
                        }
                    });
                });
                this.setFreeMoney();
            }
            this.getFreeMoneyDiscount();
        },
        // 领取免费体验金
        getFreeMoney () {
            this.$router.push({name: 'home'});
            this.$nextTick(() => {
                console.log('nexttick')
                apiRequest('applyRewardEvent', {
                    service: 'reward',
                    data: {
                        code: 'sccj10',
                        data: {}
                    }
                }).then((res) => {
                    console.log(res);
                    this.STATEMENT({
                        name: 'freeMoney',
                        type: 'isShow',
                        data: true
                    });
                    this.STATEMENT({
                        name: 'freeMoney',
                        type: 'money',
                        data: res.data.rewardAmount
                    });
                    this.isGetFreeMoney = false;
                }).catch((res) => {
                    console.log(res);
                });
            });
        },
        setFreeMoney () {
            apiRequest('getRewardList', {
                service: 'reward',
                data: {}
            }).then((res) => {
                res.data.forEach((val, index) => {
                    if (val.code === 'sccj10') {
                        this.isGetFreeMoney = true;
                        apiRequest('getPlayerRewardList', {
                            service: 'reward',
                            data: {}
                        }).then((res) => {
                            res.data.records.forEach((val, index) => {
                                if (val.eventCode === 'sccj10') {
                                    this.isGetFreeMoney = false;
                                }
                            });
                        }).catch((res) => {
                            console.log(res);
                        });
                    }
                });
            }).catch((res) => {
                console.log(res);
            });
        },

        getFreeMoneyDiscount () {
            apiRequest('getRewardList', {
                service: 'reward',
                data: {}
            }).then((res) => {
                res.data.forEach((val, index) => {
                    if (val.code === 'sccj10') {
                        this.isFreeMoney = true;
                    }
                });
            }).catch((res) => {
                console.log(res);
            });
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    created () {
        this.init();
    },
    watch: {
        userInfo () {
            this.init();
        }
    }
};
</script>

<style scoped lang="scss">
    $images: '../../assets';
    .header {
        /*padding-top: 1.706rem;*/
    }
    .container {
        display: flex;
        justify-content: space-between;
        height: 1.706rem;
        background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/header-bg.png') repeat-x;

        width: 100%;
        background-size: 0.5733rem 1.72rem;
        border-bottom: 1px solid #7d2f00;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: 20;
        .logo {
            background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/logo.png') no-repeat;
            width: 2.6rem;
            height: 1.213333rem;
            background-size: 100% 100%;
            margin-top: 0.2rem;
            margin-left: 0.3733rem;
        }
        .account {
            display: flex;
            padding-right: 0.55rem;
            .account-icon {
                margin-left: 0.7rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .circle {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 0.853rem;
                    height: 0.853rem;
                    background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/header-circle.png') no-repeat;
                    background-size: 100% 100%;
                    .icon {
                        background: url('../../assets/header-top.png') no-repeat;
                        background-size: 2.52rem 0.48rem;
                    }
                    margin-bottom: 0.05rem;
                }
                .text {
                    background: url('../../assets/header-text.png') no-repeat;
                    background-size: 6.64rem 0.4133rem;
                    width: 0.8133rem;
                    height: 0.4133rem;
                }
            }
            .info {
                .circle {
                    position: relative;
                    span:nth-child(1) {
                        width: 0.426rem;
                        height: 0.4rem;
                        background-position: -1.0266rem -0.05rem;
                    }
                    .dot{
                        position: absolute;
                        right: -0.1rem;
                        top: 0;
                        width: 5px;
                        height: 5px;
                        background-color: #ff1e1e;
                        border-radius: 50%;
                    }
                }
            }
            .open {
                .circle {
                    span:nth-child(1) {
                        width: 0.4rem;
                        height: 0.4rem;
                        background-position: -0.05rem -0.05rem;
                    }
                }
                .text {
                    background-position: -0.82rem 0;
                }
            }
            .login {
                .circle {
                    span:nth-child(1) {
                        width: 0.4rem;
                        height: 0.48rem;
                        background-position: -0.533rem 0rem;
                    }
                }
                .logintext {
                    background-position: -1.653rem 0;
                }
                .logouttext {
                    background-position: -2.52rem 0;
                }
            }
            .pointshop{
                .circle {
                    background: url("../../assets/header-top-store.gif") no-repeat center center;
                    background-size: 100% 100%;
                    width: 0.853rem;
                    height: 0.853rem;
                    /*span:nth-child(1) {
                        width: 0.4rem;
                        height: 0.4rem;
                        background-position: -1.55rem -0.05rem;
                    }*/
                }
                .text {
                    width: 1.65rem;
                    height: 0.4133rem;
                    background-position: -3.3rem 0;
                }
            }
            .trial{
                .circle {
                    span:nth-child(1) {
                        width: 0.5rem;
                        height: 0.5rem;
                        background-position: -2rem 0rem;
                    }
                }
                .text {
                    width: 1.8rem;
                    height: 0.4133rem;
                    background-position: -4.96rem 0;
                }
            }
            .free{
                .free-img{
                    width: 1.5rem;
                    height: 1.5rem;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        @keyframes bounce {
            from,
            20%,
            53%,
            80%,
            to {
                -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }

            40%,
            43% {
                -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
                animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
                -webkit-transform: translate3d(0, -15px, 0);
                transform: translate3d(0, -15px, 0);
            }

            70% {
                -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
                animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
                -webkit-transform: translate3d(0, -7px, 0);
                transform: translate3d(0, -7px, 0);
            }

            90% {
                -webkit-transform: translate3d(0, -2px, 0);
                transform: translate3d(0, -2px, 0);
            }
        }

        .bounce {
            -webkit-animation-name: bounce;
            animation-name: bounce;
            -webkit-transform-origin: center bottom;
            transform-origin: center bottom;
            animation-duration: 1s;
            animation-fill-mode: both;
            animation-iteration-count: infinite;
        }

    }
</style>
