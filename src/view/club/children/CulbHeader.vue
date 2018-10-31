<template>
    <div class="header">
        <div class="top">
            <div class="left">
                <div class="avatar">
                    <img :src="_cdnLink + level[activeNumber].img" alt="">
                </div>
                <div class="text">
                    {{level[activeNumber].name}}
                </div>
                <div class="upgrade-btn" @click="update">
                    <span class="iconfont icon-circle-plus"></span>
                    <p>立即升级</p>
                </div>
            </div>
            <div class="right">
                <div class="updatatitle">
                    <div class="updatatext">
                        <span class="icon"></span>
                        <span class="text">升级</span>
                    </div>
                    <div class="retaintext" v-if="activeNumber !== 0">保级</div>
                </div>
                <div class="progress">
                    <div class="title">存款</div>
                    <div class="updataprogress">
                        <div class="progressbar"  :style="{width: updateProgress.depositPercent}"></div>
                        <div class="progresstext">{{updateProgress.deposit}}</div>
                    </div>
                    <div class="retainprogress" v-if="activeNumber !== 0">
                        <div class="progressbar"  :style="{width: retainProgress.depositPercent}"></div>
                        <div class="progresstext">{{retainProgress.deposit}}</div>
                    </div>
                </div>
                <div class="progress">
                    <div class="title">投注额</div>
                    <div class="updataprogress">
                        <div class="progressbar" :style="{width: updateProgress.betPercent}"></div>
                        <div class="progresstext">{{updateProgress.bet}}</div>
                    </div>
                    <div class="retainprogress" v-if="activeNumber !== 0">
                        <div class="progressbar" :style="{width: retainProgress.betPercent}"></div>
                        <div class="progresstext">{{retainProgress.bet}}</div>
                    </div>
                </div>
            </div>
            <div class="state" @click="openState">
                升级保级
            </div>
        </div>
        <transition name="state">
            <div class="bottom" v-if="isShow">
                <table>
                    <tr>
                        <th></th>
                        <th>条件</th>
                        <th>周期</th>
                        <th>存款</th>
                        <th>投注额</th>
                    </tr>
                    <tr :class="index % 2 === 0? 'firststyle' : 'secondstyle'" v-for="(item, index) in tableList" :key="index">
                        <td rowspan="2" class="title" v-if="index % 2 === 0">{{item.levelName}}</td>
                        <td>{{item.updataNmae}}</td>
                        <td>{{item.day}}</td>
                        <td>{{item.deposit}}</td>
                        <td>{{item.bet}}</td>
                    </tr>
                </table>
            </div>
        </transition>
    </div>
</template>

