<template>
    <div class="container" v-if="hasApply">
        <div class="top">
            <span>目前可以申请的输值返利：</span>
            <span class="money">{{loseValue}}元</span>
        </div>
        <div class="tip">
            亲～温馨提醒：每人每天只能领取一次，请记得在系统收录投注输赢(约莫30分钟)后，在点击领取唷。
        </div>
    </div>
</template>

<script>
import {apiRequest} from '@/common/api/base';
import tool from '@/common/tool';
import {mapState} from 'vuex';
export default {
    name: 'jsjlbszfh',
    data () {
        return {
            betMoney: 0,
            discountMoney: 0,
            loseValue: 0,
            losePercent: 0,
            hasApply: true
        };
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        init () {
            apiRequest('getPlayerRewardList', {
                service: 'reward',
                data: {
                    startTime: tool.timeFormat(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), 'YYYY-MM-DD HH:mm:ss'),
                    endTime: tool.timeFormat(new Date(new Date().setHours(24, 0, 0, 0)), 'YYYY-MM-DD HH:mm:ss')
                }
            }).then((res) => {
                if (res.data.records.length > 0) {
                    res.data.records.forEach((val, index) => {
                        if (val.eventCode === 'jsjlbszfh') {
                            this.hasApply = false;
                            this.childrenFn();
                        }
                        this.discountMoney += val.rewardAmount;
                    });
                }
            }).catch((res) => {
            });
            apiRequest('getPlayerAnyDayStatus', {
                service: 'player',
                data: {
                    providerIds: ['18', '41', '45', '57', '72', '47'],
                    startTime: tool.timeFormat(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), 'YYYY-MM-DD HH:mm:ss'),
                    endTime: tool.timeFormat(new Date(new Date().setHours(24, 0, 0, 0)), 'YYYY-MM-DD HH:mm:ss')
                }
            }).then((getRes) => {
                // console.log(getRes);
                this.betMoney = getRes.data.bonusAmount * -1;
                apiRequest('getRewardList', {
                    service: 'reward',
                    data: {}
                }).then((res) => {
                    res.data.forEach((val, index) => {
                        if (val.code === 'jsjlbszfh') {
                            this.losePercent = val.param.rewardParam[this.userInfo.data.playerLevel.value].value[0].rewardPercent;
                            this.loseValue = ((this.betMoney - this.discountMoney) * (this.losePercent) * 0.01).toFixed(2);
                            // console.log(this.discountMoney);
                            // console.log(this.betMoney);2
                            if (this.loseValue < 10) {
                                this.loseValue = 0;
                            }
                        }
                    });
                }).catch((res) => {
                });
            }).catch((res) => {
            });
        },
        childrenFn () {
            this.$emit('childrenFn', this.hasApply);
        }
    },
    created () {
        this.init();
    }
};
</script>

<style scoped lang="scss">
    .container {
        .top {
            display: flex;
            align-items: center;
            font-size: 0.4666rem;
            justify-content: center;
            color: #fff;
            padding-bottom: 0;
            padding-top: 0.2rem;
            .money {
                color: #ff7f00;
            }
        }
        .tip {
            width: 95%;
            margin: 0.2rem auto;
            text-align: center;
            color: #fff;
            font-size: 0.3466rem;
        }
    }
</style>
