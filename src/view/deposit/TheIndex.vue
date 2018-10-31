<template>
    <content-wrapper class="deposit" :options="options">
        <scroll-component>
            <div class="title">
                <span class="icon"></span>
                <p class="text">
                    <span>充值取款</span>
                    <span>RECHARGE</span>
                </p>
            </div>
            <tab-change :list="depositList" :fnoptions="fn">
                <div class="" slot="0">
                    <the-online></the-online>
                </div>
                <div class="" slot="1">
                    <the-wechat-ali></the-wechat-ali>
                </div>
                <div class="" slot="2">
                    <the-artificial-transfer></the-artificial-transfer>
                </div>
                <div class="" slot="3">
                    <the-with-draw></the-with-draw>
                </div>
            </tab-change>
        </scroll-component>
        <the-ali-pop v-if="alipaypop.status"></the-ali-pop>
    </content-wrapper>
</template>

<script>
import TheAliPop from './children/TheAliPop.vue';
import TabChange from '@/components/tab-change/TabContent.vue';
import TheOnline from './children/TheOnline.vue';
import TheWechatAli from './children/TheWechatAli.vue';
import TheArtificialTransfer from './children/TheArtificialTransfer.vue';
import TheWithDraw from './children/TheWithDraw.vue';
import {getManualTopupRequestList} from '@/common/api';
import {mapMutations, mapState} from 'vuex';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
// import TheOnlineWechatAli from './children/TheOnlineWechat.vue';
export default {
    name: 'the-index',
    data () {
        return {
            depositList: [
                {
                    id: 0,
                    name: '在线充值'
                },
                {
                    id: 1,
                    name: '微信支付宝'
                },
                {
                    id: 2,
                    name: '人工转账'
                },
                {
                    id: 3,
                    name: '提款'
                }
            ],
            fn: {
                2: {
                    runFn: () => {
                        getManualTopupRequestList('payment', {
                            requestId: '8943835'
                        }).then((res) => {
                            if (res.data) {
                                this.MSGMODAL({
                                    text: '您已经有类似存款订单未处理，点确定查看存款订单详情',
                                    status: true,
                                    confirmFn: () => {
                                        this.$router.push({name: 'accountdeposit', params: {title: '存款订单'}});
                                    }
                                });
                            }
                        });
                    }
                }
            },
            options: {
                top: 1.7066,
                bottom: 1.7333
            }
        };
    },
    methods: {
        ...mapMutations(['MSGMODAL'])
    },
    computed: {
        ...mapState(['alipaypop'])
    },
    mounted () {},
    components: {
        TabChange,
        TheOnline,
        TheWechatAli,
        TheArtificialTransfer,
        TheWithDraw,
        TheAliPop,
        ScrollComponent,
        ContentWrapper
        // TheOnlineWechatAli
    }
};
</script>

<style scoped lang="scss">
$images: '../../assets';
.deposit{
    .title {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.04rem;
        background:linear-gradient(to bottom, #272727, #111111);
        .icon {
            background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/deposit-icon.png') no-repeat;
            background-size: 100% 100%;
            width: 0.6933rem;
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
}
</style>
