<template>
    <div class="spend-points-wrapper">
        <points-carousel :carouselData="carouselData"></points-carousel>
        <div class="spend-views-wrapper">
            <div class="views-item">
                <!--<span class="points-sprite i-border-green"></span>-->
                <div class="item-content">
                    <span class="points-sprite i-spend-coins"></span>
                    <div class="item-text">
                        <p>积分：</p>
                        <p class="points-value">{{currentPoint}}</p>
                    </div>
                </div>
                <!--<span class="points-sprite i-border-green revert-me"></span>-->
            </div>
            <router-link tag="div" to="/pointsshop/spend/redemption" class="views-item">
                <!--<span class="points-sprite i-border-brown"></span>-->
                <div class="item-content">
                    <span class="points-sprite i-spend-mobile"></span>
                    <div class="item-text">
                        <p>兑换记录</p>
                    </div>
                </div>
                <!--<span class="points-sprite i-border-brown revert-me"></span>-->
            </router-link>
            <div class="views-item" @click="() => {this.$router.push({name: 'integralrules'})}">
                <!--<span class="points-sprite i-border-green"></span>-->
                <div class="item-content">
                    <span class="points-sprite i-spend-rules"></span>
                    <div class="item-text">
                        <p>积分规则</p>
                    </div>
                </div>
                <!--<span class="points-sprite i-border-green revert-me"></span>-->
            </div>
        </div>
        <div class="spend-nav">
            <div v-for="(v, i) in earnChild" :key="i" :class="'spend-btn' + (activeSpendChild === i ? ' active': '')" @click="changeNav(i)">
                <p>{{ v.text }}</p>
            </div>
        </div>
        <div class="tasks-wrapper">
            <spend-task v-for="(v, i) in spendData" :key="i" :taskData="v" @applyGift="applyGift" @applyMoney="applyMoney" @lookBigImg="lookBigImg"></spend-task>
        </div>
        <!--<div class="cover" v-show="isShow" @touchstart.prevent=""></div>-->
        <!--<div class="imgbox" v-show="isShow" @touchstart.prevent="">-->
            <!--<img :src="imgUrl" alt="">-->
        <!--</div>-->
    </div>
</template>

<script>
import PointsCarousel from './common-children/PointsCarousel';
import SpendTask from './spend-children/SpendTask';
import {getRewardList} from '@/common/api';
import {deductPointManually, getPointRule, applyPointToCredit} from '@/common/point_shop_api';
import {mapMutations, mapState} from 'vuex';
export default {
    name: 'spend-points',
    data () {
        return {
            carouselData: [
                { img: 'https://xdlftp.xindedom.life/images/mobile_image/points/ps-banner1.jpg' },
                { img: 'https://xdlftp.xindedom.life/images/mobile_image/points/ps-banner3.jpg' }
            ],
            earnChild: [
                { text: '现金礼包' },
                { text: '实物礼品' }
            ],
            activeSpendChild: 0,
            spendData: [],
            currentPoint: null,
            imgUrl: null,
            isShow: false
        };
    },
    components: {
        PointsCarousel,
        SpendTask
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        ...mapMutations(['MSGALERT', 'MSGMODAL', 'STATEMENT']),
        init () {
            getPointRule('rewardPoints', {
            }).then((res) => {
                this.currentPoint = res.data.userCurrentPoint;
            });
        },
        applyGift (id, name) {
            deductPointManually('rewardPoints', {
                pointToDeduct: Number(-id),
                remark: name
            }).then((res) => {
                this.MSGMODAL({
                    text: '实物兑换已经提交到后台审核，稍后将会有专人联系您',
                    status: true
                });
                this.init();
            }).catch((res) => {
                console.log(res);
            });
        },
        applyMoney (id) {
            console.log(id);
            applyPointToCredit('rewardPoints', {
                point: Number(id)
            }).then((res) => {
                this.MSGMODAL({
                    text: '现金兑换成功，已经充值到了您当前账户',
                    status: true
                });
                this.init();
            }).catch((res) => {
                console.log(res);
            });
        },
        lookBigImg (url) {
            this.imgUrl = url;
            this.isShow = true;
        },
        changeNav (index) {
            this.spendData = [];
            if (index === 0) {
                this.cashPackage();
            } else {
                this.physicalGift();
            }

            this.activeSpendChild = index;
        },
        cashPackage () {
            getPointRule('rewardPoints', {
            }).then((res) => {
                res.data.list.forEach((val, index) => {
                    if (val.gradeId === this.userInfo.data.playerLevel.value) {
                        this.playerPointData = val;
                        console.log(this.playerPointData.preExchangeRate);
                    }
                });
                getRewardList('reward', {
                }).then((res) => {
                    res.data.forEach((val, index) => {
                        if (val.code === 'jfsc-xj') {
                            val.list.forEach((item, index) => {
                                let obj = {
                                    detail: {
                                        displayTitle: item.displayTitle,
                                        displayTextContent: item.displayTextContent,
                                        // displayId: item.displayId,
                                        displayId: item.displayTextContent * this.playerPointData.preExchangeRate,
                                        changeRate: `${this.playerPointData.preExchangeRate} : 1`,
                                        requestBetTimes: `${this.playerPointData.requestedValidBetTimes}倍流水`
                                    },
                                    imageUrl: val.condition.imageUrl,
                                    name: 'money'
                                };
                                this.spendData.push(obj);
                            });
                        }
                    });
                }).catch((res) => {
                });
            }).catch((res) => {});
            // getRewardList('reward', {
            // }).then((res) => {
            //     res.data.forEach((val, index) => {
            //         if (val.code === 'jfsc-sw') {
            //
            //         }
            //     });
            // }).catch((res) => {
            // });
        },
        physicalGift () {
            getRewardList('reward', {
            }).then((res) => {
                res.data.forEach((val, index) => {
                    if (val.code === 'jfsc-sw') {
                        val.list.forEach((item, index) => {
                            let obj = {
                                detail: item,
                                imageUrl: val.condition.imageUrl[index],
                                name: 'gift'
                            };
                            this.spendData.push(obj);
                        });
                    }
                });
            }).catch((res) => {
            });
        },
        taskClick () {
            console.log('click!');
        },
        changeThis () {
            this.$emit('componentChange', 1);
        }
    },
    mounted () {
        this.init();
        this.changeNav(this.activeSpendChild);
    },
    watch: {
    }
};
</script>

