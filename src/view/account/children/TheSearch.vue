<template>
    <content-wrapper class="container" :options="options">
        <common-header>记录搜索</common-header>
        <scroll-component>
            <div class="content">
                <tab-content :list="tabList">
                    <div class="searchcontent" slot="0">
                        <div class="list">
                            <p class="text">交易类型</p>
                            <select name="" id="" class="select" v-model="deposit">
                                <option value='null'>全部</option>
                                <option value="2">在线充值</option>
                                <option value="1">手工存款</option>
                                <option value="3">支付宝充值</option>
                                <option value="4">个人微信</option>
                            </select>
                        </div>
                        <div class="list">
                            <p class="text">开始时间</p>
                            <div class="time">
                                <span class="show">{{startTime}}</span>
                            </div>
                        </div>
                        <div class="list">
                            <p class="text">结束时间</p>
                            <div class="time">
                                <span class="show">{{endTime}}</span>
                            </div>
                        </div>
                        <div class="btn" @click="depositSearch">
                            查询
                        </div>
                        <table class="result" v-if="depositList.length > 0">
                            <tr>
                                <th>订单号</th>
                                <th>存款时间</th>
                                <th>存款金额</th>
                                <th>状态</th>
                            </tr>
                            <tr v-for="(item, index) in depositList" :key="index">
                                <td>{{item.proposalId}}</td>
                                <td>{{timeFormat(item.settlementTime)}}</td>
                                <td>{{item.amount.toFixed(2)}}</td>
                                <td>成功</td>
                            </tr>
                            <tr>
                                <td colspan="2">总计</td>
                                <td colspan="2">{{depositTotal}}元</td>
                            </tr>
                        </table>
                    </div>
                    <div class="searchcontent" slot="1">
                        <div class="list">
                            <p class="text">开始时间</p>
                            <div class="time">
                                <span class="show">{{startTime}}</span>
                            </div>
                        </div>
                        <div class="list">
                            <p class="text">结束时间</p>
                            <div class="time">
                                <span class="show">{{endTime}}</span>
                            </div>
                        </div>
                        <div class="btn" @click="withdrawSearch">
                            查询
                        </div>
                        <table class="result" v-if="withdrawList.length > 0">
                            <tr>
                                <th>订单号</th>
                                <th>提款时间</th>
                                <th>提款金额</th>
                                <th>状态</th>
                            </tr>
                            <tr v-for="(item, index) in withdrawList" :key="index">
                                <td>{{item.proposalId}}</td>
                                <td>{{timeFormat(item.createTime)}}</td>
                                <td>{{item.data.amount.toFixed(2)}}</td>
                                <td>{{item.status}}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="searchcontent" slot="2">
                        <div class="list">
                            <p class="text">优惠类型</p>
                            <select name="" class="select" v-model="discount">
                                <option value="null">全部</option>
                            </select>
                        </div>
                        <div class="list">
                            <p class="text">开始时间</p>
                            <div class="time">
                                <span class="show">{{startTime}}</span>
                            </div>
                        </div>
                        <div class="list">
                            <p class="text">结束时间</p>
                            <div class="time">
                                <span class="show">{{endTime}}</span>
                            </div>
                        </div>
                        <div class="btn" @click="discountSearch">
                            查询
                        </div>
                        <table class="result" v-if="discountList.length > 0">
                            <tr>
                                <th>优惠类型</th>
                                <th>领取时间</th>
                                <th>优惠金额</th>
                                <th>优惠代码</th>
                            </tr>
                            <tr v-for="(item, index) in discountList" :key="index">
                                <td>{{item.eventName}}</td>
                                <td>{{timeFormat(item.createTime)}}</td>
                                <td>{{item.rewardAmount.toFixed(2)}}</td>
                                <td>{{item.eventCode}}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="searchcontent" slot="3">
                        <div class="list">
                            <p class="text">游戏大厅</p>
                            <select name="" class="select" v-model="searchTitle">
                                <option value="">请选择游戏大厅</option>
                                <option :value="item.id" v-for="(item, index) in gameLobby" :key="index">{{item.name}}</option>
                            </select>
                        </div>
                        <div class="list">
                            <p class="text">开始时间</p>
                            <div class="time">
                                <span class="show">{{startTime}}</span>
                            </div>
                        </div>
                        <div class="list">
                            <p class="text">结束时间</p>
                            <div class="time">
                                <span class="show">{{endTime}}</span>
                            </div>
                        </div>
                        <div class="btn" @click="betSearch">
                            查询
                        </div>
                        <table class="result" v-if="betList.length > 0">
                            <tr>
                                <th>注单序列号</th>
                                <th>类型</th>
                                <th>玩法</th>
                                <th>投注金额</th>
                                <th>输赢值</th>
                                <th>投注时间</th>
                            </tr>
                            <tr v-for="(item, index) in betList" :key="index">
                                <td>{{item.orderNo}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.cpGameType}}</td>
                                <td>{{item.amount}}</td>
                                <td>{{item.bonusAmount}}</td>
                                <td>{{timeFormat(item.createTime)}}</td>
                            </tr>
                        </table>
                    </div>
                </tab-content>
            </div>
        </scroll-component>
    </content-wrapper>
