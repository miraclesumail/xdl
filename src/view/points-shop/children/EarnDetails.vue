<template>
    <div class="earn-details-wrapper">
        <div class="details-header">
            <span class="points-sprite i-colored-border"></span>
            <p>我的积分明细</p>
            <span class="points-sprite i-colored-border rotate-me"></span>
        </div>
        <div class="details-body">
            <div class="current-points">
                <p>当前积分：</p>
                <p class="points-value">{{currentTotalPointScore}}</p>
            </div>
            <div class="time-content">
                <div class="time-select">
                    <span class="text">开始时间</span>
                    <span class="select-time" @click="startTimeHander">
                        {{startTime}}
                        <!--<datetime v-model="startTime"></datetime>-->
                    </span>
                </div>
                <div class="time-select">
                    <span class="text">结束时间</span>
                    <div class="select-time" @click="endTimeHander">
                        {{endTime}}
                        <!--<datetime v-model="endTime"></datetime>-->
                    </div>
                </div>
                <div class="time-select">
                    <span class="text">积分类型</span>
                    <select v-model="pointsType" @change="() => {this.logList = []}">
                        <option :value="item.id" v-for="(item, index) in pointTypeList" :key="index">{{item.name}}</option>
                    </select>
                </div>
                <!--<input type="date" v-model="startTime" ref="startTime">-->
                <!--<input type="date" v-model="endTime" ref="endTime">-->
            </div>
            <div class="time-btn" @click="searchPoint">
                查询
            </div>
            <div class="logs-table">
                <table>
                    <tr>
                        <th>
                            <div class="header-item">
                                <p>累计类型</p>
                            </div>
                        </th>
                        <th>
                            <div class="header-item">
                                <p>{{pointsType === 4 || pointsType === 6? '扣除积分' : '获取积分'}}</p>
                            </div>
                        </th>
                        <th v-if="pointsType === 4">
                            <div class="header-item">
                                <p>实物名称</p>
                            </div>
                        </th>
                        <th>
                            <div class="header-item">
                                <p>获得时间</p>
                            </div>
                        </th>
                    </tr>
                    <tr v-for="(v, i) in logList" :key="i">
                        <td><p>{{ v.type }}</p></td>
                        <td><p>{{ v.points }}</p></td>
                        <td v-if="pointsType === 4"><p>{{v.remark}}</p></td>
                        <td><p>{{ v.time }}</p></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="calendar">
            <!--<Calendar-->
                <!--v-on:choseDay="clickDay"-->
                <!--v-on:changeMonth="changeDate"-->
            <!--&gt;</Calendar>-->
        </div>
    </div>
</template>

<script>
// import '@/common/DatePicker.css';
// import DatePicker from '@/common/DatePicker';
// import Calendar from 'vue-calendar-component';
import {getPointRule, getPointChangeRecord} from '@/common/point_shop_api';
import tool from '@/common/tool';
/* eslint-disable no-new */
export default {
    name: 'earn-details',
    data () {
        return {
            startTime: tool.timeFormat(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 30), 'YYYY-MM-DD'),
            endTime: tool.timeFormat(new Date(), 'YYYY-MM-DD'),
            pointsType: 1,
            logList: [

            ],
            datePicker: null,
            currentTotalPointScore: null,
            pointTypeList: [
                {
                    id: 1,
                    name: '登入积分'
                },
                {
                    id: 2,
                    name: '存款积分'
                },
                {
                    id: 3,
                    name: '游戏积分'
                },
                {
                    id: 4,
                    name: '兑换实物'
                },
                {
                    id: 6,
                    name: '兑换现金'
                }
            ]
        };
    },
    components: {
        // Calendar
    },
    methods: {
        clickDay () {

        },
        changeDate () {

        },
        init () {
            getPointRule('rewardPoints', {
            }).then((res) => {
                this.currentTotalPointScore = res.data.userCurrentPoint;
            }).catch((res) => {
            });
        },
        startTimeHander () {
            // this.timeSelectHander('start', '请选择开始时间', '2100', '1900', '');
        },
        endTimeHander () {
            // this.timeSelectHander('end', '请选择结束时间', '2100', '1900', '');
        },
        timeSelectHander (type, title, maxYear, minYear, defaultValue) {
            // let that = this;
            // new DatePicker({
            //     type: 3,
            //     title: title,
            //     maxYear: maxYear,
            //     minYear: minYear,
            //     separator: '-',
            //     defaultValue: defaultValue,
            //     callBack (val) {
            //         if (type === 'start') {
            //             that.startTime = val;
            //         } else if (type === 'end') {
            //             that.endTime = val;
            //         }
            //         console.log(val);
            //     }
            // });
        },
        selectPointType (id) {
            switch (id) {
            case 1:
                return '登入积分';
            case 2:
                return '存款积分';
            case 3:
                return '游戏积分';
            case 4:
                return '兑换实物';
            case 5:
                return '积分增加';
            case 6:
                return '兑换现金';
            }
        },
        searchPoint () {
            getPointChangeRecord('rewardPoints', {
                startTime: new Date(new Date(this.startTime)),
                endTime: new Date(new Date(this.endTime).setHours(23, 59, 59, 59)),
                pointType: this.pointsType
            }).then((res) => {
                console.log(res);
                this.logList = res.data.filter((val, index) => {
                    val.type = this.selectPointType(val.pointType);
                    val.points = val.pointChange;
                    val.time = tool.timeFormat(val.createTime, 'YYYY-MM-DD');
                    val.remark = val.remark.split(' ')[0];
                    return val;
                });
            }).catch((res) => {
                console.log(res);
            });
        }
    },
    created () {
        this.init();
    }
};
</script>