<style scoped lang="scss">
    .i-border-green {
        width: 2.6rem;
        height: .053rem;
        background-position: 0 -2.4rem;
    }

    .i-border-brown {
        width: 2.6rem;
        height: .053rem;
        background-position: -2.64rem -2.4rem;
    }

    .i-spend-coins {
        width: 1.466rem;
        height: 1.026rem;
        background-position: -1.68rem -1.133rem;
    }
    .i-spend-rules {
        width: 1.1rem;
        height: 1.026rem;
        background: url(../../../assets/rules-statement.png) no-repeat;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        background-position: center center;
    }
    .i-spend-mobile {
        width: .813rem;
        height: 1.133rem;
        background-position: -3.186rem -1.133rem;
    }

    .spend-points-wrapper {
        position: relative;
        height: 100%;
        .spend-views-wrapper {
            padding: .28rem 0;
            display: flex;
            justify-content: space-around;
            .views-item {
                height: 2.16rem;
                /*margin: 0 .26rem;*/
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .item-content {
                    height: 1.6rem;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: space-between;

                    .item-text {
                        display: flex;

                        > p {
                            color: #fff;
                            font-size: .333rem;
                            line-height: .333rem;
                        }

                        .points-value {
                            margin-left: .066rem;
                            font-size: .333rem;
                        }
                    }
                }

                .revert-me {
                    transform: rotateX(180deg);
                }
            }
        }

        .spend-nav {
            display: flex;
            justify-content: center;

            .spend-btn {
                width: 2.266rem;
                height: .84rem;
                margin: 0 .04rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(#1d1d1d, #0b0b0b);
                border: 1px solid #444444;
                border-radius: .333rem;
                box-sizing: border-box;
                margin-right: 0.2rem;
                &.active {
                    border: 1px solid #fec500;

                    > p {
                        color: #ffcc00;
                    }
                }

                > p {
                    color: #9d9d9d;
                    font-size: .333rem;
                    font-weight: 700;
                }
            }
        }

        .tasks-wrapper {
            width: 9.226rem;
            margin: 0 auto;
            margin-top: .2rem;
            padding: .48rem .35rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            border: 1px solid #ffc600;
            border-radius: .133rem;
            box-sizing: border-box;

            > div {
                margin-bottom: .466rem;
            }
        }
        .cover{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            background-color: rgba(000,000,000, 0.5);
        }
        .imgbox {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 60%;
            z-index: 50;
            background-color: #fff;
            padding: 0.6rem;
            border-radius: 5px;
            img{
                width: 100%;
            }
        }
    }
</style>
