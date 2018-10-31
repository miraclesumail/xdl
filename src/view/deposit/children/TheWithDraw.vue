<template>
    <div class="withdraw">
        <div class="list">
            <div class="left">
                账号
            </div>
            <div class="right">
                <span>{{userName}}</span>
                <!--<input type="text" disabled :value="">-->
            </div>
        </div>
        <div class="list">
            <div class="left">
                账户总额
            </div>
            <div class="right">
                <span>{{money}}</span>
                <!--<input type="text" disabled :value="">-->
            </div>
        </div>
        <div class="list">
            <div class="left">
                免费提款次数
            </div>
            <div class="right">
                <span>{{time}}</span>
                <!--<input type="text" :value="" disabled>-->
            </div>
        </div>
        <div class="list">
            <div class="left">
                提款金额
            </div>
            <div class="right">
                <input type="text" v-model="needMoney" placeholder="请输入提款金额">
            </div>
        </div>
        <div class="progress" v-if="money !== '0.00'">
            <div class="title">
                <span class="icon"></span>
                <span class="text">提款流水进度</span>
            </div>
            <div class="progresstip" v-if="withdrawInfo.freeShow === false && lockList.length === 0">
                已完成
            </div>
            <div class="progresslist" v-if="withdrawInfo.freeShow">
                <p>自由额度</p>
                <p>{{withdrawInfo.currentFreeAmount}} / {{withdrawInfo.freeAmount}}</p>
            </div>
            <div class="progresslist" v-for="(item, index) in lockList" :key="index">
                <p>{{item.name}}</p>
                <p>{{item.currentLockAmount}} / {{item.lockAmount}}</p>
            </div>
        </div>
        <!--<div class="list">-->
            <!--<div class="left">-->
                <!--备注-->
            <!--</div>-->
            <!--<div class="right">-->
                <!--<input type="text">-->
            <!--</div>-->
        <!--</div>-->
        <div class="tip">
            <div class="right">
                <span class="icon"></span>
            </div>
            <div class="left">
                <p style="text-align: center">温馨提示：</p>
                [单笔]最低提款限额[100]RMB<br/>[单笔]最高提款限额[20万]RMB<br/>[当日]最高提款限额[100万]RMB。</div>
        </div>
        <div class="btn">
            <!--<div class="left">-->
                <!--取消-->
            <!--</div>-->
            <div class="right" @click="apply">
                提交
            </div>
        </div>
    </div>
</template>

