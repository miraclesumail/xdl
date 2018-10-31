<template>
    <div class="online">
        <div class="recharge">
            <div class="left">充值金额</div>
            <div class="right">
                <input type="number" placeholder="请输入您的金额" v-model="chargeMoney">
            </div>
        </div>
        <div class="recharge">
            <div class="left">得利宝石</div>
            <div class="right">
                <div class="deligem">
                    <select name="" id="" class="deliselect" v-model="selectGem" :onchange="handleGem">
                        <option value="" disabled>
                            {{promoCodeList.length ? promoCodeList.length + '个宝石未使用' : '没有可使用的宝石'}}
                        </option>
                        <option :value="item.bonusCode" v-for="(item, index) in promoCodeList" :key="index">
                            {{item.bonusCode}}
                        </option>
                    </select>
                </div>
                <span class="gemurl" @click="opengem"></span>
            </div>
        </div>
        <div class="quick">
            <div class="left">快速充值</div>
            <div class="right">
                <ul>
                    <li v-for="(item, index) in quickMoney" :key="index" @click="quickSelect(item)"
                        :class="item === quickSelectActive ? 'active' : ''">{{item}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="paymentstyle">
            <p class="paytitle">
                <span>支付方式</span>
            </p>
            <p class="paytip" v-if="showTip">
                <span>在线支付维护中，请尝试其他支付方式</span>
            </p>
            <div class="payitem">
                <ul>
                    <li @click="selectPay(item.type, item.name, item.maxDepositAmount, item.minDepositAmount)"
                        v-for="(item, index) in paymentList" :key="index">
                        <div class="icon" :class="item.class"></div>
                        <div class="title">
                            {{item.name}}
                        </div>
                        <div class="money">
                            {{item.minDepositAmount}} - {{item.maxDepositAmount}}
                        </div>
                    </li>
                </ul>
            </div>
            <p class="paytip_cs" v-if="!showTip">
                <span>温馨提示：若您的存款10分钟内未到账，请及时联系客服（24小时）。</span>
            </p>
        </div>
    </div>
</template>

<script>
import {paymentApiRequest} from '@/common/api/payment';
import {apiRequest} from '@/common/api/base';
import {payList} from '@/common/static-files/depositMethods';
import {mapState, mapMutations} from 'vuex';
import tool from '@/common/tool';
export default {
    name: 'the-online-wechat',
    data () {
        return {
            chargeMoney: '',
            quickMoney: [10, 50, 100, 500, 1000, 2000], // 快捷选择金钱
            paymentList: [],
            promoCodeList: [],
            quickSelectActive: '',
            selectGem: '',
            isWebView: false
        };
    },
    computed: {
        ...mapState(['userInfo']),
        showTip () {
            return this.paymentList.length === 0;
        }
    },
    created () {
        if (!this.userInfo.data.isRealPlayer) {
            this.MSGMODAL({
                text: '试玩账号不支持存款，请先注册成为正式玩家。',
                status: true,
                confirmName: '注册去',
                confirmFn: () => {
                    this.$router.push({name: 'register'});
                }
            });
            return false;
        }
        this.init();
    },
    watch: {
        chargeMoney () {
            this.quickSelectActive = parseInt(this.chargeMoney);
        }
    },
    methods: {
        ...mapMutations(['MSGALERT', 'STATEMENT']),
        init () {
            this.autoSelectPaymentEnv();
            this.getOnlinePayList();
            this.getPromoCode();
        },
        getPromoCode () {
            apiRequest('getPromoCode', { // 获取优惠代码
                service: 'reward',
                data: {
                    status: 1
                }
            }).then((res) => {
                res.data.noUseList.forEach((val, index, arr) => {
                    this.promoCodeList.push(val);
                });
            }).catch((res) => {
                console.log(res);
            });
        },
        getOnlinePayList () {
            paymentApiRequest('getOnlineTopupType', { // 获取在线充值方式
                service: 'payment',
                data: {
                    merchantUse: 1,
                    clientType: this.isWebView ? 4 : 2,
                    bPMSGroup: true
                }
            }).then((res) => {
                this.getPaymentList(res);
            }).catch((res) => {
                console.log(res);
            });
        },
        autoSelectPaymentEnv () {
            this.isWebView = tool.webViewEnvironment();
        },
        getPaymentList (res) {
            res.data.forEach((val, index) => {
                if (!/微信/.test(payList[val.type - 1].name) && !/支付宝/.test(payList[val.type - 1].name)) {
                    val.class = payList[val.type - 1].class;
                    val.name = payList[val.type - 1].webName;
                    this.paymentList.push(val);
                }
            });
        },
        handleGem () {
            console.log(true);
        },
        quickSelect (val) {
            this.chargeMoney = val;
            this.quickSelectActive = val;
        },
        opengem () {
            this.$router.push({name: 'jewel', params: {active: 3}});
        },
        selectPay (type, title, max, min) {
            this._clickCount('在线充值', title);
            if (!this.chargeMoney) {
                this.MSGALERT({
                    text: '充值金额不能为空',
                    status: 'error'
                });
                return false;
            }
            if (this.chargeMoney >= min && this.chargeMoney <= max) {
                let paymentPromise = new Promise((resolve, reject) => {
                    paymentApiRequest('createOnlineTopupProposal', {
                        service: 'payment',
                        data: {
                            topupType: type,
                            amount: this.chargeMoney,
                            clientType: this.isWebView ? 4 : 2,
                            bPMSGroup: true,
                            bonusCode: this.selectGem // 优惠代码
                        }
                    }).then((res) => {
                        resolve(res);
                    }).catch((res) => {
                        reject(res);
                    });
                });
                if (this.isWebView) {
                    paymentPromise.then((res) => {
                        location.href = res.data.topupDetail.paymentURL;
                    }).catch((res) => {});
                } else {
                    let ow = window.open('', '_blank');
                    paymentPromise.then((res) => {
                        this.$nextTick(() => {
                            ow.location = res.data.topupDetail.paymentURL;
                            if (ow == null || typeof (ow) === 'undefined') {
                                ow.close();
                            } else {}
                        });
                    }).catch((res) => {
                        ow.close();
                    });
                }
            } else {
                this.MSGALERT({
                    text: '充值金额小于或者大于限额',
                    status: 'error'
                });
                return false;
            }
        },
        service_payment () {
            if (this.isWebView) {
                location.href = 'https://forchat999.com/chat/chatClient/chatbox.jsp?companyID=267&configID=205&jid=&s=1';
            } else {
                let ow = window.open('', '_blank');
                ow.location = 'https://forchat999.com/chat/chatClient/chatbox.jsp?companyID=267&configID=205&jid=&s=1';
            }
        }
    }
};
</script>

<style scoped lang="scss">
    $images: '../../../assets';
    .online {
        padding: 1rem 0.3rem 0.5rem 0.6rem;
        .recharge {
            display: flex;
            align-items: center;
            height: 0.8rem;
            margin-bottom: 0.3rem;
            .left {
                font-size: 0.4rem;
                color: #fff;
                width: 1.7rem;
            }
            .right {
                padding-left: 0.6333rem;
                display: flex;
                align-items: center;
                position: relative;
                input {
                    border: 1px solid #fff;
                    background: linear-gradient(to bottom, #0c0c0c, #181818);
                    height: 0.8rem;
                    font-size: 0.4rem;
                    color: #ffb400;
                    width: 3.9rem;
                    border-radius: 5px;
                    padding-left: 0.1rem;
                }
                .select {
                    border: 1px solid #fff;
                    width: 4.053rem;
                    padding-left: 0.1rem;
                    border-radius: 5px;
                    height: 0.8rem;
                    font-size: 0.4rem;
                    color: #3f3f3f;
                    background: linear-gradient(to bottom, #0c0c0c, #181818);
                    option {

                    }
                }
                .deligem {
                    border: 1px solid #fff;
                    border-radius: 5px;
                    width: 4rem;
                    height: 0.8rem;
                    background: linear-gradient(to bottom, #0c0c0c, #181818);
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    justify-content: space-between;
                    position: relative;
                    .deliselect {
                        width: 100%;
                        outline: none;
                        border: none;
                        font-size: 0.4rem;
                        height: 100%;
                        background: transparent;
                        color: #ccc;
                    }

                }
                .gemurl {
                    position: absolute;
                    right: -1rem;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 0.5rem;
                    height: 0.5rem;
                    background: url('https://xdlftp.xindedom.life/images/mobile_image/question.png') no-repeat;
                    background-size: 100% 100%;
                }
                .active {
                    color: #ffb400;
                }
            }
        }
        .quick {
            display: flex;
            align-items: center;
            .left {
                font-size: 0.4rem;
                color: #fff;
                width: 1.7rem;
            }
            .right {
                width: 6rem;
                padding-left: 0.64rem;
                ul {
                    display: flex;
                    /*align-items: center;*/
                    align-content: space-between;
                    flex-wrap: wrap;
                    height: 1.8rem;
                    li {
                        width: 1.6rem;
                        height: 0.8rem;
                        background: linear-gradient(to bottom, #ebdcb3, #c69b6c);
                        font-size: 0.4rem;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #000;
                        border-radius: 6px;
                        margin-right: 0.2rem;
                    }
                    li.active {
                        box-shadow: 0 0 13px #8b733c;
                        background: linear-gradient(to bottom, #fff3df, #ffa500, #ffa700);
                    }
                }
            }
        }
        .paymentstyle {
            .paytitle {
                font-size: 0.466rem;
                height: 1.6rem;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .paytip{
                color: #ffa500;
                font-size: 0.4rem;
                text-align: center;
            }
            .paytip_cs{
                color: #ffa500;
                font-size: 0.4rem;
                text-align: start;
            }
            .payitem {
                width: 6.5rem;
                margin: 0 auto;
                ul {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    li {
                        background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/pay-bg.png') no-repeat;
                        width: 3.133rem;
                        height: 2.4666rem;
                        background-size: 100% 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        margin-bottom: 0.3rem;
                        .icon {
                            width: 1.266rem;
                            height: 1.133rem;
                            background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/pay-icon.png') no-repeat;
                            background-size: 8rem 1.133rem;
                        }
                        .alipay {
                            background-position: 0.1rem 0;
                        }
                        .quickpay {
                            background-position: -1.1rem 0;
                        }
                        .unionpay {
                            background-position: -2.466rem 0;
                        }
                        .qq {
                            background-position: -3.75rem 0;
                        }
                        .jd {
                            background-position: -4.9rem 0;
                        }
                        .wechat {
                            background-position: -6.15rem 0;
                        }
                        .title {
                            font-size: 0.4rem;
                            color: #301100;
                            font-weight: bold;
                        }
                        .money {
                            font-size: 0.4rem;
                            color: #ff0000;
                            font-weight: 600;
                        }
                    }

                }
            }
        }
        ::-webkit-input-placeholder {
            color: #ccc;
        }
    }
</style>