<script>
import {levelImg} from '@/common/file_source';
// import {getAllLevel, getLevel, getPlayerWeekStatus, getPlayerDayStatus, manualPlayerLevelUp} from '@/common/api';
import {apiRequest} from '@/common/api/base';
import {mapState, mapMutations} from 'vuex';
export default {
    name: 'culb-header',
    props: {},
    data () {
        return {
            activeNumber: 0,
            level: levelImg,
            isShow: false,
            tableList: [
                {
                    levelName: '一星爵士',
                    updataNmae: '升级',
                    day: '日',
                    deposit: '0',
                    bet: '0'
                },
                {
                    levelName: '一星爵士',
                    updataNmae: '保级',
                    day: '周',
                    deposit: '0',
                    bet: '0'
                },
                {
                    levelName: '二星男爵',
                    updataNmae: '升级',
                    day: '日',
                    deposit: '300',
                    bet: '0'
                },
                {
                    levelName: '二星男爵',
                    updataNmae: '保级',
                    day: '周',
                    deposit: '0',
                    bet: '2000'
                },
                {
                    levelName: '三星子爵',
                    updataNmae: '升级',
                    day: '日',
                    deposit: '5000',
                    bet: '0'
                },
                {
                    levelName: '三星子爵',
                    updataNmae: '保级',
                    day: '周',
                    deposit: '2500',
                    bet: '2万'
                },
                {
                    levelName: '四星伯爵',
                    updataNmae: '升级',
                    day: '日',
                    deposit: '4万',
                    bet: '50万'
                },
                {
                    levelName: '四星伯爵',
                    updataNmae: '保级',
                    day: '周',
                    deposit: '2万',
                    bet: '25万'
                },
                {
                    levelName: '五星侯爵',
                    updataNmae: '升级',
                    day: '日',
                    deposit: '10万',
                    bet: '100万'
                },
                {
                    levelName: '五星侯爵',
                    updataNmae: '保级',
                    day: '周',
                    deposit: '5万',
                    bet: '50万'
                },
                {
                    levelName: '六星公爵',
                    updataNmae: '升级',
                    day: '日',
                    deposit: '50万',
                    bet: '800万'
                },
                {
                    levelName: '六星公爵',
                    updataNmae: '保级',
                    day: '周',
                    deposit: '25万',
                    bet: '400万'
                },
                {
                    levelName: '新得利王爵',
                    updataNmae: '升级',
                    day: '日',
                    deposit: '300万',
                    bet: '3000万'
                },
                {
                    levelName: '新得利王爵',
                    updataNmae: '升级',
                    day: '日',
                    deposit: '80万',
                    bet: '800万'
                }
            ],
            currentLevel: {
                value: 0
            },
            allLevel: '*****',
            updateProgress: {
                deposit: '*****',
                depositPercent: null,
                bet: '*****',
                betPercent: null
            },
            retainProgress: {
                deposit: '*****',
                depositPercent: null,
                bet: '*****',
                betPercent: null
            },
            weeklyConsume: '*****',
            dayConsume: '*****'
        };
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        ...mapMutations(['STATEMENT']),
        init () {
            apiRequest('getAllLevel', {
                service: 'playerLevel',
                data: {}
            }).then((res) => {
                this.allLevel = res.data;
                apiRequest('getLevel', {
                    service: 'playerLevel',
                    data: {}
                }).then((res) => {
                    // console.log(res);
                    this.activeNumber = res.data.value;
                    this.currentLevel = res.data;
                    if (this.currentLevel.value <= 3) {
                        this.updateProgress.deposit = (this.dayConsume.topUpAmount.toFixed(2) + '/' + this.allLevel[this.currentLevel.value + 1].levelUpConfig[0].topupLimit);
                        this.updateProgress.depositPercent = (this.dayConsume.topUpAmount / this.allLevel[this.currentLevel.value + 1].levelUpConfig[0].topupLimit).toFixed(2) * 100 + '%';
                        this.updateProgress.bet = (this.dayConsume.consumptionAmount.toFixed(2) + '/' + this.allLevel[this.currentLevel.value + 1].levelUpConfig[0].consumptionLimit);
                        this.updateProgress.betPercent = (this.dayConsume.consumptionAmount / this.allLevel[this.currentLevel.value + 1].levelUpConfig[0].consumptionLimit).toFixed(2) * 100 + '%';
                        this.retainProgress.deposit = (this.weeklyConsume.topUpAmount.toFixed(2) + '/' + this.allLevel[this.currentLevel.value].levelDownConfig[0].topupMinimum);
                        this.retainProgress.depositPercent = (this.weeklyConsume.topUpAmount / this.allLevel[this.currentLevel.value].levelDownConfig[0].topupMinimum).toFixed(2) * 100 + '%';
                        this.retainProgress.bet = (this.weeklyConsume.consumptionAmount.toFixed(2) + '/' + this.allLevel[this.currentLevel.value].levelDownConfig[0].consumptionMinimum);
                        this.retainProgress.betPercent = (this.weeklyConsume.consumptionAmount / this.allLevel[this.currentLevel.value].levelDownConfig[0].consumptionMinimum).toFixed(2) * 100 + '%';
                        if (/NaN/.test(this.updateProgress.betPercent)) { // resolve NaN bug
                            this.updateProgress.betPercent = 100 + '%';
                        }
                        if (/NaN/.test(this.updateProgress.depositPercent)) { // resolve NaN bug
                            this.updateProgress.depositPercent = 100 + '%';
                        }
                        if (/NaN/.test(this.retainProgress.depositPercent)) { // resolve NaN bug
                            this.retainProgress.depositPercent = 100 + '%';
                        }
                        if (/NaN/.test(this.retainProgress.betPercent)) { // resolve NaN bug
                            this.retainProgress.betPercent = 100 + '%';
                        }
                    } else if (this.currentLevel.value > 3 && this.currentLevel.value < 6) {
                        this.updateProgress.deposit = (this.weeklyConsume.topUpAmount.toFixed(2) + '/' + this.allLevel[this.currentLevel.value + 1].levelUpConfig[0].topupLimit);
                        this.updateProgress.depositPercent = (this.weeklyConsume.topUpAmount / this.allLevel[this.currentLevel.value + 1].levelUpConfig[0].topupLimit).toFixed(2) * 100 + '%';
                        this.updateProgress.bet = (this.weeklyConsume.consumptionAmount.toFixed(2) + '/' + this.allLevel[this.currentLevel.value + 1].levelUpConfig[0].consumptionLimit);
                        this.updateProgress.betPercent = (this.weeklyConsume.consumptionAmount / this.allLevel[this.currentLevel.value + 1].levelUpConfig[0].consumptionLimit).toFixed(2) * 100 + '%';
                        this.retainProgress.deposit = (this.weeklyConsume.topUpAmount.toFixed(2) + '/' + this.allLevel[this.currentLevel.value].levelDownConfig[0].topupMinimum);
                        this.retainProgress.depositPercent = (this.weeklyConsume.topUpAmount / this.allLevel[this.currentLevel.value].levelDownConfig[0].topupMinimum).toFixed(2) * 100 + '%';
                        this.retainProgress.bet = (this.weeklyConsume.consumptionAmount.toFixed(2) + '/' + this.allLevel[this.currentLevel.value].levelDownConfig[0].consumptionMinimum);
                        this.retainProgress.betPercent = (this.weeklyConsume.consumptionAmount / this.allLevel[this.currentLevel.value].levelDownConfig[0].consumptionMinimum).toFixed(2) * 100 + '%';
                    } else {
                        this.retainProgress.deposit = (this.weeklyConsume.topUpAmount.toFixed(2) + '/' + this.allLevel[this.currentLevel.value].levelDownConfig[0].topupMinimum);
                        this.retainProgress.depositPercent = (this.weeklyConsume.topUpAmount / this.allLevel[this.currentLevel.value].levelDownConfig[0].topupMinimum).toFixed(2) * 100 + '%';
                        this.retainProgress.bet = (this.weeklyConsume.consumptionAmount.toFixed(2) + '/' + this.allLevel[this.currentLevel.value].levelDownConfig[0].consumptionMinimum);
                        this.retainProgress.betPercent = (this.weeklyConsume.consumptionAmount / this.allLevel[this.currentLevel.value].levelDownConfig[0].consumptionMinimum).toFixed(2) * 100 + '%';
                    }
                });
            });
            apiRequest('getPlayerWeekStatus', {
                service: 'player',
                data: {}
            }).then((res) => {
                this.weeklyConsume = res.data;
            });
            apiRequest('getPlayerDayStatus', {
                service: 'player',
                data: {}
            }).then((res) => {
                this.dayConsume = res.data;
            });
        },
        openState () {
            this.isShow = !this.isShow;
        },
        update () {
            if (this.userInfo) {
                apiRequest('manualPlayerLevelUp', {
                    service: 'player',
                    data: {}
                }).then((res) => {
                    this.init();
                });
            } else {
                this.MSGALERT({
                    text: '请先登录',
                    status: 'error'
                });
            }
        }
    },
    created () {
        this.init();
    }
};
</script>

