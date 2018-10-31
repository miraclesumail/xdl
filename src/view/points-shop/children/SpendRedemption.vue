<template>
    <div class="redemption-record-wrapper">
        <points-carousel :carouselData="carouselData"></points-carousel>
        <div class="record-header">
            <span class="points-sprite i-border-brown-2"></span>
            <p>兑换记录</p>
            <span class="points-sprite i-border-brown-2 rotate-me"></span>
        </div>
        <div class="record-time">
            <div class="time-select">
                <span class="text">开始时间</span>
                <span class="select-time" @click="startTimeHander">{{startTime}}</span>
            </div>
            <div class="time-select">
                <span class="text">结束时间</span>
                <span class="select-time" @click="endTimeHander">{{endTime}}</span>
            </div>
            <div class="time-select">
                <span class="text">礼品类型</span>
                <select v-model="pointsType" @change="() => {this.logsList = []}">
                    <option :value="item.id" v-for="(item, index) in pointTypeList" :key="index">{{item.name}}</option>
                </select>
            </div>
        </div>
        <div class="time-btn" @click="searchPoint">
            查询
        </div>
        <!--<div class="btn">-->
            <!--查询-->
        <!--</div>-->
        <div class="details-body">
            <div class="logs-table">
                <table>
                    <tr>
                        <th>
                            <div class="header-item">
                                <p>礼品名称</p>
                            </div>
                        </th>
                        <th>
                            <div class="header-item">
                                <p>所花积分</p>
                            </div>
                        </th>
                        <th>
                            <div class="header-item">
                                <p>兑换时间</p>
                            </div>
                        </th>
                    </tr>
                    <tr v-for="(v, i) in logsList" :key="i">
                        <td>
                            <p v-if="pointsType === 4">{{ v.name }}</p>
                            <p v-if="pointsType === 6">现金</p>
                        </td>
                        <td><p>{{ v.score }}</p></td>
                        <td><p>{{ v.time }}</p></td>
                    </tr>
                </table>
                <div class="tip" v-if="logsList.length === 0">暂无兑换记录</div>
            </div>
        </div>
    </div>
</template>

<script>
import PointsCarousel from './common-children/PointsCarousel';
import {getPointChangeRecord} from '@/common/point_shop_api';
// import '@/common/DatePicker.css';
// import DatePicker from '@/common/DatePicker';
import tool from '@/common/tool';
/* eslint-disable no-new */
export default {
    name: 'redemption-record',
    data () {
        return {
            startTime: tool.timeFormat(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 30), 'YYYY-MM-DD'),
            endTime: tool.timeFormat(new Date(), 'YYYY-MM-DD'),
            carouselData: [
                { img: 'https://xdlftp.xindedom.life/images/mobile_image/points/ps-banner1.jpg' },
                { img: 'https://xdlftp.xindedom.life/images/mobile_image/points/ps-banner3.jpg' }
            ],
            logsList: [],
            pointsType: 4,
            pointTypeList: [
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
        PointsCarousel
    },
    methods: {
        searchPoint () {
            getPointChangeRecord('rewardPoints', {
                startTime: this.startTime,
                endTime: new Date(new Date(this.endTime).setHours(23, 59, 59, 59)),
                pointType: this.pointsType
            }).then((res) => {
                console.log(res);
                this.logsList = res.data.filter((val, index) => {
                    val.name = val.remark.split(' ')[0];
                    val.score = val.pointChange;
                    val.time = tool.timeFormat(val.createTime, 'YYYY-MM-DD');
                    return val;
                });
            }).catch((res) => {
                console.log(res);
            });
        },
        startTimeHander () {
            this.timeSelectHander('start', '请选择开始时间', '2100', '1900', '');
        },
        endTimeHander () {
            this.timeSelectHander('end', '请选择结束时间', '2100', '1900', '');
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
        }
    },
    mounted () {
    }
};
</script>

<style scoped lang="scss">
    .i-border-brown-2 {
        width: 3.96rem;
        height: .066rem;
        background-position: 0 -2.483rem;
    }

    .redemption-record-wrapper {
        background-color: #0c0c0c;

        .record-header {
            padding: .466rem 0;
            display: flex;
            align-items: center;
            flex-direction: column;

            > p {
                padding: .2rem 0;
                color: #fff;
                font-size: .52rem;
                line-height: .52rem;
            }

            .rotate-me {
                transform: rotateX(180deg)
            }
        }
        .record-time{
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
            width: 2.4rem;
            font-size: 0.4rem;
            color: #ffffff;
            background-color: #ff383c;
            padding: 0.2rem 0;
            margin: 0.2rem auto;
            border-radius: 5px;
            text-align: center;
        }
        .details-body {
            display: flex;
            justify-content: center;

            .logs-table {
                width: 9.24rem;
                text-align: center;
                background: linear-gradient(#393a3a, #0c0c0c);
                border: .026rem solid #ed145b;
                border-radius: .133rem;

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
                                line-height: .333rem;
                            }
                        }
                    }

                    td {
                        height: 1rem;
                        color: #fff;
                        font-size: .333rem;

                        .rank-img {
                            margin: 0 auto;
                        }
                    }
                }
                .tip{
                    font-size: 0.466rem;
                    color: #fff;
                    padding-bottom: 0.2rem;
                }
            }
        }
    }
</style>
