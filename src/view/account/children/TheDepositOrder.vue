<template>
    <content-wrapper class="container" :options="options">
        <common-header>存款订单</common-header>
        <scroll-component>
            <div class="depositlist">
                <div class="orderdetail" v-if="orderDetail">
                    <div class="title">{{orderDetail.title}}</div>
                    <ul>
                        <li class="tip" v-if="orderDetail.depositMethod === 5">
                            <div class="tipicon">
                                <span class="icon"></span>
                                <span class="icontitle">温馨提示：</span>
                            </div>
                            <div class="text">
                                为方便您快速到账，订单金额调整为<span>{{orderDetail.amount}}</span>元，存款此金额将无需审核，<span>5分钟</span>内到账。
                            </div>
                        </li>
                        <li class="tip" v-if="orderDetail.depositMethod === 6">
                            <div class="tipicon">
                                <span class="icon"></span>
                                <span class="icontitle">温馨提示：</span>
                            </div>
                            <div class="text">
                                使用云闪付需要下载云闪付APP，下载完后打开云闪付APP扫一扫二维码即可付款。<br/>
                                为方便您快速到账，订单金额调整为<span>{{orderDetail.amount}}</span>元，存款此金额将无需审核，<span>5分钟</span>内到账。
                            </div>
                        </li>
                        <li v-if="orderDetail.depositMethod !== 6">
                            <div class="tipicon">
                                <span class="icon bank"></span>
                                <span class="icontitle">收款银行信息：</span>
                            </div>
                            <div class="bankInfo">
                                <div class="bankList">
                            <span>
                                银行类型
                            </span>
                                    <span>
                            {{orderDetail.bankName}}
                            </span>
                                </div>
                                <div class="bankList">
                        <span>
                            开户姓名
                        </span>
                                    <span>
                            {{orderDetail.cardOwner}}
                        </span>
                                    <span class="copy copyname" :data-clipboard-text="copyName" ref="copyname">复制开户姓名</span>
                                </div>
                                <div class="bankList">
                            <span>
                                银行账号
                            </span>
                                    <span>
                            {{orderDetail.bankCardNo}}
                            </span>
                                    <span class="copy copynumber" :data-clipboard-text="copyNumber" ref="copynumber">复制银行帐号</span>
                                </div>

                                <div class="bankList">
                            <span>
                                收款银行网点
                            </span>
                                    <span>
                            {{orderDetail.resultData.openingPoint}}
                            </span>
                                    <span class="copy copypoint" :data-clipboard-text="copyPoint" ref="copypoint">复制银行网点</span>
                                </div>
                            </div>
                        </li>
                        <li v-if="orderDetail.depositMethod === 6">
                            <div class="tipicon">
                                <span class="icon bank"></span>
                                <span class="icontitle">云闪付收款信息：</span>
                            </div>
                            <div class="bankInfo">
                                <div class="bankList">
                            <span>
                                银行类型
                            </span>
                                    <span>
                            {{orderDetail.bankName}}
                            </span>
                                </div>
                                <div class="bankList">
                            <span>
                                云闪付二维码
                            </span>
                                    <!--<span>-->
                                    <!--{{orderDetail.cardOwner}}-->
                                    <!--</span>-->
                                    <!--<img :src="orderDetail.resultData.codeAddress" alt="">-->
                                </div>
                                <div class="imgList">
                                    <!--<span>-->
                                    <!--{{orderDetail.cardOwner}}-->
                                    <!--</span>-->
                                    <img :src="orderDetail.resultData.codeAddress" alt="">
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="tipicon">
                                <span class="icon order"></span>
                                <span class="icontitle">存款订单信息：</span>
                            </div>
                            <div class="orderInfo">
                                <div class="orderList">
                        <span>
                            申请单号
                        </span>
                                    <span>
                            {{orderDetail.proposalId}}
                        </span>
                                </div>
                                <div class="orderList">
                        <span>
                            申请时间
                        </span>
                                    <span>
                            {{orderDetail.resultData.createTime}}
                        </span>
                                </div>
                                <div class="orderList">
                        <span>
                            有效时间
                        </span>
                                    <span class="validtime">
                            {{orderDetail.resultData.validTime}}
                        </span>
                                </div>
                                <div class="orderList">
                        <span>
                            申请金额
                        </span>
                                    <span class="applymoney">
                            {{orderDetail.amount}}
                        </span>
                                </div>
                                <div class="orderList">
                        <span>
                            存款倒计时
                        </span>
                                    <span>{{countDown.minutes}}分{{countDown.seconds}}秒</span>
                                </div>
                                <div class="orderList">
                        <span>
                            当前状态
                        </span>
                                    <span>
                            待审批
                        </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="btn" @click="cancelOrder">
                        <span>取消订单</span>
                    </div>
                </div>
                <div class="alipaydetail" v-if="orderAlipay">
                    <div class="title">支付宝转支付宝</div>
                    <ul>
                        <li>
                            <div class="tipicon">
                                <span class="icon bank"></span>
                                <span class="icontitle">收款支付宝信息：</span>
                            </div>
                            <div class="bankInfo">
                                <div class="bankList">
                                    <span>
                                        支付宝账号
                                    </span>
                                            <span>
                                    {{orderAlipay.data.alipayAccount}}
                                    </span>
                                    <!--<span class="copy copyname" :data-clipboard-text="copyName" ref="copyname">复制开户姓名</span>-->
                                </div>
                                <div class="bankList">
                                    <span>
                                        支付宝昵称
                                    </span>
                                                <span>
                                        {{orderAlipay.data.alipayName}}
                                    </span>
                                    <!--<span class="copy copynumber" :data-clipboard-text="copyNumber" ref="copynumber">复制银行帐号</span>-->
                                </div>
                                <div class="alipaylist">
                                    <span>
                                        支付宝二维码
                                    </span>
                                    <div class="alipayqr">
                                        <img :src="orderAlipay.data.alipayQRCode" alt="">
                                    </div>
                                </div>
                                <div class="alipay_tip">
                                   『请在支付宝转账页面备注您的会员账号或是下方申请单号，转账成功后可以秒速添加』
                                    <!--<span class="copy copynumber" :data-clipboard-text="copyNumber" ref="copynumber">复制银行帐号</span>-->
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="tipicon">
                                <span class="icon order"></span>
                                <span class="icontitle">存款订单信息：</span>
                            </div>
                            <div class="orderInfo">
                                <div class="orderList">
                                    <span>
                                        申请单号
                                    </span>
                                                <span>
                                        {{orderAlipay.data.proposalId}}
                                    </span>
                                    <span class="copy copyorderid" :data-clipboard-text="copyOrderId" ref="copyOrderId">复制单号</span>
                                </div>
                                <div class="orderList">
                                    <span>
                                        申请时间
                                    </span>
                                                <span>
                                        {{orderAlipay.createTime}}
                                    </span>
                                            </div>
                                            <div class="orderList">
                                    <span>
                                        有效时间
                                    </span>
                                                <span class="validtime">
                                         {{orderAlipay.data.validTime}}
                                    </span>
                                </div>
                                <div class="orderList">
                                    <span>
                                        申请金额
                                    </span>
                                                <span class="applymoney">
                                        {{orderAlipay.data.amount}}
                                    </span>
                                </div>
                                <!--<div class="orderList">-->
                                <!--<span>-->
                                <!--存款倒计时-->
                                <!--</span>-->
                                <!--<span>{{countDown.minutes}}分{{countDown.seconds}}秒</span>-->
                                <!--</div>-->
                                <div class="orderList">
                                    <span>
                                        当前状态
                                    </span>
                                                <span>
                                        待审批
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="btn" @click="cancelAlipay">
                        <span>取消订单</span>
                    </div>
                </div>
                <div class="wechatdetail"></div>
                <div class="nothing" v-if="orderDetail === null && orderAlipay === null">
                    <p>当前无存款订单信息</p>
                    <div class="btn" @click="comeDeposit">
                        <span>我要存款</span>
                    </div>
                </div>
            </div>
        </scroll-component>
    </content-wrapper>