<style scoped lang="scss">
    .i-colored-border {
        width: 5.506rem;
        height: .173rem;
        background-position: 0 -.92rem;
    }

    .earn-details-wrapper {
        .details-header {
            padding: .466rem 0;
            display: flex;
            align-items: center;
            flex-direction: column;

            > p {
                color: #fff;
                font-size: .6rem;
            }

            .rotate-me {
                transform: rotateX(180deg)
            }
        }

        .details-body {
            display: flex;
            align-items: center;
            flex-direction: column;
            .current-points {
                margin-bottom: .2rem;
                color: #fff;
                font-size: .38rem;
                line-height: .38rem;
                display: flex;
                align-content: center;
                .points-value {
                    margin-left: .133rem;
                    font-size: .4rem;
                    font-weight: 700;
                }
            }
            .time-content{
                /*display: flex;*/
                /*align-items: center;*/
                /*justify-content: space-between;*/
                /*flex-direction: column;*/
                width: 100%;
                .time-select{
                    margin-right: 0.2rem;
                    padding-left: 0.4rem;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    margin-bottom: 0.4rem;
                    .text{
                        font-size: 0.38rem;
                        color: #ffffff;
                        margin-right: 0.4rem;
                    }
                    input{
                        width: 3rem;
                        margin-right: 0.2rem;
                        height: 0.6rem;
                        border: none;
                        background-color: transparent;
                    }
                    .select-time{
                        font-size: 0.38rem;
                        color: #ffffff;
                        border: 1px solid #fff;
                        padding: 0.1rem 0;
                        width: 50%;
                        display: inline-block;
                        text-align: center;
                        border-radius: 4px;
                    }
                    select{
                        font-size: 0.4rem;
                        border: 1px solid #fff;
                        background-color: transparent;
                        color: #ffffff;
                        width: 50%;
                        border-radius: 4px;
                        padding: 0.05rem 0;
                        text-align-last: center;
                    }
                }
            }
            .time-btn{
                font-size: 0.4rem;
                color: #ffffff;
                background-color: #ff383c;
                padding: 0.2rem 0.8rem;
                margin: 0.2rem 0;
                border-radius: 5px;
            }
            .logs-table {
                width: 9.24rem;
                text-align: center;
                background: linear-gradient(#393a3a, #0c0c0c);
                border: .026rem solid #ed145b;

                table {
                    width: 100%;

                    tr:last-child {
                        > td {
                            padding-bottom: .333rem;
                        }
                    }

                    th {
                        height: 1.786rem;

                        .header-item {
                            width: 2.133rem;
                            height: .746rem;
                            margin: 0 auto;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background-color: #686868;
                            border-radius: .2rem;

                            > p {
                                color: #fff;
                                font-size: .333rem;
                                font-weight: 700;
                            }
                        }
                    }

                    td {
                        height: .93rem;
                        color: #fff;
                        font-size: .333rem;
                    }
                }
            }
        }
    }
    .calendar{

    }
</style>