<style scoped lang="scss">
    $images: '../../../assets';
    .header{
        border: 1px solid #a66010;
        border-radius: 5px;
        overflow: hidden;
        /*width: 100%;*/
        .top{
            display: flex;
            border-bottom: none;
            background: #0b0b0b;
            padding: 0.15rem;
            position: relative;
            overflow: hidden;
            .left{
                margin-left: .15rem;
                display: flex;
                flex-direction: column;
                align-items: center;

                .avatar{
                    width: 1.7333rem;
                    height: 1.7333rem;
                    /*border: 1px solid #a66010;*/
                    /*border-radius: 5px;*/
                    /*background: linear-gradient(to bottom, #000000, #2d2b2b);*/
                    /*display: flex;*/
                    /*align-items: center;*/
                    /*flex-direction: column;*/
                    /*justify-content: center;*/
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .text {
                    font-size: 0.3466rem;
                    color: #ffc000;
                    font-weight: bold;
                    text-align: center;
                    padding-top: 0.1rem;
                }

                .upgrade-btn {
                    width: 2.1rem;
                    height: .55rem;
                    margin: .133rem 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(#ee7d00, #c82900);
                    border-radius: .666rem;

                    > span {
                        color: #fff;
                    }

                    > p {
                        color: #fff;
                        margin-left: .066rem;
                        font-size: 0.3466rem;
                        line-height: 0.3466rem;
                    }
                }
            }
            .right {
                width: 100%;
                padding-top: .35rem;
                padding-left: 0.2rem;

                .updatatitle{
                    display: flex;
                    align-items: center;
                    font-size: 0.3466rem;
                    padding-left: 1rem;
                    justify-content: center;
                    padding-bottom: 0.2rem;
                    .updatatext {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #ffff00;
                        width: 2.5rem;
                        .icon {
                            background: url('https://xdlftp.xindedom.life/images/mobile_image/updataicon.png') no-repeat;
                            width: .2666rem;
                            height: .2666rem;
                            background-size: 100% 100%;
                            margin-right: 0.1rem;
                        }
                    }
                    .retaintext {
                        width: 2.5rem;
                        padding-left: 0.5rem;
                        color: #1ae80e;
                        text-align: center;
                    }
                }
                .progress {
                    display: flex;
                    align-items: center;
                    margin-bottom: 0.266rem;
                    justify-content: space-around;
                    .title{
                        font-size: 0.32rem;
                        color: #ddd;
                        width: 1rem;
                    }
                    .updataprogress {
                        border: 1px solid #fea100;
                        width: 2.7rem;
                        position: relative;
                        height: 0.4rem;
                        background: linear-gradient(to bottom, #010101, #161616);
                        border-radius: 6px;
                        overflow: hidden;
                        .progressbar{
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 70%;
                            height: 100%;
                            background:linear-gradient(to bottom, #ddb11d, #c47813, #ca8415);
                        }
                        .progresstext {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            font-size: 0.2666rem;
                            text-align: center;
                            color: #fff;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            z-index: 3
                        }
                    }
                    .retainprogress{
                        border: 1px solid #13910b;
                        width: 2.7rem;
                        position: relative;
                        height: 0.4rem;
                        background: linear-gradient(to bottom, #010101, #161616);
                        border-radius: 6px;
                        overflow: hidden;
                        .progressbar{
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 70%;
                            height: 100%;
                            background:linear-gradient(to bottom, #22cf13, #14970b, #18a50d);
                        }
                        .progresstext {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            font-size: 0.2666rem;
                            text-align: center;
                            color: #fff;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            z-index: 3
                        }
                    }
                }
            }
            .state{
                position: absolute;
                right: 0;
                bottom: 0;
                width: 1.7rem;
                height: 0.5rem;
                background: url('https://xdlftp.xindedom.life/images/mobile_image/updatastate.png') no-repeat;
                background-size: 100% 100%;
                font-size: 0.24rem;
                color: #330404;
                /*text-align: end;*/
                /*line-height: 0.5rem;*/
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding-right: 0.1rem;
                font-weight: 600;
            }
        }
        .bottom {
            width: 100%;
            table{
                text-align: center;
                width: 9.18rem;
                display: block;

                .firststyle{
                    td{
                        color: #17a30d;
                        background-color: #1e1e1e;
                    }
                }
                .secondstyle{
                    td{
                        color: #fff;
                        background-color: #161515;
                    }
                }
                tr{
                    th{
                        width: 2rem;
                        font-size: 0.3466rem;
                        color: #000;
                        height: 0.6rem;
                        background-color: #ca8515;
                        text-align: center;
                        /*border: 1px solid #e19c2c;*/
                    }
                    td{
                        width: 2rem;
                        height: 0.6rem;
                        font-size: 0.3466rem;
                        /*border: 1px solid #e19c2c;*/
                        border: 1px solid #e19c2c;
                        border-bottom: none;
                    }
                    td:nth-child(1) {
                        border-left: none;
                    }
                    td:nth-child(5) {
                        border-right: none;
                    }
                    .title{
                        color: #fff;
                        background-color: #161515;
                    }
                }

            }
        }
        .state-enter {
            opacity: 0;
        }
        .state-enter-active{
            transition: 0.5s all;
        }
        .state-enter-to {
            opacity: 1;
        }
        .state-leave{
            opacity: 1;
        }
        .state-leave-to{
            opacity: 0;
        }
    }
</style>