</template>

<script>
import TabContent from '@/components/tab-change/TabContent.vue';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import CommonHeader from '@/components/top-header/CommonHeader';
// import {getTopupList, getBonusRequestList, getPlayerRewardList, getPromoCode, search} from '@/common/api';
import {apiRequest} from '@/common/api/base';
import {paymentApiRequest} from '@/common/api/payment';
import {mapState, mapMutations} from 'vuex';
import tool from '@/common/tool';
export default {
    name: 'the-search',
    data () {
        return {
            gameLobby: [
                {
                    name: 'DT电子大厅',
                    id: 45
                },
                {
                    name: 'AG真人大厅',
                    id: 16
                },
                {
                    name: 'GG捕鱼大厅',
                    id: 42
                },
                {
                    name: 'eBET大厅',
                    id: 56
                },
                {
                    name: 'ISB电子大厅',
                    id: 57
                },
                {
                    name: 'KG彩票大厅',
                    id: 49
                },
                {
                    name: 'BY电子大厅',
                    id: 47
                },
                {
                    name: 'BY真人大厅',
                    id: 55
                },
                {
                    name: 'OG真人大厅',
                    id: 48
                },
                {
                    name: 'PT电子大厅',
                    id: 18
                },
                {
                    name: 'MG电子大厅',
                    id: 41
                }
            ],
            tabList: [
                {
                    id: 0,
                    name: '存款记录'
                },
                {
                    id: 1,
                    name: '提款记录'
                },
                {
                    id: 2,
                    name: '优惠记录'
                },
                {
                    id: 3,
                    name: '投注记录'
                }
            ],
            startTime: this.timeFormat(new Date(new Date().setDate(new Date().getDate() - 2)).setHours(0, 0, 0, 0)),
            endTime: this.timeFormat(new Date()),
            deposit: null,
            withdraw: null,
            discount: null,
            depositList: [],
            depositTotal: 0,
            withdrawList: [],
            discountList: [],
            betList: [],
            searchTitle: '',
            options: {
                top: 1.533,
                bottom: 1.7333
            }
        };
    },
    components: {
        TabContent,
        CommonHeader,
        ScrollComponent,
        ContentWrapper
        // DatePicker
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        ...mapMutations(['MSGALERT']),
        timeFormat (time) {
            return tool.timeFormat(time, 'YYYY-MM-DD HH:mm:ss');
        },
        // 存款
        depositSearch () {
            this.depositList = [];
            this.deposit = this.deposit === 'null' ? null : this.deposit;
            paymentApiRequest('getTopupList', {
                service: 'payment',
                data: {
                    topUpType: this.deposit,
                    startIndex: 0,
                    // requestCount: 100,
                    startTime: this.startTime,
                    endTime: this.endTime
                }
            }).then((res) => {
                if (res.data.records.length) {
                    this.depositList = res.data.records;
                    this.depositTotal = res.data.stats.totalAmount;
                } else {
                    this.MSGALERT({
                        text: '没有查询到存款记录',
                        status: 'success'
                    });
                }
            });
        },
        // 提款
        withdrawSearch () {
            paymentApiRequest('getBonusRequestList', {
                service: 'payment',
                data: {
                    startTime: this.startTime,
                    endTime: this.endTime
                }
            }).then((res) => {
                if (res.data.records.length) {
                    for (let i = 0; i < res.data.records.length; i++) {
                        if (res.data.records[i].status === 'Success') {
                            res.data.records[i].status = '成功';
                        } else if (res.data.records[i].status === 'Pending') {
                            res.data.records[i].status = '待审批';
                        } else if (res.data.records[i].status === 'Rejected') {
                            res.data.records[i].status = '审批拒绝';
                        } else if (res.data.records[i].status === 'Fail') {
                            res.data.records[i].status = '提案失败';
                        } else if (res.data.records[i].status === 'Cancel') {
                            res.data.records[i].status = '已取消';
                        }
                    }
                    this.withdrawList = res.data.records;
                } else {
                    this.MSGALERT({
                        text: '没有查询到提款记录',
                        status: 'success'
                    });
                }
            });
        },
        // 优惠
        discountSearch () {
            this.discountList = [];
            apiRequest('getPlayerRewardList', {
                service: 'reward',
                data: {
                    startTime: this.startTime,
                    endTime: this.endTime,
                    sort: false,
                    startIndex: 0
                }
            }).then((res) => {
                apiRequest('getPromoCode', {
                    service: 'reward',
                    data: {
                        status: 2
                    }
                }).then((res) => {
                    res.data.usedList.filter((val, index, arr) => {
                        let usedTime = tool.timeFormat(val.usedTime, 'YYYY-MM-DD HH:MM:SS');
                        if (usedTime >= this.startTime && usedTime <= this.endTime) {
                            val.createTime = val.usedTime;
                            val.eventCode = val.bonusCode;
                            val.rewardAmount = val.title;
                            if (/\d+%/.test(val.title)) {
                                val.eventName = '魔力宝石';
                            } else if (/无/.test(val.condition)) {
                                val.eventName = '财富宝石';
                            } else {
                                val.eventName = '幸运宝石';
                            }
                            this.discountList.unshift(val);
                        }
                    });
                });
                if (res.data.records.length) {
                    res.data.records.forEach((val, index, arr) => {
                        if (val.eventName !== '优惠代码') {
                            this.discountList.unshift(val);
                        }
                    });
                } else {
                    this.MSGALERT({
                        text: '没有查询到优惠记录',
                        status: 'success'
                    });
                }
            });
        },
        // 投注记录
        betSearch () {
            this.betList = [];
            paymentApiRequest('search', {
                service: 'consumption',
                data: {
                    startTime: this.startTime,
                    endTime: this.endTime,
                    providerId: this.searchTitle
                }
            }).then((res) => {
                // console.log(res);
                if (res.data.records.length > 0) {
                    this.betList = res.data.records;
                    console.log(this.betList);
                } else {
                    this.MSGALERT({
                        text: '没有查询到投注记录',
                        status: 'success'
                    });
                }
            });
        }
    }
};
</script>

