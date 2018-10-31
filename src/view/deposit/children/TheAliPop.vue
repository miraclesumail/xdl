<template>
    <div class="alipaypop" @touchmove.prevent="">
        <div class="fixed"  v-if="alipay.status"></div>
        <transition name="pop">
            <div class="content" v-if="alipay.status">
                <div class="header">
                    <span class="icon iconfont icon-msnui-close" @click="close"></span>
                </div>
                <div class="wrap">
                    <div class="list">
                        <span>支付类型</span>
                        <span>{{alipay.name}}</span>
                    </div>
                    <div class="list">
                        <span>转账金额</span>
                        <span class="money">{{alipay.money}}元</span>
                    </div>
                    <div class="list">
                        <span>{{alipay.placeholderName}}</span>
                        <input type="text" :placeholder="alipay.placeholder" v-model="realName">
                    </div>
                    <div class="list">
                        <span>得利宝石</span>
                        <span>{{alipay.deliGem? alipay.deliGem : '无'}}</span>
                    </div>
                    <div class="btn" @click="apply(alipay.selectPay)">
                        <span>提交</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
// import {requestAlipayTopup, requestManualTopup} from '@/common/api';
import {paymentApiRequest} from '@/common/api/payment';
export default {
    name: 'the-ali-pop',
    data () {
        return {
            alipay: {
                status: false
            },
            realName: null
        };
    },
    computed: {
        ...mapState(['alipaypop'])
    },
    methods: {
        ...mapMutations(['STATEMENT', 'MSGALERT']),
        init () {
            this.alipay = this.alipaypop;
            this.realName = this.alipaypop.lastAliPayName;
        },
        apply (name) {
            switch (name) {
            case 'APP' :
                if (!this.realName) {
                    this.MSGALERT({
                        text: '支付宝昵称不能为空',
                        status: 'error'
                    });
                    return false;
                }
                paymentApiRequest('requestAlipayTopup', {
                    service: 'payment',
                    data: {
                        amount: this.alipaypop.money,
                        alipayName: this.realName,
                        bonusCode: this.alipaypop.deliGem,
                        bPMSGroup: true
                    }
                }).then((res) => {
                    this.STATEMENT({
                        name: 'alipaypop',
                        type: 'status',
                        data: false
                    });
                    this.MSGALERT({
                        text: '存款订单已提交',
                        status: 'success'
                    });
                    setTimeout(() => {
                        this.$router.push({name: 'accountdeposit', params: {title: '存款订单'}});
                    }, 500);
                });
                break;
            case 'BANK':
                if (!this.realName) {
                    this.MSGALERT({
                        text: '支付宝实名不能为空',
                        status: 'error'
                    });
                    return false;
                }
                paymentApiRequest('requestManualTopup', {
                    service: 'payment',
                    data: {
                        amount: this.alipaypop.money,
                        realName: this.realName,
                        bonusCode: this.alipaypop.deliGem,
                        supportMode: 'new',
                        bPMSGroup: true,
                        depositMethod: 4
                    }
                }).then((res) => {
                    this.STATEMENT({
                        name: 'alipaypop',
                        type: 'status',
                        data: false
                    });
                    this.MSGALERT({
                        text: '存款订单已提交',
                        status: 'success'
                    });
                    setTimeout(() => {
                        this.$router.push({name: 'accountdeposit', params: {title: '存款订单'}});
                    }, 500);
                });
                break;
            }
        },
        close () {
            this.STATEMENT({
                name: 'alipaypop',
                type: 'status',
                data: false
            });
        }
    },
    mounted () {
        this.init();
    }
};
</script>

<style scoped lang="scss">
    .alipaypop {}
    .fixed {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 30;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: rgba(000,000,000,0.7);
    }
    .content{
        position: fixed;
        width: 7rem;
        top: 50%;
        left: 50%;
        z-index: 31;
        transform: translate3d(-50%, -50%, 0);
        .header{
            height:0.8666rem;
            background: linear-gradient(to bottom, #fe7d14, #d24c0c, #8f0200);
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .icon{
                font-size: 0.9rem;
                color: #fff;
            }
        }
        .wrap {
            padding: 0.266rem;
            background: linear-gradient(to bottom, #202020, #0a0a0a);
            .list{
                display: flex;
                align-items: center;
                color: #fff;
                font-size: 0.4rem;
                margin-bottom: 0.3rem;
                span:nth-child(1) {
                    width: 2.2rem;
                    color: #fff;
                    font-size: 0.4rem;
                }
                span:nth-child(2) {
                    margin-left: 0.3rem;
                }
                .money {
                    color: #ffb400;
                }
                input {
                    margin-left: 0.3rem;
                    border: 1px solid #fff;
                    height: 0.8rem;
                    color: #ffb400;
                    font-size: 0.4rem;
                    background: linear-gradient(to bottom, #0c0c0c, #171717);
                    width: 3.8rem;
                    border-radius: 5px;
                    padding-left: 0.1rem;
                }
                ::-webkit-input-placeholder{
                    font-size: 0.3466rem;
                }
            }
            .btn {
                height: 1rem;
                background: linear-gradient(to bottom, #fe7d14, #d24c0c, #8f0200);
                font-size: 0.4rem;
                color: #fff;
                text-align: center;
                width: 55%;
                margin: 0.47rem auto;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 5px;
            }
        }
    }
    .pop-enter {
        transform: translate3d(-50%, -80%, 0);
        opacity: 0;
    }
    .pop-enter-to {
        transform: translate3d(-50%, -50%, 0);
        opacity: 1;
    }
    .pop-leave{
        transform: translate3d(-50%, -80%, 0);
        opacity: 1;
    }
    .pop-leave-to{
        transform: translate3d(-50%, -80%, 0);
        opacity: 0;
    }
    .pop-enter-active, .pop-leave-active{
        transition: 0.3s all;
    }
</style>
