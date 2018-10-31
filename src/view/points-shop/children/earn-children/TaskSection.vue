<template>
    <div class="task-section-wrapper">
        <div v-if="taskList" :class="'task-container task-' + taskType">
            <div v-for="(v, i) in taskList" :key="i" class="task-card">
                <earn-task :taskData="v" @btnClick="earnPoints"></earn-task>
            </div>
        </div>
    </div>
</template>

<script>
import EarnTask from './EarnTask';
import {getProviderList} from '@/common/api';
export default {
    name: 'task-section',
    data () {
        return {
            taskList: [],
            missionListData: this.missionData,
            gameProvideList: []
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
    methods: {
        earnPoints (id) {
            this.$emit('otherUpdate', id);
        },
        init () {
            this.taskList = [];
            switch (this.taskType) {
            case 'deposit':
                this.depositTask();
                break;
            case 'game':
                this.getProviderGameList_gameTask();
                break;
            case 'extreme':
                this.getProviderGameList_extremeTask();
                break;
            default:
            }
        },
        getProviderGameList_gameTask () {
            getProviderList('game', { // get game company list
            }).then((res) => {
                this.gameProvideList = res.data.filter((val, index) => {
                    return val;
                });
                this.gameTask();
            }).catch((res) => {});
        },

        getProviderGameList_extremeTask () {
            getProviderList('game', { // get game company list
            }).then((res) => {
                this.gameProvideList = res.data.filter((val, index) => {
                    return val;
                });
                this.extremeTask();
            }).catch((res) => {});
        },
        depositTask () {
            this.taskList = this.missionListData.rechargePointList.filter((val, index) => {
                if (!/至尊挑战/.test(val.title)) {
                    if (val.status === 1) {
                        val.active = true;
                    } else if (val.status === 2) {
                        val.active = false;
                    }
                    val.points = val.point;
                    val.eventId = val.id;
                    val.contentTtitle = `单笔存款${val.dailyRequestDeposit}`;
                    if (val.refreshPeriod === 'Monthly') {
                        val.periodTitle = '每月';
                    } else if (val.refreshPeriod === 'Daily') {
                        val.periodTitle = '每天';
                    } else if (val.refreshPeriod === 'Weekly') {
                        val.periodTitle = '每周';
                    }
                    val.progress = {
                        reach: val.currentGoal,
                        target: val.goal
                    };
                    return val;
                }
            });
        },
        gameTask () {
            this.taskList = this.missionListData.gamePointList.filter((val, index) => {
                if (!/至尊挑战/.test(val.title)) {
                    if (val.status === 1) {
                        val.active = true;
                    } else if (val.status === 2) {
                        val.active = false;
                    }
                    if (val.gameType.indexOf('表示') > -1) {
                        val.gameType = val.gameType.substring(2);
                    }
                    if (!val.gameType) {
                        val.gameType = '';
                    }
                    if (!val.betDetail || val.betDetail.length === 0) {
                        val.betDetail = '任意玩法';
                    } else {
                        val.betDetail = val.betDetail.toString();
                    }
                    if (val.dailyRequestBetCountsAndAmount[0] > 0 && val.dailyRequestBetCountsAndAmount[1] > 0) {
                        val.betRequest = `投注${val.dailyRequestBetCountsAndAmount[0]}笔 每笔大于${val.dailyRequestBetCountsAndAmount[1]}元`;
                    } else {
                        val.betRequest = '';
                    }
                    if (val.dailyBetConsumption > 0) {
                        val.betConsumption = `有效投注额：${val.dailyBetConsumption}元`;
                    } else {
                        val.betConsumption = '';
                    }
                    if (val.dailyWinBetCounts > 0) {
                        val.betWinCount = `胜利局数：${val.dailyWinBetCounts}局`;
                    } else {
                        val.betWinCount = '';
                    }
                    val.points = val.point;
                    val.eventId = val.id;
                    val.contentTtitle = `${this.gamePlatform(val.providerId[0])} ${val.gameType} ${val.betDetail} ${val.betRequest} ${val.betConsumption} ${val.betWinCount}`;
                    if (val.refreshPeriod === 'Monthly') {
                        val.periodTitle = '每月';
                    } else if (val.refreshPeriod === 'Daily') {
                        val.periodTitle = '每天';
                    } else if (val.refreshPeriod === 'Weekly') {
                        val.periodTitle = '每周';
                    }
                    val.progress = {
                        reach: val.currentGoal,
                        target: val.goal
                    };
                    return val;
                }
            });
        },
        extremeTask () {
            this.missionListData.gamePointList.forEach((val, index) => {
                if (/至尊挑战/.test(val.title)) {
                    console.log(val);
                    if (val.status === 1) {
                        val.active = true;
                    } else if (val.status === 2) {
                        val.active = false;
                    }
                    if (val.gameType.indexOf('表示') > -1) {
                        val.gameType = val.gameType.substring(2);
                    }
                    if (!val.gameType) {
                        val.gameType = '';
                    }
                    if (!val.betDetail || val.betDetail.length === 0) {
                        val.betDetail = '任意玩法';
                    } else {
                        val.betDetail = val.betDetail.toString();
                    }
                    if (val.dailyRequestBetCountsAndAmount[0] > 0 && val.dailyRequestBetCountsAndAmount[1] > 0) {
                        val.betRequest = `投注${val.dailyRequestBetCountsAndAmount[0]} 每笔大于${val.dailyRequestBetCountsAndAmount[1]}元`;
                    } else {
                        val.betRequest = '';
                    }
                    if (val.dailyBetConsumption > 0) {
                        val.betConsumption = `有效投注额：${val.dailyBetConsumption}元`;
                    } else {
                        val.betConsumption = '';
                    }
                    if (val.dailyWinBetCounts > 0) {
                        val.betWinCount = `胜利局数：${val.dailyWinBetCounts}局`;
                    } else {
                        val.betWinCount = '';
                    }
                    val.points = val.point;
                    val.eventId = val.id;
                    val.contentTtitle = `${this.gamePlatform(val.providerId[0])} ${val.gameType} ${val.betDetail} ${val.betRequest} ${val.betConsumption} ${val.betWinCount}`;
                    if (val.refreshPeriod === 'Monthly') {
                        val.periodTitle = '每月';
                    } else if (val.refreshPeriod === 'Daily') {
                        val.periodTitle = '每天';
                    } else if (val.refreshPeriod === 'Weekly') {
                        val.periodTitle = '每周';
                    }
                    val.progress = {
                        reach: val.currentGoal,
                        target: val.goal
                    };
                    this.taskList.push(val);
                }
            });
            this.missionListData.rechargePointList.filter((val, index) => {
                if (/至尊挑战/.test(val.title)) {
                    console.log(val);
                    if (val.status === 1) {
                        val.active = true;
                    } else if (val.status === 2) {
                        val.active = false;
                    }
                    val.points = val.point;
                    val.eventId = val.id;
                    val.contentTtitle = `单笔存款${val.dailyRequestDeposit}`;
                    if (val.refreshPeriod === 'Monthly') {
                        val.periodTitle = '每月';
                    } else if (val.refreshPeriod === 'Daily') {
                        val.periodTitle = '每天';
                    } else if (val.refreshPeriod === 'Weekly') {
                        val.periodTitle = '每周';
                    }
                    val.progress = {
                        reach: val.currentGoal,
                        target: val.goal
                    };
                    this.taskList.push(val);
                }
            });
        },
        gamePlatform (id) {
            let name = null;
            if (!id) {
                return '任意游戏';
            }
            this.gameProvideList.forEach((val, index) => {
                if (val.providerId === id) {
                    name = val.name;
                }
            });
            return name;
        }
    },
    mounted () {
        this.init();
    },
    watch: {
        taskType () {
            this.init();
        },
        missionData () {
            this.missionListData = this.missionData;
            this.init();
        }
    }
};
</script>

<style scoped lang="scss">
    .task-section-wrapper {
        padding: .2rem 0;

        .task-container {
            width: 9.173rem;
            margin: 0 auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            border-radius: .2rem;

            &.task-deposit {
                border: 2px solid #ffc600;

                .task-card {
                    border: 1px solid #ffc600;
                }
            }

            &.task-game {
                border: 2px solid #00fff0;

                .task-card {
                    border: 1px solid #00fff0;
                }
            }

            &.task-extreme {
                border: 2px solid #8dc63f;

                .task-card {
                    border: 1px solid #8dc63f;
                }
            }

            .task-card {
                margin-bottom: .2rem;
                display: inline-block;

                &:first-child {
                    margin-top: .266rem;
                }

                &:last-child {
                    margin-bottom: .266rem;
                }
            }
        }
    }
</style>
