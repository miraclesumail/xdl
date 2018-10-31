<template>
    <content-wrapper class="container" :options="options">
        <common-header>游戏转账</common-header>
        <scroll-component>
            <div class="container">
                <div class="transfer">
                    <div class="local">
                        <span>本地余额：</span>
                        <span>{{localMoney}}元</span>
                    </div>
                    <div class="account">
                        <span>账户总额：</span>
                        <span>{{totalMoney}}元</span>
                    </div>
                    <div class="header" v-for="(item, oindex) in gameTransferList" :key="oindex">
                        <div class="header-content">
                            <span class="icon" :class="item.className"></span>
                            <span class="text">{{item.nickName}}：</span>
                            <span class="money">{{item.lockCredit}}元</span>
                        </div>
                        <div class="content">
                            <div class="title">
                                <span>游戏名称</span>
                                <span>游戏状态</span>
                                <span>游戏额度</span>
                                <span>操作</span>
                            </div>
                            <table>
                                <tr v-for="(item, index) in item.list" :key="index" v-if="item.nickName">
                                    <td><span>{{item.nickName}}</span></td>
                                    <td><span>{{item.status === 1 ? '开启' : '关闭'}}</span></td>
                                    <td><span>{{item.validCredit}}</span></td>
                                    <td>
                                        <div class="btn">
                                            <div @click="transferTo(item.providerId, item.status)">
                                                <span>转入</span>
                                            </div>
                                            <div @click="transferOut(item.providerId, item.status, item.validCredit)">
                                                <span>转出</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <p class="notice" v-if="item.nickName === 'by组'">
                            注：BY额度包含BYLIVE(BY真人), BYOTHS(电子),BY捕鱼
                        </p>
                    </div>
                    <p class="tip-ebet"> 注：eBET大厅的显示额度包含『eBET真人+电子』</p>
                </div>
            </div>
        </scroll-component>
    </content-wrapper>
</template>