</template>

<script>
import Clipboard from 'clipboard';
import {mapMutations} from 'vuex';
import tool from '@/common/tool';
// import {apiRequest} from '@/common/api/base';
import {paymentApiRequest} from '@/common/api/payment';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import CommonHeader from '@/components/top-header/CommonHeader';
// import {getManualTopupRequestList, cancelManualTopupRequest, getAlipayTopupRequestList, getWechatTopupRequestList, cancelAlipayTopup} from '@/common/api';
export default {
    name: 'the-deposit-order',
    data () {
        return {
            defaultBank: [
                {fullName: '中国工商银行', type: 1},
                {fullName: '中国农业银行', type: 2},
                {fullName: '中国银行', type: 3},
                {fullName: '中国建设银行', type: 4},
                {fullName: '交通银行', type: 5},
                {fullName: '中信银行', type: 6},
                {fullName: '中国光大银行', type: 7},
                {fullName: '华夏银行', type: 8},
                {fullName: '广发银行', type: 9},
                {fullName: '平安银行', type: 10},
                {fullName: '招商银行', type: 11},
                {fullName: '兴业银行', type: 12},
                {fullName: '上海浦东发展银行', type: 13},
                {fullName: '中国邮政储蓄银行', type: 161},
                {fullName: '中国民生银行', type: 169},
                {fullName: '其他银行', type: 174}
            ],
            depositMethodList: [
                {
                    id: 1,
                    name: '网银转账'
                },
                {
                    id: 2,
                    name: 'ATM转账'
                },
                {
                    id: 3,
                    name: '柜台存款'
                },
                {
                    id: 4,
                    name: '支付宝转银行卡'
                },
                {
                    id: 5,
                    name: '微信转银行卡'
                },
                {
                    id: 6,
                    name: '云闪付'
                }
            ],
            orderDetail: {
                amount: 'XXXX',
                createTime: 'XXXX',
                resultData: {}

            },
            countDown: {
                seconds: 'XXXXX',
                minutes: 'XXXXX'
            },
            timer: null,
            copyBtn01: null,
            copyBtn02: null,
            copyBtn03: null,
            copyBtn04: null,
            copyName: null,
            copyNumber: null,
            copyPoint: null,
            copyOrderId: null,
            orderAlipay: {
                data: {
                    amount: 'XXX'
                }
            },
            diffValue: null,
            options: {
                top: 1.533,
                bottom: 1.7333
            }
        };
    },
    computed: {},
    components: {
        CommonHeader,
        ScrollComponent,
        ContentWrapper
    },
    methods: {
        ...mapMutations(['MSGALERT']),
        init () {
            paymentApiRequest('getManualTopupRequestList', {
                service: 'payment',
                data: {
                    requestId: '8943835'
                }
            }).then((res) => {
                if (res.data) {
                    this.orderDetail = res.data.data;
                    this.orderDetail.title = this.depositMethodList[this.orderDetail.depositMethod - 1].name;
                    this.orderDetail.bankName = this.defaultBank[this.orderDetail.resultData.bankTypeId - 1].fullName;
                    this.copyName = this.orderDetail.cardOwner;
                    this.copyNumber = this.orderDetail.bankCardNo;
                    this.copyPoint = this.orderDetail.resultData.openingPoint;
                    this.countDownTime();
                } else {
                    this.orderDetail = res.data;
                }
            });
            paymentApiRequest('getAlipayTopupRequestList', {
                service: 'payment',
                data: {
                    requestId: '8943835'
                }
            }).then((res) => {
                // console.log(res);
                if (res.data) {
                    res.data.createTime = tool.timeFormat(res.data.createTime, 'YYYY-MM-DD HH:MM:SS');
                    res.data.data.validTime = tool.timeFormat(res.data.data.validTime, 'YYYY-MM-DD HH:MM:SS');
                    this.orderAlipay = res.data;
                    this.copyOrderId = res.data.data.proposalId;
                } else {
                    this.orderAlipay = res.data;
                }
            });
            paymentApiRequest('getWechatTopupRequestList', {
                service: 'payment',
                data: {
                    requestId: '8943835'
                }
            }).then((res) => {
                // console.log(res);
            });
        },
        cancelOrder () {
            paymentApiRequest('cancelManualTopupRequest', {
                service: 'payment',
                data: {
                    proposalId: this.orderDetail.proposalId
                }
            }).then((res) => {
                this.orderDetail = null;
                this.MSGALERT({
                    text: '订单取消成功',
                    status: 'success'
                });
                clearInterval(this.timer);
            });
        },
        cancelAlipay () {
            paymentApiRequest('cancelAlipayTopup', {
                service: 'payment',
                data: {
                    proposalId: this.orderAlipay.data.proposalId
                }
            }).then((res) => {
                this.orderAlipay = null;
                this.MSGALERT({
                    text: '订单取消成功',
                    status: 'success'
                });
                clearInterval(this.timer);
            });
        },
        comeDeposit () {
            this.$router.push({name: 'deposit'});
        },
        countDownTime () {
            this.timer = setInterval(() => {
                this.diffValue = new Date(this.orderDetail.resultData.validTime.replace(/-/g, '/')) - new Date();
                this.countDown.seconds = Math.floor((this.diffValue / 1000) % 60);
                this.countDown.minutes = Math.floor((this.diffValue / 1000 / 60) % 60);
                if (this.countDown.seconds < 10) {
                    this.countDown.seconds = '0' + this.countDown.seconds;
                }
                if (this.countDown.minutes < 10) {
                    this.countDown.minutes = '0' + this.countDown.minutes;
                }
                if (this.diffValue < 0) {
                    clearInterval(this.timer);
                    window.reload();
                }
                // if (Math.floor(diffValue / 1000) === 0) {
                //     this.getManualTopupRequestList();
                // }
            }, 1000);
        },
        clipBoard () {
            this.copyBtn01 = new Clipboard('.copyname'); // copy people name
            this.copyBtn02 = new Clipboard('.copynumber'); // copy people number
            this.copyBtn03 = new Clipboard('.copypoint'); // copy people number
            this.copyBtn04 = new Clipboard('.copyorderid'); // copy people number
            this.copyBtn01.on('success', (e) => {
                this.MSGALERT({
                    text: '开户姓名复制成功',
                    status: 'success'
                });
            });
            this.copyBtn02.on('success', (e) => {
                this.MSGALERT({
                    text: '银行账号复制成功',
                    status: 'success'
                });
            });
            this.copyBtn03.on('success', (e) => {
                this.MSGALERT({
                    text: '收款银行网点复制成功',
                    status: 'success'
                });
            });
            this.copyBtn04.on('success', (e) => {
                this.MSGALERT({
                    text: '复制成功，记得要粘贴到转账页面哦',
                    status: 'success'
                });
            });
        }
    },
    created () {
        this.init();
    },
    mounted () {
        this.clipBoard();
    },
    destroyed () {
        clearInterval(this.timer);
    }
};
</script>

