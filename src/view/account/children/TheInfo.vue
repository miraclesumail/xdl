<template>
    <content-wrapper class="container" :options="options">
        <common-header>账户资料</common-header>
        <scroll-component>
            <div class="info">
                <ul>
                    <li class="baseinfo">
                        <div class="title">
                            <span class="icon base"></span>
                            <span class="text">基本资料</span>
                        </div>
                        <div class="content">
                            <div class="left">
                                <p class="text">
                                    <span>会员账户</span>
                                    <span>{{userData.name}}</span>
                                </p>
                                <p class="text">
                                    <span>会员等级</span>
                                    <span>{{userData.playerLevel.name}}</span>
                                </p>
                                <p class="text">
                                    <span>账户总额</span>
                                    <span>{{totalMoney}}元</span>
                                </p>
                            </div>
                            <div class="right">
                                <div class="btn">
                                    <span @click="washCode"><i>提前洗码</i></span>
                                    <span @click="transfer"><i>游戏转账</i></span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="grade">
                        <div class="title">
                            <span class="icon rank"></span>
                            <span class="text">等级</span>
                        </div>
                        <div class="content">
                            <div class="updatacontent"  v-if="currentLevel.value < 6">
                                <div class="headertitle">
                                    <span class="text">升级</span>
                                </div>
                                <div class="updatabox">
                                    <div class="updata">
                                        <div class="left">
                                            <span>{{updateTitle.first}}</span>
                                        </div>
                                        <div class="right">
                                            <div class="progress">
                                                <div class="progressbg">
                                                    <span class="progresstop" :style="{width: updateProgress.depositPercent}"></span>
                                                    <span class="progresstext">{{updateProgress.deposit}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="updata">
                                        <div class="left">
                                            <span>{{updateTitle.second}}</span>
                                        </div>
                                        <div class="right">
                                            <div class="progress">
                                                <div class="progressbg">
                                                    <span class="progresstop" :style="{width: updateProgress.betPercent}"></span>
                                                    <span class="progresstext">{{updateProgress.bet}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="retaincontent" v-if="currentLevel.value > 0">
                                <div class="headertitle">
                                    <span class="text">保级</span>
                                </div>
                                <div class="retainbox">
                                    <div class="retain">
                                        <div class="left">
                                            <span>{{retainTitle.first}}</span>
                                        </div>
                                        <div class="right">
                                            <div class="progress">
                                                <div class="progressbg">
                                                    <span class="progresstop" :style="{width: retainProgress.depositPercent}"></span>
                                                    <span class="progresstext">{{retainProgress.deposit}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="retain">
                                        <div class="left">
                                            <span>{{retainTitle.second}}</span>
                                        </div>
                                        <div class="right">
                                            <div class="progress">
                                                <div class="progressbg">
                                                    <span class="progresstop" :style="{width: retainProgress.betPercent}"></span>
                                                    <span class="progresstext">{{retainProgress.bet}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="contactbox">
                        <div class="title">
                            <span class="icon contact"></span>
                            <span class="text">联系方式</span>
                        </div>
                        <div class="content">
                            <div class="left">
                                <p class="text">
                                    <span>联系电话</span>
                                    <span>{{userData.phoneNumber}}</span>
                                </p>
                                <p class="text">
                                    <span>QQ号码</span>
                                    <span>{{userData.QQ ? userData.QQ : '待完善'}}</span>
                                </p>
                                <p class="text">
                                    <span>微信号码</span>
                                    <span>{{userData.WeChat? userData.WeChat : '待完善'}}</span>
                                </p>
                                <p class="text">
                                    <span>出生日期</span>
                                    <span>{{userData.birthday? userData.birthday : '待完善'}}</span>
                                </p>
                            </div>
                            <div class="right">
                                <div class="btn">
                                    <span @click="editContact">修改</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="bankbox">
                        <div class="title">
                            <span class="icon bank"></span>
                            <span class="text">银行卡</span>
                        </div>
                        <div class="content">
                            <div class="left">
                                <p class="text">
                                    <span>收款人</span>
                                    <span>{{userData.bankUser ? userData.bankUser : '待完善'}}</span>
                                </p>
                                <p class="text">
                                    <span>银行卡号</span>
                                    <span>{{userData.bankAccount ? userData.bankAccount : '待完善'}}</span>
                                </p>
                                <p class="text">
                                    <span>银行名称</span>
                                    <span>{{userData.bankAccountName ? userData.bankAccountName : '待完善'}}</span>
                                </p>
                                <p class="text">
                                    <span>账户性质</span>
                                    <span>{{userData.bankAccountType}}</span>
                                </p>
                                <p class="text">
                                    <span>开户城市</span>
                                    <span>{{userData.bankAccountProvince}}&nbsp;{{userData.bankAccountCity}}&nbsp;{{userData.bankAccountDistrict}}</span>
                                </p>
                                <p class="text">
                                    <span>开户分行</span>
                                    <span>{{userData.bankAccountAddress ? userData.bankAccountAddress : '待完善'}}</span>
                                </p>
                            </div>
                            <div class="right">
                                <div class="btn">
                                    <span @click="editBank">修改</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </scroll-component>
    </content-wrapper>
</template>

<script>
// import {get, getCreditDetail, getAllLevel, getLevel, getPlayerWeekStatus, getPlayerDayStatus} from '@/common/api';
import {apiRequest} from '@/common/api/base';
import {mapMutations, mapState} from 'vuex';
import tool from '@/common/tool';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import CommonHeader from '@/components/top-header/CommonHeader';
export default {
    name: 'the-info',
    data () {
        return {
            totalMoney: '*****',
            userData: {
                playerLevel: {},
                QQ: '待完善',
                WeChat: '待完善',
                bankUser: '*****',
                bankAccount: '*****',
                bankAccountName: '*****',
                bankAccountType: '*****',
                bankAccountProvince: '*****',
                bankAccountCity: '*****',
                bankAccountDistrict: '*****',
                bankAccountAddress: '*****'
            },
            defaultBankList: [
                {text: '中国工商银行', value: 1},
                {text: '中国农业银行', value: 2},
                {text: '中国银行', value: 3},
                {text: '中国建设银行', value: 4},
                {text: '交通银行', value: 5},
                {text: '中信银行', value: 6},
                {text: '中国光大银行', value: 7},
                {text: '华夏银行', value: 8},
                {text: '广发银行', value: 9},
                {text: '平安银行', value: 10},
                {text: '招商银行', value: 11},
                {text: '兴业银行', value: 12},
                {text: '上海浦东发展银行', value: 13},
                {text: '中国邮政储蓄银行', value: 161},
                {text: '中国民生银行', value: 169},
                {text: '其他银行', value: 174}
            ],
            allLevel: '*****',
            currentLevel: {
                value: 0
            },
            updateTitle: {
                first: '*****',
                second: '*****'
            },
            retainTitle: {
                first: '*****',
                second: '*****'
            },
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
            dayConsume: '*****',
            options: {
                top: 1.533,
                bottom: 1.7333
            }
        };
    },
    methods: {
        ...mapMutations(['STATEMENT']),
        transfer () {
            this.$router.replace({name: 'accounttransfer', params: {title: '游戏转账'}});
            tool.setSessionStore('accountTitle', '游戏转账');
            this.STATEMENT({
                name: 'accountTitle',
                data: '游戏转账'
            });
        },
        washCode () {
            this.$router.replace({name: 'accountwash', params: {title: '提前结算洗码'}});
            tool.setSessionStore('accountTitle', '提前结算洗码');
            this.STATEMENT({
                name: 'accountTitle',
                data: '提前结算洗码'
            });
        },
        editContact () { // 修改个人资料
            this.$router.push({name: 'accounteditcontact', params: {title: '编辑联系方式'}});
            tool.setSessionStore('accountTitle', '编辑联系方式');
            this.STATEMENT({
                name: 'accountTitle',
                data: '编辑联系方式'
            });
        },
        editBank () { // 修改银行卡资料
            this.$router.push({name: 'accounteditbank', params: {title: '绑定银行卡'}});
            tool.setSessionStore('accountTitle', '绑定银行卡');
            this.STATEMENT({
                name: 'accountTitle',
                data: '绑定银行卡'
            });
        },
        init () {
            apiRequest('get', {
                service: 'player',
                data: {}
            }).then((res) => {
                this.userData = res.data;
                this.userData.QQ = res.data.qq;
                this.userData.WeChat = res.data.wechat;
                this.userData.bankUser = res.data.bankAccountName;
                this.userData.bankAccount = res.data.bankAccount;
                if (/^[\u4E00-\u9FFF]+$/.test(res.data.bankName)) {
                    this.userData.bankAccountName = res.data.bankName;
                } else {
                    for (let i in this.defaultBankList) {
                        if (this.defaultBankList[i].value === parseInt(res.data.bankName)) {
                            this.userData.bankAccountName = this.defaultBankList[i].text;
                        }
                    }
                }
                this.userData.birthday = res.data.DOB ? tool.timeFormat(res.data.DOB, 'YYYY-MM-DD') : null;
                if (!res.data.bankAccountType) {
                    this.userData.bankAccountType = '待完善';
                } else {
                    this.userData.bankAccountType = res.data.bankAccountType === '1' ? '信用卡' : '借记卡';
                }
                this.userData.bankAccountProvince = res.data.bankAccountProvince ? res.data.bankAccountProvince : '待完善';
                this.userData.bankAccountCity = (() => {
                    if (res.data.bankAccountCity !== res.data.bankAccountProvince) {
                        return res.data.bankAccountCity ? res.data.bankAccountCity : '待完善';
                    } else {
                        return '';
                    }
                })();
                this.userData.bankAccountDistrict = res.data.bankAccountDistrict ? res.data.bankAccountDistrict : '';
                this.userData.bankAccountAddress = res.data.bankAddress;
                apiRequest('getCreditDetail', {
                    service: 'player',
                    data: {
                        _isLoading: true
                    }
                }).then((res) => {
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
                        if (val.lockCredit) {
                            this.totalMoney += parseFloat(val.lockCredit);
                        }
                    });
                    this.totalMoney = this.totalMoney.toFixed(2);
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
            apiRequest('getAllLevel', {
                service: 'playerLevel',
                data: {}
            }).then((res) => {
                this.allLevel = res.data;
                apiRequest('getLevel', {
                    service: 'playerLevel',
                    data: {}
                }).then((res) => {
                    this.currentLevel = res.data;
                    if (this.currentLevel.value <= 3) {
                        this.updateTitle.first = '日存款';
                        this.updateTitle.second = '日投注额';
                        this.retainTitle.first = '周存款';
                        this.retainTitle.second = '周投注额';
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
                    } else if (this.currentLevel.value < 6 && this.currentLevel.value > 3) {
                        this.updateTitle.first = '周存款';
                        this.updateTitle.second = '周投注额';
                        this.retainTitle.first = '周存款';
                        this.retainTitle.second = '周投注额';
                        this.updateProgress.deposit = (this.weeklyConsume.topUpAmount.toFixed(2) + '/' + this.allLevel[this.currentLevel.value + 1].levelUpConfig[0].topupLimit);
                        this.updateProgress.depositPercent = (this.weeklyConsume.topUpAmount / this.allLevel[this.currentLevel.value + 1].levelUpConfig[0].topupLimit).toFixed(2) * 100 + '%';
                        this.updateProgress.bet = (this.weeklyConsume.consumptionAmount.toFixed(2) + '/' + this.allLevel[this.currentLevel.value + 1].levelUpConfig[0].consumptionLimit);
                        this.updateProgress.betPercent = (this.weeklyConsume.consumptionAmount / this.allLevel[this.currentLevel.value + 1].levelUpConfig[0].consumptionLimit).toFixed(2) * 100 + '%';
                        this.retainProgress.deposit = (this.weeklyConsume.topUpAmount.toFixed(2) + '/' + this.allLevel[this.currentLevel.value].levelDownConfig[0].topupMinimum);
                        this.retainProgress.depositPercent = (this.weeklyConsume.topUpAmount / this.allLevel[this.currentLevel.value].levelDownConfig[0].topupMinimum).toFixed(2) * 100 + '%';
                        this.retainProgress.bet = (this.weeklyConsume.consumptionAmount.toFixed(2) + '/' + this.allLevel[this.currentLevel.value].levelDownConfig[0].consumptionMinimum);
                        this.retainProgress.betPercent = (this.weeklyConsume.consumptionAmount / this.allLevel[this.currentLevel.value].levelDownConfig[0].consumptionMinimum).toFixed(2) * 100 + '%';
                    } else {
                        this.updateTitle.first = '周存款';
                        this.updateTitle.second = '周投注额';
                        this.retainTitle.first = '周存款';
                        this.retainTitle.second = '周投注额';
                        this.retainProgress.deposit = (this.weeklyConsume.topUpAmount.toFixed(2) + '/' + this.allLevel[this.currentLevel.value].levelDownConfig[0].topupMinimum);
                        this.retainProgress.depositPercent = (this.weeklyConsume.topUpAmount / this.allLevel[this.currentLevel.value].levelDownConfig[0].topupMinimum).toFixed(2) * 100 + '%';
                        this.retainProgress.bet = (this.weeklyConsume.consumptionAmount.toFixed(2) + '/' + this.allLevel[this.currentLevel.value].levelDownConfig[0].consumptionMinimum);
                        this.retainProgress.betPercent = (this.weeklyConsume.consumptionAmount / this.allLevel[this.currentLevel.value].levelDownConfig[0].consumptionMinimum).toFixed(2) * 100 + '%';
                    }
                });
            });
        }
    },
    components: {
        CommonHeader,
        ScrollComponent,
        ContentWrapper
    },
    computed: {
        ...mapState(['userInfo'])
    },
    created () {
        this.init();
        this.STATEMENT({
            name: 'accountTitle',
            data: '账户资料'
        });
    },
    mounted () {}
};
</script>

<style scoped lang="scss">
$images: '../../../assets';
.info {
    ul {
        padding: 0 0.2666rem;
        li {
            padding-top: 0.8rem;
            .title{
                display: flex;
                align-items: center;
                padding-bottom: 0.2rem;
                .icon {
                    background: url('https://xdlftp.xindedom.life/images/mobile_image/accountInfo-icon.png') no-repeat;
                    width:0.53333rem;
                    height: 0.50666rem;
                    background-size:2.1333rem 0.50666rem;
                }
                .base {
                    background-position: 0 0;
                }
                .rank {
                    width:0.52rem;
                    background-position: -0.51rem 0;
                }
                .contact {
                    background-position: -1.04rem 0;
                }
                .text{
                    padding-left: 0.2rem;
                    font-size: 0.4rem;
                    color: #ffffff;
                    font-weight: 600;
                }
            }
        }
        .baseinfo {
            .content {
                background-color: #1d1d1d;
                border: 0.5px solid #fff;
                height: 2.066rem;
                border-radius: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 0.3rem;
                .left {
                    .text {
                        color: #fff;
                        font-size: 0.4rem;
                    }
                }
                .right {
                    .btn {
                        display: flex;
                        align-items: center;
                        color: #fff;
                        font-size: 0.3466rem;
                        text-align: center;
                        span{
                            height: 0.8rem;
                            line-height: 0.8rem;
                            width: 2.2666rem;
                            border-radius: 5px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            i{
                                font-style: normal;
                            }
                        }
                        span:nth-child(1) {
                            background: linear-gradient(to bottom, #f72b37, #e40d11);
                            margin-right: 0.2rem;
                        }
                        span:nth-child(2) {
                            background: linear-gradient(to bottom, #ee7e00, #c72700);
                        }
                    }
                }
            }
        }
        .grade {
            .content {
                .updatacontent{
                    margin-bottom: 0.2rem;
                }
                .headertitle {
                    display: flex;
                    align-items: center;
                    background-color: #ffcf43;
                    height: 0.6rem;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                    justify-content: flex-end;
                    .text {
                        width: 100%;
                        font-size:0.4rem;
                        color: #000;
                        text-align: center;
                        font-weight: bold;

                    }
                }
                .updatabox, .retainbox {
                    background-color: #1d1d1d;
                    padding-top: 0.2rem;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                }
                .updata, .retain {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 0.3rem 0.2rem;
                    .left {
                        font-size: 0.4rem;
                        color: #fff;
                    }
                    .right {
                        position: relative;
                        .progress {
                            width: 3.4rem;
                            text-align: center;
                            position: relative;
                            .progressbg {
                                position: absolute;
                                left: 50%;
                                top: 50%;
                                width: 90%;
                                height: 0.4rem;
                                background-color: #000;
                                margin: 0 auto;
                                border-radius: 10px;
                                transform: translate(-50%, -50%);
                                overflow: hidden;
                                .progresstop {
                                    position: absolute;
                                    width: 80%;
                                    left: 0;
                                    top: 0;
                                    height: 0.4rem;
                                    background-color: #ac0000;
                                    /*border-radius: 10px;*/
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                }
                                .progresstext {
                                    position: absolute;
                                    width: 100%;
                                    height: 100%;
                                    left: 0;
                                    top: 0;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-size: 0.24666rem;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
                /*table {
                    width: 100%;
                    !*border-radius: 5px;*!
                    border: 1px solid #fff;
                    border-top: none;
                    tr {
                        td{
                            height: 0.8rem;
                            line-height: 0.8rem;
                            border-bottom: 1px solid #fff;
                        }
                        .text {
                            font-size: 0.34666rem;
                            color: #fff;
                            width: 2.4rem;
                            text-align: center;
                            border-right: 1px solid #fff;
                        }
                        .progress {
                            width: 3.4rem;
                            text-align: center;
                            position: relative;
                            .progressbg {
                                position: absolute;
                                left: 50%;
                                top: 50%;
                                width: 90%;
                                height: 0.4rem;
                                background-color: #000;
                                margin: 0 auto;
                                border-radius: 10px;
                                transform: translate(-50%, -50%);
                                .progresstop {
                                    position: absolute;
                                    width: 80%;
                                    left: 0;
                                    top: 0;
                                    height: 0.4rem;
                                    background-color: #ac0000;
                                    border-radius: 10px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                }
                                .progresstext {
                                    position: absolute;
                                    width: 100%;
                                    height: 100%;
                                    left: 0;
                                    top: 0;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-size: 10px;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }*/
            }
        }
        .contactbox {
            .content {
                background-color: #1d1d1d;
                border: 0.5px solid #fff;
                height: 2.5rem;
                border-radius: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 0.3rem;
                .left {
                    .text {
                        color: #fff;
                        font-size: 0.4rem;
                        span{
                            width: 2rem;
                            display: inline-block;
                        }
                        span:nth-child(2) {
                            width: 3rem;
                        }
                    }
                }
                .right {
                    .btn {
                        display: flex;
                        align-items: center;
                        color: #fff;
                        font-size: 0.3466rem;
                        text-align: center;
                        span{
                            height: 0.8rem;
                            line-height: 0.8rem;
                            width: 2.2666rem;
                            border-radius: 5px;
                        }
                        span:nth-child(1) {
                            background: linear-gradient(to bottom, #ee7e00, #c72700);
                        }
                    }
                }
            }
        }
        .bankbox {
            padding-bottom: 0.8rem;
            .content {
                background-color: #1d1d1d;
                border: 0.5px solid #fff;
                border-radius: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.3rem 0.3rem;
                .left {
                    .text {
                        color: #fff;
                        font-size: 0.4rem;
                        display: flex;
                        align-items: flex-start;
                        span{
                            display: inline-block;
                            width: 2rem;
                        }
                        span:nth-child(2) {
                            width: 4rem;
                        }
                    }
                }
                .right {
                    .btn {
                        display: flex;
                        align-items: center;
                        color: #fff;
                        font-size: 0.3466rem;
                        text-align: center;
                        span{
                            height: 0.8rem;
                            line-height: 0.8rem;
                            width: 2.2666rem;
                            border-radius: 5px;
                        }
                        span:nth-child(1) {
                            background: linear-gradient(to bottom, #ee7e00, #c72700);
                        }
                    }
                }
            }
        }
    }
}
</style>
