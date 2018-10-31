<template>
    <content-wrapper class="container" :options="options">
        <common-header>提前结算洗码</common-header>
        <scroll-component>
            <div class="content">
                <div class="title">
                    您申请洗码优惠金额必须大于或者等于100元
                </div>
                <div class="list" v-for="(item, index) in liveList" :key="index" v-if="item.consumptionAmount > 0">
                    <p class="text">
                        <span>游戏平台：</span>
                        <span>{{item.name}}</span>
                    </p>
                    <p class="text">
                        <span>起始时间：</span>
                        <span>{{item.startTime}}</span>
                    </p>
                    <p class="text">
                        <span>截止时间：</span>
                        <span>{{item.endTime}}</span>
                    </p>
                    <p class="text">
                        <span>有效投注额</span>
                        <span>{{item.consumptionAmount}}</span>
                    </p>
                    <p class="text">
                        <span>洗码比例</span>
                        <span>{{item.ratio}}</span>
                    </p>
                    <p class="text">
                        <span>结算金额</span>
                        <span>{{item.returnAmount}}</span>
                    </p>
                </div>
                <div class="total">
                    可结算金额：{{liveMoney.toFixed(3)}}元
                </div>
                <div class="btn" v-if="this.liveMoney > 0">
                    <span @click="liveApply">提交申请</span>
                </div>
            </div>
        </scroll-component>
    </content-wrapper>
</template>

<script>
// import {getConsumeRebateAmount, requestConsumeRebate} from '@/common/api';
import {apiRequest} from '@/common/api/base';
import TabContent from '@/components/tab-change/TabContent';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import CommonHeader from '@/components/top-header/CommonHeader';
import tool from '@/common/tool';
import {mapState, mapMutations} from 'vuex';
export default {
    name: 'the-wash-code',
    data () {
        return {
            list: [
                {
                    id: 0,
                    name: '电子洗码'
                },
                {
                    id: 1,
                    name: '真人洗码'
                }
            ],
            liveList: [],
            electronicList: [],
            liveCode: [
                {
                    code: 14,
                    name: 'DT电子'
                },
                {
                    code: 16,
                    name: 'PT电子'
                },
                {
                    code: 17,
                    name: 'QT电子'
                },
                {
                    code: 18,
                    name: 'MG电子'
                },
                {
                    code: 19,
                    name: 'GG捕鱼'
                },
                {
                    code: 20,
                    name: 'FU捕鱼'
                },
                {
                    code: 21,
                    name: 'AG捕鱼'
                },
                {
                    code: 22,
                    name: 'PT捕鱼'
                },
                {
                    code: 23,
                    name: 'eBET真人'
                },
                {
                    code: 34,
                    name: 'AG真人'
                },
                {
                    code: 35,
                    name: 'OPUS真人'
                },
                {
                    code: 36,
                    name: 'BY真人'
                },
                {
                    code: 37,
                    name: 'BY体育'
                },
                {
                    code: 38,
                    name: 'OPUS体育'
                },
                {
                    code: 39,
                    name: 'BY彩票'
                },
                {
                    code: 40,
                    name: 'ISB电子'
                },
                {
                    code: 41,
                    name: 'BY电子'
                },
                {
                    code: 42,
                    name: 'ALLBET真人'
                },
                {
                    code: 43,
                    name: 'EA真人'
                },
                {
                    code: 44,
                    name: 'LB彩票'
                },
                {
                    code: 45,
                    name: 'IPM体育'
                },
                {
                    code: 46,
                    name: 'SALON真人'
                },
                {
                    code: 47,
                    name: 'OG真人'
                },
                {
                    code: 48,
                    name: 'PT电子(SUNRISE)'
                },
                {
                    code: 49,
                    name: 'KG彩票'
                },
                {
                    code: 50,
                    name: 'eBET捕鱼'
                },
                {
                    code: 51,
                    name: 'AG体育'
                }
            ],
            liveMoney: 0,
            options: {
                top: 1.533,
                bottom: 1.7333
            }
        };
    },
    methods: {
        ...mapMutations(['MSGMODAL', 'STATEMENT', 'MSGALERT']),
        init () {
            apiRequest('getConsumeRebateAmount', {
                service: 'reward',
                data: {
                    eventCode: 'xmyh'
                }
            }).then((res) => {
                this.liveCode.forEach((val, index, arr) => {
                    for (let i in res.data) {
                        let obj = {
                            consumptionAmount: res.data[i].consumptionAmount,
                            nonXIMAAmt: res.data[i].nonXIMAAmt,
                            ratio: res.data[i].ratio,
                            returnAmount: res.data[i].returnAmount,
                            endTime: tool.timeFormat(res.data.settleTime.endTime),
                            startTime: tool.timeFormat(res.data.settleTime.startTime)
                        };
                        if (parseInt(i) === parseInt(val.code)) {
                            obj.name = val.name;
                            this.liveList.push(obj);
                            this.liveMoney += parseFloat(res.data[i].returnAmount);
                        }
                    }
                });
            });
        },
        liveApply () {
            apiRequest('requestConsumeRebate', {
                service: 'reward',
                data: {
                    eventCode: 'xmyh',
                    _isModal: true
                }
            }).then((res) => {
                this.MSGALERT({
                    text: '结算洗码申请已提交，请稍等',
                    status: 'success'
                });
            }).catch((res) => {
                this.MSGALERT({
                    text: res.errorMessage,
                    status: 'error'
                });
            });
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    components: {
        TabContent,
        CommonHeader,
        ScrollComponent,
        ContentWrapper
    },
    created () {
        this.init();
    },
    mounted () {}
};
</script>

<style scoped lang="scss">
    .content{
        /*background-color: #1b1b1b;*/
        padding: 0 0.3rem;
        .wrapper {
            margin: 0 0.266rem;
        }
        .title{
            font-size: 0.4rem;
            color: #f39a16;
            padding: 0.5rem 0;
            text-align: center;
        }
        .list {
            border: 1px solid #ffffff;
            border-radius: 5px;
            padding: 0.3rem 0.6rem;
            .text{
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: #ffffff;
                font-size:0.34666rem;
                padding-bottom: 0.2rem;
            }
            margin-bottom: 0.5rem;
        }
        .total {
            font-size: 0.4rem;
            text-align: center;
            color: #fff;
            /*padding-right: 0.5rem;*/
        }
        .btn{
            background: linear-gradient(to bottom, #ed7c00, #c72700);
            width: 80%;
            margin: 0 auto;
            font-size: 0.4rem;
            color: #fff;
            text-align: center;
            height: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 0.6rem;
            margin-bottom: 0.2rem;
            border-radius: 5px;
        }
    }
</style>