<style scoped lang="scss">
$images: '../../../assets';
.depositlist {
    padding: 0.2rem 0.4rem;
    .orderdetail{
        .title {
            font-size: 0.4666rem;
            color: #f39a16;
            font-weight: 600;
            text-align: center;
            height: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        ul{
            li{
                .tipicon{
                    display: flex;
                    align-items: center;
                    padding-bottom: 0.2rem;
                    .icon{
                        background: url('https://xdlftp.xindedom.life/images/mobile_image/megaphone.png') no-repeat;
                        width: 0.666rem;
                        height: 0.5333rem;
                        background-size: 100% 100%;
                    }
                    .bank {
                        background: url('https://xdlftp.xindedom.life/images/mobile_image/deposit/bank.png') no-repeat;
                        width: 0.5333rem;
                        height: 0.4266rem;
                        background-size: 100% 100%;
                    }
                    .order {
                        background: url('https://xdlftp.xindedom.life/images/mobile_image/deposit/wallet.png') no-repeat;
                        width: 0.56rem;
                        height: 0.56rem;
                        background-size: 100% 100%;
                    }
                    .icontitle{
                        font-size: .3466rem;
                        color: #fff;
                        padding-left: 0.2rem;
                    }
                }
                .text {
                    font-size: .3466rem;
                    color: #fff;
                    line-height: 0.5rem;
                    padding-bottom: 0.4rem;
                    span{
                        color: #ff0000;
                    }
                }
                .bankInfo {
                    margin-bottom: 0.4rem;
                    border: 1px solid #fff;
                    padding: 0.3rem;
                    border-radius: 5px;
                    .bankList{
                        font-size: .3466rem;
                        color: #fff;
                        padding-bottom: 0.1rem;
                        display: flex;
                        align-items: center;
                        span:nth-child(1) {
                            width: 2.5rem;
                        }
                        span:nth-child(2) {
                            width: 3.5rem;
                        }
                        .copy {
                            background: linear-gradient(to bottom, #ee7d00, #c82900);
                            font-size: 0.2666rem;
                            color: #fff;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width:1.8rem;
                            height: 0.6rem;
                            margin-left: 0.5rem;
                            border-radius: 5px;
                        }
                    }
                    .imgList{
                        text-align: center;
                        img{
                            width: 140px;
                            height: 140px;
                        }
                    }
                }
                .orderInfo {
                    border: 1px solid #fff;
                    padding: 0.3rem;
                    border-radius: 5px;
                    .orderList{
                        font-size: .3466rem;
                        padding-bottom: 0.1rem;
                        color: #fff;
                        display: flex;
                        align-items: center;
                        span:nth-child(1) {
                            width: 2.5rem;
                        }
                        .validtime {
                            color: #f39a16;
                        }
                        .applymoney {
                            color: #f39a16;
                        }
                    }
                }
            }
        }
        .btn {
            background: linear-gradient(to bottom, #ee7d00, #c82900);
            font-size: 0.4rem;
            color: #fff;
            height: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 70%;
            margin: 1.5rem auto 0.3rem;
            border-radius: 5px;
        }
        .nothing {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            font-size: 0.5rem;
            p{
                color: #ffffff;
                text-align: center;
            }
        }
    }
    .alipaydetail {
        .title {
            font-size: 0.4666rem;
            color: #f39a16;
            font-weight: 600;
            text-align: center;
            height: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        ul{
            li{
                .tipicon{
                    display: flex;
                    align-items: center;
                    padding-bottom: 0.2rem;
                    .icon{
                        background: url('https://xdlftp.xindedom.life/images/mobile_image/megaphone.png') no-repeat;
                        width: 0.666rem;
                        height: 0.5333rem;
                        background-size: 100% 100%;
                    }
                    .bank {
                        background: url('https://xdlftp.xindedom.life/images/mobile_image/deposit/bank.png') no-repeat;
                        width: 0.5333rem;
                        height: 0.4266rem;
                        background-size: 100% 100%;
                    }
                    .order {
                        background: url('https://xdlftp.xindedom.life/images/mobile_image/deposit/wallet.png') no-repeat;
                        width: 0.56rem;
                        height: 0.56rem;
                        background-size: 100% 100%;
                    }
                    .icontitle{
                        font-size: .3466rem;
                        color: #fff;
                        padding-left: 0.2rem;
                    }
                }
                .text {
                    font-size: .3466rem;
                    color: #fff;
                    line-height: 0.5rem;
                    padding-bottom: 0.4rem;
                    span{
                        color: #ff0000;
                    }
                }
                .bankInfo {
                    margin-bottom: 0.4rem;
                    border: 1px solid #fff;
                    padding: 0.3rem;
                    border-radius: 5px;
                    .bankList{
                        font-size: .3466rem;
                        color: #fff;
                        padding-bottom: 0.1rem;
                        display: flex;
                        align-items: center;
                        span:nth-child(1) {
                            width: 2.5rem;
                        }
                        span:nth-child(2) {
                            width: 3.5rem;
                        }
                        img{
                            width: 150px;
                            height: 150px;
                        }
                    }
                    .alipaylist{
                        font-size: .3466rem;
                        color: #fff;
                        padding-bottom: 0.1rem;
                        .alipayqr {
                            width: 150px;
                            height: 150px;
                            margin: 10px auto;
                            img{
                                background-color: #fff;
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                    .alipay_tip{
                        font-size: 0.466rem;
                        color: #ff6600;
                        font-weight: bold;
                    }
                }
                .orderInfo {
                    border: 1px solid #fff;
                    padding: 0.3rem;
                    border-radius: 5px;
                    .orderList{
                        font-size: .3466rem;
                        padding-bottom: 0.1rem;
                        color: #fff;
                        display: flex;
                        align-items: center;
                        span:nth-child(1) {
                            width: 2.5rem;
                        }
                        .validtime {
                            color: #f39a16;
                        }
                        .applymoney {
                            color: #f39a16;
                        }
                        .copy {
                            background: linear-gradient(to bottom, #ee7d00, #c82900);
                            font-size: 0.2666rem;
                            color: #fff;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width:1.8rem;
                            height: 0.6rem;
                            margin-left: 0.5rem;
                            border-radius: 5px;
                        }
                    }
                }
            }
        }
        .btn {
            background: linear-gradient(to bottom, #ee7d00, #c82900);
            font-size: 0.4rem;
            color: #fff;
            height: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 70%;
            margin: 1.5rem auto 0.3rem;
            border-radius: 5px;
        }
    }
    .btn {
        background: linear-gradient(to bottom, #ee7d00, #c82900);
        font-size: 0.4rem;
        color: #fff;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 70%;
        margin: 1.5rem auto 0.3rem;
        border-radius: 5px;
    }
    .nothing {
        position: fixed;
        left: 0;
        top: 0;
        /*transform: translate(-50%,0);*/
        width: 100%;
        height: 100%;
        font-size: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        p{
            color: #ffffff;
            text-align: center;
        }
    }
}
</style>
