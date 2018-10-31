<template>
    <div class="daily-check-wrapper">
        <div class="calendar-wrapper">
            <div class="calendar">
                <div class="calendar-head">
                    <p>本月累计签到{{currentMonthData.signDay}}次</p>
                </div>
                <div class="calendar-body">
                    <div class="days-wrapper">
                        <div v-for="(v, i) in calendarData" :key="i" class="day-container">
                            <div :class="'day acquired' + (v.acquire ? ' acquired' : '')">
                                <!--<div v-if="v.active" class="day-active-bg">-->
                                    <!--<span></span>-->
                                <!--</div>-->
                                <p class="day-number">{{ v.number }}</p>
                                <div v-if="v.prize" class="day-product">
                                    <!--<p>奖</p>-->
                                </div>
                                <span v-if="currentMonthData.signDay > i" class="points-sprite i-check day-check"></span>
                            </div>
                            <!--<span v-else class="day-blank"></span>-->
                            <span v-if="(i + 1) % 7 !== 0" class="day-spacer"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-task-wrapper">
            <!--<span :class="'points-sprite i-circle-arrow' + (currentIndex === 0 ? ' hideMe' : '')" @click="changeCarousel('prev')"></span>-->
            <div class="task-carousel">
                <div>
                    <ul class="wrapper">
                        <li v-for="(v, i) in myTask" :key="i">
                            <div v-for="(w, j) in v" :key="j" class="task-wrapper">
                                <earn-task :taskData="w" @btnClick="earnPoints"></earn-task>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!--<span :class="'points-sprite i-circle-arrow flip-image' + (currentIndex === (myTask.length - 1) ? ' hideMe' : '')" @click="changeCarousel('next')"></span>-->
        </div>
    </div>
</template>

<script>
// import BScroll from 'better-scroll';
import EarnTask from './EarnTask';