<script>
// import tool from '@/common/tool';
import {mapState, mapMutations} from 'vuex';
// import {getWithdrawalInfo, getCreditDetail, applyBonus
// get
// getCreditInfo, getCreditBalance, getCredit
// } from '@/common/api';
import {paymentApiRequest} from '@/common/api/payment';
import {apiRequest} from '@/common/api/base';
export default {
    name: 'the-with-draw',
    data () {
        return {
            userName: '*****',
            money: '*****',
            time: '*****',
            needMoney: null,
            lockList: [],
            withdrawInfo: {
                currentFreeAmount: '*****',
                freeAmount: '*****',
                freeShow: true
            }
        };
    },
    methods: {
        ...mapMutations(['MSGALERT', 'MSGMODAL']),
        apply () {
            if (!this.needMoney) {
                this.MSGALERT({
                    text: '提款金额不能为空',
                    status: 'error'
                });
                return false;
            } else if (this.needMoney < 100) {
                this.MSGALERT({
                    text: '单笔提款金额不能低于100元',
                    status: 'error'
                });
                return false;
            }
            if (this.money < 100) {
                this.MSGALERT({
                    text: '账户总额不足100元不能提款',
                    status: 'error'
                });
                return false;
            }
            paymentApiRequest('applyBonus', {
                service: 'payment',
                data: {
                    bonusId: 1,
                    amount: parseFloat(this.needMoney),
                    _isModal: true
                }
            }).then((res) => {
                this.MSGALERT({
                    text: '您的提款申请已提交，请稍等！',
                    status: 'success'
                });
                this.init();
            }).catch((res) => {
                if (res.status !== 417) {
                    this.MSGALERT({
                        text: res.errorMessage,
                        status: 'error'
                    });
                } else {
                    this.MSGMODAL({
                        text: '玩家支付信息无效，点击确定去完善',
                        status: true,
                        confirmFn: () => {
                            this.$router.push({name: 'accounteditbank'});
                        }
                    });
                }
            });
        },
        init () {
            this.userName = this.userInfo.data.name;
            paymentApiRequest('getWithdrawalInfo', {
                service: 'player',
                data: {}
            }).then((res) => {
                this.withdrawInfo.currentFreeAmount = res.data.currentFreeAmount;
                this.withdrawInfo.freeAmount = parseFloat(res.data.freeAmount).toFixed(2);
                if (res.data.currentFreeAmount === 0 && res.data.freeAmount === 0) {
                    this.withdrawInfo.freeShow = false;
                }
                res.data.lockList.forEach((val, index, arr) => {
                    val.currentLockAmount = val.currentLockAmount.toFixed(2);
                    this.lockList.push(val);
                });
                this.time = res.data.freeTimes + '次';
            });
            apiRequest('getCreditDetail', {
                service: 'player',
                data: {}
            }).then((res) => {
                this.money = res.data.credit;
                res.data.gameCreditList.forEach((val, index, arr) => {
                    if (val.validCredit !== 'unknown') {
                        if (!val.nickName.indexOf('BYBALL') || !val.nickName.indexOf('BYOTHS')) {
                        } else {
                            this.money += parseInt(val.validCredit);
                        }
                    }
                });
                res.data.lockedCreditList.forEach((val, index, arr) => {
                    if (val.validCredit !== 'unknown') {
                        this.money += parseInt(val.lockCredit);
                    }
                });
                this.money = this.money.toFixed(2);
            });
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    mounted () {
        this.init();
    },
    created () {
    }
};
</script>

<style scoped lang="scss">
    $images: '../../../assets';
    .withdraw {
        padding-top: 1rem;
        .list{
            display: flex;
            align-items: center;
            margin-bottom: 0.3rem;
            justify-content: center;
            .left {
                font-size:0.4rem;
                color: #fff;
                width: 3rem;
                text-align: center;
            }
            .right {
                display: flex;
                align-items: center;
                padding-left: 0.6rem;
                select{
                    width: 4.066rem;
                    outline: none;
                    background: linear-gradient(to bottom, #0c0c0c, #181818);
                    height: 0.7rem;
                    font-size: 0.4rem;
                    color: #ffb400;
                    border: 1px solid #fff;
                    border-radius: 5px;
                }
                input {
                    width: 3.8rem;
                    height: 0.7rem;
                    outline: none;
                    border: 1px solid #fff;
                    background: linear-gradient(to bottom, #0c0c0c, #181818);
                    border-radius: 5px;
                    color: #ffb400;
                    padding-left: 0.2rem;
                    font-size: 0.4rem;
                }
                span{
                    display: flex;
                    align-items: center;
                    width: 3.8rem;
                    height: 0.7rem;
                    outline: none;
                    border: 1px solid #fff;
                    background: linear-gradient(to bottom, #0c0c0c, #181818);
                    border-radius: 5px;
                    color: #ffb400;
                    padding-left: 0.2rem;
                    font-size: 0.4rem;
                }
            }
        }
        .progress {
            margin: 0.2rem 0.4rem;
            border: 1px solid #9b9b9b;
            border-radius: 5px;
            overflow: hidden;
            .title{
                height: 0.866rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(to bottom, #1a1a1a, #000);
                .icon {
                    background: url('https://xdlftp.xindedom.life/images/mobile_image/hand_money.png') no-repeat;
                    background-size: 0.52rem 0.493rem;
                    width: 0.52rem;
                    height: 0.493rem;
                    margin-right: 0.2rem;
                }
                .text {
                    font-size: 0.4rem;
                    color: #fff;
                    font-weight: bold;
                }
            }
            .progresslist {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #1b1b1b;
                color: #fff;
                font-size: 0.4rem;
                padding:0.15rem 0;
                p:nth-child(1) {
                    width: 3rem;
                }
                p:nth-child(2) {
                    color: #ffa200;
                    width: 4rem;
                    text-align: center;
                    /*padding-left: 1rem;*/
                }
            }
            .progresstip {
                font-size: 0.4rem;
                background-color: #1b1b1b;
                color: #fff;
                text-align: center;
                height: 1rem;
                line-height: 1rem;
            }
        }
        .tip {
            display: flex;
            align-items: center;
            width: 86%;
            margin: 0.8rem auto;
            .right{
                display: flex;
                padding-right: 0.2rem;
                .icon {
                    width: 1.0133rem;
                    height: 0.92rem;
                    background: url("https://xdlftp.xindedom.life/images/mobile_image/deposit-tip.png") no-repeat;
                    background-size: 100% 100%;
                }
            }
            .left {
                font-size: 0.4rem;
                color: #ff1e1e;
            }
        }
        .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            padding:0 0 0.3rem 0;
            div{
                width: 2.8rem;
                height: 0.8rem;
                font-size: 0.466rem;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 5px;
            }
            .left {
                background: linear-gradient(to bottom, #454545, #161616);
                margin-right: 0.5rem;
            }
            .right {
                background: linear-gradient(to bottom, #ee7d00, #c82900);
            }
        }
    }
</style>