<style scoped lang="scss">
    .content{
        .searchcontent{
            .list{
                display: flex;
                align-items: center;
                padding: 0.3rem;
                .text{
                    font-size: 0.4rem;
                    color: #fff;
                    font-weight: 600;
                    margin-right: 0.34rem;
                }
                .select {
                    border: 1px solid #929191;
                    border-radius: 5px;
                    background: linear-gradient(to bottom, #101010, #1f1f1f);
                    height: 0.7333rem;
                    width: 6rem;
                    color: #fff;
                    font-size: 0.4rem;
                    option {
                        background: linear-gradient(to bottom, #101010, #1f1f1f);
                        color: #000;
                    }
                }
                .time {
                    border: 1px solid #929191;
                    font-size: 0.4rem;
                    color: #fff;
                    height: 0.7333rem;
                    line-height: 0.7333rem;
                    width: 6rem;
                    border-radius: 4px;
                    input {
                        padding-left: 0.1rem;
                        border: none;
                        outline: none;
                        background: none;
                        color: #fff;
                        font-size: 0.4rem;
                    }
                    .show {
                        padding-left: 0.2rem;
                        border: none;
                        outline: none;
                        background: none;
                        color: #fff;
                        font-size: 0.4rem;
                    }
                }
            }
            .btn{
                width: 2.8rem;
                height: 0.8rem;
                line-height: 0.8rem;
                text-align: center;
                background: linear-gradient(to bottom, #ee7e00, #c72700);
                font-size: 0.4rem;
                color: #fff;
                margin: 0.5rem auto;
                border-radius: 5px;
            }
            .result {
                margin: 0.2rem auto;
                max-width: 90%;
                border-collapse: collapse;
                th{
                    height: 1rem;
                    width: 20%;
                    background-color: #ffcf43;
                    font-size: 0.4rem;
                    color: #000;
                    font-weight: 600;
                    text-align: center;
                    border: 1px solid #ffcf43;
                    border-bottom: none;
                    overflow: hidden;
                }
                /*th:nth-child(2) {*/
                    /*width: 25%;*/
                /*}*/
                td{
                    border: 1px solid #fff;
                    border-top: none;
                    font-size: 0.4rem;
                    color: #fff;
                    text-align: center;
                    height: 1rem;
                }
                td:nth-child(1) {
                    width: 1rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
</style>