export default {
    name: 'daily-check',
    data () {
        return {
            firstDatePosition: 1, // 1 = Monday to 7 = Sunday
            calendarData: [],
            calendarPrize: [],
            slider: null,
            currentIndex: 0,
            myTask: [],
            loginData: null,
            currentMonthData: {
                currentYear: null,
                currentMonth: null,
                totalDay: null,
                isGetGift: 0,
                signDay: 0
            },
            loginEventId: null
        };
    },
    props: {
        taskType: String,
        missionData: {
            type: Object
        }
    },
    components: {
        EarnTask
    },
    computed: {
    },
    methods: {
        init () {
            this.loginData = this.missionData.loginPointList;
            this.currentMonthData.totalDay = new Date(new Date().getFullYear(), (new Date().getMonth() + 1), 0).getDate();
            this.currentMonthData.currentYear = new Date().getFullYear();
            this.currentMonthData.currentMonth = new Date().getMonth() + 1;
            this.calcCalendarData();
            this.getMission();
            // this.initSlider();
        },
        calcCalendarData () {
            this.currentMonthData.signDay = 0;
            // let averageNumber = 0;
            // let totalPoint = 0;
            this.calendarData = [];
            for (let i = 0; i < this.currentMonthData.totalDay; i++) {
                let obj = {};
                if (this.loginData[i].refreshPeriod === 'Monthly') {
                    obj.number = i + 1;
                    // if (this.loginData[i].point >= averageNumber) { // 判断是否超过了平均值
                    // } else {
                    //     obj.number = i + 1;
                    //     obj.prize = false;
                    // }
                    if (this.loginData[i].status === 2) { // 判断签到状态
                        obj.acquire = true;
                        this.currentMonthData.signDay++;
                    } else if (this.loginData[i].status === 1) {
                        obj.active = true;
                    }
                }
                this.loginData.forEach((val, index) => {
                    // this.loginData.forEach(())
                    if (val.refreshPeriod === 'Monthly') {
                        if ((this.loginData[i + 1].point < this.loginData[i].point)) {
                            obj.prize = true;
                        }
                        // if ((i + 1) === parseInt(val.goal)) {
                        //     obj.prize = true;
                        // }
                        // totalPoint += val.point;
                        // averageNumber = totalPoint;
                        // averageNumber = Math.floor(averageNumber / (index + 1));
                        // this.calendarPrize.push(val.goal);
                    }
                });
                this.calendarData.push(obj);
            }
        },
        getMission () {
            let arr = [];
            let everyDaySign = {};
            this.myTask = [];
            this.loginData.forEach((val, index) => {
                if (val.status === 1 && val.refreshPeriod === 'Monthly') {
                    console.log('Monthly ddddddddddddd')
                    everyDaySign.active = true;
                    everyDaySign.contentTtitle = '每日签到';
                    everyDaySign.points = val.point;
                    everyDaySign.eventId = val.id;
                    everyDaySign.status = val.status;
                    everyDaySign.device = val.device;
                    everyDaySign.periodTitle = '每天';
                    everyDaySign.progress = {
                        reach: 0,
                        target: 1
                    };
                    return false;
                } else if (val.status === 2 && val.refreshPeriod === 'Monthly') {
                    console.log('Monthly qqqqqqqqqqqqqqq')
                    console.log(index)
                    everyDaySign.active = false;
                    everyDaySign.contentTtitle = '每日签到';
                    everyDaySign.points = val.point;
                    everyDaySign.status = val.status;
                    everyDaySign.device = val.device;
                    everyDaySign.periodTitle = '每天';
                    everyDaySign.progress = {
                        reach: 1,
                        target: 1
                    };
                    return false;
                } else if (val.refreshPeriod === 'Weekly') {
                    // console.log(val);
                    let obj = {
                        contentTtitle: `累计签到${val.goal}天`,
                        points: val.point,
                        eventId: val.id,
                        progress: {
                            reach: val.currentGoal,
                            target: val.goal
                        },
                        active: val.status === 0,
                        status: val.status,
                        device: val.device
                    };
                    if (val.refreshPeriod === 'Monthly') {
                        obj.periodTitle = '每月';
                        // obj.title = `${val.dailyRequestDeposit}`;
                    } else if (val.refreshPeriod === 'Daily') {
                        obj.periodTitle = '';
                        // obj.title = `单日单笔存款${val.dailyRequestDeposit}`;
                    } else if (val.refreshPeriod === 'Weekly') {
                        obj.periodTitle = '每周';
                        // obj.title = `单日单笔存款${val.dailyRequestDeposit}`;
                    }
                    console.log('have weekly')
                    arr.push(obj);
                }
            });
            arr.unshift(everyDaySign);
            let childrenArr = [];
            arr.forEach((val, index) => {
                if ((index + 1) % 2 === 0) {
                    childrenArr.push(val);
                } else {
                    this.myTask.push(childrenArr);
                    childrenArr = [];
                    childrenArr.push(val);
                }
            });
            //this.myTask.splice(0, 1);
            this.myTask.push(childrenArr);
        },
        // initSlider () {
        //     this.slider = new BScroll(this.$refs.wrapper, {
        //         scrollX: true,
        //         scrollY: false,
        //         momentum: false,
        //         snap: {
        //             loop: false,
        //             threshold: 0.1,
        //             speed: 500,
        //             autoPlay: false
        //         },
        //         bounce: false,
        //         stopPropagation: true,
        //         tap: true,
        //         click: true
        //     });
        //     this.$nextTick(() => {
        //         let wrapper = this.$refs.wrapperList;
        //         let childrenList = wrapper.children;
        //         wrapper.style.width = childrenList.length + '00%';
        //         this.slider.on('scrollEnd', () => {
        //             this.currentIndex = this.slider.getCurrentPage().pageX;
        //         });
        //     });
        // },
        changeCarousel (e) {
            this.slider[e]();
        },
        earnPoints (id) {
            this.$emit('signInUpDate', id);
        }
    },
    mounted () {
        if (this.missionData.loginPointList) {
            this.init();
        }
    },
    watch: {
        missionData () {
            this.init();
        }
    }
};
</script>