<script>
// import {getCreditDetail,
//     // getCredit,
//     transferFromProvider,
//     transferToProvider
//     // getCreditInfo
// } from '@/common/api';
import {gameApiRequest} from '@/common/api/game';
import {apiRequest} from '@/common/api/base';
import {mapState, mapMutations} from 'vuex';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import CommonHeader from '@/components/top-header/CommonHeader';
// import tool from '@/common/tool';
export default {
    name: 'the-transfer',
    data () {
        return {
            gameTransferList: null,
            localMoney: '*****',
            totalMoney: '*****',
            liveList: [],
            elList: [],
            byList: [],
            fishList: [],
            lotteryList: [],
            options: {
                top: 1.533,
                bottom: 1.7333
            }
        };
    },
    components: {
        CommonHeader,
        ScrollComponent,
        ContentWrapper
    },
    methods: {
        ...mapMutations(['MSGALERT']),
        transferTo (gameId, status, validCredit) {
            if (status !== 1) {
                this.MSGALERT({
                    text: '游戏平台在维护中不支持转入',
                    status: 'error'
                });
                return false;
            }

            gameApiRequest('transferToProvider', {
                service: 'game',
                data: {
                    playerId: this.userInfo.playerId,
                    providerId: gameId,
                    _isModal: true
                }
            }).then((res) => {
                this.MSGALERT({
                    text: '成功转入',
                    status: 'success'
                });
                this.init();
            }).catch((res) => {
                this.MSGALERT({
                    text: '' + res.errorMessage + '转入失败',
                    status: 'error'
                });
            });
        },
        transferOut (gameId, status, validCredit) {
            if (status !== 1) {
                this.MSGALERT({
                    text: '游戏平台在维护中不支持转出',
                    status: 'error'
                });
                return false;
            }
            if (validCredit <= 1) {
                this.MSGALERT({
                    text: '游戏转出额度必须大于1元',
                    status: 'error'
                });
                return false;
            }
            gameApiRequest('transferFromProvider', {
                service: 'game',
                data: {
                    playerId: this.userInfo.playerId,
                    providerId: gameId,
                    _isModal: true
                }
            }).then((res) => {
                this.MSGALERT({
                    text: '成功转出',
                    status: 'success'
                });
                this.init();
            }).catch((res) => {
                this.MSGALERT({
                    text: '游戏余额转出失败',
                    status: 'error'
                });
            });
        },
        init () {
            apiRequest('getCreditDetail', {
                service: 'player',
                data: {
                    _isLoading: false
                }
            }).then((res) => {
                this.gameTransferList = res.data.lockedCreditList.filter((val, index) => {
                    switch (val.nickName) {
                    case '真人组' :
                        val.className = 'livegame';
                        break;
                    case 'by组' :
                        val.className = 'by';
                        break;
                    case '捕鱼组' :
                        val.className = 'fish';
                        break;
                    case '棋牌' :
                        val.nickName = '棋牌组';
                        break;
                    case '彩票组' :
                        val.className = 'lottery';
                        break;
                    case '电子组' :
                        val.className = 'slots';
                        break;
                    case '真人游戏(除BY)' :
                        val.className = 'livegame';
                        break;
                    case 'BY' :
                        val.className = 'by';
                        break;
                    case 'GG捕鱼' :
                        val.className = 'fish';
                        break;
                    case 'KG' :
                        val.className = 'lottery';
                        break;
                    case '电子游戏(除BY)' :
                        val.className = 'slots';
                        break;
                    }
                    val.list.filter((val, index) => {
                        if (val.validCredit === 'unknown') {
                            val.status = 0;
                            val.validCredit = '0.00';
                        }
                        switch (val.nickName) {
                        case 'EBET' :
                            val.nickName = 'eBET真人';
                            break;
                        case 'EBETSLOTS' :
                            val.nickName = 'eBET电子';
                            break;
                        case 'AG' :
                            val.nickName = 'AG真人';
                            break;
                        case 'BYLIVE' :
                            val.nickName = 'BY';
                            break;
                        case 'KYBOARD' :
                            val.nickName = 'KY棋牌';
                            break;
                        case 'BYBALL' :
                            // for (let i in val) {
                            delete val['nickName'];
                            // }
                            return false;
                        case 'BYOTHS' :
                            // for (let i in val) {
                            delete val['nickName'];
                            // }
                            return false;
                        case 'ISBSLOTS' :
                            val.nickName = 'ISB电子';
                            break;
                        case 'MG-EBET' :
                            val.nickName = 'MG电子';
                            break;
                        case 'GGFISH' :
                            val.nickName = 'GG捕鱼';
                            break;
                        case 'DTOTHS' :
                            val.nickName = 'DT电子';
                            break;
                        case 'OGLIVE' :
                            val.nickName = 'OG真人';
                            break;
                        case 'KGKENO' :
                            val.nickName = 'KG彩票';
                            break;
                        case 'IPMKENO' :
                            val.nickName = 'IG彩票';
                            break;
                        case 'PT' :
                            val.nickName = 'PT电子';
                            break;
                        }
                        return val;
                    });
                    // console.log(val);
                    return val;
                });
                this.localMoney = res.data.credit.toFixed(2);
                this.totalMoney = parseFloat(res.data.credit);
                res.data.gameCreditList.forEach((val, index, arr) => {
                    if (val.validCredit !== 'unknown') {
                        if (!val.nickName.indexOf('BYBALL') || !val.nickName.indexOf('BYOTHS') || !val.nickName.indexOf('EBETSLOTS')) {
                        } else {
                            this.totalMoney += parseFloat(val.validCredit);
                        }
                    }
                });
                res.data.lockedCreditList.forEach((val, index, arr) => {
                    this.totalMoney += parseFloat(val.lockCredit);
                });
                this.totalMoney = this.totalMoney.toFixed(2);
            });
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    created () {
        this.init();
    },
    mounted () {}
};
</script>

<style scoped lang="scss">
$images: '../../../assets';
.container{
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
}
.transfer {
    padding: 0.3rem 0.2rem 0.5rem;
    background: url('https://xdlftp.xindedom.life/images/mobile_image/lobby-bg.png') repeat;
    background-size:0.58666rem 1.0666rem;
    margin: 0.1rem 0.2rem 0;
    /*margin: 0.05rem 0.2rem 0;*/
    border: 1px solid #fea100;
    .local{
        font-size: 0.4rem;
        color: #fff;
    }
    .account{
        font-size: 0.4rem;
        color: #fff;
        margin-bottom: 0.2rem;
    }
    .header {
        .header-content{
            padding-top: 0.3rem;
            padding-bottom: 0.3rem;
            display: flex;
            align-items: center;
            .icon{
                background-size: 2.02rem 0.5066rem;
                background: url('https://xdlftp.xindedom.life/images/mobile_image/lobby-icon.png') no-repeat;
                background-size: 2.0266rem 0.5066rem;
                width: 0.5066rem;
                height: 0.4933rem;
                margin-left: 0.1rem;
                margin-right: 0.1rem;
            }
            .livegame {
                background-position: 0 0;
            }
            .slots {
                background-position: -0.4066rem 0;
            }
            .fish {
                background-position: -1.0132rem 0;
            }
            .by{
                background-size: 2.02rem 0.5066rem;
                background: url('https://xdlftp.xindedom.life/images/mobile_image/by-icon.png') no-repeat;
                background-size:100% 100%;
                width: 0.5066rem;
                height: 0.4933rem;
                margin-left: 0.1rem;
                margin-right: 0.1rem;
            }
            .lottery {
                background-position: -1.51rem 0;
            }
            .text{
                font-size: 0.4rem;
                color: #fff;
            }
            .money{
                font-size: 0.4rem;
                color: #fff;
            }
        }
    }
    .content {
        .title{
            display: flex;
            align-items: center;
            height: 0.8rem;
            font-size: 0.32rem;
            background: linear-gradient(to bottom, #ffea6e, #ffba20);
            font-weight: 600;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            span{
                width: 20%;
                text-align: center;
            }
            span:nth-child(4) {
                width: 40%;
            }
        }
        table{
            width: 100%;
            border: 1px solid #fff;
            border-top: none;
            tr{
            }
            td {
                border: 1px solid #fff;
                border-top: none;
                font-size: 0.32rem;
                color: #fff;
                text-align: center;
                height: 1.2rem;
                width: 20%;
               .btn{
                   display: flex;
                   align-items: center;
                   justify-content: center;
                   div {
                       height: 0.7rem;
                       width: 1.4rem;
                       border-radius: 4px;
                       display: flex;
                       align-items: center;
                       justify-content: center;
                   }
                   div:nth-child(1) {
                       background: linear-gradient(to bottom, #454545, #151515);
                       margin-right: 0.2rem;
                   }
                   div:nth-child(2) {
                       background: linear-gradient(to bottom, #ed7c00, #c82a00);
                   }
               }
            }
            td:nth-child(4) {
                width: 40%;
            }
        }
    }
    .notice {
        font-size: 0.3466rem;
        color: #ffffff;
        padding-top: 0.2rem;
    }
    .tip-ebet {
        font-size: 0.3466rem;
        color: #ffffff;
        padding-top: 0.2rem;
    }
}
</style>
