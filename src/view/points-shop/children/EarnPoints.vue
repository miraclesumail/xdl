<template>
    <div class="earn-points-wrapper">
        <points-carousel :carouselData="carouselData"></points-carousel>
        <div class="views-wraper">
            <div class="views-container">
                <div class="views-txt">
                    <p class="is-bold">我的积分：{{currentTotalPointScore}}</p>
                    <p class="is-bold">今日已赚：{{earnScoreEveryDay}}</p>
                </div>
                <span></span>
                <div class="views-txt">
                    <router-link tag="a" to="/pointsshop/earn/details" class="is-btn">
                        查看积分明细&#62;&#62;
                    </router-link>
                    <router-link tag="a" to="/pointsshop/earn/integralrules" class="is-btn">
                        积分规则&#62;&#62;
                    </router-link>
                    <router-link tag="a" to="/pointsshop/earn/leaderboard" class="is-btn">
                        积分排行榜&#62;&#62;
                    </router-link>
                </div>
            </div>
        </div>
        <div class="earn-nav">
            <div v-for="(v, i) in earnChild" :key="i" :class="'earn-btn' + (activeEarnChild === i ? ' active': '')" @click="changeNav(i)">
                <p>{{ v.text }}</p>
            </div>
        </div>
        <!-- tab控制组件切换 -->
        <component :is="earnChild[activeEarnChild].component" :taskType="earnChild[activeEarnChild].type" :missionData="missionListData" @signInUpDate="signInUpDate" @otherUpdate="otherUpdate"></component>
    </div>
</template>

<script>
import PointsCarousel from './common-children/PointsCarousel';
import DailyCheck from './earn-children/DailyCheck';
import TaskSection from './earn-children/TaskSection';
import {getMissonList, getPointRule, applyRewardPoint} from '@/common/point_shop_api';
import {mapMutations} from 'vuex';
export default {
    name: 'earn-points',
    data () {
        return {
            carouselData: [
                { img: 'https://xdlftp.xindedom.life/images/mobile_image/points/ps-banner1.jpg' },
                { img: 'https://xdlftp.xindedom.life/images/mobile_image/points/ps-banner3.jpg' }
            ],
            earnChild: [
                { text: '每日签到', component: DailyCheck, type: 'daily' },
                { text: '存款积分', component: TaskSection, type: 'deposit' },
                { text: '游戏积分', component: TaskSection, type: 'game' },
                { text: '至尊挑战', component: TaskSection, type: 'extreme' }
            ],
            activeEarnChild: 0,
            currentTotalPointScore: 0,
            earnScoreEveryDay: 0,
            missionListData: {}
        };
    },
    methods: {
        ...mapMutations(['MSGALERT', 'STATEMENT']),
        changeNav (index) {
            if (this.activeEarnChild !== index) {
                this.activeEarnChild = index;
            }
        },
        init () {
            getMissonList('rewardPoints', {
            }).then((res) => {
                // console.log(res);
                this.currentTotalPointScore = res.data.playerPointInfo[0].totalPoint;
                this.missionListData = res.data;
            }).catch((res) => {
                // console.log(res);
            });
            getPointRule('rewardPoints', {
            }).then((res) => {
                // console.log(res);
                this.earnScoreEveryDay = res.data.preDailyAppliedPoint;
            }).catch((res) => {
                // console.log(res);
            });
        },
        signInUpDate (id) {
            console.log(id);
            applyRewardPoint('rewardPoints', {
                eventObjectId: id,
                _isModal: true
            }).then((res) => {
                // console.log(res);
                this.MSGALERT({
                    text: '签到成功',
                    status: 'success'
                });
                this.STATEMENT({
                    name: 'isSign',
                    data: true
                });
                this.init();
            }).catch((res) => {
                this.MSGALERT({
                    text: '您的签到任务未完成',
                    status: 'error'
                });
                // console.log(res);
            });
        },
        otherUpdate (id) {
            console.log(id);
            applyRewardPoint('rewardPoints', {
                eventObjectId: id,
                _isModal: true
            }).then((res) => {
                // console.log(res);
                this.MSGALERT({
                    text: '领取成功',
                    status: 'success'
                });
                this.STATEMENT({
                    name: 'isSign',
                    data: true
                });
                this.init();
            }).catch((res) => {
                this.MSGALERT({
                    text: '您的积分任务未完成',
                    status: 'error'
                });
                // console.log(res);
            });
        }
    },
    components: {
        PointsCarousel
    },
    created () {
        this.init();
    }
};
</script>

<style scoped lang="scss">
    .earn-points-wrapper {
        background: linear-gradient(#464646, #000);

        .views-wraper {
            height: 2.733rem;
            display: flex;
            align-items: center;
            justify-content: center;

            .views-container {
                width: 90%;
                height: 1.92rem;
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: center;
                background: linear-gradient(#1e1e1e, #3a3a3a);
                border: 1px solid #ffc600;

                .views-txt {
                    width: 95%;
                    margin: .266rem 0;
                    color: #fff;
                    font-size: .4rem;
                    line-height: .4rem;
                    display: flex;
                    justify-content: space-between;

                    .is-bold {
                        font-weight: 700;
                    }

                    .is-btn {
                        color: #fff;
                        cursor: pointer;
                    }
                }

                > span {
                    width: 95%;
                    height: 1px;
                    display: block;
                    background-color: #ffc600;
                }
            }
        }

        .earn-nav {
            display: flex;
            justify-content: center;

            .earn-btn {
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
    }
</style>