<style scoped lang="scss">
    .i-check {
        width: .786rem;
        height: .56rem;
        background-position: -3.36rem 0;
    }

    .i-circle-arrow {
        width: .56rem;
        height: .56rem;
        background-position: -4.186rem 0;
    }

    .daily-check-wrapper {
        .calendar-wrapper {
            padding-top: .173rem;
            padding-bottom: .333rem;

            .calendar {
                width: 9.226rem;
                min-height: 6.266rem;
                margin: 0 auto;
                background: linear-gradient(#fffca5, #00ffd2);
                border-radius: .133rem;
                overflow: hidden;

                .calendar-head {
                    height: .893rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: rgba(255, 255, 255, .6);

                    > p {
                        color: #000;
                        font-size: .6rem;
                        letter-spacing: 2px;
                        line-height: .6rem;

                        &:last-child {
                            margin-left: .346rem;
                        }
                    }
                }

                .calendar-body {
                    display: flex;
                    justify-content: center;

                    .days-wrapper {
                        width: 8.74rem;
                        margin-top: .133rem;
                        display: flex;
                        flex-wrap: wrap;

                        .day-container {
                            margin-bottom: .32rem;
                            display: flex;

                            .day {
                                width: .746rem;
                                height: .746rem;
                                position: relative;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                border-radius: .133rem;

                                &.acquired {
                                    background: linear-gradient(rgba(255, 255, 255, .4), rgba(255, 255, 255, .3));
                                }

                                .day-active-bg {
                                    width: 100%;
                                    height: 100%;
                                    position: absolute;
                                    background-color: rgba(255, 255, 255, .4);
                                    border-radius: .133rem;

                                    > span {
                                        width: 100%;
                                        height: .67rem;
                                        display: block;
                                        background-color: rgba(255, 255, 255, .4);
                                        border-radius: .133rem;
                                    }
                                }

                                .day-number {
                                    position: relative;
                                    color: #000;
                                    font-size: .493rem;
                                    font-weight: 700;
                                }

                                .day-product {
                                    width: 100%;
                                    height: 100%;
                                    position: absolute;
                                    right: 0;
                                    bottom: 0;
                                    /*display: flex;*/
                                    /*align-items: center;*/
                                    /*justify-content: center;*/
                                    /*background-color: #fff568;*/
                                    /*border-radius: 50%;*/
                                    z-index: 10;
                                    background: url("../../../../assets/points/circle.gif") no-repeat;
                                    background-size: 100% 100%;
                                    > p {
                                        color: #ff3f3f;
                                        font-size: .28rem;
                                        font-weight: 700;
                                    }
                                }

                                .day-check {
                                    position: absolute;
                                    top: 50%;
                                    left: 50%;
                                    transform: translate(-50%, -50%);
                                }
                            }

                            .day-blank {
                                width: .746rem;
                                height: .746rem;
                            }

                            .day-spacer {
                                width: .586rem;
                                display: block;
                            }
                        }
                    }

                }
            }
        }

        .my-task-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;

            > span.hideMe {
                visibility: hidden;
            }

            .flip-image {
                transform: rotateY(180deg);
            }

            .task-carousel {
                width: 8.666rem;
                overflow: hidden;

                .wrapper {
                    /*height: 5.066rem;*/
                    /*display: flex;*/

                    li {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        overflow: hidden;

                        .task-wrapper {
                            display: inline-block;
                            border: 1px solid #ffc600;
                            margin-bottom: .3rem;
                            &:first-child {
                                /*margin-top: .32rem;*/
                            }

                            &:last-child {
                                /*margin-top: .16rem;*/
                                /*margin-bottom: .32rem;*/
                            }
                        }
                    }
                }
            }
        }
    }
</style>
